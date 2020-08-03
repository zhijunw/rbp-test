<template>
  <div class="goods-input">
    <div
      v-if="showInput"
      class="goods-input-box">
      <base-input
        :inputProps="{
          placeholder: 'form.placeholder.goodsInput',
        }"
        :value.sync="goodsCode"
        :disabled="disabled"
        @enter="fuzzySearch" />
      <el-button
        type="primary"
        class="mgl-10"
        :disabled="disabled"
        @click="fuzzySearch">
        {{ $t('commonWord.input') }}
      </el-button>
    </div>

    <base-dialog
      :dialogObj="dialogObj"
      class="base-dialog">
      <template v-slot:content>
        <base-input
          :inputProps="{
            placeholder: 'form.placeholder.goodsFielsPlaceholder',
            suffixIcon: 'el-icon-search'
          }"
          :value.sync="goodsCode"
          class="base-input"
          @enter="fuzzySearch" />
        <base-table
          :tableData="tableData"
          :colunmData="tableHeader"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            isShowOpera: false
          }"
          @viewDetail="viewDetail" />
      </template>
      <template v-slot:footerBtn>
        <!-- <div class="empty" /> -->
        <small-pagination
          :total="page.total"
          @changePage="changePage"
          @changePageSize="changePageSize" />
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DialogObj, TableHeaderConfig, PageObj } from '@/typings'
import apiUrl from '@/api/sale-center/sale-plain'
import { Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'goods-input',
  components: {
    baseInput: () => import('@/components/base-input/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    smallPagination: () => import('@/components/small-pagination/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) formData
  @Prop({ default: false }) disabled: boolean
  @Prop() status: string

  get showInput() {
    return (!['detail', 'cancel', ''].includes(this.status))
  }
  goodsCode: string = ''
  page:PageObj = {
    total: 0,
    pageCount: 1,
    pageSize: 10,
    pageNo: 1
  }
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: ''
  }
  tableData: any[] = []
  tableHeader: TableHeaderConfig[] = [
    {
      label: '货品货号',
      value: 'goodsCode',
      en: 'Item Number',
      lang: 'barcode.list.tableHeader.code'
    },
    {
      label: '货品名称',
      value: 'goodsName',
      en: 'Product Name',
      lang: 'barcode.list.tableHeader.name'
    }
  ]
  async fuzzySearch() {
    if (!this.formData.priceTypeId) {
      this._message({ message: '请先选择价格类型', type: 'warning' })
      return
    }
    if (!this.formData.channelId) {
      this._message({ message: '请先选择渠道', type: 'warning' })
      return
    }
    await this.fuzzySearchFn()
    // 如果搜索出的结果只有一条则是精确搜索 直接往列表添加数据 否则弹出弹窗
    if (this.page.total === 1) {
      this.$emit('goodsInput', this.tableData[0])
      return
    }
    this.openDialog()
  }
  reset() {
    this.goodsCode = ''
  }
  async fuzzySearchFn() {
    const res = await this._post({ url: apiUrl.goodsEntry, data: {
      data: {
        keyword: this.goodsCode,
        channelId: this.formData.channelId,
        priceTypeId: this.formData.priceTypeId
      },
      page: this.page.pageNo,
      pageSize: this.page.pageSize

    }})
    if (res.code === 0) {
      const { total, data, pageCount, pageSize } = res
      this.tableData = data
      this.page = Object.assign({}, this.page, { total, pageSize, pageCount })
    }
  }
  openDialog() {
    this.dialogObj.isShowDialog = true
    this.dialogObj.title = this.$t('form.placeholder.goodsInput')
  }
  changePage(val) {
    this.page.pageNo = val
    this.fuzzySearch()
  }
  changePageSize(val) {
    this.page.pageSize = val
    this.fuzzySearch()
  }
  viewDetail(row) {
    this.dialogObj.isShowDialog = false
    this.$emit('goodsInput', row)
  }
  // searchGoods() {
  //   this.fuzzySearch()
  // }
}
</script>

<style scoped lang="scss">
.goods-input {
  display: inline-block;
  &-box {
    display: flex;
  }
}
.base-dialog {
  /deep/.el-dialog__body {
    padding: 20px 16px 16px 16px;
  }
  .base-input {
    width: 200px;
    margin-bottom: 12px;
  }
  /deep/ .small-pagination{
    justify-content: center;
    /deep/ .page-select{
        margin: 0 10px;
    }
  }
}
</style>
