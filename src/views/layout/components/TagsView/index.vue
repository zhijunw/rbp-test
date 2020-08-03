<template>
  <div
    id="tags-view-container"
    class="tags-view-container">
    <scroll-pane
      ref="scrollPane"
      class="tags-view-wrapper">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="isActive(tag) ? 'active' : ''"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag) ? closeSelectedTag(tag) : ''"
        @contextmenu.prevent.native="openMenu(tag, $event)">
        {{ tag.meta.isNotTranslateTitle ? tag.meta.title : $t('route.' + tag.meta.title) }}
        <span
          v-if="!isAffix(tag)"
          class="el-icon-close"
          @click.prevent.stop="closeSelectedTag(tag)" />
      </router-link>
    </scroll-pane>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px', 'z-index': 4000 }"
      class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">
        {{ $t('tagsView.refresh') }}
      </li>
      <li
        v-if="!isAffix(selectedTag)"
        @click="closeSelectedTag(selectedTag)">
        {{ $t('tagsView.close') }}
      </li>
      <li @click="closeOthersTags">
        {{ $t('tagsView.closeOthers') }}
      </li>
      <li @click="closeAllTags(selectedTag)">
        {{ $t('tagsView.closeAll') }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import path from 'path'
import { Component, Vue, Watch } from 'vue-property-decorator'
import VueRouter, { Route, RouteRecord, RouteConfig } from 'vue-router'

import { ITagView } from '@/store/modules/tags-view'
import ScrollPane from './ScrollPane.vue'

@Component({
  name: 'TagsView',
  components: {
    ScrollPane
  }
})
export default class extends Vue {
  private visible: boolean = false
  private top: number = 0
  private left: number = 0
  private selectedTag: ITagView = {}
  private affixTags: ITagView[] = []

  get visitedViews() {
    return this.$store.state.tagsView.visitedViews
  }

  get routes() {
    return this.$store.state.permission.routers
  }

  @Watch('$route')
  private onRouteChange() {
    this.addTags()
    this.moveToCurrentTag()
  }

  @Watch('visible')
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  mounted() {
    this.initTags()
    this.addTags()
  }

  private isActive(route: ITagView) {
    return route.path === this.$route.path
  }
  // 判断该路由是否可以被关闭
  private isAffix(tag: ITagView) {
    return tag.meta && tag.meta.affix
  }
  // 递归层级路由 获取到需要被默认展示一维路由数组 如 dashboard
  private filterAffixTags(routes: RouteConfig[], basePath = '/') {
    let tags: ITagView[] = []
    routes.forEach((route) => {
      if (route.meta && route.meta.affix) {
        // 解析路径
        const tagPath = path.resolve(basePath, route.path)
        tags.push({
          fullPath: tagPath,
          path: tagPath,
          name: route.name!,
          meta: { ...route.meta }
        })
      }
      if (route.children) {
        const childTags = this.filterAffixTags(route.children, route.path)
        if (childTags.length >= 1) {
          tags = [...tags, ...childTags]
        }
      }
    })

    return tags
  }
  // 初始化展示默认标签页
  private initTags() {
    this.affixTags = this.filterAffixTags(this.routes)
    for (const tag of this.affixTags) {
      // Must have tag name
      if (tag.name) {
        this.$store.dispatch('tagsView/addVisitedView', tag)
      }
    }
  }
  // 添加标签页
  private addTags() {
    const { name, fullPath, meta } = this.$route
    // const hasRouter = this.visitedViews.findIndex((item) => item.fullPath === fullPath ) === -1
    // console.log('hasRouter', hasRouter)
    // if(hasRouter) {
    //   this.$router.push(`/redirect${fullPath}`)
    // }
    // this.$router.push(`/redirect${fullPath}`)
    if (name) {
      this.$store.dispatch('tagsView/addView', this.$route)
    }
    return false
  }

  private moveToCurrentTag() {
    const tags = this.$refs.tag as any[] // TODO: better typescript support for router-link
    this.$nextTick(() => {
      for (const tag of tags) {
        if ((tag.to as ITagView).path === this.$route.path) {
          ;(this.$refs.scrollPane as ScrollPane).moveToTarget(tag as any)
          // 当路由带参数不同的时候 去更新
          if ((tag.to as ITagView).fullPath !== this.$route.fullPath) {
            this.$store.dispatch('tagsView/updateVisitedView', this.$route)
          }
          break
        }
      }
    })
  }

  private refreshSelectedTag(view: ITagView) {
    this.$store.dispatch('tagsView/delCachedView', view).then(() => {
      const { fullPath } = view
      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath
        })
      })
    })
  }
  // 关闭当前路由页
  private closeSelectedTag(view: ITagView) {
    this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
      this.$nextTick(() => {
        // 关闭路由页面的时候需要卸载掉store
        const moduleId = view.meta.moduleId
        setTimeout(() => {
          if (this.$store.state[moduleId]) this.$store.unregisterModule(moduleId)
        }, 20)
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    })
  }
  // 关闭除了当前路由页的其他路由页
  private closeOthersTags() {
    this.$router.push(this.selectedTag)
    this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
      this.moveToCurrentTag()
    })
  }

  private closeAllTags(view: ITagView) {
    this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
      if (this.affixTags.some((tag) => tag.path === view.path)) {
        return
      }
      this.toLastView(visitedViews, view)
    })
  }

  private toLastView(visitedViews: ITagView[], view: ITagView) {
    const latestView: ITagView = visitedViews.slice(-1)[0]
    if (latestView) {
      this.$nextTick(() => {
        this.$router.push(latestView)
      })
      // this.$router.replace(latestView)
    } else {
      // Default redirect to the home page if there is no tags-view, adjust it if you want
      if (view.name === 'Dashboard') {
        // to reload home page
        this.$router.replace({ path: '/redirect' + view.fullPath })
      } else {
        this.$router.push('/')
      }
    }
  }

  private openMenu(tag: ITagView, e: MouseEvent) {
    const menuMinWidth = 105
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft
    } else {
      this.left = left
    }
    this.top = e.clientY
    this.visible = true
    this.selectedTag = tag
  }

  private closeMenu() {
    this.visible = false
  }
}
</script>

<style lang="scss">
@import 'src/styles/variables.scss';
// Reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #4d5467;
        color: #fff;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.tags-view-container {
  height: 32px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 24px;
      line-height: 24px;
      color: $colorTextRegular;
      background: #f5f5f7;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: $baseHover;
        color: $basic;
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
