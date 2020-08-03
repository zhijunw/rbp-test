<template>
  <div class="goods-input">
    <div class="goods-input-box">
      <base-input
        :inputProps="{
          placeholder: 'form.placeholder.goodsInput',
        }"
        :value.sync="goodsCode"
        @enter="fuzzySearch" />
      <el-button
        type="primary"
        class="mgl-10"
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
          :value="goodsCode"
          class="base-input"
          @enter="searchGoods" />
        <base-table
          :tableData="tableData"
          :colunmData="tableHeader"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            isShowOpera: false
          }" />
      </template>
      <template v-slot:footerBtn>
        <!-- <div class="empty" /> -->
        <small-pagination :total="tableData.length" />
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DialogObj, TableHeaderConfig } from '@/typings'
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
  goodsCode: string = ''
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: ''
  }
  tableData: any[] = []
  tableHeader: TableHeaderConfig[] = [
    {
      label: '货品货号',
      value: 'code',
      en: 'Item Number',
      lang: 'barcode.list.tableHeader.code'
    },
    {
      label: '货品名称',
      value: 'name',
      en: 'Product Name',
      lang: 'barcode.list.tableHeader.name'
    }
  ]
  async fuzzySearch() {
    // const res = await this._post()
  }
  openDialog() {
    this.dialogObj.isShowDialog = true
    this.dialogObj.title = this.$t('form.placeholder.goodsInput')
  }
  searchGoods() {}
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
