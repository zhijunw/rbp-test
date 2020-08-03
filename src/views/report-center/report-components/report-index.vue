<template>
  <div class="report-box">
    <list-operation
      :btnConfigs="listBtns"
      :layoutList="layoutList"
      class="pdtb-12 list-warrper__operation"
      @filter="filter">
      <template v-slot:addBtn>
        <table-layout
          ref="tableLayout"
          :layoutList="layoutList"
          :tableHeaderFieldsConfig="tableHeaderFieldsConfig"
          class="right"
          @chooseView="chooseView"
          @updateViewChoose="updateViewChoose" />
      </template>
      <template v-slot:input>
        <div class="copy-view left">
          <span class="mgr-6">{{ $t('reportCommonWord.outputFields') }}</span>
          <div class="copy-view-box">
            <span class="fields-box">{{ chooseFieldsName }}</span>
            <span
              class="hover open-fields"
              @click="openFields">...</span>
          </div>
          <el-button
            plain
            @click="updateView">
            {{ $t('reportCommonWord.saveAsCurrentView') }}
          </el-button>
          <el-button
            plain
            @click="saveView">
            {{ $t('reportCommonWord.saveAsNewView') }}
          </el-button>
        </div>
      </template>
      <div slot="input" />
    </list-operation>
    <report-table
      class="report-table"
      :page="page"
      :tableHeader="tableHeader"
      :tableData="tableData"
      :totalColumns="totalColumns"
      @rowClick="rowClick"
      @changePage="changePage"
      @changePageSize="changePageSize" />

    <base-drawer
      :drawerObj="drawerObj"
      :formList="formList"
      :formData="formData"
      @reset="reset"
      @query="query" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'

import { listConfig } from './configs'
import listMixins from '@/mixins/list-mixins'
import { DrawerConfig, Dictionary, FormListConfig, PageObj, DialogObj } from '@/typings'
import { toawait, nest } from '@/utils'
import { channelSearchConfig, goodsSearchConfig } from '@/layout-components/vip-dialog/config'
import commonApiUrl from '@/api/common-api/index'

const CEll_TEMPLATE = {
  hrefFlag: 'DrillDownTemplate'
}
interface TableHeaderFieldsConfig {
  fields: any[]
  choose?: string[]
  viewId?: number
  moduleId: number
  isSortRules?: boolean
  noCommit?: boolean
}
interface ReportTableConfig {
  caption: string
  dataField: string
  id: string
  parent_id: string
  allowFiltering: boolean
  allowSorting: boolean
  cellTemplate?: string
  includeSizeFlag?: boolean
  sizePrefix?: string
  children?: ReportTableConfig[]
}

interface TotolColumn {
    columnKey: string
    total: number
}

@Component({
  name: 'report-index',
  components: {
    reportTable: () => import('./report-table.vue'),
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableLayout: () => import('@/layout-components/tableheader-layout/index.vue')
  }
})
export default class App extends Vue {
  listBtns = listConfig.btns
  formList: FormListConfig[] = []
  layoutList = listConfig.layoutList
  formData: Dictionary = {}
  tableHeader: ReportTableConfig[] = []
  totalColumns: TotolColumn[] = []
  tableData: any[] = []
  currentViewId: number = 0
  tempViewObj: Dictionary = {}
  tableHeaderFieldsConfig: TableHeaderFieldsConfig = {
    fields: [],
    choose: [],
    moduleId: 130001
  }
  page: PageObj = {
    total: 0,
    pageNo: 1,
    pageSize: 100,
    pageCount: 1
  }
  drawerObj: DrawerConfig = {
    isShowDrawer: false
  }
  fieldsDialog: DialogObj = {
    isShowDialog: false,
    title: '',
    appendToBody: true,
    width: '40%'
  }
  chooseFieldsName: string = ''
  sizeItemList: any[] = []

  // 注入模块Id
  @Inject('reportId') readonly reportId!: number
  @Watch('currentViewId')
  async onCurrentViewChange(val: number) {
    if (val) {
      const layoutRes = await this._get({ url: `/report/reportView/${val}` })
      if (layoutRes.code === 0) {
        const { reportViewColumnList, name, type } = layoutRes.data
        this.tempViewObj = Object.assign({}, this.tempViewObj, { type, reportViewColumnList })
        this.chooseFieldsName = reportViewColumnList.map((item) => item.columnTitle).join(',')
        this.$set(this.tableHeaderFieldsConfig, 'choose', reportViewColumnList.map((item) => item.columnKey))
        this.$set(this.tableHeaderFieldsConfig, 'name', name)
      }
    }
  }

