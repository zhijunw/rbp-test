<template>
  <div class="scan-box">
    <template v-if="showBarcode">
      <base-input
        :inputProps="{
          placeholder: 'form.placeholder.fuzzyGoodsFix',
        }"
        :value.sync="fixGoodsCode"
        @enter="fixGoodsCodeFn" />
      <el-button
        type="primary"
        class="mgl-10"
        @click="fixGoodsCodeFn">
        {{ $t('commonWord.fix') }}
      </el-button>
    </template>
    <template v-else>
      <base-input
        :inputProps="{
          placeholder:'form.placeholder.barcodePlaceholder'
        }"
        :value.sync="barcode"
        :disabled="disabled"
        @keydown.native.enter="submitEna" />
      <base-number-input
        :value.sync="barcodeNumber"
        :disabled="disabled" />
      <el-tooltip
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
        :disabled="disabled"
        @click="submitEna">
        {{ $t('commonWord.input') }}
      </el-button>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'goods-scan',
  components: {
    baseInput: () => import('@/components/base-input/index.vue'),
    baseNumberInput: () => import('@/components/base-inputNumber/index.vue')
  }
})
export default class App extends Vue {
  @Prop() status: string
  @Prop() disabled: boolean
  barcode: string = ''
  barcodeNumber: number = 1
  fixGoodsCode: string = ''
  get showBarcode() {
    return (['detail', 'cancel', ''].includes(this.status))
  }
  submitEna() {
    this.$emit('submitBarcode', { barcode: this.barcode, number: this.barcodeNumber })
    this.barcode = ''
  }
  fixGoodsCodeFn() {
    this.$emit('fixGoodsCodeFn', this.fixGoodsCode)
  }
  reset() {
    this.barcodeNumber = 1
    this.barcode = ''
  }
}
</script>

<style scoped lang="scss">
.scan-box {
  display: inline-flex;
  height: 28px;
  align-items: center;
  .base-input {
    width: 200px;
    margin-right: 10px;
  }
  .tooltip-icon {
    margin: 0 10px 0 6px;
  }
}
</style>
