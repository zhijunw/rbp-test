<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @add="m_add"
      @batch-audit="m_batchAudit"
      @batch-import="m_batchImport"
      @filter="filter"
      @showTabelheaderConfig="showTabelheaderConfig"
      @enter="m_inputEnter">
      <template v-slot:addBtn2>
        <table-layout
          ref="tableLayout"
          :langFormat="'goodsFiels.list.tableHeader.#'"
          class="right"
          @updateModuleView="m_query" />
      </template>
    </list-operation>

    <list-table
      ref="listTable"
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
      @reset="m_reset"
      @query="m_query" />

    <tableheaderConfig
      :dialogObj="tableFieldsDialog"
      :config="tableFieldsConfig" />
    <base-upload
      ref="upload"
      :action="uploadAction"
      :uploadProps="uploadProps"
      @downLoadExcel="m_downLoadExcel"
      @confirm="m_query">
      <template v-slot:extra>
        <div class="extra">
          <el-radio-group
            v-model="importType"
            @change="importTypeChange">
            <el-radio label="default">
              新增
            </el-radio>
            <el-radio label="partUpdate">
              更新
            </el-radio>
          </el-radio-group>
        </div>
      </template>
    </base-upload>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { listConfig, globalConfigs } from './configs'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from './configs/vuex-module'
import { Dictionary, DialogObj, Response, FormListConfig, UploadConfig } from '@/typings'
import { Provide, Watch } from 'vue-property-decorator'
import apiUrl from '@/api/content-center/goods-fiels'
import commonApiUrl from '@/api/common-api'
import baseUrl from '@/api/baseUrl'
import { transformFields } from '@/utils'
import { goodsFormList } from '@/layout-components/vip-dialog/config'

@Component({
  name: 'files-list',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue'),
    tableLayout: () => import('@/layout-components/tableheader-layout/globalIndex.vue'),
    baseUpload: () => import('@/components/base-upload-file/index.vue')
  }
})
export default class list extends mixins(listMixins, vuexMixins) {
  listConfig = listConfig
  tableData: any[] = []
  listApi: string = apiUrl.getGoodsFielsList
  deleteItemApi: string = apiUrl.deleteGoods
  formList = listConfig.formList
  tableFieldsDialog: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '50%'
  }
  tableFieldsConfig = listConfig.tableFieldsConfig
  // TODO: 这里 可以空对象 或者根据 formList 填充 key
  formData: Dictionary = {}
  uploadAction: string = baseUrl + commonApiUrl.uploadExcel
  importType:string = 'default'
  uploadProps: UploadConfig = {
    autoUpload: true,
    data: {
      moduleId: globalConfigs.realModuleId,
      type: this.importType // update
    }
  }

  @Provide('ModuleId') reportId = globalConfigs.realModuleId

  created() {
    this.m_query()
    this.getCustomerFields()
  }
  showTabelheaderConfig() {
    this.tableFieldsDialog.isShowDialog = true
    this.tableFieldsDialog.title = this.$t('datasetPermission.list.dialogHeader')
  }
  importTypeChange(e) {
    const data:any = this.uploadProps.data
    data.type = e
    this.uploadProps.data = data
  }
  // 打开搜索弹窗 并且 给高级搜索 里面的 formlist tpye = select option 添加数据
  async filter() {
    this.m_filter()
  }

  // 这里是获取筛选条件的自定义字段
  async getCustomerFields() {
    const res = await this._post({
      url: `${commonApiUrl.getCusotmerFields}/${globalConfigs.realModuleId}`
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
    // 和高级搜索的字段 进行合并
    listConfig.formList[0].highSearchConfig!.dialogSearchConfig.formList = [...goodsFormList, ...customerFieldsArr]
  }
}
</script>
<style lang="scss" scoped>
.extra {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 15px;
}
</style>
