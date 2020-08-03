<template>
  <base-dialog
    :dialog-obj="dialogObj"
    class="base-dialog"
    @confirm="confirm">
    <div
      slot="content"
      class="box">
      <p class="content-title">
        合并为发货计划后，装箱时引用发货计划进行装箱，被合并的配货指令单将不再可见。如需撤销合并，请点击发货计划单的“撤销合并”按钮作废发货计划。
      </p>
      <form-list
        ref="formList"
        :formList="formList"
        :formData="formData" />
      <base-table
        ref="deliverPlanTable"
        key="deliverPlanTable"
        class="base-table"
        :tableData="tableData"
        :colunmData="deliverPlanTableHeader"
        :tableConfig="{
          isMultiSelect: false,
          isIndex: true,
          isShowOpera: false,
          showSummary: true

        }" />
    </div>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Options, Dictionary, DialogObj } from '@/typings'
import { listConfig } from '../configs/index'
import apiUrl from '@/api/packingwork/packingworktop'

@Component({
  name: 'merge-deliver-plan',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    formList: () => import('@/components/formlist/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')

  }
})
export default class tableheaderConfig extends Vue {
  // @Prop() dialogObj: DialogObj
  dialogObj:DialogObj = {
    isShowDialog: false,
    title: '',
    width: '50%'
  }
  formList = listConfig.devlierPlainDialog.formList
  formData: Dictionary = {}
  deliverPlanTableHeader = listConfig.devlierPlainDialog.tableHeader
  tableData: any[] = []

  async open(args) {
    const res = await this._post({ url: apiUrl.mergeDeliverPlan, data: {
      data: args
    }})
    if (res.code === 0) {
      this.dialogObj.isShowDialog = true
      this.dialogObj.title = this.$t('packingWorktop.list.devlierPlainDailog.title')
      const { channelCode, channelId, channelName, toChannelCode, toChannelName, toChannelId, noticeBillList } = res.data

      const channelOptions = [
        {
          label: `${channelCode}-${channelName}`,
          value: channelId
        }
      ]
      const toChannelOptions = [
        {
          label: `${toChannelCode}-${toChannelName}`,
          value: toChannelId
        }
      ]
      this.tableData = noticeBillList

      this.$nextTick(() => {
        this.$set(this.formData, 'channelId', channelId)
        this.$set(this.formData, 'toChannelId', toChannelId)
        const formlistDom: any = this.$refs.formList
        formlistDom.$refs.advancedSearchchannelId[0].upDateOptionsData(channelOptions)
        formlistDom.$refs.advancedSearchtoChannelId[0].upDateOptionsData(toChannelOptions)
      })
    }
  }
  async confirm() {
    const ids = this.tableData.map((item) => {
      return {
        noticeId: item.noticeId,
        salePlanId: item.salePlanId
      }
    })
    const res = await this._post({ url: apiUrl.confirmMergeDeliverPlan, data: {
      data: {
        ...this.formData,
        sendPlanBillRelationList: ids
      }
    }})
    if (res.code === 0) {
      this.dialogObj.isShowDialog = false
      this.$emit('refreshList')
    }
  }
}
</script>
<style lang="scss">
.base-dialog {
  .el-dialog__body {
    padding: 0 16px;
  }
  .el-dialog__footer{
      padding: 12px 16px 16px 16px;
  }
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.content-title{
    background: #AEB3BE;
    font-size: 12px;
    height: 26px;
    line-height: 26px;
    margin: 0 -16px 16px -16px;
    padding: 0 16px;
    color: #fff;
}
.base-table{
    margin-top: 4px;
}
</style>
