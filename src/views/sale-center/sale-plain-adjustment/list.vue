<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @add="m_add"
      @batch-audit="m_batchAudit"
      @batch-delete="m_batchDelete"
      @filter="filter"
      @recordLog="recordLog"
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
      :tableLoading="m_tableLoading"
      :totalData="m_totalData"
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

    <record-dialog
      ref="recordLog"
      :recordLogConfig="recordLogConfig" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Dictionary, DialogObj, Response, FormListConfig, ListBtnApiConfig } from '@/typings'
import { Provide, Watch } from 'vue-property-decorator'
import apiUrl from '@/api/sale-center/sale-plain-adjustment'
import commonApiUrl from '@/api/common-api'
import { transformFields } from '@/utils'
import { layoutConfigs, listConfig, detailConfig, recordLogObj } from './configs/index'
import { Tools } from '@/utils/tools'
@Component({
  name: 'salePlainAdjustment-list',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue'),
    recordDialog: () => import('@/layout-components/record-log/index.vue'),
    tableLayout: () => import('@/layout-components/tableheader-layout/globalIndex.vue')
  }
})
export default class list extends mixins(listMixins, vuexMixins) {
  listConfig = listConfig
  tableData: any[] = []
  listApi: string = apiUrl.list
  deleteItemApi: string = apiUrl.deletes
  recordLogConfig = recordLogObj
  formList = listConfig.formList

  formData: Dictionary = {}

  async created() {
    await this.m_query()
    this.getConfig()
  }
  async getConfig() {
    const res:Response<any[]> = await this._get({ url: apiUrl.getSelect, params: {
      moduleId: this.m_moduleId
    }})
    if (res.code === 0) {
      const data = res.data
      const salePlainHeaderForm = detailConfig.formList
      const listFormList = listConfig.formList

      const actions = new Map<any, any>([

        [['businessTypeIds', 'logisticsCompanyIds', 'priceTypeIds'], (val, keys) => {
          Tools.setValueAndName(val)
          Tools.setOptions(val, keys, listFormList)
          Tools.setOptions(val, keys, salePlainHeaderForm)
          // Tools.setOptions(val, keys, freightFrom)
        }],

        ['default', () => {}]
      ])

      for (const k in res.data) {
        actions.forEach((value, keys) => {
          const action: any = keys.includes(k) ? value : actions.get('default')
          action.call(this, res.data[k] || [], k)
        })
      }
    }
  }

  // 操作记录
  recordLog() {
    (this.$refs.recordLog as any).open({ args: { moduleId: this.m_moduleId }})
  }
  // 打开搜索弹窗 并且 给高级搜索 里面的 formlist tpye = select option 添加数据
  async filter() {
    this.m_filter()
  }
  async m_batchAudit(config: ListBtnApiConfig) {
    /**
     * TODO:
     * 这一部分相同逻辑的代码可抽离 可优化
     */
    if (this.infoFun()) {
      const res = await this._put({
        url: config.apiUrl!,
        data: { data: {
          ids: this.m_selectData
        }}
      })
      if (res.code === 0) {
        if (!res.data.failList || !res.data.failList.length) {
          this.m_dealSuccessAction(config.name!)
        } else {
          this.m_error(res.data, config.name!)
        }
      }
    }
  }
  async m_batchDelete(config: ListBtnApiConfig) {
    /**
       * TODO:
       * 这一部分相同逻辑的代码可抽离 可优化
       */
    if (this.infoFun()) {
      const res = await this._post({
        url: config.apiUrl!,
        data: {
          data: {
            ids: this.m_selectData
          }}
      })
      if (res.code === 0) this.m_dealSuccessAction(config.name!)
    }
  }
  // 删除
  m_deleteItem(row: any) {
    this._confirm({ content: this.$t('commonWord.sureDelete') })
      .then(async() => {
        const res = await this._post({
          url: this.deleteItemApi,
          data: { data: {
            ids: [row.id] }
          }
        })
        if (res.code === 0) this.m_dealSuccessAction('layout.btns.delete')
      })
      .catch(() => {
        return false
      })
  }
}
</script>
<style lang="scss" scoped>

</style>
