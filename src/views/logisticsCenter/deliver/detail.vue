<template>
  <div class="detail">
    <Message ref="CustomMessage">
      <template
        slot="importGoods"
        slot-scope="{data}">
        <base-table
          :tableData="data.tableData"
          :colunmData="data.tableHeader"
          :tableConfig="{
            isMultiSelect: true,
            isIndex: true,
            isShowOpera:false
          }"
          @select="(selectArray)=>{data.selectArray = selectArray.section}" />
      </template>
    </Message>
    <!-- 操作栏 -->
    <operation
      :type="type"
      :formData="formData.deliver"
      @import="importGoods"
      @save="save" />
    <!-- 表单列表 -->
    <div
      class="formlist-box"
      :class="[toggleFlag ? 'height-auto' : 'fix-height']">
      <formlist
        :key="render"
        ref="formlist"
        :formList="formList"
        :formData="formData.deliver"
        :disabled="v_disabled"
        :status="v_status"
        :showAllForm="false"
        class="form-module mgt-12"
        @priceTypeIds="priceTypeIdChangeHock"
        @toggle="toggle">
        <template v-slot:channelId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`advancedSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="row.alwaysDisabled || row.disabled ||v_disabled"
              @singleChannelChoose="singleChannelChoose" />
          </el-form-item>
        </template>
        <template v-slot:toChannelId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`advancedSearch${row.value}`"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="row.alwaysDisabled || row.disabled || v_disabled"
              @fuzzyChange="toChannelIdChangeHock"
              @singleChannelChoose="singleChannelChoose" />
            <!--  @fuzzyChange="toChannelIdChangeHock"-->
          </el-form-item>
        </template>
        <template v-slot:noticeId="{ row, formData }">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <channel-high-search
              :ref="`advancedSearch${row.value}`"
              :clearable="false"
              :defaultFilter="defaultFilter"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
              :disabled="row.alwaysDisabled || row.disabled || v_disabled"
              @fuzzyChange="noticeBillEvent"
              @singleChannelChoose="noticeBillEvent" />
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
            :class="item.class">{{ item.value }}</span>
        </div>
      </div>
    </div>
    <!--录入-->
    <muliteEntry
      :status="v_status"
      style="margin-top: 10px"
      :noticeId="formData.deliver.noticeId"
      @submitInput="submitInput" />
    <common-tabs
      id="tabBox"
      ref="commonTab"
      :tabMapOptions="tabMapOptions"
      :activeName.sync="activeName"
      class="mgt-10 pdb-12">
      <template v-slot:goodsDetail>
        <goods-detail
          id="goodsDetail"
          ref="goodsDetail"
          :noticeBillData="noticeBillData"
          :formData="formData" />
      </template>
      <template v-slot:freightInfo="{item}">
        <freight-info
          v-if="item.value === activeName"
          ref="freightInfo"
          :formData="formData" />
      </template>
      <template v-slot:associatedBox="{item}">
        <relateBox
          v-if="item.value === activeName"
          ref="freightInfo"
          :formData="formData" />
      </template>
      <template v-slot:onlyKey="{item}">
        <onlyKey
          v-if="item.value === activeName"
          ref="freightInfo"
          :formData="formData" />
      </template>
    </common-tabs>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import {
  detailConfig,
  initFormData,
  globalConfigs,
  deliveryFormList,
  deliveryAutoFromList,
  importGoodsHeader
} from './configs'
import { Dictionary, AnchorConfig, Response } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/logisticsCenter/deliver'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
import { Tools } from '@/utils/tools'
import BaseTable from '@/components/base-table/index.vue'
import watcher from 'element-ui/packages/table/src/store/watcher'

const FIX_PROPS_TABS = {
  'bill_main': 'formList'
}
  @Component({
    name: 'deliver-detail',
    components: {
      BaseTable,
      operation: () => import('./operation.vue'),
      formlist: () => import('@/components/formlist/index.vue'),
      commonTabs: () => import('@/layout-components/common-tabs/index.vue'),
      goodsDetail: () => import('./tabs/productDetail.vue'),
      freightInfo: () => import('./tabs/freight.vue'),
      auditRecord: () => import('./tabs/audit-record.vue'),
      channelHighSearch: () => import('@/components/advanced-search/index.vue'),
      Message: () => import('./components/Message.vue'),
      baseTable: () => import('@/components/base-table/index.vue'),
      muliteEntry: () => import('./components/index.vue'),
      relateBox: () => import('./tabs/relateBox.vue'),
      onlyKey: () => import('./tabs/onlyKey.vue')
    }
  })
export default class App extends mixins(detailMixins, vuexMixins) {
    render: number = 0

    // 观察 ID
    @Watch('v_id', { immediate: true })
    onv_idChange(val, oldval) {
      if (val && val !== oldval) {
        this.activeName = 'goodsDetail'
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

    @Watch('formData.deliver.noticeId')
    noticeIdChange(value) {
      this.formList[4].disabled = !!value
      this.formList[5].disabled = !!value
      this.formList[6].disabled = !!value
    }

    formList: any = []

    get deliverType() {
      return this.$store.state[this.$route.meta.moduleId].deliverType
    }

    @Watch('deliverType', { immediate: true })
    deliverTypeChange(val, oldval) {
      // 设置筛选列表
      const isDeliveryByorder = val === 'deliveryByorder'
      this.formList = isDeliveryByorder ? deliveryFormList : deliveryAutoFromList
    }

    // 指令筛选器默认参数
    defaultFilter: any = {}

    // 指令单选择事件
    noticeBillEvent({ value, row, matchValArr }) {
      // 单选
      if (value && matchValArr) {
        this.getNoticeBillDetail(value)
        this.$set(this.formData.deliver, 'noticeId', value)
        this.$set(this.formData.deliver, 'noticeLabel', matchValArr[0].label)
      } else if (row) {
        // 高级筛选
        this.getNoticeBillDetail(row.id)
        this.$nextTick(() => {
          (this.$refs['advancedSearchnoticeId'] as any).upDateOptionsData([
            { label: row.billNo, value: row.id }
          ])
        })
        this.$set(this.formData.deliver, 'noticeId', row.id)
        this.$set(this.formData.deliver, 'noticeLabel', row.billNo)
      }
    }

    // 存储当前指令单详情
    noticeBillData: any[] = []

    // 获取指令单据对应【收货渠道/价格类型/货品列表】
    async getNoticeBillDetail(value) {
      const res = await this._get({
        url: `${apiUrl.noticeBillDetails}`,
        params: {
          id: value,
          moduleId: globalConfigs.realModuleId
        }
      })
      if (res.code === 0) {
        const { billGoodsRespList, toChannelCode, toChannelId, toChannelName, channelCode, channelId, channelName, priceTypeId, priceTypeName } = res.data
        // 设置渠道
        this.$nextTick(() => {
          (this.$refs['advancedSearchtoChannelId'] as any).upDateOptionsData([
            { label: `${toChannelCode}-${toChannelName}`, value: toChannelId }
          ])
        })
        // 设置价格类型
        this.$nextTick(() => {
          (this.$refs['advancedSearchpriceTypeIds'] as any).upDateOptionsData([
            { label: priceTypeName, value: priceTypeId }
          ])
        })
        // 设置发货渠道
        this.$nextTick(() => {
          (this.$refs['advancedSearchchannelId'] as any).upDateOptionsData([
            { label: `${channelCode}-${channelName}`, value: channelId }
          ])
        })
        this.formData.deliver['toChannelId'] = toChannelId
        this.formData.deliver['channelId'] = channelId
        this.formData.deliver['priceTypeIds'] = priceTypeId
        // 保留单据列表
        this.noticeBillData = billGoodsRespList
        // 显示导入弹窗
        await (this.$refs['CustomMessage'] as any).$ViewMessage({
          data: { tableData: billGoodsRespList, tableHeader: importGoodsHeader, selectArray: [] },
          slotName: 'importGoods',
          width: '50%',
          callback: async(status, data) => {
            this.noticeGoodsListReadIntoTable(data.selectArray)
          }
        })
      }
    }

    // 指令单下货品列表写入底部Table
    noticeGoodsListReadIntoTable(selectRow) {
      selectRow.forEach(row => {
        row.noticeId = this.formData.deliver.noticeId
        row.noticeBillNo = this.formData.deliver.noticeLabel
        row.goodsFields = {
          goodsBuildDate: '',
          goodsStyleName: ''
        }
      })
      this.formData.billGoodsList = selectRow
    }

    // 价格类型上一次的值
    priceTypeIdLastValue: any = ''

    // 价格类型选择事件
    async priceTypeIdChangeHock({ val }) {
      if (val !== this.priceTypeIdLastValue && this.priceTypeIdLastValue) {
        await (this.$refs['CustomMessage'] as any).$ViewMessage({
          content: '修改价格类型将重新计算货品明细的折扣和结算价，是否继续？',
          callback: async(status, data) => {
            if (status) {
              this.priceTypeIdLastValue = val;
              (this.$refs['goodsDetail'] as any).updateGoodsByChannelIdOrPriceType(this.formData.deliver.toChannelId, val)
            } else {
              console.log('还原')
              this.$set(this.formData.deliver, 'priceTypeIds', this.priceTypeIdLastValue)
            }
          }
        })
      } else {
        this.priceTypeIdLastValue = val
        this.defaultFilter['priceTypeIds'] = {
          value: val,
          disabled: true,
          options: this.formList[6].options
        }
        console.log('设置镜像', this.priceTypeIdLastValue);
        (this.$refs['goodsDetail'] as any).updateGoodsByChannelIdOrPriceType(this.formData.deliver.toChannelId, val)
      }
    }

    // 到货渠道上一次值
    toChannelIdLastValue: any = {
      value: '',
      label: ''
    }

    // 到货渠道选择事件
    async toChannelIdChangeHock({ value, row, matchValArr }) {
      if (value && matchValArr) {
        if (value !== this.toChannelIdLastValue.value && this.toChannelIdLastValue.value) {
          await (this.$refs['CustomMessage'] as any).$ViewMessage({
            content: '修改到货渠道将重新计算货品明细的折扣和结算价，是否继续？',
            callback: async(status, data) => {
              if (status) {
                this.toChannelIdLastValue.value = value
                this.toChannelIdLastValue.label = matchValArr[0].label
                console.log('设置镜像', this.toChannelIdLastValue);
                (this.$refs['goodsDetail'] as any).updateGoodsByChannelIdOrPriceType(this.formData.deliver.toChannelId, this.formData.deliver.priceTypeIds)
              } else {
                console.log('还原')
                this.$set(this.formData.deliver, 'toChannelId', this.toChannelIdLastValue.value)
              }
            }
          })
        } else {
          this.toChannelIdLastValue.value = value
          this.toChannelIdLastValue.label = matchValArr[0].label
          // 单选label  多选options
          this.defaultFilter['toChannelId'] = {
            value: [value],
            label: matchValArr[0].label,
            options: [{ label: matchValArr[0].label, value: value }],
            disabled: true
          }
          console.log('设置镜像', this.toChannelIdLastValue);
          (this.$refs['goodsDetail'] as any).updateGoodsByChannelIdOrPriceType(this.formData.deliver.toChannelId, this.formData.deliver.priceTypeIds)
        }
      } else if (row) {

      }
    }

    // 是否是销售计划[normal,sellPlan,sameNotice,none]
    type: string = 'normal'
    // 缩放控制变量
    toggleFlag: boolean = true
    // 表单
    formData: Dictionary<any> = initFormData()
    // keepalvie当前激活的组件
    activeName: string = 'goodsDetail'
    // Tab切换列表
    tabMapOptions = detailConfig.tabsList
    // 自定义字段
    anchorList: AnchorConfig[] = []
    // 视图
    totalInfo: any[] = [
      {
        label: '货品总数量',
        value: 0,
        id: 1,
        class: 'color-base'
      },
      {
        label: '货品总金额',
        value: '0',
        id: 2,
        class: 'color-base'
      }
    ]

    created() {
      this.getModuleCustomerFileds()
    }

    // 获取自定义表头
    async getModuleCustomerFileds() {
      this.customerFieldsTabs = []
      // 获取自定义字段和分类
      await this.m_getModuleCustomerFiledsFn(
        FIX_PROPS_TABS,
        this.formData.deliver,
        globalConfigs.realModuleId
      )
      this.toggle(true)
    }

    // 获取详情
    async viewDetail(id) {
      const res = await this._get({
        url: `${apiUrl.detail}`,
        params: {
          id: id,
          moduleId: globalConfigs.realModuleId
        }
      })
      if (res.code === 0) {
        const { billGoodsList, billLogistics, customFieldMap, businessTypeId, sendPlanId, ...other } = res.data
        const { status, flowStatus, flowDto } = other
        const isAllEqual = (array, keyName) => {
          if (array.length > 0) {
            return !array.some(function(value, index) {
              return value['keyName'] !== array[0]['keyName']
            })
          } else {
            return true
          }
        }
        let noticeId = ''
        let priceTypeIds = ''
        const target = this.formList.find(item => {
          return item.value === 'noticeId'
        })
        if (sendPlanId) {
          // 改名字为发货计划
          this.type = 'sendPlan'
          target && (target['lang'] = 'commonWord.sellPlan');
          (this.$refs['advancedSearchnoticeId'] as any).upDateOptionsData([
            { label: `${res.data.sendPlanNo}`, value: sendPlanId }
          ])
          noticeId = sendPlanId
          console.log('发货计划')
        } else if (isAllEqual(billGoodsList, 'noticeId') && billGoodsList[0].noticeId) {
          target && (target['lang'] = 'deliver.detail.formList.instructionSheet')
          this.type = 'sameNotice'
          this.$nextTick(() => {
            (this.$refs['advancedSearchnoticeId'] as any).upDateOptionsData([
              { label: `${billGoodsList[0].noticeBillNo}`, value: billGoodsList[0].noticeId }
            ])
          })
          noticeId = billGoodsList[0].noticeId
          priceTypeIds = billGoodsList[0].priceTypeId
          console.log('同指令单', noticeId)
        } else {
          target && (target['lang'] = 'deliver.detail.formList.instructionSheet')
          // 隐藏
          this.type = 'none'
          this.$store.commit(`${this.m_moduleName}/SET_DELIVERTYPE`, 'directDelivery')
          console.log('多指令单')
        }
        this.$nextTick(() => {
          // 设置筛选项
          (this.$refs['advancedSearchchannelId'] as any).upDateOptionsData([
            { label: `${res.data.channelCode}-${res.data.channelName}`, value: res.data.channelId }
          ])
        })
        this.$nextTick(() => {
          (this.$refs['advancedSearchtoChannelId'] as any).upDateOptionsData([
            { label: `${res.data.toChannelCode}-${res.data.toChannelName}`, value: res.data.toChannelId }
          ])
        })
        // 赋值
        this.$nextTick(() => {
          this.formData = Object.assign(
            {},
            {
              deliver: Object.assign({}, this.formData.deliver, other, customFieldMap, {
                businessTypeIds: businessTypeId,
                priceTypeIds: priceTypeIds,
                noticeId
              })
            },
            { customFieldMap },
            {
              billGoodsList: billGoodsList || [],
              billLogistics: billLogistics || {}
            }
          )
          console.log(this.formData.deliver)
          this.m_dealActivityStatus(status, flowStatus, flowDto || {})
        })
      }
    }

    // 重置
    reset() {
      this.m_reset('deliver')
      this.$set(this, 'formData', initFormData())
      this.noticeBillData = []
      this.type = 'normal'
      this.render++
      this.totalInfo.forEach(em => {
        em.value = 0
      })
    }

    singleChannelChoose({ row }) {
      if (row.id) {
        this.$set(this.formData.deliver, 'channelId', row.id)
        this.$nextTick(() => {
          ;(this.$refs.channelHighSearch as any).upDateOptionsData([
            { label: `${row.code}-${row.name}`, value: row.id }
          ])
        })
      } else {
        this.$set(this.formData.deliver, 'channelId', '')
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
      const flag = (this.$refs.goodsDetail as any).validateTable()
      if (flag) return

      const confirmText = this.$t('dialogPrompt.save')

      this._confirm({ content: confirmText })
        .then(async() => {
          const { deliver, billGoodsList, customFieldMap, ...other } = JSON.parse(JSON.stringify(this.formData))
          // 把自定义字段值都放到  customFieldMap 中
          for (const key in customFieldMap) {
            if (Object.keys(deliver).includes(key)) {
              customFieldMap[key] = deliver[key]
              delete deliver[key]
            }
          }
          // 货品明细的自定义字段赋值
          const formatBillGoodsList = billGoodsList.map((item) => {
            if (item.customFields) {
              for (const k in item.customFields) {
                item.customFields[k] = item[k] || ''
                delete item[k]
              }
            }
            item['priceTypeId'] = this.formData.deliver['priceTypeIds']
            return item
          })
          const saveData = {
            data: Object.assign(
              { moduleId: globalConfigs.realModuleId },
              { billGoodsList: formatBillGoodsList },
              { customFieldMap },
              deliver,
              other,
              {
                priceTypeId: this.formData.deliver.priceTypeIds,
                businessTypeId: this.formData.deliver.businessTypeIds
              }
            )
          }
          const url = this.v_status === 'add' ? apiUrl.create : apiUrl.update
          const res = await this[this.v_status === 'add' ? '_post' : '_put']({ url, data: saveData })
          if (res.code === 0) this.m_dealSaveAction(res)
        })
        .catch(() => {
        })
    }

    // 货品录入
    importGoods() {
      ((this.$refs['goodsDetail'] as any).$refs['fileImport'] as any).ClickEvent()
    }

    submitInput({ data, type, number, allSize }) {
      if (type === 3) {
        // 条码录入
        console.log('条码录入', data, number, allSize);
        (this.$refs['goodsDetail'] as any).addGoods(data, number, allSize)
      }
    }

  // activated() {
  //   const deliverType = this.$store.state[this.$route.meta.moduleId].deliverType;
  //   console.log(deliverType)
  // }
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
      }
    }

    .fix-height {
      height: 80px;
      transition: height 1s ease;
    }

    .height-auto {
      height: auto;
      transition: height 1s ease;
    }
  }
</style>
