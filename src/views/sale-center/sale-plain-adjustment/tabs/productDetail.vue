<template>
  <div
    id="goodsDetail"
    class="goods-detail">
    <div
      class="goods-detail-opera">
      <base-scan
        :status="v_status"
        :disabled="v_disabled"
        @submitBarcode="submitBarcode"
        @fixGoodsCodeFn="fixGoodsCodeFn" />
      <barcode-record
        class="right"
        :status="v_status"
        :barcodeRecord="barcodeRecord" />
      <goods-input
        ref="goodsInput"
        class="mgl-32"
        :disabled="v_disabled"
        :status="v_status"
        :formData="formData.salePlainAdjustment"
        @goodsInput="goodsInput" />
      <el-checkbox
        v-model="showGoodsImage"
        class="goods-checkbox mgl-32">
        {{ $t('commonWord.showGoodsImage') }}
      </el-checkbox>
      <el-button
        type="text"
        size="small"
        :disabled="v_disabled"
        class="mgl-20 hover"
        @click="openFieldsSort">
        {{ $t('commonWord.fieldsSort') }}
      </el-button>
    </div>
    <div
      class="table-box">
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
          isShowOpera: true,
          showSummary: true,
          height: '49vh'
        }"
        @viewDetail="viewDetail"
        @rowClick="viewDetail">
        <template v-slot="{ scope }">
          <el-button
            id="btn_t_gray"
            type="text"
            size="mini"
            :disabled="v_disabled"
            @click.stop.prevent="deleteItem(scope)">
            {{ $t('layout.btns.delete') }}
          </el-button>
        </template>
        <template v-slot:tableCell="{ scope: { row, item, $index } }">
          <template v-if="item.type === 'image'">
            <table-image :imageSrc="row[item.value]" />
          </template>
          <template v-else-if="item.type === 'datePick'">
            <base-date-picker
              :disabled="v_disabled"
              class="no-border-input"
              :value.sync="row[item.value] " />
          </template>
          <!--对数量输入框判断 2 是普通物料  普通物料才可以手输入 -->
          <template v-else-if="item.value === 'quantity'">
            <base-input
              v-if="row.goodsType === 2"
              :value.sync="row[item.value]"
              :disabled="v_disabled"
              :type="item.type"
              class="no-border-input number-input"
              @input="singleGoodsInput($event, row)" />
            <el-button
              v-else
              type="text"
              :disabled="v_disabled"
              class="pdl-10 hover block number-input"
              @click="changeNumber(row, $index)">
              {{ row[item.value] || 0 }}
            </el-button>
          </template>
          <!-- 2 是普通物料  普通物料才可以手输入 -->
          <template v-else-if="item.type === 'number'">
            <base-input
              :value.sync="row[item.value]"
              :disabled="v_disabled"
              :type="item.type"
              class="no-border-input number-input" />
          </template>
          <template v-else-if="item.type === 'select'">
            <base-select
              :disabled="v_disabled"
              :value.sync="row[item.value]"
              class="no-border-input"
              :class="isRequire(item,row)"
              :item="{options: item[item.value + '_options']}" />
          </template>
          <template v-else-if="item.type === 'text'">
            <base-input
              :value.sync="row[item.value]"
              :disabled="v_disabled"
              :type="item.type"
              class="no-border-input" />
          </template>
          <template v-else-if="item.fieldClass === 2">
            <span class="pdl-10">{{ row.goodsFields[item.value] }}</span>
          </template>
          <template v-else-if="item.fieldClass === 3">
            <span class="pdl-10">{{ row.customFields[item.value] }}</span>
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
    <base-dialog
      :dialogObj="sizeDialog"
      class="base-dialog"
      @confirm="confirm"
      @cancel="cancel">
      <template v-slot:content>
        <div class="size-box">
          <p class="h4title">
            {{ skuDetailName }}
          </p>
          <base-table
            key="size"
            :tableData="goodsSkuData"
            :colunmData="goodsSkuTable"
            class="size-table"
            :tableConfig="{
              isMultiSelect: false,
              isIndex: false,
              height: '200px',
              isShowOpera: false,
              showSummary: true
            }">
            <template v-slot:tableCell="{ scope: { row, item, index, $index } }">
              <template v-if="item.type === 'number'">
                <input
                  v-model.number="row[item.value]"
                  v-focus="focusIndex === index + $index * row.inputLength"
                  class="size-table__input no-border-input"
                  @focus="inputChange(index + $index * row.inputLength)"
                  @keyup.stop.enter="nextFocus($event, index + $index * row.inputLength)"
                  @keyup.tab="tabNextFocus($event, index + $index * row.inputLength)"
                  @input="inputValidate(row, item.value, row[item.value])">
              </template>
            </template>
          </base-table>
        </div>
      </template>
    </base-dialog>
    <fields-sort-dialog
      ref="fieldsSort"
      :fieldsList="tableHeader"
      @confirmSort="fieldsSortFn" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig } from '../configs'
