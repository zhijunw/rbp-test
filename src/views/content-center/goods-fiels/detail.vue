<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData.Goods"
      @save="save" />
    <!-- 表单列表 -->
    <formlist
      ref="formlist"
      :formList="formList"
      :formData="formData.Goods"
      :disabled="v_disabled"
      :status="v_status"
      class="form-module mgt-12" />
    <!-- 货品属性 -->
    <div>
      <base-title
        :ref="anchorConfig[0].ref"
        :title="$t(anchorConfig[0].lang)" />
      <formlist
        :formList="productPropFormlist"
        :formData="formData.Goods"
        :disabled="v_disabled"
        :status="v_status" />
    </div>
    <!-- 货品颜色 -->
    <goods-color
      v-if="showTabs"
      :ref="anchorConfig[1].ref"
      :tableData="formData.colorList" />

    <!-- 货品内长 -->
    <goods-inside-length
      v-if="showTabs"
      :ref="anchorConfig[2].ref"
      :form="formData.Goods" />

    <!-- 货品尺码 -->
    <goods-size
      v-if="showTabs"
      :ref="anchorConfig[3].ref"
      :form="formData" />

    <!-- 价格信息 -->
    <priceInfo
      ref="priceInfo"
      :tagPriceList="formData.tagPriceList" />

    <!-- 自定义的字段 -->
    <div
      v-for="item in customerFieldsTabs"
      :key="item.value">
      <customer-tabs
        :key="item.value"
        :ref="item.value"
        :disabled="v_disabled"
        :status="v_status"
        :tabTitle="item.label"
        :formList="item.formList"
        :customerFormdata="formData.Goods" />
    </div>

    <!-- 跳转导航 -->
    <base-anchor
      :anchor="anchorConfig"
      :element="$refs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, initFormData } from './configs'
import { Dictionary, AnchorConfig, Response, FormListConfig } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/content-center/goods-fiels'
import { transformFields } from '@/utils'
import vuexMixins from './configs/vuex-module'
import detailMixins from '@/mixins/detail-mixins'
import commonApi from '@/api/common-api/index'
const PRODUCT_TYPE_TABS = {
  '2': ['goodsColor', 'goodsInsideLength', 'goodsSize']
}
// 那些 tabs 有自定义字段加入
const FIX_PROPS_TABS = {
  'goods_property': 'productPropFormlist'
}
@Component({
  name: 'fiels-detail',
  components: {
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    goodsColor: () => import('./tabs/goods-color.vue'),
    // barcodeInfo: () => import('./tabs/barcode-info.vue'),
    goodsSize: () => import('./tabs/goods-size.vue'),
    priceInfo: () => import('./tabs/price-info.vue'),
    customerTabs: () => import('@/layout-components/customer-fields-tab/index.vue'),
    goodsInsideLength: () => import('./tabs/goods-inside-length.vue')
  }
})
export default class App extends mixins(detailMixins, vuexMixins) {
  // 观察 ID
  @Watch('v_id', { immediate: true })
  onv_idChange(val) {
    if (val) {
      setTimeout(() => {
        this.viewDetail(val.split('_')[0])
      }, 20)
    }
  }
  @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }
  // 观察货品类型 根据不同的货品类型 显示不同的属性
  get anchorConfig() {
    const tabs = PRODUCT_TYPE_TABS[this.formData.Goods.type.toString()]
    if (tabs) {
      this.showTabs = false
      return this.anchorList.filter((item) => !tabs.includes(item.value))
    } else {
      this.showTabs = true
      return this.anchorList
    }
  }

  formList = detailConfig.formList
  customerFieldsTabs: any[] = []
  anchorList: AnchorConfig[] = []
  showTabs: boolean = true
  productPropFormlist = detailConfig.productProp
  formData: any = initFormData()

  created() {
    this.$nextTick(() => {
      this.getSelect()
      this.getModuleCustomerFileds()
    })
  }
  async getModuleCustomerFileds() {
    this.customerFieldsTabs = []
    this.anchorList = detailConfig.anchorConfig
    await this.m_getModuleCustomerFiledsFn(FIX_PROPS_TABS, this.formData.Goods, this.m_moduleId)
  }
  // 获取详情
  async viewDetail(id) {
    const res = await this._get({ url: `${apiUrl.getDetail}/${id}` })
    if (res.code === 0) {
      const { colorList, tagPriceList, customFieldMap, sizeDisableList, ...other } = res.data
      this.$nextTick(() => {
        this.formData.Goods = Object.assign({}, other, customFieldMap)
        this.formData.colorList = colorList
        this.formData.customFieldMap = customFieldMap
        this.formData.sizeDisableList = sizeDisableList
        this.formData.tagPriceList = tagPriceList
        this.$store.dispatch(`${this.m_moduleId}/v_setBtnsAuth`, other.status + '')
      })
    }
  }
  reset() {
    // this.formData = initFormData()
    this.m_reset('Goods')
    this.formatTagPriceList(this.v_detailConfig.tagPriceList)
  }

  // 保存
  async save() {
    // 校验表头字段
    await (this.$refs.formlist as any).saveTable()

    for (const item of this.customerFieldsTabs) {
      await (this.$refs[item.ref][0] as any).$refs.formlist.saveTable()
    }

    // 校验价格信息的必填

    const priceInfo = this.formData.tagPriceList || []

    if (priceInfo.some((item) => !item.tagPrice)) {
      this._message({ message: '请输入价格信息', type: 'warning' })
      return
    }

    const confirmText = this.$t('dialogPrompt.save')
    this._confirm({ content: confirmText }).then(async() => {
      const { Goods, customFieldMap, ...other } = this.formData
      // 把固定tab的自定义字段值都放到  customFieldMap 中
      for (const key in customFieldMap) {
        if (Object.keys(Goods).includes(key)) {
          customFieldMap[key] = Goods[key]
          delete Goods[key]
        }
      }
      const saveData = {
        data: Object.assign({}, Goods, { customFieldMap }, other)
      }
      const url = this.v_status === 'add' ? apiUrl.created : apiUrl.updateBill
      const res = await this[this.v_status === 'add' ? '_post' : '_put']({ url, data: saveData })
      if (res.code === 0) this.m_dealSaveAction(res)
    })
  }
  // 获取到下拉框选项
  async getSelect() {
    this.productPropFormlist.forEach((item) => {
      const options = this.v_detailConfig[item.value]
      if (options) {
        this.$set(item, 'options', options)
      }
    })
  }
  formatTagPriceList(tagPriceList) {
    this.formData.tagPriceList = tagPriceList.map((item) => {
      return {
        id: '',
        goodsId: '',
        priceTypeId: item.id,
        tagPrice: '',
        code: item.code,
        name: item.name
      }
    })
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';

</style>
