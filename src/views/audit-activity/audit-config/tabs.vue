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
          placeholder: 'form.placeholder.default',
          prefixIcon: 'el-icon-search'
        }"
        @enter="handleSearch" />
    </div>

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
          :class="{ active: activeTabs === row.id }">
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
import apiUrl from '@/api/audit-activity/audit-config'
@Component({
  name: 'audit-tabs',
  components: {
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue')
  }
})
export default class App extends Vue {
  chooseFiels: string = ''
  tabsConfig: any[] = []
  activeTabs: string = ''
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
    const res = await this._post({ url: apiUrl.moduleList, data: {
      data: this.chooseFiels
    }})
    if (res.code === 0) {
      this.tabsConfig = res.data
      this.$emit('switchTabs', this.tabsConfig[0])
      this.activeTabs = this.tabsConfig[0].id;
      (this.$refs.baseTable as any).setHighLightRow(this.tabsConfig[0])
    }
  }
  handleSearch() {
    this.getModuleList()
  }
  viewDetail(row) {
    // this.SET_ACTIVETAB(row)
    this.activeTabs = row.id
    this.$emit('switchTabs', row)
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
  max-width: 250px;
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
