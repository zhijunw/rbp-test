<template>
  <div class="system-content">
    <tabs />
    <!-- 通过 activeTemplate 去渲染不同组件 -->
    <div class="component-box">
      <print-template
        :key="v_activeTab.id"
        :activeTab="v_activeTab.id" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import registVuexModuleMixins from './configs/registVuex-module'
import vuexMixins from './configs/vuex-module'

@Component({
  name: 'router-100006',
  components: {
    tabs: () => import('./tabs.vue'),
    printTemplate: () => import('./template/print-template.vue')
  }
})
export default class App extends mixins(vuexMixins, registVuexModuleMixins) {

}
</script>
<style lang="scss" scoped>
@media (min-width: 1200px){
  .system-content{
  height: 84vh;
  /deep/.base-list-table{
    flex: 1;
    height: 67vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1440px) {
  .system-content{
  height: 90vh;
  /deep/.base-list-table{
    flex: 1;
    height: 73vh !important;
    }
  }
 }
.system-content{
  display: flex;
  width: calc(100vw - 188px);
  // height: 90vh;
  margin: 8px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 8px 0px rgba(166,167,173,0.5);
  border-radius:4px;
}
.component-box{
  flex:1;
  padding: 12px;
  border: 1px solid #eee;
  margin: 16px 16px 16px 0;
  max-width: 940px;
}
</style>
