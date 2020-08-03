<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData.supplie"
      @save="save" />
    <!-- 表单列表 -->
    <formlist
      ref="formlist"
      :formList="formList"
      :formData="formData.supplie"
      :disabled="v_disabled"
      :status="v_status"
      class="form-module mgt-12" />
    <!-- 供应商属性 -->
    <div>
      <base-title
        :ref="anchorList[0].ref"
        :title="$t(anchorList[0].lang)" />
      <formlist
        ref="supperProp"
        :formList="suppliePropFormlist"
        :formData="formData.supplie"
        :disabled="v_disabled"
        :status="v_status" />
    </div>
    <!-- 财务资料 -->
    <div>
      <base-title
        :ref="anchorList[1].ref"
        :title="$t(anchorList[1].lang)" />
      <formlist
        ref="financialInfo"
        :formList="financialInfo"
        :formData="formData.supplie"
        :disabled="v_disabled"
        :status="v_status" />
    </div>

    <!-- 发货地址 -->
    <ship-address
      :ref="anchorList[2].ref"
      :disabled="v_disabled"
      :addressList="formData.sendAddressList" />

    <!-- 联系人 -->
    <contacts
      :ref="anchorList[3].ref"
      :disabled="v_disabled"
      :contactsList="formData.contactsPersonList" />

    <!-- 自定义的字段 -->
    <div
      v-for="item in customerFieldsTabs"
      :key="item.value">
      <customer-tabs
        :key="item.value"
        :ref="item.ref"
        :disabled="v_disabled"
        :status="v_status"
        :tabTitle="item.label"
        :formList="item.formList"
        :customerFormdata="formData.supplie" />
    </div>

    <base-anchor
      :anchor="anchorList"
      :element="$refs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, initFormData } from './configs'
import { Dictionary, AnchorConfig, Response } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/organization-center/supplie'
import { transformFields } from '@/utils'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
// 那些 tabs 有自定义字段加入
const FIX_PROPS_TABS = {
  'supplier_property': 'suppliePropFormlist',
  'supplier_finance': 'financialInfo'
}
@Component({
  name: 'supplier-detail',
  components: {
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    operation: () => import('./operation.vue'),
    customerTabs: () => import('@/layout-components/customer-fields-tab/index.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    shipAddress: () => import('./tabs/address.vue'),
    contacts: () => import('./tabs/contacts.vue')
  }
})
export default class App extends mixins(vuexMixins, detailMixins) {
  // 观察 ID
  @Watch('v_id', { immediate: true })
  onv_idChange(val, oldval) {
    if (val && val !== oldval) {
      setTimeout(() => {
        this.viewDetail(val.split('_')[0])
      }, 20)
    }
  }
  @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }

  formList = detailConfig.formList
  customerFieldsTabs: any[] = []
  anchorList: AnchorConfig[] = detailConfig.anchorConfig
  suppliePropFormlist = detailConfig.supplieProp
  financialInfo = detailConfig.financialInfo
  formData: Dictionary<any> = initFormData()

  created() {
    this.getModuleCustomerFileds()
  }
  async getModuleCustomerFileds() {
    this.customerFieldsTabs = []
    this.anchorList = detailConfig.anchorConfig
    await this.m_getModuleCustomerFiledsFn(
      FIX_PROPS_TABS,
      this.formData.supplie,
      this.m_moduleId
    )
  }
  // 获取详情
  async viewDetail(id) {
    const res = await this._get({ url: `${apiUrl.detail}/${id}` })
    if (res.code === 0) {
      const { sendAddressList, contactsPersonList, customFieldMap, ...other } = res.data
      other.area = [other.nation, other.region, other.province, other.city, other.county].filter((e) => e)
      this.formData = Object.assign(
        {},
        { supplie: Object.assign({}, other, customFieldMap) },
        {
          customFieldMap,
          sendAddressList: sendAddressList || [],
          contactsPersonList: contactsPersonList || []
        }
      )
      this.$store.dispatch(`${this.m_moduleId}/v_setBtnsAuth`, other.status + '')
    }
  }
  reset() {
    // this.formData = initFormData()

    this.m_reset('supplie')
  }

  // 保存
  async save() {
    // 校验表头字段
    await (this.$refs.formlist as any).saveTable()
    await (this.$refs.financialInfo as any).saveTable()
    await (this.$refs.supperProp as any).saveTable()

    // 校验自定义分类的字段必填
    // const customerTabsDom: any = this.$refs.customerTabs
    // for (const item of customerTabsDom) {
    //   await item.$refs.formlist.saveTable()
    // }
    for (const item of this.customerFieldsTabs) {
      await (this.$refs[item.ref][0] as any).$refs.formlist.saveTable()
    }
    const confirmText = this.$t('dialogPrompt.save')

    this._confirm({ content: confirmText })
      .then(async() => {
        // 这里 sendAddressList contactsPersonList 行数据里面带有 edit: true 的不予保存 因为没点行 保存按钮
        const { supplie, customFieldMap, sendAddressList, contactsPersonList } = JSON.parse(JSON.stringify(this.formData))

        const address = sendAddressList.filter((item) => !item.edit)
        const contacts = contactsPersonList.filter((item) => !item.edit)
        // 把固定tab的自定义字段值都放到  customFieldMap 中
        for (const key in customFieldMap) {
          if (Object.keys(supplie).includes(key)) {
            customFieldMap[key] = supplie[key]
            delete supplie[key]
          }
        }
        const saveData = {
          data: Object.assign(
            {},
            supplie,
            { customFieldMap },
            { sendAddressList: address, contactsPersonList: contacts }
          )
        }
        const url = this.v_status === 'add' ? apiUrl.create : apiUrl.update
        const methods = this.v_status === 'add' ? '_post' : '_put'
        delete saveData.data.area
        const res = await this[methods]({ url, data: saveData })
        if (res.code === 0) this.m_dealSaveAction(res)
      })
      .catch(() => {})
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
}
</style>
