<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData.salePlainAdjustment"
      @save="save" />
    <!-- 表单列表 -->
    <div
      class="formlist-box"
      :class="[toggleFlag? 'height-auto' : 'fix-height']">
      <formlist
        ref="formlist"
        :formList="formList"
        :formData="formData.salePlainAdjustment"
        :disabled="v_disabled"
        :status="vuexStore.v_status"
        :showAllForm="false"
        class="form-module mgt-12"
        @toggle="toggle">
        <template v-slot:salePlanBillId="{row}">
          <el-form-item
            :label="$t(row.lang) || row.label"
            :prop="row.value"
            :rules="row.rules">
            <bill-high-search
              ref="billHighSearch"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData.salePlainAdjustment[row.value]"
              :disabled="v_disabled"
              @singleChannelChoose="singleChannelChoose" />
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
    <common-tabs
      ref="commonTab"
      :tabMapOptions="tabMapOptions"
      :activeName.sync="activeName"
      class="mgt-10">
      <template v-slot:goodsDetail>
        <goods-detail
          ref="goodsDetail"
          :formData="formData" />
      </template>
    </common-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, initFormData } from './configs'
import { Dictionary, Response, AnchorConfig } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/sale-center/sale-plain-adjustment'
import { transformFields } from '@/utils'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
import billUrl from '@/api/sale-center/sale-plain'
import { Tools } from '@/utils/tools'
const FIX_PROPS_TABS = {
  'bill_main': 'formList'
}
@Component({
  name: 'salePlainAdjustment-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    commonTabs: () => import('@/layout-components/common-tabs/index.vue'),
    goodsDetail: () => import('./tabs/productDetail.vue'),
    billHighSearch: () => import('@/components/advanced-search/index.vue')
  }
})
export default class App extends mixins(detailMixins, vuexMixins) {
  // 观察 ID
  @Watch('v_id', { immediate: true, deep: true })
  onv_idChange(val, oldval) {
    if (val && val !== oldval) {
      Tools.debounce(this.viewDetail(val.split('_')[0]), 50)
    }
  }
  @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }
  @Watch('formData.salePlainAdjustment.salePlanBillId')
  onBillChange(val, oldval) {
    if (val && val !== oldval) {
      this.getBillDetail(val)
    }
  }
  @Watch('formData.billGoodsList', { immediate: true, deep: true })
  onGoodsListChange(val, oldval) {
    if (val.length) {
      // 这里是为了监听货品详情里面数量的变化去该改变显示数
      let total = 0
      let totalPrice = 0
      val.forEach((item) => {
        total += item.quantity
        totalPrice += item.totalPrice
      })
      this.totalInfo[0].value = total
      this.totalInfo[1].value = `${totalPrice}`
    }
  }

  formList = detailConfig.formList
  toggleFlag: boolean = true
  formData: Dictionary<any> = initFormData()
  activeName: string = 'goodsDetail'
  anchorList: AnchorConfig[] = []
  tabMapOptions = detailConfig.tabsList

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
  vuexStore: Dictionary = {}

  created() {
    this.getModuleCustomerFileds()
  }
  async getModuleCustomerFileds() {
    this.customerFieldsTabs = []
    // 获取自定义字段和分类
    await this.m_getModuleCustomerFiledsFn(
      FIX_PROPS_TABS,
      this.formData.salePlainAdjustment,
      this.m_moduleId
    )
    this.toggle(true)
  }

  // 获取详情
  async viewDetail(id) {
    const res = await this._get({ url: `${apiUrl.detail}`, params: {
      id: id,
      moduleId: this.m_moduleId
    }})
    if (res.code === 0) {
      const { billGoodsList, customFieldMap, ...other } = res.data
      const { status, flowStatus, flowDto } = other
      this.formData = Object.assign(
        {},
        { salePlainAdjustment: Object.assign({}, other, customFieldMap) },
        { customFieldMap },
        { billGoodsList: billGoodsList || [] }
      )
      this.$nextTick(() => {
        ;(this.$refs.billHighSearch as any).upDateOptionsData([
          { label: `${other.billNo}`, value: other.salePlanBillId }
        ])
      })
      this.m_dealActivityStatus(status, flowStatus, flowDto || {})
    }
  }
  async getBillDetail(id) {
    const res = await this._get({ url: `${billUrl.detail}`, params: {
      id: id,
      moduleId: 700001
    }})
    if (res.code === 0) {
      const { channelId, priceTypeId, businessTypeId, channelCode, channelName } = res.data
      Object.assign(this.formData.salePlainAdjustment, { channelId, businessTypeId, priceTypeId, channelName: `${channelCode}-${channelName}` })
    }
  }
  reset() {
    // this.formData = initFormData()
    this.m_reset('salePlainAdjustment')
  }
  singleChannelChoose({ row }) {
    if (row.id) {
      this.$set(this.formData.salePlainAdjustment, 'salePlanBillId', row.id)
      this.$nextTick(() => {
        (this.$refs.billHighSearch as any).upDateOptionsData([{ label: `${row.billNo}`, value: row.id }])
      })
    } else {
      this.$set(this.formData.salePlainAdjustment, 'salePlanBillId', '')
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

    this._confirm({ content: confirmText }).then(async() => {
      const { salePlainAdjustment, billGoodsList, customFieldMap } = JSON.parse(JSON.stringify(this.formData))
      for (const key in customFieldMap) {
        if (Object.keys(salePlainAdjustment).includes(key)) {
          customFieldMap[key] = salePlainAdjustment[key]
          delete salePlainAdjustment[key]
        }
      }
      const formatBillGoodsList = billGoodsList.map((item) => {
        if (item.customFields) {
          for (const k in item.customFields) {
            item.customFields[k] = item[k]
            delete item[k]
          }
        }
        return item
      })
      const saveData = {
        data: Object.assign(
          { moduleId: this.m_moduleId },
          { billGoodsList: formatBillGoodsList },
          salePlainAdjustment,
          { customFieldMap }
        )
      }
      const url = this.vuexStore.v_status === 'add' ? apiUrl.create : apiUrl.update
      const res = await this[this.vuexStore.v_status === 'add' ? '_post' : '_put']({ url, data: saveData })
      if (res.code === 0) this.m_dealSaveAction(res)
    }).catch(() => {
    })
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;

  .formlist-box{
    display: flex;
    .form-module {
    flex: 1;
    }
    .total-info{
      width: 180px;
      padding: 16px;
      box-sizing: border-box;
      box-shadow: 0px 0px 8px 0px rgba(166,167,173,0.3);
      border-radius: 4px;
      /* margin-left: 8px; */
      margin: 12px 0 0 8px;
      max-height: 218px;
      overflow: auto;
    }
    .total-info-box {
      line-height: 1.5;
      margin-bottom: 16px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  .fix-height{
    height: 140px;
    transition: all 1s;
  }
  .height-auto {
    height: auto;
    transition: all 1s;
  }
}
</style>
