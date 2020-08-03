<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @add="m_add"
      @batch-enable="m_batchEnable"
      @batch-disable="m_batchDisable"
      @batch-delete="m_batchDelete"
      @filter="m_filter"
      @enter="m_inputEnter"
      @showTabelheaderConfig="showTabelheaderConfig" />

    <list-table
      ref="listTable"
      :errorIds="m_errorIds"
      :page="m_page"
      :colunmData="listConfig.tableHeader"
      :tableData="m_tableData"
      @select="m_select"
      @changePage="m_changePage"
      @changePageSize="m_changePageSize"
      @viewDetail="m_viewDetail"
      @deleteItem="m_deleteItem" />

    <base-drawer
      :drawerObj="m_drawerObj"
      :formList="formList"
      :formData="formData"
      @query="m_query"
      @reset="m_reset" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { listConfig } from './configs'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from './configs/vuex-module'
import { Dictionary, DialogObj } from '@/typings'
import apiUrl from '@/api/permission/usersPermission'

@Component({
  name: 'dataset-list',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue')
  }
})
export default class list extends mixins(listMixins, vuexMixins) {
  listConfig = listConfig
  listApi: string = apiUrl.getUsersList
  deleteItemApi: string = apiUrl.deleteUsers
  formList = listConfig.formList
  tableFieldsDialog: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '50%'
  }
  // TODO: 这里 可以空对象 或者根据 formList 填充 key
  formData: Dictionary = {
    // code: ''
  }

  created() {
    this.m_query()
  }
  showTabelheaderConfig() {
    this.tableFieldsDialog.isShowDialog = true
    this.tableFieldsDialog.title = this.$t('datasetPermission.list.dialogHeader')
  }
}
</script>
<style lang="scss" scoped>

</style>
