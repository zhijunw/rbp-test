<template>
  <div class="audit-content">
    <tabs @switchTabs="switchTabs" />
    <!-- 通过 activeTemplate 去渲染不同组件 -->
    <div class="component-box">
      <activity-table :activeTab="activeTab" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Dictionary } from '@/typings'

@Component({
  name: 'router-100007',
  components: {
    tabs: () => import('./tabs.vue'),
    activityTable: () => import('./audit-list-table.vue')
  }
})
export default class App extends Vue {
    activeTab: Dictionary = {}
    switchTabs(tabs) {
      this.activeTab = tabs
    }
}
</script>
<style lang="scss" scoped>
@media (min-width: 1200px){
  .audit-content{
  height: 84vh;
  /deep/.base-list-table{
    flex: 1;
    height: 67vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1440px) {
  .audit-content{
  height: 90vh;
  /deep/.base-list-table{
    flex: 1;
    height: 73vh !important;
    }
  }
 }
.audit-content{
  display: flex;
  // width: calc(100vw - 188px);
  // height: 90vh;
  margin: 8px;
      padding: 12px 16px;
  background:rgba(255,255,255,1);
  box-shadow:0px 2px 8px 0px rgba(166,167,173,0.5);
  border-radius:4px;
}
.component-box{
  flex:1;
  padding: 12px;
  border: 1px solid #eee;
  // margin: 16px 16px 16px 0;
  min-width: 940px;
}
</style>
