<template>
  <div
    v-if="showInput"
    class="mulite-entry">
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
      @click="currentType===1 && showSkuList"
      @keydown.native.enter="submitInput" />
    <el-cascader
      v-if="currentType===2"
      v-model="cascader"
      style="margin-right: 10px;width: 150px"
      size="mini"
      :options="cascaderOptions"
      @change="cascaderSelect" />
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
import { Options, Dictionary, DialogObj } from '@/typings'
import apiUrl from '@/api/common-api'
import { goodsSearchConfig } from '@/layout-components/vip-dialog/config'

const scanApi = {
  // 检索类型
  match: '/information/packingBill/automaticIdentification'
}
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
      advancedSearch: () => import('@/components/advanced-search/index.vue')
    }
  })
export default class tableheaderConfig extends Vue {
    @Prop({}) barcodeRecord
    @Prop() status: string
    @Prop() noticeId: string
    cascader = []
    cascaderOptions = []
    goodsFilter: string = ''

    async GoodsSelect({ value, row, matchValArr }) {
      // 模糊查询【绑定】
      if (value && matchValArr) {
        await this.scanGoodsColorSize(matchValArr[0].code)
      } else {

      }
    }

    // 请求获取颜色尺码数据
    async scanGoodsColorSize(value) {
      const res = await this._post({
        url: apiUrl.scanGoodsPage, data: {
          data: {
            keyWord: ''
          },
          page: 1,
          pageSize: 1
        }
      })
    }

    cascaderSelect() {

    }

    barcode: string = ''
    barcodeNumber: number = 1
    evenCode: boolean = false
    currentType: number = 1
    currentPlaceholder: string = PLACEHOLDERMAP[1]
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

    showSkuList() {
      console.log('sku')
    }

    async submitInput() {
      let res
      switch (+this.currentType) {
        case 1: // 自动识别
          this.getAuto(this.barcode, this.barcodeNumber)
          break
        case 2: // SKU
          this.getSku(this.barcode, this.barcodeNumber)
          break
        case 3: // 条形码
          res = await this.getBarCode(this.barcode, this.barcodeNumber)
          break
        case 4:// 唯一码
          this.getUniCode(this.barcode, this.barcodeNumber)
          break
      }
      // this.$emit('submitInput', {
      //   matchObjIndex: this.matchObjIndex,
      //   number: this.barcodeNumber,
      //   currentType: this.currentType
      // })
      // this.barcode = ''
      // this.barcodeNumber = 1
      // this.currentType = 1
      if (this.currentType !== 1) {
        this.$emit('submitInput', {
          data: res,
          type: this.currentType,
          allSize: this.evenCode,
          number: this.barcodeNumber
        })
      }
    }

    async getAuto(barcode, number) {
      const res = await this._post({
        url: `${apiUrl.scanAuto}`,
        data: {
          data: {
            keyWord: barcode
          }
        }
      })
      if (res.code === 0) {
        switch (+res.data) {
          case 1: // 条形码
            const res = await this.getBarCode(barcode, number)
            this.$emit('submitInput', { data: res, type: 3, allSize: this.evenCode, number: this.barcodeNumber })
            break
          case 2: // 唯一码
            this.getUniCode(barcode, number)
            break
          case 3: // SKU
            this.getSku(barcode, number)
            break
        }
      }
    }

    async getBarCode(barcode, number) {
      const res = await this._post({
        url: `${apiUrl.barScan}`,
        data: {
          data: {
            billIdList: [this.noticeId],
            keyword: barcode
          }
        }
      })
      if (res.code === 0) {
        this.barcode = ''
        return res.data
      }
    }

    async getUniCode(barcode, number) {
      const res = await this._post({
        url: `${apiUrl.uniCodeScan}`,
        data: {
          data: {
            keyWord: barcode
          }
        }
      })
      if (res.code === 0) {
        return res.data
      }
    }

    async getSku(barcode, number) {
      const res = await this._post({
        url: `${apiUrl.skuScan}`,
        data: {
          data: {
            keyWord: barcode
          }
        }
      })
      if (res.code === 0) {
        return res.data
      }
    }

    selectChange(value) {
      this.currentType = value
      this.currentPlaceholder = PLACEHOLDERMAP[value]
    }

    get showInput() {
      return (!['detail', 'cancel', ''].includes(this.status))
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

    .mulite-entry {
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

            /deep/ .el-input__inner {
                height: 28px !important;
                line-height: 28px !important;

            }
        }
    }
</style>
