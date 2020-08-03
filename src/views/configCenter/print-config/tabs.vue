<template>
  <div class="system-tabs">
    <div class="system-tabs-filter f14">
      <svg-icon
        name="field_table"
        className="w20 h20 mgr-6" />
      {{ $t('commonWord.billType') }}
      <base-input
        :value.sync="chooseFiels"
        class="mgt-12"
        :inputProps="{
          placeholder: 'form.placeholder.configPlaceholder',
          prefixIcon: 'el-icon-search'
        }"
        @enter="handleSearch" />
    </div>

    <!-- <div class="system-tabs-box"> -->
    <base-table
      ref="baseTable"
      :colunmData="tableHeader"
      :tableData="tabsConfig"
      class="base-table"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: false,
        isShowOpera: false,
        border: false,
        height: '78vh',
        maxHeight: '',
        showHeader:false
      }"
      @viewDetail="viewDetail">
      <template v-slot:tableCell="{ scope: { row, item } }">
        <span
          class="pdl-10"
          :class="{ active: v_activeTab === row.value }">
          {{ (row[item.value]) }}
        </span>
      </template>
    </base-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
// import { tabs } from './configs'
import { Watch } from 'vue-property-decorator'
import vuexMixins from './configs/vuex-module'
import apiUrl from '@/api/config-center/print-config'
@Component({
  name: 'system-tabs',
  components: {
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  chooseFiels: string = ''
  tabsConfig: any[] = []
  tableHeader: any[] = [
    {
      value: 'name'
    }
  ]
  created() {
    this.$nextTick(() => {
      this.getModuleList()
    })
  }
  async getModuleList() {
    const res = await this._post({ url: apiUrl.moduleList })
    if (res.code === 0) {
      this.tabsConfig = res.data
      // this.SET_ACTIVETAB(this.tabsConfig[0]);
      this.$store.commit(`${this.m_moduleId}/SET_ACTIVETAB`, this.tabsConfig[0]);
      (this.$refs.baseTable as any).setHighLightRow(this.tabsConfig[0])
    }
  }
  handleSearch(val) {
    // this.tabsConfig = tabs.filter((item: any) => {
    //   return item.name.indexOf(val) > -1
    // })
  }
  viewDetail(row) {
    this.$store.commit(`${this.m_moduleId}/SET_ACTIVETAB`, row)
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.base-table {
  /deep/.cell {
    padding: 0 !important;
  }
}
.system-tabs {
  min-width: 250px;
  border: 1px solid #eee;
  border-radius: 2px;
  margin: 16px 12px 16px 16px;
  border: 1px solid #eee;
  &-filter {
    padding: 10px;

  }
  /deep/.base-table{
    // height:80vh !important;
    height:92% !important;
    overflow: auto;
  }
  .active {
    color: $basic;
    font-weight: bold;
  }

}
</style>
