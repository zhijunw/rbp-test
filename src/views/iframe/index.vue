<template>
  <div class="iframe">
    <iframe
      width="100%"
      height="100%"
      :src="src"
      frameborder="0" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component({
  name: 'rbp-iframe'
})

export default class iframe extends Vue {
  @Watch('$route')
  routerChange({ to, from, next }) {
    console.log('querysrc', this.$route.params.id, 'iframe src', this.src)
    // const src = this.$route.params.id
    // if (src !== this.src) this.src = src
    if (this.$route.params.id) {
      this.src = this.$route.params.id
    }
    // console.log('iframe route', route, 'querysrc', this.$route.params.id, 'iframe src', this.src)
    // // const src = this.$route.params.id
    // // if (src !== this.src) this.src = src
    // if (this.$route.params.id) this.src = this.$route.params.id
  }

  src: string = ''

  get href() {
    // console.log('query', this.$route)
    return this.$route.params.id
    // return 'http://www.baidu.com'
  }

  activated() {
    // console.log('iframe激活')
    // // this.$route.meta.title = this.$route.query.title
    // console.log('querysrc', this.$route.params.id, 'iframe src', this.src)
    // // const src = this.$route.params.id
    // // if (src !== this.src) this.src = src
    // if (this.$route.params.id) {
    //   this.src = this.$route.params.id
    //   console.log('query', 'querysrc', this.$route.params.id, 'iframe src', this.src)
    // }
  }
}
</script>

<style lang='scss' scoped>
  .iframe {
    width: 100%;
    height: 100%;
  }
</style>

<style lang="scss">
  // .hasTagsView .app-main {
  //     height: 100vh;
  // }
</style>
