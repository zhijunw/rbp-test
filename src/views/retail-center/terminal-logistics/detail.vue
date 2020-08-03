<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData.terminalLogistics"
      @import="importGoods"
      @save="save" />
    <!-- 表单列表 -->
    <div
      class="formlist-box"
      :class="[toggleFlag ? 'height-auto' : 'fix-height']">
      <formlist
        ref="formlist"
        :formList="formList"
        :formData="formData.terminalLogistics"
        :disabled="v_disabled"
        :status="v_status"
        :showAllForm="false"
        class="form-module mgt-12"
        @toggle="toggle">
        <template v-slot:channelId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`channelHighSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="sendId ? true : false"
              @fuzzyChange="channelIdChangeHock"
              @singleChannelChoose="(value)=>{singleChannelChoose(value,row.value)}" />
          </el-form-item>
        </template>
        <template v-slot:toChannelId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`channelHighSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="sendId ? true : false"
              @fuzzyChange="toChannelIdChangeHock"
              @singleChannelChoose="(value)=>{singleChannelChoose(value,row.value)}" />
          </el-form-item>
        </template>
        <template v-slot:sendId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.code || row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`channelHighSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="row.disabled || v_disabled"
              @getFilterOptions="searchFilter"
              @fuzzyChange="sendIdChangeHock"
              @singleChannelChoose="(value)=>{singleChannelChoose(value,row.value)}" />
          </el-form-item>
        </template>
      </formlist>
      <div
        ref="totalInfo"
        class="total-info total-hover"
        @mouseleave="leaveImage"
        @mouseenter.prevent="enterImage($event)">
        <div
          v-for="item in totalInfo"
          :key="item.id"
          class="total-info-box">
          <p class="f12">
            {{ item.label }}
          </p>
          <span
            class="f18 bold"
            :class="item.class">{{ item.total }} / {{ item.price }}</span>
        </div>
      </div>
    </div>
    <mulite-entry
      :disabled="v_disabled"
      @submitInput="submitBarcode" />
    <common-tabs
      id="tabBox"
      ref="commonTab"
      :tabMapOptions="tabMapOptions"
      :activeName.sync="activeName"
      class="mgt-10 pdb-12">
      <template v-slot:actualNumber>
        <goods-detail
          id="actualNumber"
          ref="actualNumber"
          :goodsDetailData="goodsDetailData"
          :formData="formData"
          :disabled="v_disabled" />
      </template>
      <template v-slot:originalNumber="{item}">
        <original-detail
          v-if="item.value === activeName"
          ref="originalNumber"
          :formData="formData" />
      </template>
      <template v-slot:differenceNumber="{item}">
        <difference-detail
          v-if="item.value === activeName"
          ref="differenceNumber"
          :formData="formData" />
      </template>
      <template v-slot:associationBox="{item}">
        <association-box
          v-if="item.value === activeName"
          ref="associationBox" />
      </template>
      <template v-slot:uniqueCode="{item}">
        <unique-code
          v-if="item.value === activeName"
          ref="uniqueCode" />
      </template>
    </common-tabs>
    <systemDialog ref="systemDialog" />
    <importGoodsDialog ref="importGoodsDialog" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, initFormData, globalConfigs } from './configs'
import { Dictionary, AnchorConfig, Response } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/retail-center/terminal-logistics'
import commonApiUrl from '@/api/common-api/index'
import { transformFields } from '@/utils'
// import vuexMixins from './configs/vuex-module'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
import { Tools } from '@/utils/tools'
import { mock } from './configs/mock'
const FIX_PROPS_TABS = {
  'bill_main': 'formList'
}
@Component({
  name: 'terminalLogistics-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    commonTabs: () => import('@/layout-components/common-tabs/index.vue'),
    goodsDetail: () => import('./tabs/productDetail.vue'),
    freightInfo: () => import('./tabs/freight.vue'),
    auditRecord: () => import('./tabs/audit-record.vue'),
    adjustmentRecord: () => import('./tabs/adjustment-record.vue'),
    adjustmentDetail: () => import('./tabs/adjustment-detail.vue'),
    channelHighSearch: () => import('@/components/advanced-search/index.vue'),
    originalDetail: () => import('./tabs/original-detail.vue'),
    differenceDetail: () => import('./tabs/difference-detail.vue'),
    associationBox: () => import('./tabs/association-box.vue'),
    uniqueCode: () => import('./tabs/unique-code.vue'),
    importGoodsDialog: () => import('./components/importGoods.vue'),
    systemDialog: () => import('./components/system-dialog.vue'),
    muliteEntry: () => import('./components/mulite-entry.vue')
  }
})
export default class App extends mixins(detailMixins, vuexMixins) {
  // 观察 ID
  @Watch('v_id', { immediate: true })
  onv_idChange(val, oldval) {
    if (val && val !== oldval) {
      this.activeName = 'actualNumber'
      console.log('v_id', val)
      Tools.debounce(this.viewDetail(val.split('_')[0]), 50)
    }
  }
  @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }
  @Watch('formData.billGoodsList', { immediate: true, deep: true })
  onGoodsListChange(val, oldval) {
    if (val.length) {
      // 这里是为了监听货品详情里面数量的变化去该改变显示数
      let total = 0
      let totalPrice = 0
      val.forEach((item) => {
        if (item.quantity) {
          total += item.quantity
        }
        if (item.totalPrice) {
          totalPrice = totalPrice + Number(item.totalPrice)
        }
      })
      this.totalInfo[0].value = total
      this.totalInfo[1].value = `${totalPrice}`
    }
  }

  formList = detailConfig.formList
  toggleFlag: boolean = true
  formData: Dictionary<any> = initFormData()
  activeName: string = 'actualNumber'
  tabMapOptions = detailConfig.tabsList
  anchorList: AnchorConfig[] = []
  totalInfo:any[] = detailConfig.totalInfo
  toChannelArray: any[] = [];
  sendId: any = '';
  channelId: any =''
  toChannelId: any = '' // 收货渠道
  goodsDetailData:any = {}
  created() {
    this.getModuleCustomerFileds()
    this.getChnnelOption()
  }
  mounted() {
    console.log(this.formList)
  }
  // tabClick(val) {
  //   // this.$emit('update:activeName', val.name)
  //   this.activeName = val.name
  // }
  async getModuleCustomerFileds() {
    this.customerFieldsTabs = []
    // 获取自定义字段和分类
    await this.m_getModuleCustomerFiledsFn(
      FIX_PROPS_TABS,
      this.formData.terminalLogistics,
      globalConfigs.realModuleId
    )
    this.toggle(true)
  }
  // 获取详情
  async viewDetail(id) {
    const res = await this._get({
      url: `${apiUrl.details}`,
      params: {
        id: id,
        moduleId: globalConfigs.realModuleId
      }
    })
    if (res.code === 0) {
      const { billGoodsList, billLogistics, billRealGoodsList, receiveBillDifferenceList, customFieldMap, ...other } = res.data
      const { status, flowStatus, flowDto } = other
      this.$nextTick(() => {
        this.formData = Object.assign(
          {},
          { terminalLogistics: Object.assign({}, other, customFieldMap, { sendId: other.sendId }) },
          { customFieldMap },
          {
            billGoodsList: billGoodsList || [],
            billLogistics: billLogistics || {},
            billRealGoodsList: billRealGoodsList || [],
            receiveBillDifferenceList
          }
        )
        // 更新渠道信息
        const channel:any[] = ['channelId', 'toChannelId']
        channel.forEach(item => {
          this.$nextTick(() => {
            (this.$refs[`channelHighSearch${item}`] as any).upDateOptionsData([
              { label: `${other[`${item.replace('Id', '')}Code`]}-${other[`${item.replace('Id', '')}Name`]}`, value: other[item] }
            ])
          })
        })
        // 更新发货单信息
        this.$nextTick(() => {
          (this.$refs['channelHighSearchsendId'] as any).upDateOptionsData([
            { label: other.sendBillNo, value: other.sendId }
          ])
        })
        this.$nextTick(() => {
          this.computeReceiveDiffrence()
        })
        // 写入配置
        this.sendId = other.sendId
        this.toChannelId = other.toChannelId
        this.priceType = other.priceTypeId
        this.sendRelationCheck({ boolean: false, row: {}})
        this.m_dealActivityStatus(status, flowStatus, flowDto)
      })
      console.log('other', other)
      console.log(this.$store)
      this.$store.dispatch(`${this.m_moduleId}/v_setBtnsAuth`, other.status + '')
    }
  }
  // 计算差异数
  get getBillCount() {
    const bill = [this.formData.billGoodsList.reduce((prev, cur) => (cur.quantity || 0) + prev, 0),
      this.formData.billGoodsList.reduce((prev, cur) => (cur.totalPrice || 0) + prev, 0)]
    return {
      total: bill[0],
      price: bill[1]
    }
  }
  get getBillRealCount() {
    const real = [this.formData.billRealGoodsList.reduce((prev, cur) => (cur.quantity || 0) + prev, 0),
      this.formData.billRealGoodsList.reduce((prev, cur) => (cur.totalPrice || 0) + prev, 0)]
    return {
      total: real[0],
      price: real[1]
    }
  }
  get getReceiveCount() {
    return {
      total: this.getBillCount.total - this.getBillRealCount.total,
      price: this.getBillCount.price - this.getBillRealCount.price
    }
  }
  computeReceiveDiffrence() {
    const sum = [this.getReceiveCount, this.getBillRealCount, this.getBillCount]
    this.totalInfo.forEach((item, index) => {
      item.total = sum[index].total
      item.price = `¥${sum[index].price}`
    })
  }
  reset() {
    this.m_reset()
    this.sendId = ''
    this.toChannelId = ''
    this.channelId = ''
  }
  searchFilter({ query }) {
    console.log(111)
  }
  // 收货渠道更改事件
  toChannelIdChangeHock(target, callback) {
    const { value } = target
    if (value === this.formData.terminalLogistics.channelId && value.toString().length > 0) {
      this.$message.warning(`收货渠道与发货渠道一致,请重新选择`)
      this.$nextTick(() => {
        this.formData.terminalLogistics.toChannelId = ''
      })
    } else if (!this.sendId) {
      if (value !== this.toChannelId && this.formData.billGoodsList.length > 0) {
        (this.$refs['systemDialog'] as any).message('修改收货渠道可能会根据渠道的分销政策更新价格类型，从而导致货品明细的折扣和结算价发生变化，是否继续？', (status) => {
          if (status) {
            // 确认修改[修改价格]
            this.toChannelId = value;
            (this.$refs['goodsDetail'] as any).updateGoodsByChannelIdOrPriceType(this.toChannelId, this.priceType)
            callback && callback()
          } else {
            // 取消还原
            this.formData.terminalLogistics.toChannelId = this.toChannelId
          }
        })
      }
    }
    this.getSendOption()
  }
  // 发货单自定义筛选
  async getSendOption() {
    const param:any = {}
    const { highSearch } = ((this.$refs.channelHighSearchsendId as any).$refs)
    const { highSearchConfig } = (this.$refs.channelHighSearchsendId as any)
    const { dialogSearchConfig } = highSearchConfig
    const channel:string[] = ['channelId', 'toChannelId']
    dialogSearchConfig.formList.forEach(item => {
      if (channel.indexOf(item.value) > -1) {
        item.disabled = !!(this.formData.terminalLogistics[item.value])
        const { select } = highSearch.formData
        if (this.formData.terminalLogistics.channelId) select['channelId'] = [this.formData.terminalLogistics.channelId]
        if (this.formData.terminalLogistics.toChannelId) select['toChannelId'] = [this.formData.terminalLogistics.toChannelId]
      }
    })
    // upDateOptionsData
    console.log(highSearch)
    highSearchConfig.customerQuery = !(!this.formData.terminalLogistics.channelId && !this.formData.terminalLogistics.toChannelId)
    if (this.formData.terminalLogistics.channelId) param['channelId'] = [this.formData.terminalLogistics.channelId]
    if (this.formData.terminalLogistics.toChannelId) param['toChannelId'] = [this.formData.terminalLogistics.toChannelId]
    const res: Response = await this._post({
      url: commonApiUrl.sendHighSearch,
      data: {
        data: param,
        page: 1,
        pageSize: 100
      }
    })
    if (res.code === 0) {
      (this.$refs.channelHighSearchsendId as any).optionsData = transformFields(res.data, { label: 'code', value: 'id' }, true)
    }
  }
  // 发货渠道更改时间
  channelIdChangeHock(target) {
    const { value } = target
    if (value === this.formData.terminalLogistics.toChannelId && value.toString().length > 0) {
      this.$message.warning(`收货渠道与发货渠道一致,请重新选择`)
      this.$nextTick(() => {
        this.formData.terminalLogistics.channelId = ''
      })
    }
    this.getSendOption()
  }
  singleChannelChoose({ row }, name) {
    if (row.id) {
      const updateFunc = () => {
        this.$set(this.formData.terminalLogistics, name, row.code || row.id)
        this.$nextTick(() => {
          (this.$refs[`channelHighSearch${name}`] as any).upDateOptionsData([{
            label: name === 'sendId' ? row.billNo : `${row.code}-${row.name}`,
            value: row.code || row.id
          }])
        })
      }
      // 联动基础下拉选择事件
      switch (name) {
        case 'sendId':
          this.sendIdChangeHock({ value: row.id, matchValArr: [row] }, updateFunc)
          break
        case 'toChannelId':
          this.toChannelIdChangeHock({ value: row.id }, updateFunc)
          break
        case 'channelId':
          updateFunc()
          break
      }
    } else {
      this.$set(this.formData.terminalLogistics, name, '')
    }
  }
  toggle(toggleFlag) {
    this.toggleFlag = toggleFlag
    this.$nextTick(() => {
      const formHieght = (this.$refs.formlist as any).$el.clientHeight
      const height = this.toggleFlag ? `${formHieght}px` : '72px'
      ;(this.$refs.totalInfo as any).style.height = height
    })
  }
  enterImage(e) {
    // const formHieght = `${Math.ceil(this.formList.length / 4) * 60 + 6}`
    const formHieght = (this.$refs.formlist as any).$el.clientHeight
    const totalInfoHeight = `${this.totalInfo.length * 48 + 32}`
    const maxHeight = Math.max(Number(formHieght), Number(totalInfoHeight))
    ;(this.$refs.totalInfo as any).style.height = this.toggleFlag ? `${maxHeight}px` : `${totalInfoHeight}px`
    ;(this.$refs.totalInfo as any).style.transition = 'all 0.2s ease'
  }
  leaveImage() {
    const formHieght = (this.$refs.formlist as any).$el.clientHeight
    const height = this.toggleFlag ? `${formHieght}px` : '72px'
    ;(this.$refs.totalInfo as any).style.height = height
    ;(this.$refs.totalInfo as any).style.transition = 'all 0.2s ease'
  }
  // 保存
  async save() {
    // 校验表头字段
    await (this.$refs.formlist as any).saveTable()
    const flag = (this.$refs.actualNumber as any).validateTable()
    if (flag) return

    const confirmText = this.$t('dialogPrompt.save')

    this._confirm({ content: confirmText })
      .then(async() => {
        const { terminalLogistics, billGoodsList, billRealGoodsList, customFieldMap, ...other } = this.formData
        // 把自定义字段值都放到  customFieldMap 中
        for (const key in customFieldMap) {
          if (Object.keys(terminalLogistics).includes(key)) {
            customFieldMap[key] = terminalLogistics[key]
            delete terminalLogistics[key]
          }
        }
        // 货品明细的自定义字段赋值
        const formatBillGoodsList = billRealGoodsList.map((item) => {
          if (item.customFields) {
            for (const k in item.customFields) {
              item.customFields[k] = item[k] || ''
              delete item[k]
            }
          }
          return item
        })
        const saveData = {
          data: Object.assign(
            { moduleId: globalConfigs.realModuleId },
            { billGoodsList: billGoodsList.length ? billGoodsList : formatBillGoodsList },
            { billRealGoodsList: formatBillGoodsList },
            { customFieldMap: customFieldMap || {}},
            other,
            terminalLogistics
          )
        }
        console.log(saveData)
        const url = this.v_status === 'add' ? apiUrl.create : apiUrl.update
        const res = await this[this.v_status === 'add' ? '_post' : '_put']({ url, data: saveData })
        if (res.code === 0) this.m_dealSaveAction(res)
      })
      .catch(() => {})
  }
  // 货品录入
  importGoods() {
    ((this.$refs['goodsDetail'] as any).$refs['fileImport'] as any).ClickEvent()
  }
  async getChnnelOption() {
    console.log('获取下拉数据')
    const res: Response = await this._post({
      url: commonApiUrl.channelFuzzy,
      params: {
        keyWord: ''
      }
    })
    if (res.code === 0) {
      const channel:any[] = ['channelId', 'toChannelId']
      channel.forEach(item => {
        this.$nextTick(() => {
          (this.$refs[`channelHighSearch${item}`] as any).optionsData = transformFields(res.data, { label: 'name', value: 'id' }, true)
        })
      })
    }
  }
  sendIdChangeHock(target, callback) {
    const { value, matchValArr } = target
    console.log(target)
    console.log(this.$refs)
    // 不一致才执行
    value !== this.sendId && (() => {
      // 发货单已有选择
      if (this.sendId) {
        (this.$refs['systemDialog'] as any).message('修改发货单将清空下方货名明细，是否继续？', (status) => {
          if (status) {
            // 清空货品明细
            this.sendId = value
            this.formData.billGoodsList = []
            this.sendId && (this.$refs['importGoodsDialog'] as any).showImportGoodsDialog(value, function(data, selectRow, array) {
              this.$set(this.formData.terminalLogistics, 'toChannelId', data.toChannelId)
              this.$set(this.formData.terminalLogistics, 'channelId', data.channelId)
              this.sendGoodsListReadIntoTable(selectRow, array)
              callback && callback()
            }.bind(this))
          } else {
            // 还原
            this.formData.terminalLogistics.sendId = this.sendId
          }
        })
      } else {
        this.sendId = value
        this.formData.billGoodsList = [];
        (this.$refs['importGoodsDialog'] as any).showImportGoodsDialog(value, (data, selectRow, array) => {
          this.$set(this.formData.terminalLogistics, 'toChannelId', data.toChannelId)
          this.$set(this.formData.terminalLogistics, 'channelId', data.channelId)
          this.sendGoodsListReadIntoTable(selectRow, array)
          callback && callback()
        })
      }
    })()
  }
  // 货品列表写入底部Table
  sendGoodsListReadIntoTable(selectRow, array) {
    console.log(selectRow, array)
    selectRow.forEach(row => {
      row.goodsFields = {
        goodsBuildDate: '',
        goodsStyleName: ''
      }
    })
    this.formData.billGoodsList = [...this.formData.billGoodsList, ...array]
    this.formData.billRealGoodsList = [...selectRow]
  }

  // 扫条形码
  async submitBarcode({ barcode, number, currentType, allCode }) {
    this.goodsDetailData = {
      barcode,
      number,
      currentType,
      allCode
    }
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
  .formlist-box {
    display: flex;
    position: relative;
    .form-module {
      flex: 1;
      margin-right: 180px;
    }
    .total-info {
      // position: relative;
      // box-sizing: 1000;
      // z-index: 1000;
      // background: #fff;
      position: absolute;
      right: 0;
      z-index: 100;
      background: #fff;
      width: 170px;
      padding: 16px;
      box-sizing: border-box;
      border: 1px solid #eee;
      border-radius: 4px;
      margin: 12px 0 0 8px;
      // max-height: 218px;
      height: 72px;
      // overflow: auto;
      overflow: hidden;
      &:hover {
        box-shadow: 0px 0px 12px 0px rgba(166, 167, 173, 0.3);
      }
    }
    .total-info-box {
      line-height: 1.5;
      margin-bottom: 6px;
      &:last-child {
        margin-bottom: 0;
      }
      .fg-red {
        color: #FA4150;
      }
      .fg-blue {
        color: #186CFF;
      }
    }
  }
  .fix-btn{
      display: inline-flex;
  }
  .fix-height {
    height: 80px;
    transition: height 1s ease;
  }
  .height-auto {
    height: auto;
    transition: height 1s ease;
  }
  .mulite-entry {
    margin: 10px 0 0 0;
  }
}
</style>
