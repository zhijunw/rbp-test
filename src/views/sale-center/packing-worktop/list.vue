<template>
  <div class="list-warrper">
    <!-- 表单列表 -->
    <div class="formlist-box">
      <div class="formlist-box-warrper form-module">
        <formlist
          ref="formlist"
          :formList="listConfig.formList"
          :formData="formData"
          :showAllForm="false"
          :columnLine="7"
          @toggle="toggle" />
        <el-row class="query-btn-group">
          <el-col :span="24">
            <el-button @click="reset">
              {{ $t('layout.btns.reset') }}
            </el-button>
            <el-button
              type="primary"
              @click="query">
              {{ $t('layout.btns.filter') }}
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div
        ref="totalInfo"
        class="total-info">
        <div class="refresh-box">
          <span class="f12">待办</span>
          <i
            class="el-icon-refresh-right refresh-icon hover"
            @click="refreshTodoList" />
        </div>

        <div class="todolist">
          <div
            v-for="item in totalInfo"
            :key="item.id"
            class="todoitem hover regular"
            @click="switchQuery(item)">
            <span
              class="f22 bold"
              :class="item.class">{{ item.value }}</span>
            <span class="f12 block line-height1">{{ item.label }}</span>
          </div>
        </div>
      </div>
    </div>
    <list-operation
      :btnConfigs="listConfig.btns"
      class="operation-groups"
      @packing="noDirectPacking"
      @merge="oneClickMerge"
      @mergeDeliveryPlan="mergeDeliveryPlan">
      <template v-slot:input>
        <div class="empty" />
      </template>
    </list-operation>

    <list-table
      ref="listTable"
      :page="page"
      :colunmData="listConfig.tableHeader"
      :tableData="tableData"
      :tableConfig="{
        operatWidth: 240
      }"
      @select="select"
      @changePage="changePage"
      @linkWhere="linkWhere"
      @changePageSize="changePageSize">
      <template v-slot="{ scope }">
        <!-- <template v-if="scope.shortPackingbillRespList && scope.shortPackingbillRespList.some((item) => item.status === 1)"> -->
        <template v-if="scope.packingBillId">
          <el-button
            id="btn_t_blue"
            type="text"
            size="mini"
            @click="continuePacking(scope)">
            {{ $t('packingWorktop.btns.continuePacking') }}
          </el-button>
        </template>
        <template v-else>
          <el-button
            id="btn_t_blue"
            type="text"
            size="mini"
            @click="startPacking(scope)">
            {{ $t('packingWorktop.btns.packing') }}
          </el-button>
        </template>

        <el-button
          id="btn_t_gray"
          type="text"
          size="mini"
          @click="manualClosure(scope)">
          {{ $t('packingWorktop.btns.manualClosure') }}
        </el-button>
        <!-- <el-button
          id="btn_t_gray"
          type="text"
          size="mini"
          @click="viewDetail(scope)">
          {{ $t('layout.btns.checkDetail') }}
        </el-button> -->
        <el-button
          v-if="scope.noticeBillType === 2"
          id="btn_t_gray"
          type="text"
          size="mini"
          @click="cancelMerger(scope)">
          {{ $t('packingWorktop.btns.cancelMerger') }}
        </el-button>
      </template>
      <template v-slot:other="{scope}">
        <div
          v-if="scope.shortPackingbillRespList"
          class="box-cell">
          <div
            v-for="boxItem in scope.shortPackingbillRespList"
            :key="boxItem.packingBillId">
            <!-- <span :class="[boxItem.status === 1 ? 'warning': 'color-base', 'hover']">{{ boxItem.id }}({{ boxItem.statusName }})</span> -->
            <span :class="[boxItem.status === 1 ? 'warning': 'color-base', 'hover']">{{ boxItem.packingBillNo }}({{ boxItem.packingBillProcessStatusName }})</span>
            <span class="mgl-4">{{ boxItem.packingBillPrintStatusName }}</span>
          </div>
        </div>
      </template>
    </list-table>

    <merge-deliver-plan
      ref="mergeDeliverPlan"
      @refreshList="query" />

    <oneclick-merge
      ref="oneClickMerge" />

    <deliver-plan-detail
      ref="deliverPlanDetail"
      @refreshList="query" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from './configs/vuex-module'
