<template>
  <div class="system-content">
    <tabs />
    <!-- 通过 activeTemplate 去渲染不同组件 -->
    <div class="component-box">
      <keep-alive>
        <table-template v-if="v_activeTemplate === 'tableTemplate'" />
        <size-template v-if="v_activeTemplate === 'sizeTemplate'" />
        <checkbox-template v-if="v_activeTemplate === 'checkTemplate'" />
        <mult-table-template v-if="v_activeTemplate === 'multTableTemplate'" />
        <cascader-template v-if="v_activeTemplate === 'cascaderTemplate'" />
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import registVuexModuleMixins from './configs/registVuex-module'
import vuexMixins from './configs/vuex-module'

@Component({
  name: 'router-100001',
  components: {
    tabs: () => import('./tabs.vue'),
    tableTemplate: () => import('./template/table-template.vue'),
    cascaderTemplate: () => import('./template/cascader-template.vue'),
    sizeTemplate: () => import('./template/size-template.vue'),
    checkboxTemplate: () => import('./template/checkbox-template.vue'),
    multTableTemplate: () => import('./template/mult-table-template.vue')
  }
})
export default class App extends mixins(vuexMixins, registVuexModuleMixins) {

}
</script>
<style lang="scss" scoped>
@media (min-width: 1200px){
  .system-content{
  // min-height: calc(100% - 270px);
  height: 84vh;
  // min-height: 74vh;
  // overflow: auto;
  /deep/.base-list-table{
    flex: 1;
    // max-height: 70vh;
    height: 67vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1440px) {
  .system-content{
  // min-height: calc(100vh - 250px);
  height: 90vh;
  // min-height: 77vh;
  // overflow: auto;

  /deep/.base-list-table{
    flex: 1;
    height: 73vh !important;
    }
  }
 }
.system-content{
  display: flex;
  // width: calc(100vw - 188px);
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
  // max-width: 940px;
  min-width: 800px;
}
</style>
