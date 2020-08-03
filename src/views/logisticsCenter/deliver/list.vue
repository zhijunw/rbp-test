<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @deliveryByorder="delivery('deliveryByorder')"
      @directDelivery="delivery('directDelivery')"
      @inputSelectChange="inputSelectChange"
      @batch-audit="m_batchAudit"
      @batch-delete="m_batchDelete"
      @batch-import="m_batchImport"
      @batch-export="m_batchExport"
      @filter="m_filter"
      @recordLog="recordLog"
      @enter="m_inputEnter">
      <template v-slot:addBtn2>
        <table-layout
          ref="tableLayout"
          :langFormat="'deliver.list.tableHeader.#'"
          class="right"
          @updateModuleView="m_query" />
      </template>
    </list-operation>

    <list-table
      ref="listTable"
      :page="m_page"
      :colunmData="listConfig.tableHeader"
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

    <base-upload
      ref="upload"
      :action="uploadAction"
      :uploadProps="uploadProps"
      @downLoadExcel="m_downLoadExcel"
      @confirm="m_query" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import listMixins from '@/mixins/list-mixins'
import { Dictionary, DialogObj, Response, FormListConfig, UploadConfig, ListBtnApiConfig } from '@/typings'
import { Provide, Watch } from 'vue-property-decorator'
import apiUrl from '@/api/logisticsCenter/deliver'
import commonApiUrl from '@/api/common-api'
import baseUrl from '@/api/baseUrl'
import {
  layoutConfigs,
  listConfig,
  detailConfig,
  recordLogObj,
  globalConfigs,
  deliveryFormList,
  deliveryAutoFromList
} from './configs/index'
import { Tools } from '@/utils/tools'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

  @Component({
    name: 'salePlain-list',
    components: {
      listOperation: () => import('@/layout-components/list-operation/index.vue'),
      listTable: () => import('@/layout-components/list-table/index.vue'),
      baseDrawer: () => import('@/components/base-drawer/index.vue'),
      tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue'),
      baseUpload: () => import('@/components/base-upload-file/index.vue'),
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
    uploadAction: string = baseUrl + commonApiUrl.uploadExcel
    baseUploadDialog: boolean = false
    globalConfigs: Dictionary = globalConfigs
    uploadProps: UploadConfig = {
      autoUpload: true,
      data: {
        moduleId: globalConfigs.realModuleId,
        type: 'batchVertical'
      }
    }
    formData: Dictionary = {}
    layoutList = listConfig.layoutList
    @Provide('ModuleId') reportId = globalConfigs.realModuleId

    /** 单据类型 keywordType (integer, optional): 关键字类型, 0单号, 1手工单号, 2计划单号 , 进来初始化 0 */
    inputSelectChange(e) {
      this.formData.keywordType = e
    }

    @Watch('formData.keywordType', { immediate: true })
    onKeywordTypeChange(val) {
      if (val === undefined || val.length === 0) {
        this.$set(this.formData, 'keywordType', 0)
      }
    }

    /** 发货操作 true 按单  false 直接*/
    delivery(type) {
      this.$store.commit(`${this.m_moduleName}/SET_DELIVERTYPE`, type)
      this.m_add()
    }

    /** 操作记录*/
    recordLog() {
      (this.$refs.recordLog as any).open({ args: { moduleId: globalConfigs.realModuleId }})
    }

    /** 批量审核*/
    async m_batchAudit(config: ListBtnApiConfig) {
      /**
       * TODO:
       * 这一部分相同逻辑的代码可抽离 可优化
       */
      if (this.infoFun()) {
        const res = await this._put({
          url: config.apiUrl!,
          data: {
            data: {
              ids: this.m_selectData, moduleId: globalConfigs.realModuleId
            }
          }
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

    /** 批量删除*/
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
              ids: this.m_selectData, moduleId: globalConfigs.realModuleId
            }
          }
        })
        if (res.code === 0) this.m_dealSuccessAction(config.name!)
      }
    }

    /** 单个删除*/
    m_deleteItem(row: any) {
      this._confirm({ content: this.$t('commonWord.sureDelete') })
        .then(async() => {
          const res = await this._post({
            url: this.deleteItemApi,
            data: {
              data: {
                ids: [row.id], moduleId: globalConfigs.realModuleId
              }
            }
          })
          if (res.code === 0) this.m_dealSuccessAction('layout.btns.delete')
        })
        .catch(() => {
          return false
        })
    }

    /** 筛选器默认数据{价格类型/处理状态}*/
    async getConfig() {
      const res: Response<any[]> = await this._get({
        url: apiUrl.getSelect, params: {
          moduleId: globalConfigs.realModuleId
        }
      })
      if (res.code === 0) {
        const data = res.data
        // const salePlainHeaderForm = detailConfig.formList
        // const freightFrom = detailConfig.freight
        // const deliveryFormList = de deliveryFormList, deliveryAutoFromList
        const listFormList = listConfig.formList

        const actions = new Map<any, any>([

          [['priceTypeIds', 'businessTypeIds'], (val, keys) => {
            Tools.setValueAndName(val)
            Tools.setOptions(val, keys, listFormList)
            Tools.setOptions(val, keys, deliveryFormList)
            Tools.setOptions(val, keys, deliveryAutoFromList)
          }],

          ['default', () => {
          }]
        ])
        for (const k in res.data) {
          actions.forEach((value, keys) => {
            const action: any = keys.includes(k) ? value : actions.get('default')
            action.call(this, res.data[k] || [], k)
          })
        }
      }
    }

    // 入口
    async created() {
      this.$set(this.formData, 'status', ['0', '1', '2'])
      await this.m_query()
      this.getConfig()
    }
}
</script>
<style lang="scss" scoped>
</style>
