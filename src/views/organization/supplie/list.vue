<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @add="m_add"
      @batch-audit="m_batchAudit"
      @batch-delete="m_batchDelete"
      @filter="filter"

      @enter="m_inputEnter">
      <template v-slot:addBtn2>
        <table-layout
          ref="tableLayout"
          class="right"
          @updateModuleView="m_query" />
      </template>
    </list-operation>

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

    <base-drawer
      :drawerObj="m_drawerObj"
      :formList="formList"
      :formData="formData"
      @reset="m_reset"
      @query="m_query" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { listConfig, highSearchDialog } from './configs'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Dictionary, DialogObj, Response, FormListConfig } from '@/typings'
import { Provide, Watch } from 'vue-property-decorator'
import apiUrl from '@/api/organization-center/supplie'
import commonApiUrl from '@/api/common-api'
import { transformFields } from '@/utils'

@Component({
  name: 'supplier-list',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue'),
    tableLayout: () => import('@/layout-components/tableheader-layout/globalIndex.vue')
  }
})
export default class list extends mixins(listMixins, vuexMixins) {
  listConfig = listConfig
  tableData: any[] = []
  listApi: string = apiUrl.list
  deleteItemApi: string = apiUrl.deletes
  formList = listConfig.formList

  formData: Dictionary = {}

  created() {
    this.m_query()
  }

  // 打开搜索弹窗 并且 给高级搜索 里面的 formlist tpye = select option 添加数据
  async filter() {
    this.m_filter()
  }
}
</script>
<style lang="scss" scoped>

</style>