  created() {
    this.getReportConfig()
  }
  async getReportConfig() {
    const res = await this._get({
      url: '/report',
      params: {
        reportId: this.reportId
      }
    })
    const { baseReport, condtionInformationList } = res.data
    const { systemViews, personalViews, defaultViewId, outputColumns } = baseReport

    // 获取视图列表
    this.getViewFields(outputColumns)

    // 获取筛选条件
    this.formatFormList(condtionInformationList)

    this.currentViewId = defaultViewId
    this.$set(this.layoutList[0], 'children', personalViews)
    this.$set(this.layoutList[1], 'children', systemViews)
    // 设置默认当前视图
    this.layoutList.forEach((item) => {
      item.children.forEach((children) => {
        children.default = children.id === defaultViewId
      })
    })
  }
  //   获取试图配置字段
  getViewFields(outputColumns) {
    //   试图字段做一下分类 kindName 相同的分到一类
    this.tableHeaderFieldsConfig.fields = outputColumns.reduce((k, m) => {
      // 如果有必须要有的字段 则默认添加到 choose
      if (m.requiredFlag) this.tableHeaderFieldsConfig.choose!.push(m.columnKey)
      const index = k.findIndex((item) => item.kindName === m.kindName)
      const obj = Object.assign(m, {
        value: m.columnKey,
        label: m.columnTitle,
        disabled: m.requiredFlag
      })
      if (index > -1) {
        k[index].children.push(obj)
      } else {
        k.push({ kindName: m.kindName, children: [obj] })
      }
      return k
    }, [])
  }
  //   对筛选条件进行格式化
  formatFormList(condtionInformationList) {
    // 设置筛选器的条件
    this.formList = condtionInformationList.map((item) => {
      const obj: FormListConfig = {
        label: item.columnTitle,
        value: item.key,
        setLength: 12,
        type: item.reportControl.name,
        options: item.reportControl.dataSource
      }
      const defaultValue = item.reportControl.defaultValu
      // 设置了默认值
      if (defaultValue) {
        //  如果是输入框 单选下拉 值是基本类型值 如果是多选 复选框 则是数组
        const formatDefaultValue = ['text', 'number', 'select', 'radio'].includes(item.reportControl.name)
          ? Number(defaultValue.join(','))
          : defaultValue
        this.$set(this.formData, item.key, formatDefaultValue)
      }

      if (item.reportControl.name === 'multSelect') {
        obj.type = 'select'
        obj.config = {
          multiple: true
        }
      }
      if (item.reportControl.name === 'channelHighSearch') {
        obj.type = 'highSearch'
        obj.value = 'channelIdList'
        obj.linkValue = 'channelFilterParam'
        obj.highSearchConfig = {
          dialogSearchConfig: channelSearchConfig,
          apiUrl: commonApiUrl.channelFuzzy
        }
      }
      if (item.reportControl.name === 'goodsHighSearch') {
        obj.type = 'highSearch'
        obj.value = 'goodsIdList'
        obj.linkValue = 'goodsFilterParam'
        obj.highSearchConfig = {
          dialogSearchConfig: goodsSearchConfig,
          apiUrl: commonApiUrl.goodsFuzzy
        }
      }

      if (item.reportControl.name === 'date') obj.type = 'datePick'
      if (item.reportControl.name === 'checkbox') obj.setLength = 24
      if (item.reportControl.name === 'datePick') obj.config = { type: 'daterange' }

      return obj
    })
  }

  filter() {
    this.drawerObj.isShowDrawer = true
  }
  reset() {
    this.formData = {}
  }
  changePage(page) {
    this.page.pageNo = page
    this.query()
  }
  changePageSize(size) {
    this.page.pageSize = size
    this.query()
  }
  chooseView(id) {
    this.currentViewId = id
  }
  openFields() {
    this.$set(this.tableHeaderFieldsConfig, 'noCommit', true);
    (this.$refs.tableLayout as any).addLayout()
  }
  updateViewChoose({ reportViewColumnList, viewName, saveAsView }) {
    // saveAsView 为 true 则代表系统视图  后端接受的 0是 个人视图 1是系统视图
    this.tempViewObj = Object.assign(this.tempViewObj, {
      name: viewName,
      reportViewColumnList,
      type: saveAsView ? 1 : this.tempViewObj.type
    })
    this.chooseFieldsName = reportViewColumnList.map((item) => item.columnTitle).join(',')
  }