import { Dictionary, DialogObj, Response, FormListConfig, PageObj } from '@/typings'
import { Watch } from 'vue-property-decorator'
import commonApiUrl from '@/api/common-api'
import apiUrl from '@/api/packingwork/packingworktop'
import { layoutConfigs, listConfig } from './configs/index'
import { Tools } from '@/utils/tools'

@Component({
  name: 'packing-worktop-list',
  components: {
    listTable: () => import('@/layout-components/list-table/index.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    mergeDeliverPlan: () => import('./components/merge-deliver-plan.vue'),
    oneclickMerge: () => import('./components/oneclick-merge-dialog.vue'),
    deliverPlanDetail: () => import('./components/deliver-plan-detail.vue')
  }
})
export default class list extends mixins(vuexMixins) {
  listConfig = listConfig
  tableData: any[] = []
  selectData: any[] = []
  formData: Dictionary = {}
  toggleFlag: boolean = true
  totalInfo: any[] = [
    {
      label: '待装箱',
      value: 0,
      id: 1,
      linkValue: 0,
      class: 'warning'
    },
    {
      label: '装箱中',
      value: 0,
      id: 2,
      linkValue: 1,
      class: 'color-base'
    },
    {
      label: '本人装箱中',
      value: 0,
      linkValue: 2,
      id: 3,
      class: 'color-base'
    }
  ]
  page: PageObj = {
    total: 0,
    pageNo: 1,
    pageSize: 25,
    pageCount: 1
  }

  created() {
    this.getListData()
    // this.refreshTodoList()
    this.getDorpdown()
  }
  // 格式化 type = dateType 的数据
  formatDateTime() {
    const datePick: any[] = this.listConfig.formList.filter((item) => item.type === 'datePick')
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
  dealArgs(args): Dictionary {
    const data = Object.assign({}, args, this.formatDateTime())
    const postData = {
      data,
      page: this.page.pageNo,
      pageSize: this.page.pageSize
    }
    return postData
  }
  async getListData(args = this.formData) {
    const res = await this._post({ url: apiUrl.list, data: this.dealArgs(args) })
    if (res.code === 0) {
      const { data, pageCount, total } = res
      this.page = Object.assign(this.page, { total, pageNo: pageCount })
      this.tableData = res.data
    }
  }
  async refreshTodoList() {
    const res = await this._get({ url: apiUrl.refreshTodo })
    if (res.code === 0) {
      const { waitQuantity, packingQuantity, ownPackingQuantity } = res.data
      this.totalInfo[0].value = waitQuantity
      this.totalInfo[1].value = packingQuantity
      this.totalInfo[2].value = ownPackingQuantity
    }
  }
  async getDorpdown() {
    const res = await this._get({
      url: apiUrl.getSelect,
      params: {
        moduleId: this.m_moduleId
      }
    })
    if (res.code === 0) {
      const data = res.data

      const listFormList = this.listConfig.formList

      const actions = new Map<any, any>([
        [
          ['noticeBillTypeList', 'noticeFinishStatusList', 'printStatusList', 'processStatusList'],
          (val, keys) => {
            Tools.setValueAndName(val)
            Tools.setOptions(val, keys, listFormList)
          }
        ],

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
  toggle() {}
  select({ section, formatSection }) {
    this.selectData = section
  }
  changePage(page) {
    this.page.pageNo = page
    this.getListData()
  }
  changePageSize(size) {
    this.page.pageSize = size
    this.getListData()
  }
  switchQuery(item) {
    // this.$set(this.formData, 'processStatusList', [1])
    const argsData = {
      notes: item.linkValue
    }
    this.getListData(argsData)
  }
  reset() {
    this.formData = { channelIdList: [], goodsIdList: [], supplierIds: [] }
  }
  query() {
    this.getListData()
  }

  infoFun() {
    if (!this.selectData.length) {
      this._message({ message: this.$t('commonWord.noDataWarning'), type: 'warning' })
      return true
    }
    return false
  }
  // 校验已选数据的单据状态
  validateBillStatus(): boolean {
    const flag = this.selectData.some((item) => item.zxztType !== 1)
    if (flag) {
      this._message({ message: '只有“未处理”状态的指令单可以合并为发货计划!', type: 'warning' })
    }
    return flag
  }
  validateBillType(): boolean {
    const flag = this.selectData.some((item) => item.djlxType === 2)
    if (flag) {
      this._message({ message: '发货计划不可以再次做合并为发货计划的操作!', type: 'warning' })
    }
    return flag
  }
  // 一键合并
  async oneClickMerge() {
    (this.$refs.oneClickMerge as any).open()
  }

  // 合并为发货计划
  mergeDeliveryPlan() {
    if (this.infoFun()) {
      return
    }
    const ids = this.selectData.map((item) => item.billNo);
    (this.$refs.mergeDeliverPlan as any).open(ids)
  }
  // 无指令装箱
  noDirectPacking() {
    // this.$store.commit(`packingWorktopModule/SET_ACTIVENAME`, 'detail')
    // this.$store.commit(`packingWorktopModule/SET_PACKING_TYPE`, 'noDirect')
    //   this.$store.commit(`packingWorktopModule/SET_READ_STATUS`, true)
    this.$store.dispatch(`packingWorktopModule/addFn`, 'noDirect')
  }

  // 继续装箱
  async continuePacking(row) {
    const res = await this._post({ url: apiUrl.viewBoxDetail, data: {
      data: {
        packingBillId: row.packingBillId
      }
    }})
    if (res.code === 0) {
      this.$store.dispatch(`packingWorktopModule/addFn`, 'hasDirect')

      this.$store.commit(`packingWorktopModule/SET_DETAIL_DATA`, res.data)
    }
  }
  // 开始装箱
  async startPacking(row) {
    const res = await this._post({ url: apiUrl.viewBoxDetail, data: {
      data: {
        channelId: row.channelId,
        moduleId: this.m_moduleId,
        noticeBillType: row.noticeBillType,
        noticeId: row.noticeId,
        packingBillId: row.packingBillId,
        noticeModuleId: row.noticeModuleId,
        toChannelId: row.toChannelId,
        type: 1
      }
    }})
    if (res.code === 0) {
      this.$store.dispatch(`packingWorktopModule/addFn`, 'hasDirect')
      this.$store.commit(`packingWorktopModule/SET_FORMDATA`, res.data)
      this.$store.commit(`packingWorktopModule/SET_DETAIL_DATA`, res.data)
    }
  }

  // 手动完结
  manualClosure() {}
  // 撤销合并
  async cancelMerger(row) {
    const res = await this._post({ url: `${apiUrl.cancelMergeDeliverPlan}/${row.noticeId}` })
    if (res.code === 0) {
      this.getListData()
    }
  }
  // 下钻数据 如果单据类型是发货计划 则调用弹窗
  linkWhere(row) {
    if (row.noticeBillType === 2) {
      // this.delivePlanDetailDialog.isShowDialog = true
      // this.delivePlanDetailDialog.title = this.$t(
      //   'packingWorktop.list.deliverPlanDetailDialog.title'
      // )
      (this.$refs.deliverPlanDetail as any).open(row.noticeId)
    } else {
      this._message({ message: '这是一个跳转链接', type: 'success' })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.list-warrper {
  display: flex;
  flex-direction: column;
  max-height: calc(100vh - 120px);
  /deep/.list-table {
    flex: 1 !important;
    min-height: 50vh !important;
  }
  .operation-groups {
    margin: 0;
    padding: 12px 0 8px 0;
    box-shadow: none;
    top: 0;
    position: static;
  }
}
.formlist-box {
  display: flex;
  position: relative;
  margin-top: 8px;
  .form-module {
    flex: 1;
    margin-right: 240px;
    background: #fff;
    border: 1px solid #eee;
    padding: 6px 12px 2px 12px;
  }
  .query-btn-group {
    position: absolute;
    bottom: 10px;
    right: 250px;
    text-align: right;
  }
  .total-info {
    position: absolute;
    right: 0;
    z-index: 100;
    background: #fff;
    width: 230px;
    // padding: 16px 16px 10px 16px;
    box-sizing: border-box;
    border: 1px solid #eee;
    border-radius: 4px;
    // height: 110px;
    overflow: hidden;
    &:hover {
      box-shadow: 0px 0px 12px 0px rgba(166, 167, 173, 0.3);
    }
    .refresh-box {
      display: flex;
      justify-content: space-between;
      height: 36px;
          align-items: center;
      padding: 0 16px;
      border-bottom: 1px solid #eee;
    }
    .todolist {
      display: flex;
      justify-content: space-around;
      height: 92px;
      align-items: center;
    }
  }
  .refresh-icon {
    // float: right;
    color: $colorTextPlaceholder;
  }

}
</style>
