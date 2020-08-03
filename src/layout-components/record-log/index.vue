<template>
  <base-dialog
    :dialogObj="recordLogObj"
    class="base-dialog"
    v-on="$listeners">
    <template v-slot:content>
      <div class="query-group">
        <formlist
          class="query-group-form"
          :formList="recordLogConfig.formList"
          :formData="formData" />
        <el-button
          type="primary"
          class="query-group-btn"
          @click="query">
          {{ $t('layout.btns.query') }}
        </el-button>
      </div>

      <base-table
        ref="recordTable"
        key="recordTable"
        :tableData="recordTableData"
        :colunmData="recordLogConfig.tableHeader"
        class="size-table"
        :tableConfig="{
          isMultiSelect: false,
          isIndex: true,
          height: '300px',
          isShowOpera: false
        }" />
    </template>
    <template v-slot:footerBtn>
      <small-pagetion
        :total="page.total"
        class="base-pagetion"
        @changePageSize="changePageSize"
        @changePage="changePage" />
    </template>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DialogObj } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary, PageObj, RecordLogConfig } from '@/typings'
@Component({
  name: 'recordlog',
  components: {
    formlist: () => import('@/components/formlist/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    smallPagetion: () => import('@/components/small-pagination/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) recordLogConfig: RecordLogConfig

  recordLogObj: DialogObj = {
    title: '',
    isShowDialog: false,
    appendToBody: true,
    width: '680px'
  }

  formData: Dictionary = {}
  recordTableData: any[] = []
  page: PageObj = {
    total: 0,
    pageSize: 10,
    pageNo: 1
  }

  open({ args = {}, from = '' } = {}) {
    this.recordLogObj.isShowDialog = true
    this.recordLogObj.title = this.$t('operationGroup.btns.record')
    this.formData = Object.assign({}, this.formData, args)
    // 如果有传值 单号 则禁止输入 从详情查看弹窗不需要修改单号
    this.$set(this.recordLogConfig.formList[0], 'alwaysDisabled', from === 'detail')
    this.query()
    this.getOperatorType()
  }
  changePage(val) {
    this.page.pageNo = val
    this.query()
  }
  changePageSize(val) {
    this.page.pageSize = val
    this.query()
  }
  formatDateTime() {
    const datePick: any[] = this.recordLogConfig.formList.filter((item) => item.type === 'datePick')
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
  async query() {
    const res = await this._post({ url: this.recordLogConfig.api, data: {
      data: Object.assign({}, this.formData, this.formatDateTime()),
      page: this.page.pageNo,
      pageSize: this.page.pageSize
    }})
    if (res.code === 0) {
      const { data, total } = res
      this.recordTableData = res.data
      this.page.total = total
    }
  }
  // 获取操作记录下拉
  async getOperatorType() {
    const res = await this._get({ url: '/bill/operatorLog/dropDown' })
    res.code === 0 && (() => {
      const target = this.recordLogConfig.formList.find(item => { return item.value === 'actionCode' })
      this.$nextTick(() => {
        console.log('target', target)
        target && (target.options = res.data.map(item => { return { label: item.name, value: item.id } }))
      })
    })()
  }
}
</script>

<style scoped lang="scss">
.base-dialog {
  /deep/.el-dialog__body {
    padding: 16px;
  }
}
.base-pagetion {
  justify-content: center !important;
  /deep/.page-select {
    margin: 0 10px;
  }
}
.query-group {
  display: flex;
  align-items: flex-end;
  &-form {
    flex: 1;
  }
  &-btn {
     margin-left: 10px;
    margin-bottom: 10px;
    /*margin: 12px 12px 0 10px;*/
  }
}
</style>
