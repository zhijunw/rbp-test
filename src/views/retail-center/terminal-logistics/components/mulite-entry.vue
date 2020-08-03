<template>
  <div class="mulite-entry">
    <base-select
      :selectProps="{ clearable: false }"
      :value.sync="currentType"
      :disabled="disabled"
      class="base-select"
      :item="{ options: muliteEntryOptions }"
      @selectChange="selectChange" />
    <base-input
      v-if="currentType !== 2"
      :inputProps="{
        placeholder: currentPlaceholder[0]
      }"
      :disabled="disabled"
      class="base-input"
      :value.sync="barcode"
      @keydown.native.enter="submitInput" />
    <div
      v-if="currentType === 2"
      class="sku-flex">
      <base-input
        v-if="currentType === 2"
        :inputProps="{
          placeholder: currentPlaceholder[0]
        }"
        :disabled="disabled"
        class="base-input"
        :value.sync="barcode"
        @keydown.native.enter="submitInputGoods" />
      <base-cascader
        v-if="currentType === 2"
        v-model="skuValues"
        :options="skuOptions"
        :disabled="disabled"
        :selectProps="{
          placeholder: currentPlaceholder[1]
        }"
        @cascaderChange="onCascader" />
    </div>

    <base-number-input
      v-if="currentType !== 5"
      :disabled="disabled"
      :value.sync="barcodeNumber" />
    <el-tooltip
      v-if="currentType !== 5"
      placement="top"
      class="tooltip-icon">
      <div slot="content">
        条码录入时增加/减少的数量。<br>如输入2：每次录入条码，对应货品数加2；<br>
        如输入-1：每次录入条码，对应货品数减1
      </div>
      <i class="el-icon-warning-outline" />
    </el-tooltip>
    <el-button
      :disabled="disabled"
      type="primary"
      @click="submitInput">
      {{ $t('commonWord.input') }}
    </el-button>
    <el-tooltip
      v-if="currentType !== 5"
      placement="top"
      class="tooltip-icon">
      <div slot="content">
        1. 齐码配置只在扫描条形码时有效；<br>
        2. 配置了“齐码”后，若扫描了条形码，对应该货品颜色所有尺码的数量均+n（n为左边数量框中的数字）
      </div>
      <el-checkbox v-model="evenCode">
        齐码
      </el-checkbox>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Options, Dictionary, DialogObj, PageObj } from '@/typings'
import { Tools } from '@/utils/tools'
import apiUrl from '@/api/retail-center/terminal-logistics'
import { globalConfigs } from '../configs'
const PLACEHOLDERMAP = {
  1: ['form.placeholder.mulitPlaceholder'],
  2: ['form.placeholder.goodsInput', 'form.placeholder.skuInput'],
  3: ['form.placeholder.barcodeInput'],
  4: ['form.placeholder.onlyCodePlaceholder'],
  5: ['form.placeholder.boxInput']
}
@Component({
  name: 'mulite-entry',
  components: {
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseNumberInput: () => import('@/components/base-inputNumber/index.vue'),
    baseCascader: () => import('@/components/base-cascader/index.vue')
  }
})
export default class tableheaderConfig extends Vue {
  @Prop() disabled:boolean
  barcode: string = ''
  barcodeNumber: number = 1
  evenCode: boolean = false
  currentType: number = 1
  skuValues:any = []
  currentPlaceholder: any = PLACEHOLDERMAP[1]
  skuOptions:any[] = []
  page:PageObj = {
    total: 0,
    pageCount: 1,
    pageSize: 10,
    pageNo: 1
  }
  muliteEntryOptions: Options[] = [
    {
      label: '自动识别',
      value: 1
    },
    {
      label: '货品SKU录入',
      value: 2
    },
    {
      label: '条码录入',
      value: 3
    },
    {
      label: '唯一码录入',
      value: 4
    },
    {
      label: '箱号录入',
      value: 5
    }
  ]
  onCascader(value) {
    console.log(value)
  }
  async submitInputGoods() {
    const res = await this._post({ url: apiUrl.goodsEntry, data: {
      data: {
        keyword: this.barcode,
        moduleId: globalConfigs.realModuleId
      },
      page: this.page.pageNo,
      pageSize: this.page.pageSize
    }})
    console.log(res)
    if (res.code === 0) {
      const { total, data, pageCount, pageSize } = res
      this.page = Object.assign({}, this.page, { total, pageSize, pageCount })
      if (total === 1) {
        const { goodsSkuDto, goodsFields, ...other } = data[0]
        this.getSkuOptions(goodsSkuDto)
      }
    }
  }
  submitInput() {
    this.$emit('submitInput', { barcode: this.barcode, number: this.barcodeNumber, currentType: this.currentType, allCode: this.evenCode })
    this.barcode = ''
    this.barcodeNumber = 1
    this.currentType = 1
  }
  selectChange(value) {
    this.currentType = value
    this.currentPlaceholder = PLACEHOLDERMAP[value]
  }
  getSkuOptions(skuDto) {
    //     id:6916785159603456
    // label:"自营"
    // name:"自营"
    // parentId:0
    // value:6916785159603456
    // children
    const { dataList, headerList } = skuDto
    const option:any[] = []
    dataList.forEach((item, index) => {
      const parent:any = {
        id: item.colorId,
        value: item.colorId,
        parentId: 0,
        label: `${item.colorName}/${item.longName}`,
        name: `${item.colorName}/${item.longName}`,
        children: []
      }
      const children:any[] = []
      const long:any[] = []
      const findIndex:number = option.findIndex(it => it.id === item.colorId)
      if (findIndex !== -1) {
        long.push({
          id: item.longId,
          value: item.longId,
          parentId: item.colorId,
          label: `${item.longName}`,
          children: []
        })
        option[findIndex].children = option[findIndex].children.concat(long)
      }
      ;(item.sizeList || []).forEach((size, index) => {
        children.push({
          id: size.fieldName,
          value: size.fieldName,
          parentId: item.colorId,
          label: size.sizeName,
          name: size.sizeName
        })
      })
      parent.children = children
      option.push(parent)
    })
    console.log(option)
    this.skuOptions = option
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
.mulite-entry{
display: inline-flex;
  height: 28px;
  align-items: center;
  margin-bottom: 8px;
  .base-input {
    width: 200px;
    // margin-right: 10px;
    margin: 0 10px 0 8px;
  }
  .tooltip-icon {
    margin: 0 10px 0 6px;
  }
  .base-select {
    width: 130px !important;
    height: 28px !important;
    /deep/.el-input__inner{
    height: 28px !important;
    line-height: 28px !important;

    }
  }
}
.sku-flex {
  display: flex;
  align-items: center;
  .el-cascader {
    margin: 0 10px 0 8px;
    /deep/.el-input__inner {
      height: 28px !important;
      line-height: 28px !important;
      font-size: 12px;
    }
  }
}
</style>
