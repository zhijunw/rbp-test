<template>
  <section class="app-main">
    <!-- <transition
      name="fade-transform"
      mode="out-in"
      appear
    > -->
    <!-- <keep-alive
      :include="cachedViews"
      :max="maxVue">
      <router-view
        :key="key" />
    </keep-alive> -->
    <keep-router-view-alive :include="cachedViews">
      <transition
        :name="transitionName"
        mode="out-in">
        <router-view />
      </transition>
    </keep-router-view-alive>
    <!-- </transition> -->
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import KeepRouterViewAlive from './keep-alive.js'
@Component({
  name: 'AppMain',
  components: {
    rbpIframe: () => import('@/views/iframe/index.vue'),
    KeepRouterViewAlive
  }
})
export default class extends Vue {
  private maxVue: number = 15
  transitionName: string = 'el-fade-in-linear'
  get cachedViews() {
    return this.$store.state.tagsView.cachedViews
  }

  get key() {
    // return `router-${this.$route.meta.moduleId}`
    return this.$route.fullPath
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 80px);
  // min-width: 1280px;
  // width: 100%;
  position: relative;
  // overflow: hidden;
  overflow: visible;
  // background: $moduleBg
  // background: #fff;
}

// .fixed-header+.app-main {
//   padding-top: 50px;
//   height: 100vh;
//   overflow: auto;
// }

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    min-height: calc(100vh - 80px);
  }

  .fixed-header + .app-main {
    padding-top: 68px;
  }
}
</style>