import { TableHeaderConfig, DialogObj, Dictionary } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import { Tools } from '@/utils/tools'
import { deepCopy, transformFields } from '@/utils'
import apiUrl from '@/api/sale-center/sale-plain'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import commonApi from '@/api/common-api'

interface BarcodeRecordConfig {
  id: number
  desc: string
  status: string
  infoText: string
  time: Date
  number: number
}
interface SubDataConfig {
  referenceTable: TableHeaderConfig[]
  referenceData: any[]
  sizeTable: TableHeaderConfig[]
  sizeData: any[]
}
@Component({
  name: 'goods-detail',
  components: {
    baseScan: () => import('@/components/base-scan/index.vue'),
    barcodeRecord: () => import('@/layout-components/barcode-record/index.vue'),
    goodsInput: () => import('../components/goods-input.vue'),
    baseDatePicker: () => import('@/components/base-datePicker/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    tableImage: () => import('@/views/report-center/report-components/table-img.vue'),
    fieldsSortDialog: () => import('../components/fields-sort-dialog.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  @Prop({ required: true }) formData

  showGoodsImage: boolean = false
  showSizeTable: boolean = false
  tableKey: number = 1
  sizeDialog: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '50%'
  }
  tableData: any[] = [] // 列表数据
  goodsSkuData: any[] = [] // 尺码sku数据
  goodsSkuTable: TableHeaderConfig[] = [] // 尺码数据表头
  referenceTable: TableHeaderConfig[] = [] // 参考数据表头
  referenceData: any[] = [] // 参考数据
  goodsInputIndex: number = 0 // 当前行的Index
  barcodeRecord: BarcodeRecordConfig[] = [] // 扫码记录
  sizeHeader: string[] = [] // 尺码头
  skuHeaderObj: Dictionary = {} // 缓存尺码头
  tableHeader: any[] = []
  currentSizeData: any[] = [] // 当前行的 sku 数据
  currentSizeTable: TableHeaderConfig[] = [] // 当前行 sku 表头数据
  imageColumn: TableHeaderConfig = {
    label: '货品图片',
    value: 'goodsImage',
    en: 'Goods Image',
    type: 'image',
    lang: 'commonWord.goodsImage'
  }
  focusIndex = 0 // 表格的焦点
  customerFieldsMap: Dictionary<string[]> = {
    goodsFields: [],
    customer: []
  } // 存自定义字段的值
  goodsId: string = ''
  skuDetailName: string = ''
  // isFixed: boolean = false
  // offsetTop: number = 0
  get getTableHeight() {
    if (this.tableData.length < 3) {
      return 'min-table-height'
    }
    return ''
  }
  @Watch('showGoodsImage')
  onShowGoodsImageChange(val, oldval) {
    this.$nextTick(() => {
      ;(this.$refs.baseTable as any).doLayout()
    })
    if (val) {
      this.tableHeader.splice(0, 0, this.imageColumn)
    } else {
      this.tableHeader = this.tableHeader.filter((item) => item.type !== 'image')
    }
    this.tableKey = this.tableKey + 1
  }
   @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }
  @Watch('formData.billGoodsList', { immediate: true })
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
  created() {
    this.getFields()
  }

  // 获取表头字段
  async getFields() {
    // 那些列需要合计
    const totalColumn = ['quantity', 'totalPrice']
    const typeMap = new Map([
      ['deliveryDate', 'datePick'],
      ['quantity', 'number'],
      ['remark', 'text'],
      ['default', '']
    ])
    const res = await this._post({
      url: commonApi.getCustomHeader,
      data: {
        data: {
          moduleId: this.m_moduleId
        }
      }
    })
    if (res.code === 0) {
      this.customerFieldsMap.customer = []
      this.tableHeader = res.data.map((item) => {
        // 自定义字段 map
        const customer = item.customizeColumnOptionDto
        if (item.type === 3 && item.fieldName) {
          this.customerFieldsMap.customer.push(item.fieldName)
        }
        const obj: any = {
          label: item.columnTitle,
          value: item.fieldName,
          fieldClass: item.type, // 字段分类 1是固定字段 2是货品模块字段 3是自定义字段
          type: customer ? customer.typeName : typeMap.get(item.fieldName),
          index: item.orderNumber,
          width: item.fieldName === 'deliveryDate' ? '140px' : '',
          id: item.id,
          isShowTotal: totalColumn.includes(item.fieldName)
        }
        // 如果有自定义字段
        if (customer) {
          obj.required = customer.requireFlag
          // 如果 为下拉框
          if (customer.options) {
            obj[`${item.fieldName}_options`] = transformFields(customer.options, {
              label: 'value',
              value: 'id'
            })
          }
        }
        return obj
      }).filter((item) => item.value)
      this.tableKey = this.tableKey + 1
    }
  }
  reset() {
    ;(this.$refs.baseScan as any).reset()
    ;(this.$refs.goodsInput as any).reset()
    this.skuHeaderObj = {}
    this.currentSizeData = []
    this.currentSizeTable = []
    this.goodsSkuData = []
    this.goodsSkuTable = []
  }
  //   监听 enter
  nextFocus(event, index) {
    event.preventDefault()
    //   因为 原本的 index 是当前处于那列的数值 而表格有多行 所以 这里的 index 需要 行数 * 当前行 input 数量
    return (this.focusIndex = index + 1)
  }
  //   监听 tab
  tabNextFocus(event, index) {
    return (this.focusIndex = index)
  }
  //   监听 fouce
  inputChange(index) {
    this.focusIndex = index
  }

  deleteItem({ $index }) {
    this.tableData.splice($index, 1)
  }
  // 打开字段排序弹窗
  openFieldsSort() {
    (this.$refs.fieldsSort as any).open()
  }
  // 表格必填字段高亮显示
  isRequire(item, row) : string | void {
    if (item.required) {
      if (!row[item.value]) {
        return 'red-border'
      }
    }
  }
  // 字段顺序排序
  async fieldsSortFn(sortList) {
    const billColumnSettingList = sortList.map((item) => {
      return {
        orderNumber: item.index,
        id: item.id
      }
    })
    const res = await this._put({ url: commonApi.updatedCustomHeaderSort, data: {
      data: {
        billColumnSettingList
      }
    }})
    if (res.code === 0) {
      this.$message({ message: '排序成功', type: 'success' })
      //   更新排序
      this.tableHeader = sortList
      this.tableKey += 1
    }
  }
  // 扫条形码
  submitBarcode({ barcode, number }) {
    // 需要先选择渠道编号/价格类型
    if (!this.formData.salePlainAdjustment.salePlanBillId) {
      this._message({ message: '请先选择原单号', type: 'warning' })
      return
    }
    this.addGoods(barcode, number)
  }
  // 单一物料输入数量改变价格
  singleGoodsInput(value, row) {
    // this.$set(row, 'totalPrice', Number((row.quantity * Number(row.balancePrice)).toFixed(2)))
    row.totalPrice = value * Number(row.balancePrice)
  }
  // 列表新增 条形码 然后滚动到最底行
  async addGoods(barcode, number) {
    const res = await this._post({
      url: `${apiUrl.scan}`,
      data: {
        data: {
          keyword: barcode,
          channelId: this.formData.salePlainAdjustment.channelId,
          priceTypeId: this.formData.salePlainAdjustment.priceTypeId
        }
      }
    })
    if (res.code === 0) {
      const { barcodeScanResp, goodsSkuDto, goodsFields, ...otherData } = res.data
      const goodsCode = otherData.goodsCode
      // 先去列表里面找 如果未找到该条形码对应的 货号 则往列表里面添加一条
      let matchObjIndex = this.tableData.findIndex((item) => item.goodsCode === goodsCode)
      const customFields = {}
      this.customerFieldsMap.customer.forEach((item) => {
        customFields[item] = ''
      })
      // 如果没有在当前列表中匹配到 则直接创建一条
      if (matchObjIndex === -1) {
        // 这里需要合并 固定字段 货品配置字段 自定义字段
        // 往列表里面添加一条数据
        this.tableData.push(Object.assign(
          {},
          otherData,
          { goodsFields },
          { customFields })
        )
        matchObjIndex = this.tableData.length - 1
      }

      // 根据该条形码 获取到的 颜色 内长 找到对应的 SKU 并且添加数量
      this.getOnlySkuWithValue(matchObjIndex, barcodeScanResp, number)

      this.tableKey = this.tableKey + 1

      // 计算总数量 如果有填写扫码数量
      this.editNum(matchObjIndex, number)

      ;(this.$refs.goodsDetailTable as any).tableScroll(matchObjIndex * 28)
      // 高亮
      ;(this.$refs.goodsDetailTable as any).setHighLightRow(this.tableData[matchObjIndex])

      // 往扫码记录里面添加一条数据
      this.addBarcodeRecord(otherData, number)
    }
  }
  // 根据该条形码解析到的 颜色 内长 找到 billSizeList sku矩阵信息 对应的skn 并且添加数量
  getOnlySkuWithValue(matchObjIndex, barcodeScanResp, number) {
    const currentTable = this.tableData[matchObjIndex]
    if (currentTable.billSizeList) {
      currentTable.billSizeList.forEach((item) => {
        // 找到是否有 颜色 和内长的  不同尺码则往这条数据里面加尺码
        if (item.colorId === barcodeScanResp.colorId && item.longId === barcodeScanResp.longId) {
          if (item[barcodeScanResp.fieldName]) {
            // 如果是相同尺码则累加
            item[barcodeScanResp.fieldName] = item[barcodeScanResp.fieldName] + number
          } else {
            // 不同尺码则添加尺码
            item[barcodeScanResp.fieldName] = number
          }
        } else {
          // 如果没有找到尺码和内长相同的 则添加一条数据
          currentTable.billSizeList.push({
            colorName: `${barcodeScanResp.colorCode}-${barcodeScanResp.colorName}`,
            longName: barcodeScanResp.longName,
            colorId: barcodeScanResp.colorId,
            longId: barcodeScanResp.longId,
            [barcodeScanResp.fieldName]: number > 0 ? number : 0
          })
        }
      })
    } else {
      const billSizeList: any[] = []
      currentTable.billSizeList.push({
        colorName: `${barcodeScanResp.colorCode}-${barcodeScanResp.colorName}`,
        longName: barcodeScanResp.longName,
        colorId: barcodeScanResp.colorId,
        longId: barcodeScanResp.longId,
        [barcodeScanResp.fieldName]: number > 0 ? number : 0
      })
      this.$set(currentTable, 'billSizeList', billSizeList)
    }
  }
  // 货品录入
  goodsInput(row) {
    // 根据条码匹配到数据
    this.goodsInputIndex = this.tableData.findIndex((item) => item.goodsCode === row.goodsCode)
    const { barcodeScanResp, goodsFields, ...otherData } = row
    const customFields = {}
    this.customerFieldsMap.customer.forEach((item) => {
      customFields[item] = ''
    })
    if (this.goodsInputIndex === -1) {
      // 往列表里面添加一条数据
      this.tableData.push(Object.assign(
        {},
        otherData,
        { goodsFields },
        { customFields })
      )
      this.tableKey = this.tableKey + 1
      // 滚动到最底部
      ;(this.$refs.goodsDetailTable as any).tableScrollBottom()
      // 高亮
      ;(this.$refs.goodsDetailTable as any).setHighLightRow(
        this.tableData[this.tableData.length - 1]
      )
    } else {
      // 如果有在列表中找到数据 滚动到当前行并且高亮
      ;(this.$refs.goodsDetailTable as any).tableScroll(this.goodsInputIndex * 28)
      ;(this.$refs.goodsDetailTable as any).setHighLightRow(this.tableData[this.goodsInputIndex])
    }

    // 弹出填写数量的弹窗
    const currentGoodsIndex =
      this.goodsInputIndex === -1 ? this.tableData.length - 1 : this.goodsInputIndex
    this.changeNumber(this.tableData[currentGoodsIndex], currentGoodsIndex)
  }
  // 货品的定位
  fixGoodsCodeFn(code) {
    const index = this.tableData.findIndex((item) => item.goodsCode === code)
    if (index === -1) {
      this._message({ message: '找不到该货号,是否输入正确的货号', type: 'warning' })
      return
    }
    ;(this.$refs.goodsDetailTable as any).tableScroll(index * 28)
    ;(this.$refs.goodsDetailTable as any).setHighLightRow(this.tableData[index])
    this.viewDetail(this.tableData[index])
  }
  // 计算数量和金额
  editNum(index, num) {
    const row = this.tableData[index]
    const newQuantity = row.quantity ? Number(row.quantity) + num : num
    this.$set(row, 'quantity', newQuantity >= 0 ? newQuantity : 0)
    this.$set(row, 'totalPrice', Number((row.quantity * Number(row.balancePrice)).toFixed(2)))
  }
  // 扫码记录新增

  addBarcodeRecord(item, number, type = 'success') {
    this.barcodeRecord.unshift({
      id: item.goodsCode,
      desc: item.skuName,
      time: Tools.getCurrentData(),
      status: type,
      number,
      infoText: type === 'success' ? '扫码成功' : '扫码失败'
    })
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
          moduleId: this.m_moduleId,
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
  inputValidate(row, key, value) {
    if (isNaN(value)) {
      row[key] = 0
    }
    // if (Number(value) < 0) {
    //   this._message({ message: '不能输入负数', type: 'warning' })
    //   row[key] = 0
    // }

    this.culcalTotal()
  }
  //   计算小计行
  culcalTotal() {
    this.goodsSkuData.forEach((item) => {
      item.quantity = 0
      for (const k in item) {
        if (this.sizeHeader.includes(k)) item.quantity = Number(item[k]) + Number(item.quantity)
      }
    })
  }

  changeNumber(row, index) {
    this.goodsInputIndex = index
    // 如果是单一物料也不执行下面的逻辑 type === 2 是单一物料
    if (row.goodsType === 2) return
    this.sizeDialog.isShowDialog = true
    this.sizeDialog.title = this.$t('commonWord.inputNumber')

    this.getSkuList(row)
  }

  validateTable() {
    return this.tableData.some((item) => {
      return this.tableHeader.some((fields):boolean | void => {
        if (fields.required) {
          if (!item[fields.value]) {
            this.$message({ message: `货品明细,${fields.label}未填写`, type: 'warning' })
            this.$nextTick(() => {
              (this.$refs.goodsDetailTable as any).setHighLightRow(item)
            })
            return true
          }
        }
      })
    })
  }
  cancel() {
    const currentGoodsIndex = this.goodsInputIndex === -1 ? this.tableData.length - 1 : this.goodsInputIndex
    if (!this.tableData[currentGoodsIndex].billSizeList) {
      this.$set(this.tableData[currentGoodsIndex], 'billSizeList', [])
      this.$nextTick(() => {
        this.viewDetail(this.tableData[currentGoodsIndex])
      })
    }
  }
  // 数量录入确定
  confirm() {
    let total = 0
    this.goodsSkuData.forEach((item) => {
      total += item.quantity
    })

    const currentGoodsIndex = this.goodsInputIndex === -1 ? this.tableData.length - 1 : this.goodsInputIndex
    // 填入具体行的数据 如果是 -1 则是在最末尾
    // 这里是总数 直接赋值 不需要累加
    const row = this.tableData[currentGoodsIndex]
    this.$set(row, 'quantity', total)
    this.$set(row, 'totalPrice', Number((row.quantity * Number(row.balancePrice)).toFixed(2)))
    // 往 tableData 里面增加尺码明细数据
    const sizeDetail: any[] = deepCopy(this.goodsSkuData)
    // 这里只更新输入了的数据
    const updateSizeDetail = sizeDetail.filter((item) => {
      return this.sizeHeader.some((size) => item[size])
    })

    this.$set(this.tableData[currentGoodsIndex], 'billSizeList', updateSizeDetail)
    this.$nextTick(() => {
      this.viewDetail(this.tableData[currentGoodsIndex])
    })
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
              (sizeValue) =>
                sizeValue.colorId === item.colorId && sizeValue.longId === item.longId
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
  async getSkuList(row) {
    this.sizeHeader = []
    const res = await this._post({
      url: apiUrl.getGoodsSku,
      params: {
        moduleId: this.m_moduleId,
        goodsId: row.goodsId,
        billGoodsId: row.billGoodsId
      }
    })
    if (res.code === 0) {
      const { dataList, headerList } = res.data
      if (!dataList) {
        this._message({ message: '没有尺码数据', type: 'warning' })
        this.goodsSkuData = []
        this.goodsSkuTable = []
        return
      }
      const skuTable: TableHeaderConfig[] = []
      const skuData: any[] = []
      const referenceData: any[] = []
      this.goodsSkuData = this.getSkuData(dataList, row.billSizeList)

      this.skuDetailName = `${row.goodsName}-${row.goodsType === 1 ? '普通物料' : '单一物料'}`
      this.goodsSkuTable = headerList.map((item) => {
        if (item.value.indexOf('s') === 0) {
          item.type = 'number'
          item.isShowTotal = true
          item.width = '60px'
          this.sizeHeader.push(item.value)
        }
        return item
      })
      this.goodsSkuTable.push({ label: '合计', value: 'quantity', fixed: 'right', isShowTotal: true })
      // 合并小计行
      this.culcalTotal()
      // this.getRefenceData(dataList[0])
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
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
  }
  &-opera{
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
  margin-bottom: 12px;
  /deep/.el-table__body-wrapper{
    /deep/.cell {
        padding: 0 !important;
      }
  }
  /deep/.el-table__header-wrapper{
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
