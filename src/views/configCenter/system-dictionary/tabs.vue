<template>
  <div class="system-tabs">
    <div class="system-tabs-filter f14">
      <base-input
        :value="chooseFiels"
        :inputProps="{
          placeholder: 'form.placeholder.configPlaceholder',
          prefixIcon: 'el-icon-search'
        }"
        @enter="handleSearch" />
    </div>

    <base-table
      :colunmData="tableHeader"
      :tableData="tabsConfig"
      class="base-table"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: false,
        isShowOpera: false,
        border: false,
        height: '78vh',
        maxHeight: ''
      }"
      @viewDetail="viewDetail"
      @filterChange="filterChange">
      <template v-slot:tableCell="{ scope: { row, item } }">
        <span
          class="pdl-10"
          :class="{ active: v_activeTab === row.value }">
          {{ $t(row[item.value]) }}
        </span>
      </template>
    </base-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { tabs, filesOptions } from './configs'
import { Watch } from 'vue-property-decorator'
import vuexMixins from './configs/vuex-module'

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
  filesOptions: any[] = filesOptions
  tabsConfig: any[] = tabs
  activeTab: string = ''
  checkList: any[] = []
  tableHeader: any[] = [
    {
      label: '配置项',
      value: 'lang',
      type: 'input',
      en: 'Config Item',
      lang: 'systemDictionary.templateConfig.label'
    },
    {
      label: '所属档案',
      value: 'filesLang',
      filterKey: 'filesValue',
      sortable: true,
      filters: [
        {
          text: '货品档案',
          value: 'goods'
        },
        {
          text: '渠道档案',
          value: 'channel'
        },
        {
          text: '供应商档案',
          value: 'supplier'
        },
        {
          text: '模块配置',
          value: 'moduleConfig'
        }
      ],
      en: 'Files Name',
      lang: 'systemDictionary.templateConfig.filesName'
    }
  ]
  handleSearch(val) {
    this.tabsConfig = tabs.filter((item: any) => {
      return item.label.indexof(val) > -1
    })
  }
  viewDetail(row) {
    this.activeTab = row.value
    this.$store.commit(`${this.m_moduleId}/SET_ACTIVETAB`, row.value)
    this.$store.commit(`${this.m_moduleId}/SET_ACTIVE_TEMPLATE`, row.template)
  }

  filterChange({ filesValue }) {
    if (!filesValue.length) {
      this.tabsConfig = tabs
    } else {
      this.tabsConfig = tabs.filter((item) => filesValue.findIndex((k) => item.filesValue.includes(k)) > -1)
    }
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
    height:92% !important;
    overflow: auto;
  }
  .active {
    color: $basic;
    font-weight: bold;
  }

}
</style>