  async updateView() {
    const postData = {
      moduleId: this.reportId,
      id: this.currentViewId,
      ...this.tempViewObj
    }
    const res = await this._post({ url: '/report/reportView/update', data: { data: postData }})
    if (res.code === 0) {
      this._message({ message: this.$t('reportCommonWord.editViewSuccess'), type: 'success' })
    }
  }
  async saveView() {
    const postData = {
      moduleId: this.reportId,
      ...this.tempViewObj
    }
    const res = await this._post({ url: '/report/reportView/create', data: { data: postData }})
    if (res.code === 0) {
      this._message({ message: this.$t('reportCommonWord.createdView'), type: 'success' })
    }
  }
  // 单击行项目 更具sizeId 去更新尺码数据
  rowClick(data) {
    this.addSizeHeader(data.ReSizeClassId)
  }
  async query() {
    if (!this.tempViewObj.reportViewColumnList || this.tempViewObj.reportViewColumnList.length === 0) {
      this._message({ message: '请先选择输出字段', type: 'warning' })
      return
    }
    const postData = {
      filter: this.formData,
      reportId: this.reportId,
      outputColumns: this.tempViewObj.reportViewColumnList,
      pageIndex: this.page.pageNo,
      pageSize: this.page.pageSize
    }
    const res = await this._post({ url: 'report/analysis', data: postData })
    if (res.code === 0) {
      const { columns, rows, totalColumns, sizeItemList } = res.data
      this.sizeItemList = sizeItemList
      const { data, pageCount, pageSize, total } = rows
      this.page = Object.assign({}, this.page, { pageCount, pageSize, total })
      this.tableData = data
      // this.tableData = data.map((item, index) => Object.assign(item, { index: index + 1 }))
      this.tableData.forEach((item, index) => {
        item.index = index + 1
        Object.keys(item).forEach((keys) => {
          if (item[keys] === 0) item[keys] = ''
        })
      })

      this.totalColumns = totalColumns
      await this.dealTableHeader(columns)

      // 找到第一条数据对应的尺码
      if (sizeItemList.length) {
        const firstData = this.tableData[0]

        this.addSizeHeader(firstData.ReSizeClassId)
      }
    }
  }
  // 给需要尺码字段的集合添加尺码头
  addSizeHeader(ReSizeClassId) {
    const sizeObj = this.sizeItemList.find((item) => item.sizeClassId === ReSizeClassId)
    if (!sizeObj) {
      return
    }
    this.tableHeader.forEach((item) => {
      if (item.includeSizeFlag) {
        item.children = Object.keys(sizeObj.reportSizeHorizontal).map((s) => {
          return {
            caption: sizeObj.reportSizeHorizontal[s],
            id: `${item.sizePrefix}${s.charAt(0).toUpperCase() + s.slice(1)}`,
            // 匹配tableData 里面的 key
            dataField: `${item.sizePrefix}${s.charAt(0).toUpperCase() + s.slice(1)}`,
            parent_id: item.dataField,
            allowFiltering: false,
            allowSorting: false
          }
        })
      }
    })
  }
  // 处理表头
  dealTableHeader(columns) {
    const tableHeader = columns
      .sort((a, b) => a.sort - b.sort)
      .map((item, index) => {
        const obj: any = {
          caption: item.columnTitle,
          dataField: item.columnKey,
          id: item.columnKey,
          includeSizeFlag: item.includeSizeFlag,
          parent_id: item.parentColumnKey,
          sizePrefix: item.sizePrefix,
          allowFiltering: !!item.selectFlag,
          allowSorting: !!item.sortFlag
        }
        if (item.hrefFlag) obj.cellTemplate = 'DrillDownTemplate'
        return obj
      })
    this.tableHeader = nest(tableHeader)
  }
}
</script>
<style lang="scss" scoped>
.report-box {
  background: #fff;
  padding:12px 16px;
  // margin: 8px 12px;
  min-height: calc(100vh - 90px);

  .list-warrper__operation {
    position: sticky;
    z-index: 1003;
    background: #fff;
    top:68px
  }

  .copy-view {
    font-size: 14px;
    float: left;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    &-box {
     border: 1px solid #d7d7d7;
    margin-right: 10px;
    height: 26px;
    line-height: 26px;
    display: flex;
    }
    .fields-box {
      width: 150px;
      padding: 0 6px;
      display: inline-block;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 12px;
    }
    .open-fields {
    display: inline-block;
    width: 30px;
    text-align: center;
    border-left: 1px solid #d7d7d7;
    }
  }
}

</style>
