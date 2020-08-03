<template>
  <base-dialog
    :dialog-obj="dialogObj"
    class="base-dialog">
    <template
      v-slot:content>
      <div class="detail-info">
        <div
          v-for="(item,index) in detailInfo"
          :key="index"
          class="detail-item">
          <span>{{ item.label }}</span>:
          <span>{{ item.value }}</span>
        </div>
      </div>
      <base-table
        ref="deliverPlanDetailTable"
        key="deliverPlanDetailTable"
        :tableData="tableData"
        :colunmData="deliverPlanDetailTable"
        :tableConfig="{
          isMultiSelect: false,
          isIndex: true,
          isShowOpera: false,
          showSummary: true
        }" />
    </template>

    <template v-slot:footerBtn>
      <div class="footer-btn">
        <el-button
          plain
          @click="cancelMerger">
          {{ $t('commonWord.cancelMerger') }}
        </el-button>
      </div>
    </template>
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
  name: 'deliver-plan-detail',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    formList: () => import('@/components/formlist/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class tableheaderConfig extends Vue {
  // @Prop() dialogObj: DialogObj
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '50%'
  }
  noticeId: string = ''

  deliverPlanDetailTable = listConfig.devlierPlainDialog.tableHeader
  tableData: any[] = []
  detailInfo: any[] = [
    {
      label: '单据编号',
      value: '12221212'
    },
    {
      label: '手工单号',
      value: '21232312'
    },
    {
      label: '发货渠道',
      value: '发货渠道啊啊'
    },
    {
      label: '收货渠道',
      value: '收货渠道啊'
    },
    {
      label: '单据日期',
      value: '2018-8-12'
    },
    {
      label: '备注',
      value: '测试备注啊'
    }
  ]
  async cancelMerger() {
    const res = await this._post({ url: `${apiUrl.cancelMergeDeliverPlan}/${this.noticeId}` })
    if (res.code === 0) {
      this.dialogObj.isShowDialog = false
      this.$emit('refreshList')
    }
  }
  async open(id) {
    this.noticeId = id
    const res = await this._get({ url: `${apiUrl.getDeliverPlanDetail}/${id}` })
    if (res.code === 0) {
      this.dialogObj.isShowDialog = true
      this.dialogObj.title = this.$t(
        'packingWorktop.list.deliverPlanDetailDialog.title'
      )
      const { billDate, billNo, manualId, notes, channelCode, channelName, toChannelCode, toChannelName, sendPlanBillRelationList } = res.data
      this.detailInfo[0].value = billNo
      this.detailInfo[1].value = manualId
      this.detailInfo[2].value = `${channelCode}-${channelName}`
      this.detailInfo[3].value = `${toChannelCode}-${toChannelName}`
      this.detailInfo[4].value = billDate
      this.detailInfo[5].value = notes
      this.tableData = sendPlanBillRelationList
    }
  }
}
</script>
<style lang="scss">
.base-dialog {
  .el-dialog__body {
    padding: 0 16px;
  }
  .el-dialog__footer {
    padding: 12px 16px 16px 16px;
  }
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail-info {
  padding-top: 16px;
  .detail-item {
    display: inline-block;
    width: 25%;
    padding-bottom: 16px;
  }
}
.footer-btn{
      margin: 10px 0 16px 0;
    text-align: right;
}
</style>
