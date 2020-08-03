<template>
  <div class="table-template">
    <div class="search-box">
      <base-input
        :value.sync="searchText"
        class="mgr-12"
        :inputProps="{
          placeholder: 'form.placeholder.default',
          prefixIcon: 'el-icon-search'
        }"
        @enter="handleSearch" />
      <el-button
        type="primary"
        plain
        @click="filter">
        {{ $t('layout.btns.filters') }}
      </el-button>
    </div>
    <list-table
      ref="listTable"
      :page="page"
      class="mgt-12"
      :colunmData="tableHeader"
      :tableConfig="{
        isMultiSelect:false
      }"
      :tableData="tableData"
      @changePage="changePage"
      @changePageSize="changePageSize"
      @viewDetail="viewDetail">
      <template v-slot="{scope}">
        <el-button
          id="btn_t_blue"
          type="text"
          size="mini"
          @click="viewDetail(scope)">
          {{ $t('layout.btns.checkDetail') }}
          <!-- {{ scope }} -->
        </el-button>
        <el-button
          id="btn_t_gray"
          type="text"
          size="mini"
          @click="approval(scope)">
          {{ $t('layout.btns.approval') }}
        </el-button>
      </template>
    </list-table>

    <base-drawer
      :drawerObj="drawerObj"
      :formList="formList"
      :formData="formData"
      @reset="reset"
      @query="query" />

    <audit-comments-dialog
      ref="auditComments"
      @pass="pass"
      @reject="reject" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { TableHeaderConfig, Dictionary, DrawerConfig, FormListConfig, PageObj } from '@/typings'
import { listConfig } from '@/views/sale-center/sale-plain/configs'
import apiUrl from '@/api/sale-center/sale-plain'
import commonApi from '@/api/common-api/index'

import { mockTableColumn } from './configs'
import { routerDictionaryMap } from '@/router/index'
const formlistDictionary: Dictionary = {
  700001: {
    formList: listConfig.formList,
    url: apiUrl.list,
    tableHeader: mockTableColumn[700001].tableColumn
  }
}
@Component({
  name: 'auditlist-table',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    auditCommentsDialog: () => import('@/layout-components/audit-comments-dialog/index.vue')

  }
})
export default class App extends Vue {
  @Prop({ required: true }) activeTab: Dictionary

  searchText: string = ''
  formData: Dictionary = {}
  formList: FormListConfig[] = []
  tableHeader: TableHeaderConfig[] = []
  listApi: string = ''
  page: PageObj = {
    total: 0,
    pageNo: 1,
    pageSize: 25,
    pageCount: 1
  }
  moduleId: string = ''
  tableData: any[] = []
  drawerObj: DrawerConfig = {
    isShowDrawer: false
  }
  currentRow: Dictionary = {}
  @Watch('activeTab.id')
  OnActiveTabChange(val, oldVal) {
    console.log('activeTab val', val)
    if (val) {
      this.searchText = ''
      this.tableData = []
      this.moduleId = val
      this.formData = {}
      const moduleList = formlistDictionary[val]
      this.formList = moduleList.formList
      this.listApi = moduleList.url
      this.query()
    }
  }

  filter() {
    this.drawerObj.isShowDrawer = true
  }
  handleSearch() {
    this.query()
  }
  reset() {
    this.formData = {}
  }
  approval(row) {
    this.currentRow = row
    const args = {
      billId: row.id,
      moduleId: this.moduleId
    };
    (this.$refs.auditComments as any).open({ args, flowType: row.flowType })
  }
  async activityEndFn({ url, type, args }) {
    const res = await this._post({ url, data: {
      data: {
        billId: this.currentRow.id,
        moduleId: this.moduleId,
        flowId: this.currentRow.flowId,
        ...args
      }
    }})
    if (res.code === 0) {
      this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t('commonWord')[type] }), type: 'success' })
      this.query()
    }
  }
  pass({ comments, imgUrl, flowType }) {
    this.activityEndFn({ url: commonApi.auditActivity, type: 'pass', args: {
      flowSuggestion: comments,
      fileKeyList: imgUrl,
      flowType
    }})
  }
  reject({ comments, imgUrl, flowType }) {
    this.activityEndFn({ url: commonApi.rejectActivity, type: 'reject', args: {
      flowSuggestion: comments,
      fileKeyList: imgUrl,
      flowType
    }})
  }
  viewDetail(row) {
    this.$router.push({
      name: routerDictionaryMap[this.moduleId],
      params: {
        id: row.id,
        routeName: routerDictionaryMap[this.moduleId]
      }
    })
  }
  changePage(page) {
    this.page.pageNo = page
    this.query()
  }
  changePageSize(size) {
    this.page.pageSize = size
    this.query()
  }
  // 格式化 type = dateType 的数据
  formatDateTime() {
    const datePick: any[] = this.formList.filter((item) => item.type === 'datePick')
    const datePickObj: Object = {}
    datePick.forEach((item) => {
      if (this.formData[item.value]) {
        datePickObj[item.value] = {
          startTime: this.formData[item.value][0],
          endTime: this.formData[item.value][1]
        }
      }
    })
    return datePickObj
  }
  dealArgs(args?: Dictionary): Dictionary {
    const queryObj = { keyword: this.searchText, flowFlag: true }
    // const queryObj = { keyword: this.searchText }
    if (args) {
      Object.assign(queryObj, args)
    }
    const data = Object.assign(
      { },
      queryObj,
      this.formData,
      this.formatDateTime()
    )
    const postData = {
      data,
      moduleId: this.moduleId,
      NetNeedModuleId: true,
      page: this.page.pageNo,
      pageSize: this.page.pageSize
    }
    return postData
  }
  marginTableHeader(dataHeader: any[]): TableHeaderConfig[] {
    return dataHeader.map((item) => {
      const obj:TableHeaderConfig = {
        label: item.columnTitle,
        value: item.columnKey
      }
      return obj
    })
  }
  async query() {
    const postData = this.dealArgs()
    const res = await this._post({ url: this.listApi, data: postData })
    if (res.code === 0) {
      const { data, dataHeader } = res
      this.tableData = res.data
      this.tableHeader = this.marginTableHeader(dataHeader || [])
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.table-template {
  .search-box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
.add-box {
  color: $colorTextRegular;
  height: 28px;
  line-height: 28px;
  border: 1px solid #eee;
  border-top: none;
  &-text {
    width: 50px;
    display: inline-block;
    padding-left: 10px;
    border-right: 1px solid #eee;
  }
  .inline-block {
    display: inline-block;
    // width: 200px;
    padding-left: 10px;
    color: $info;
    &:hover {
      cursor: pointer;
    }
  }
}
.base-table {
  /deep/.cell {
    padding: 0 !important;
  }
}
</style>
