<template>
  <div
    id="difference"
    class="goods-detail">
    <div class="goods-detail-opera" />
    <div class="table-box">
      <base-table
        ref="goodsDetailTable"
        :key="tableKey"
        :tableData="tableData"
        :colunmData="tableHeader"
        :disabled="v_disabled"
        :class="[getTableHeight, 'base-table']"
        :tableConfig="{
          isMultiSelect: false,
          isIndex: true,
          isShowOpera: false,
          showSummary: true,
          height: '49vh'
        }"
        @viewDetail="viewDetail"
        @rowClick="viewDetail">
        <template v-slot:tableCell="{ scope: { row, item } }">
          <template v-if="item.type === 'image'">
            <table-image :imageSrc="row[item.value]" />
          </template>
          <template v-else>
            <span class="pdl-10">{{ row[item.value] }}</span>
          </template>
        </template>
      </base-table>
      <!-- 尺码数据的表格 -->
      <base-table
        v-if="showSizeTable"
        ref="sizeTable"
        :tableData="currentSizeData"
        :colunmData="currentSizeTable"
        class="size-table pdb-8"
        :tableConfig="{
          isMultiSelect: false,
          isIndex: true,
          isShowOpera: false,
          showSummary: true,
          height: '20vh'
        }" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, globalConfigs } from '../configs'
import { TableHeaderConfig, DialogObj, Dictionary } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import { Tools } from '@/utils/tools'
import { deepCopy, transformFields } from '@/utils'
import apiUrl from '@/api/sale-center/sale-plain'
import vuexMixins from '../configs/vuex-module'
import commonApi from '@/api/common-api'

