<template>
  <div
    id="header-search"
    class="header-search show">
    <!-- <svg-icon class="search-icon" name="search" @click.stop="click" /> -->
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      :placeholder="$t('form.placeholder.fuzzySearch')"
      size="mini"
      filterable
      default-first-option
      remote
      class="header-search-select"
      @change="change">
      <!-- <i slot="prefix" class="el-input__icon el-icon-search"></i> -->
      <el-option
        v-for="item in options"
        :key="item.path"
        :value="item"
        :label="item.meta.title.join(' > ')" />
    </el-select>
  </div>
</template>

<script lang="ts">
import path from 'path'
import Fuse from 'fuse.js' // A lightweight fuzzy-search module
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'

import i18n from '@/lang' // Internationalization

@Component({
  name: 'HeaderSearch'
})
export default class extends Vue {
  private search = ''
  private show = false
  private options: RouteConfig[] = []
  private searchPool: RouteConfig[] = []
  private fuse?: any

  get routes() {
    return this.$store.state.permission.routers
  }

  get lang() {
    return this.$store.state.app.language
  }

  @Watch('lang')
  private onLangChange() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  @Watch('routes')
  private onRoutesChange() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  @Watch('searchPool')
  private onSearchPoolChange(value: RouteConfig[]) {
    this.initFuse(value)
  }

  @Watch('show')
  private onShowChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.close)
    } else {
      document.body.removeEventListener('click', this.close)
    }
  }

  mounted() {
    this.searchPool = this.generateRoutes(this.routes)
  }

  private click() {
    // this.show = !this.show
    // if (this.show) {
    this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).focus()
    // }
  }

  private close() {
    this.$refs.headerSearchSelect && (this.$refs.headerSearchSelect as HTMLElement).blur()
    this.options = []
    // this.show = false
  }

  private change(route: RouteConfig) {
    this.$router.push(route.path)
    this.search = ''
    this.options = []
    // this.$nextTick(() => {
    //   this.show = false
    // })
  }

  private initFuse(list: RouteConfig[]) {
    this.fuse = new Fuse(list, {
      //   shouldSort: true,
      //   threshold: 0.4,
      //   location: 0,
      //   distance: 100,
      //   maxPatternLength: 32,
      //   minMatchCharLength: 1,
      //   keys: [{
      //     name: 'title',
      //     weight: 0.7
      //   },
      //   {
      //     name: 'titleEn',
      //     weight: 0.7
      //   }, {
      //     name: 'path',
      //     weight: 0.3
      //   }]
      shouldSort: true,
      threshold: 0.7,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['meta.title', 'path']
    })
  }

  // Filter out the routes that can be displayed in the sidebar
  // And generate the internationalized title
  private generateRoutes(routes: RouteConfig[], basePath = '/', prefixTitle: string[] = []) {
    let res: RouteConfig[] = []

    for (const router of routes) {
      // skip hidden router
      if (router.meta && router.meta.hidden) {
        continue
      }

      const data: RouteConfig = {
        path: path.resolve(basePath, router.path),
        meta: {
          title: [...prefixTitle],
          titleEn: []
        }
      }

      if (router.meta && router.meta.title) {
        // generate internationalized title
        let i18ntitle
        if (router.meta.isNotTranslateTitle) {
          i18ntitle = router.meta.title
        } else {
          i18ntitle = i18n.t(`route.${router.meta.title}`).toString()
        }
        data.meta.titleEn = [i18ntitle, router.meta.title]
        data.meta.title = [...data.meta.title, i18ntitle]

        if (router.redirect !== 'noRedirect') {
          // only push the routes with title
          // special case: need to exclude parent router without redirect
          res.push(data)
        }
      }

      // recursive child routes
      if (router.children) {
        const tempRoutes = this.generateRoutes(router.children, data.path, data.meta.title)
        if (tempRoutes.length >= 1) {
          res = [...res, ...tempRoutes]
        }
      }
    }
    return res
  }

  private querySearch(query: string) {
    if (query !== '') {
      if (this.fuse) {
        this.options = this.fuse.search(query)
      }
    } else {
      this.options = []
    }
  }
}
</script>
<style lang="scss" >
.header-search-select{
  .el-input__inner{
    background: rgb(55,70,108);
    border: none;
    font-size: 12px;
    color: #fff;
  }
}
</style>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.header-search {
  font-size: 0 !important;
  padding: 12px;
  text-align: center;
  .search-icon {
    cursor: pointer;
    font-size: 12px;
    vertical-align: middle;
  }

  .header-search-select {
    width: 150px;
    font-size: 12px;
    transition: width 0.2s;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
}
</style>
