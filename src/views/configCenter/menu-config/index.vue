<template>
  <div class="system-content">
    <menu-component
      ref="menu"
      class="component-box"
      @chooseModule="chooseModule"
      @refresh="refreshModule" />
    <!-- 通过 activeTemplate 去渲染不同组件 -->
    <module-component
      ref="module"
      :currentModuleData="currentModuleData"
      @refresh="refresh" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Dictionary } from '@/typings'

@Component({
  name: 'router-100005',
  components: {
    menuComponent: () => import('./menu.vue'),
    moduleComponent: () => import('./module.vue')
  }
})
export default class App extends Vue {
  currentModuleData: Dictionary = {}
  chooseModule(row) {
    this.currentModuleData = row
  }
  refresh() {
    ;(this.$refs.menu as any).getList()
  }
  refreshModule() {
    ;(this.$refs.module as any).getModuleList()
  }
}
</script>
<style lang="scss" scoped>
// @media (min-width: 1200px) {
//   .system-content {
//     // min-height: calc(100% - 270px);
//     height: calc(100vh - 66px );
//     // min-height: 74vh;
//     // overflow: auto;
//     /deep/.base-list-table {
//       flex: 1;
//       // max-height: 70vh;
//       height: 67vh !important;
//     }
//   }
// }
// /* 大屏幕 ：大于等于1200px*/
// @media (min-width: 1440px) {
//   .system-content {
//     // min-height: calc(100vh - 250px);
//     height: 90vh;
//     // min-height: 77vh;
//     // overflow: auto;

//     /deep/.base-list-table {
//       flex: 1;
//       height: 73vh !important;
//     }
//   }
// }
.system-content {
  display: flex;
  // width: calc(100vw - 188px);
  height: calc(100vh - 68px );
  padding: 16px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 8px 0px rgba(166, 167, 173, 0.5);
  border-radius: 4px;
}
.component-box {
  flex: 1;
  min-width: 800px;
}
</style>
