<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @add="m_add"
      @batch-enable="m_batchEnable"
      @batch-audit="m_batchAudit"
      @batch-delete="m_batchDelete"
      @batch-disable="m_batchDisable"
      @filter="filter"
      @showTabelheaderConfig="showTabelheaderConfig"
      @enter="m_inputEnter" />

    <list-table
      ref="listTable"
      :page="m_page"
      :colunmData="listConfig.tableHeader"
      :tableData="m_tableData"
      :tableConfig="{ isShowOpera: true }"
      @select="m_select"
      @changePage="m_changePage"
      @changePageSize="m_changePageSize"
      @viewDetail="m_viewDetail"
      @deleteItem="m_deleteItem" />

    <base-drawer
      :drawerObj="m_drawerObj"
      :formList="formList"
      :formData="formData"
      @reset="m_reset"
      @query="m_query" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { listConfig } from './configs'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

import { Dictionary, DialogObj } from '@/typings'
import apiUrl from '@/api/organization-center/logistics.ts'
@Component({
  name: 'supplier-list',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue')
  }
})
export default class list extends mixins(listMixins, vuexMixins) {
  listConfig = listConfig
  tableData: any[] = []
  // 报表的api
  listApi: string = apiUrl.list

  deleteItemApi = apiUrl.deletes
  formList = listConfig.formList
  tableFieldsDialog: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '50%'
  }
  formData: Dictionary = {}

  created() {
    // 获取报表数据
    this.m_query()
  }

  showTabelheaderConfig() {
    this.tableFieldsDialog.isShowDialog = true
    this.tableFieldsDialog.title = this.$t('supplie.list.dialogHeader')
  }

  // 打开搜索弹窗 并且 给高级搜索 里面的 formlist tpye = select option 添加数据
  async filter() {
    this.m_filter()
  }
}
</script>
<style lang="scss" scoped>

</style>
