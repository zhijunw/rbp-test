<template>
  <div class="mulite-entry">
    <base-select
      :selectProps="{ clearable: false }"
      :value.sync="currentType"
      class="base-select"
      :item="{ options: muliteEntryOptions }"
      @selectChange="selectChange" />
    <base-input
      :inputProps="{
        placeholder: currentPlaceholder
      }"
      class="base-input"
      :value.sync="barcode"
      @keydown.native.enter="submitInput" />
    <baseCascader
      v-if="currentType === 2"
      :options="skuCadcader"
      :value="skuChoose" />
    <base-number-input
      v-if="currentType !== 5"
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
import { Options, Dictionary, DialogObj, CascaderOptionsConfig } from '@/typings'
import { Tools } from '@/utils/tools'
import apiUrl from '@/api/packingwork/packingworktop'
const PLACEHOLDERMAP = {
  1: 'form.placeholder.mulitPlaceholder',
  2: 'form.placeholder.goodsInput',
  3: 'form.placeholder.barcodeInput',
  4: 'form.placeholder.onlyCodePlaceholder',
  5: 'form.placeholder.boxInput'
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
  barcode: string = ''
  barcodeNumber: number = 1
  evenCode: boolean = false
  currentType: number = 1
  currentPlaceholder: string = PLACEHOLDERMAP[1]
  skuCadcader: CascaderOptionsConfig[] = []
  skuChoose: string | number[] = []
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

  submitInput() {
    // 如果类别为 1 则是自动识别 需要先识别是那个条码类型
    switch (this.currentType) {
      case 1:
        this.automaticBarcode()
        break
        // 货品录入
      case 2:
        this.goodsBarcode()
        break
        // 条形码录入
      case 3:
        this.skuBarcode()
        break
      case 4:
        // 唯一码录入
        this.onlyBarcode()
        break
      case 5:
        // 箱录入
        this.boxInput()
        break
      default:
        break
    }
  }
  // 自动识别
  async automaticBarcode() {
    const res = await this._post({ url: apiUrl.automaticBarcode, data: {
      data: {
        keyWord: this.barcode
      }
    }})
  }
  // 货品录入之后 还需要选择对应的 sku (尺码内长)
  goodsBarcode() {

  }
  // 条形码录入
  async skuBarcode() {
    const res = await this._post({ url: apiUrl.searchBarcode, data: {
      data: {
        keyWord: this.barcode,
        quantity: this.barcodeNumber
      }
    }})
  }
  // 唯一码录入
  async onlyBarcode() {
    const res = await this._post({ url: apiUrl.searchOnlyCode, data: {
      data: {
        keyWord: this.barcode,
        quantity: this.barcodeNumber
      }
    }})
  }
  // 箱号录入
  boxInput() {

  }
  selectChange(value) {
    this.currentType = value
    this.currentPlaceholder = PLACEHOLDERMAP[value]
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
</style>
