<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData.salePlain"
      @import="importGoods"
      @save="save" />
    <!-- 表单列表 -->
    <div
      class="formlist-box"
      :class="[toggleFlag ? 'height-auto' : 'fix-height']">
      <formlist
        ref="formlist"
        :formList="formList"
        :formData="formData.salePlain"
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
              ref="channelHighSearch"
              :highSearchConfig="row.highSearchConfig"
              :value.sync="formData[row.value]"
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
      id="tabBox"
      ref="commonTab"
      :tabMapOptions="tabMapOptions"
      :activeName.sync="activeName"
      class="mgt-10 pdb-12">
      <template v-slot:goodsDetail>
        <goods-detail
          id="goodsDetail"
          ref="goodsDetail"
          :formData="formData" />
      </template>
      <template v-slot:freightInfo="{item}">
        <freight-info
          v-if="item.value === activeName"
          ref="freightInfo"
          :formData="formData" />
      </template>
      <template v-slot:auditRecord="{item}">
        <audit-record
          v-if="item.value === activeName"
          ref="auditRecord" />
      </template>
      <template v-slot:adjustmentRecord="{item}">
        <adjustment-record
          v-if="item.value === activeName"
          ref="adjustmentRecord" />
      </template>
      <template v-slot:adjustmentDetail="{item}">
        <adjustmentDetail
          v-if="item.value === activeName"
          ref="adjustmentDetail" />
      </template>
    </common-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, initFormData } from './configs'
import { Dictionary, AnchorConfig, Response } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/sale-center/sale-plain'
import { transformFields } from '@/utils'
// import vuexMixins from './configs/vuex-module'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
import { Tools } from '@/utils/tools'
const FIX_PROPS_TABS = {
  'bill_main': 'formList'
}
@Component({
  name: 'salePlain-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    commonTabs: () => import('@/layout-components/common-tabs/index.vue'),
    goodsDetail: () => import('./tabs/productDetail.vue'),
    freightInfo: () => import('./tabs/freight.vue'),
    auditRecord: () => import('./tabs/audit-record.vue'),
    adjustmentRecord: () => import('./tabs/adjustment-record.vue'),
    adjustmentDetail: () => import('./tabs/adjustment-detail.vue'),
    channelHighSearch: () => import('@/components/advanced-search/index.vue')
  }
})
export default class App extends mixins(detailMixins, vuexMixins) {
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

  formList = detailConfig.formList
  toggleFlag: boolean = true
  formData: Dictionary<any> = initFormData()
  activeName: string = 'goodsDetail'
  tabMapOptions = detailConfig.tabsList
  anchorList: AnchorConfig[] = []

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
  async getModuleCustomerFileds() {
    this.customerFieldsTabs = []
    // 获取自定义字段和分类
    await this.m_getModuleCustomerFiledsFn(
      FIX_PROPS_TABS,
      this.formData.salePlain,
      this.m_moduleId
    )
    this.toggle(true)
  }
  // 获取详情
  async viewDetail(id) {
    const res = await this._get({
      url: `${apiUrl.detail}`,
      params: {
        id: id,
        moduleId: this.m_moduleId
      }
    })
    if (res.code === 0) {
      const { billGoodsList, billLogistics, customFieldMap, ...other } = res.data
      const { status, flowStatus, flowDto } = other
      this.formData = Object.assign(
        {},
        { salePlain: Object.assign({}, this.formData.salePlain, other, customFieldMap) },
        { customFieldMap },
        {
          billGoodsList: billGoodsList || [],
          billLogistics: billLogistics || {}
        }
      )
      this.$nextTick(() => {
        ;(this.$refs.channelHighSearch as any).upDateOptionsData([
          { label: `${other.channelCode}-${other.channelName}`, value: other.channelId }
        ])
      })
      this.m_dealActivityStatus(status, flowStatus, flowDto || {})
    }
  }

  reset() {
    this.m_reset('salePlain')
  }

  singleChannelChoose({ row }) {
    if (row.id) {
      this.$set(this.formData.salePlain, 'channelId', row.id)
      this.$nextTick(() => {
        ;(this.$refs.channelHighSearch as any).upDateOptionsData([
          { label: `${row.code}-${row.name}`, value: row.id }
        ])
      })
    } else {
      this.$set(this.formData.salePlain, 'channelId', '')
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
        const { salePlain, billGoodsList, customFieldMap, ...other } = JSON.parse(JSON.stringify(this.formData))
        // 把自定义字段值都放到  customFieldMap 中
        for (const key in customFieldMap) {
          if (Object.keys(salePlain).includes(key)) {
            customFieldMap[key] = salePlain[key]
            delete salePlain[key]
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
          return item
        })
        const saveData = {
          data: Object.assign(
            { moduleId: this.m_moduleId },
            { billGoodsList: formatBillGoodsList },
            { customFieldMap },
            salePlain,
            other
          )
        }
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
