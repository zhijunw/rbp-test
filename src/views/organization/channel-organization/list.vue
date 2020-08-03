<template>
  <div class="list-warrper">
    <!-- 操作列表 -->
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @add="m_add"
      @batch-audit="m_batchAudit"
      @batch-delete="m_batchDelete"
      @batch-import="m_batchImport"
      @filter="m_filter"
      @enter="m_inputEnter">
      <template v-slot:addBtn2>
        <table-layout
          ref="tableLayout"
          class="right"
          @updateModuleView="m_query" />
      </template>
    </list-operation>
    <!-- 表格列表 -->
    <list-table
      ref="listTable"
      :page="m_page"
      :colunmData="m_tableHeader"
      :tableData="m_tableData"
      @select="m_select"
      @changePage="m_changePage"
      @changePageSize="m_changePageSize"
      @viewDetail="m_viewDetail"
      @deleteItem="m_deleteItem" />
    <!-- 筛选器侧滑框 -->
    <base-drawer
      :drawerObj="m_drawerObj"
      :formList="formList"
      :formData="formData"
      @query="m_query"
      @reset="m_reset" />

    <!-- 导入弹窗 -->
    <base-dialog :dialogObj="importDialog" />
    <!-- 综合查询侧滑框 -->
    <integratedQuery :dictionary="m_modelRelationList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { listConfig, highSearchDialog } from './configs'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Dictionary, DialogObj, FormListConfig } from '@/typings'
import { Provide, Watch } from 'vue-property-decorator'
import apiUrl from '@/api/config-center/channelOrganization'
import commonApiUrl from '@/api/common-api'
import { transformFields } from '@/utils'
@Component({
  name: 'channelOrganization-list',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    integratedQuery: () => import('@/components/integrated-query/index.vue'),
    tableLayout: () => import('@/layout-components/tableheader-layout/globalIndex.vue')
  }
})
export default class list extends mixins(listMixins, vuexMixins) {
  listConfig = listConfig
  listApi: string = apiUrl.getChannelList
  deleteItemApi: string = apiUrl.delChannel
  importDialog: DialogObj = {
    isShowDialog: false,
    title: '从Excel导入',
    width: '25%'
  }
  formList = listConfig.formList
  formData: Dictionary = {}
  created() {
    // TODO: id后续改成动态的
    this.m_query()
    this.getCustomerFields()
  }

  async getCustomerFields() {
    const res = await this._post({
      url: `${commonApiUrl.getCusotmerFields}/${this.m_moduleId}`
    })
    const customerFieldsArr: FormListConfig[] = res.data.map((item) => {
      const obj: Dictionary = {
        label: item.label,
        value: item.columnName,
        type: item.typeName,
        setLength: 24,
        fieldsType: 'customerField'
      }
      if (item.options) obj.options = transformFields(item.options, { label: 'value', value: 'id' })
      return obj
    })
    // 自定义字段和高级搜索的字段 进行合并
    // console.log('customerFieldsArr',customerFieldsArr)
    highSearchDialog.formList = [...highSearchDialog.formList, ...customerFieldsArr]
  }
  // TODO: 导入需要后续完成
  m_batchImport() {
    this.importDialog.isShowDialog = true
  }
}
</script>
<style lang="scss" scoped>
// .list-warrper_select {
//   width: 7%;
//   display: inline-block;
//   margin-left: 10px;
// }
</style>