@Component({
  name: 'goods-detail',
  components: {
    baseScan: () => import('@/components/base-scan/index.vue'),
    baseDatePicker: () => import('@/components/base-datePicker/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    tableImage: () => import('@/views/report-center/report-components/table-img.vue'),
    baseInput: () => import('@/components/base-input/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  @Prop({ required: true }) formData

  showGoodsImage: boolean = false
  showSizeTable: boolean = false
  tableKey: number = 1
  tableData: any[] = []
  skuHeaderObj: Dictionary = {}
  currentSizeData: any[] = []
  currentSizeTable: TableHeaderConfig[] = []
  imageColumn: TableHeaderConfig = {
    label: '货品图片',
    value: 'goodsImage',
    en: 'Goods Image',
    type: 'image',
    lang: 'commonWord.goodsImage'
  }
  focusIndex = 0
  fixGoodsCode: string = ''
  customerFieldsMap: Dictionary<string[]> = {
    goodsFields: [],
    customer: []
  }
 tableHeader: TableHeaderConfig[] = detailConfig.differenceDetail

 get getTableHeight() {
   if (this.tableData.length < 3) {
     return 'min-table-height'
   }
   return ''
 }

  @Watch('v_status', { immediate: true })
 onv_statusChange(val, oldval) {
   if (['add', 'cancel'].includes(val)) this.reset()
 }
 @Watch('formData.receiveBillDifferenceList', { immediate: true })
  onGoodsListChange(val, oldval) {
    if (val !== oldval) {
      this.$nextTick(() => {
        this.tableData = val
        this.tableData.forEach((item) => {
          if (item.customFields) {
            for (const k in item.customFields) {
              item[k] = item.customFields[k]
            }
          }
        })
      })
    }
  }
 //  @Watch('formData', { immediate: true, deep: true })
 //   onGoodsListChange(val, oldval) {
 //     const { billGoodsList, billRealGoodsList } = this.formData
 //     const result:any[] = []
 //     // const bill = billGoodsList.filter(bill => {
 //     //   const flag:boolean = billRealGoodsList.some(real => {
 //     //     if (real.goodsCode === bill.goodsCode) {
 //     //       for (const key in bill.billSizeList) {
 //     //         result[key] = {
 //     //           goodsCode: bill.goodsCode,
 //     //           goodsName: bill.goodsName,
 //     //           barcode: bill.barcode || '',
 //     //           colorName: bill.billSizeList[key].colorName,
 //     //           sizeName: '',
 //     //           insideLength: bill.billSizeList[key].longName,
 //     //           difference: 0,
 //     //           remark: bill.remark || ''
 //     //         }
 //     //         if (bill.billSizeList[key].colorId === real.billSizeList[key].colorId) {
 //     //           result[key].difference = bill.billSizeList[key].quantity - real.billSizeList[key].quantity
 //     //         } else {
 //     //           result[key].difference = bill.billSizeList[key].quantity
 //     //         }
 //     //       }
 //     //     }
 //     //   })
 //     // })
 //   }
 activated() {
   console.log('activated adjustment-detail')
   this.getAdjustmentDetail()
 }
 async getAdjustmentDetail() {
   //  console.log(this.formData)
 }
 reset() {
   this.skuHeaderObj = {}
   this.tableData = []
   this.currentSizeData = []
   this.currentSizeTable = []
 }

 // 货品的定位
 fixGoodsCodeFn(code) {
   const index = this.tableData.findIndex((item) => item.goodsCode === this.fixGoodsCode)
   if (index === -1) {
     this._message({ message: '找不到该货号,是否输入正确的货号', type: 'warning' })
     return
   }
   ;(this.$refs.goodsDetailTable as any).tableScroll(index * 28)
   ;(this.$refs.goodsDetailTable as any).setHighLightRow(this.tableData[index])
   this.viewDetail(this.tableData[index])
 }

 // 获取当前货号的 尺码数量 只显示
 async viewDetail(row) {
   // 如果为普通物料则执行 显示已输入的数量
   if (!(row.billSizeList && row.billSizeList.length)) {
     this.showSizeTable = false
     return
   }
   this.showSizeTable = true

   if (this.skuHeaderObj[row.goodsId]) {
     this.currentSizeTable = this.skuHeaderObj[row.goodsId]
   } else {
     const res = await this._post({
       url: apiUrl.getGoodsSkuHeader,
       params: {
         moduleId: globalConfigs.realModuleId,
         goodsId: row.goodsId
       }
     })
     if (res.code === 0) {
       this.currentSizeTable = this.getSizeTableHeader(res.data)
       this.skuHeaderObj[row.goodsId] = this.currentSizeTable
     }
   }
   this.currentSizeData = row.billSizeList
 }
 // 获取sku矩阵的尺码头
 getSizeTableHeader(arr) {
   const currentSizeTable = arr.map((item) => {
     if (item.value === 'colorName' || item.value === 'longName') {
       item.width = '110px'
     } else {
       item.width = '60px'
       item.isShowTotal = true
     }
     return item
   })
   // 增加合计行
   currentSizeTable.push({
     label: '合计',
     value: 'quantity',
     width: '110px',
     isShowTotal: true
   })
   return currentSizeTable
 }

 // 获取到尺码矩阵数据
 getSkuData(dataList, billSizeList) {
   const skuData: any[] = []
   this.focusIndex = 0
   dataList.forEach((item, findex) => {
     const { refreneceList, sizeList, ...other } = item
     const obj: Dictionary = Object.assign({}, other)
     // 这里只需要在第一条时候去做执行
     if (item.colorId && findex === 0) {
       this.focusIndex += 1
     }
     if (item.longId && findex === 0) {
       this.focusIndex += 1
     }
     if (sizeList.length) {
       sizeList.forEach((size, index) => {
         // 这里是获取到对应尺码的数量
         if (billSizeList) {
           const sizeValueObj = billSizeList.find(
             (sizeValue) => sizeValue.colorId === item.colorId && sizeValue.longId === item.longId
           )
           if (sizeValueObj) {
             obj[size.fieldName] = sizeValueObj[size.fieldName] || ''
           }
         }
         obj.inputLength = index + 1
       })
     }
     skuData.push(obj)
   })
   return skuData
 }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
/*默认*/
@media (min-width: 1280px) {
  .table-box {
    /deep/.base-table {
      height: 60vh !important;
    }
    /deep/.base-table.min-table-height {
      height: 45vh !important;
    }
    /deep/.size-table {
      height: 20vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1440px*/
@media (min-width: 1440px) {
  .table-box {
    /deep/.base-table {
      height: 44vh !important;
    }
    /deep/.base-table.min-table-height {
      height: 25vh !important;
    }
    /deep/.size-table {
      height: 18vh !important;
    }
  }
}
@media (min-width: 1600px) {
  .table-box {
    /deep/.base-table {
      height: 50vh !important;
    }
    /deep/.base-table.min-table-height {
      height: 34vh !important;
    }
    /deep/.size-table {
      height: 22vh !important;
    }
  }
}
.goods-detail {
  /deep/.number-input {
    /deep/.el-input__inner {
      color: $info;
    }
  }
  .number-input {
    color: $info;
    width: 100%;
    text-align: left;
  }
  .fix-btn{
      display: inline-flex;
  }
  &-opera {
    line-height: 28px;
  }
}
.goods-checkbox {
  vertical-align: bottom;
}
.table-box {
  margin-top: 12px;
}
.base-table {
  margin-bottom: 8px;
  /deep/.el-table__body-wrapper {
    /deep/.cell {
      padding: 0 !important;
    }
  }
  /deep/.el-table__header-wrapper {
    /deep/.cell {
      padding: 0 !important;
    }
  }
}
.base-dialog {
  /deep/.el-dialog__body {
    padding: 20px 16px 12px 16px;
  }
  /deep/.dialog__footer {
    padding: 16px;
  }
}
.size-table {
  &__input {
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: none;
    border: 1px solid #f5f9ff;
    box-sizing: border-box;
    color: #353d51;
    display: inline-block;
    font-size: inherit;
    height: 28px;
    line-height: 28px;
    outline: 0;
    padding: 0 10px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
    background: #f5f9ff;
    &:focus {
      border-color: $basic;
      outline: 0;
    }
  }
}
</style>
