<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData"
      @save="save" />
    <!-- 表格列表 -->
    <formlist
      ref="formlist"
      :formList="formList"
      :formData="formData"
      :status="v_status"
      :disabled="v_disabled"

      class="form-module mgt-12" />
    <!-- 渠道属性 -->
    <channel-group
      ref="channelGroup"
      :channelFormData="formData"
      :channelFormList="channelFormList"
      :status="v_status"
      :disabled="v_disabled">
      <template v-slot:title>
        <base-title
          :ref="anchorList[0].ref"
          :title="$t(anchorList[0].lang)" />
      </template>
    </channel-group>
    <!-- 财务信息 -->
    <finance-group
      ref="financeGroup"
      :financeFormData="formData"
      :disabled="v_disabled"
      :status="v_status"
      :financeFormList="financeFormList">
      <template v-slot:title>
        <base-title
          :ref="anchorList[1].ref"
          :title="$t(anchorList[1].lang)" />
      </template>
    </finance-group>

    <sale-policy
      :disabled="v_disabled"
      :saleTableData="formData.channelSaleDiscountList">
      <template v-slot:title>
        <base-title
          :ref="anchorList[2].ref"
          :title="$t(anchorList[2].lang)" />
      </template>
    </sale-policy>

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
        :customerFormdata="formData" />
    </div>
    <div>
      <base-title
        :ref="anchorList[anchorList.length - 1].ref"
        :title="$t(anchorList[anchorList.length - 1].lang)" />
      <div class="config-list">
        <div class="config-list-header bg-e">
          <span class="common-placeholder" />
          <span class="flex-1 pdl-10 border-r-1">配置项</span>
          <span class="flex-1 pdl-10">值</span>
        </div>
        <template v-if="channelSettings.length">
          <tree-folder
            ref="treeFolders"
            :configList="channelSettings"
            :formData="configFormData"
            :disabled="v_disabled" />
        </template>
        <template v-else>
          <div class="no-data">
            <img
              src="@/assets/common/nosearch.png"
              class="no-data-img"
              alt="暂无数据">
            <p class="f12">
              无匹配结果
            </p>
          </div>
        </template>
      </div>
    </div>
    <!-- 锚点导航 -->
    <base-anchor
      :element="$refs"
      :anchor="anchorList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, tabsConfig, initFormData, listConfig } from './configs'
import { Watch } from 'vue-property-decorator'
// import vuexMixins from './configs/vuex-module'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
import apiUrl from '@/api/config-center/channelOrganization'
import { Dictionary, AnchorConfig } from '@/typings'
import { safeEmpty, nest } from '@/utils/index'
import { transformFields } from '@/utils'
const FIX_PROPS_TABS = {
  'channel_property': 'channelFormList',
  'channel_finance': 'financeFormList'
}
const SHOW_TYPE = {
  '1': 'input',
  '2': 'number',
  '3': 'datePick',
  '4': 'checkbox',
  '5': 'select',
  '6': 'mulitSelect'
}
@Component({
  name: 'channelOrganization-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    channelGroup: () => import('./tabs/channel-group.vue'),
    salePolicy: () => import('./tabs/sale-group.vue'),
    customerTabs: () => import('@/layout-components/customer-fields-tab/index.vue'),
    financeGroup: () => import('./tabs/finance-group.vue'),
    treeFolder: () => import('./tabs/tree-folder.vue')
  }
})
export default class detail extends mixins(detailMixins, vuexMixins) {
  formList = detailConfig.formList
  formData: Dictionary<any> = initFormData()
  channelFormList = tabsConfig.channelProperties.list
  financeFormList = tabsConfig.financialInformation.list
  customerFieldsTabs: any[] = []
  anchorList: AnchorConfig[] = tabsConfig.anchorConfig.list
  channelSettings: any[] = []
  treeFoldersNode: any = null
  configFormData:Dictionary = {}
  @Watch('v_id', { immediate: true })
  onRolesDetailIdChanged(val, oldval) {
    if (val && val !== oldval) {
      setTimeout(() => {
        this.getChannelDetai(val.split('_')[0])
      }, 20)
    }
  }

  @Watch('v_status')
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }
  created() {
    this.getModuleCustomerFileds()
    this.$nextTick(() => {
      this.getSettingConfig()
    })
  }
  /**
   * 获得渠道档案详情
   */
  async getChannelDetai(id: string) {
    const res = await this._get({
      url: apiUrl.getChannelDetail + id
    })
    if (res.code === 0) {
      // const data = res.data
      const { customFieldMap, channelSaleDiscountList, channelSettings, ...other } = res.data
      this.formData = Object.assign({}, other, customFieldMap)
      const area: number[] = [other.nation, other.region, other.province, other.city, other.county].filter((e) => e)
      const organization: number[] = [
        other.organization1,
        other.organization2,
        other.organization3,
        other.organization4,
        other.organization5
      ].filter((e) => e)
      this.formData.area = area
      this.formData.customFieldMap = customFieldMap
      this.formData.channelSaleDiscountList = channelSaleDiscountList || []
      this.formData.organization = organization
      this.$store.dispatch(`${this.m_moduleId}/v_setBtnsAuth`, other.status + '')
    }
  }
  async getModuleCustomerFileds() {
    this.customerFieldsTabs = []
    // 获取自定义字段和分类
    await this.m_getModuleCustomerFiledsFn(
      FIX_PROPS_TABS,
      this.formData,
      this.m_moduleId
    )
  }
  updateSetting(data) {
    this.channelSettings = data
    this.$nextTick(() => {
      setTimeout(() => {
        this.treeFoldersNode = (this.$refs.treeFolders as any).$refs
      }, 10)
    })
    this.formatTreeList(this.channelSettings)
  }
  async getSettingConfig() {
    const res = await this._post({ url: apiUrl.getChannelSetting, data: { user: '' }})
    if (res.code === 0) {
      this.updateSetting(res.data)
    }
  }
  formatTreeList(arr) {
    arr.forEach((item) => {
      if (item.parentId !== 0) { // 子类
        item.channelSettingValues && item.channelSettingValues.forEach((values, index) => {
          if (values === 'true') {
            item.channelSettingValues[index] = true
          }
          if (values === 'false') {
            item.channelSettingValues[index] = false
          }
        })
        item.channelSettingDataLists = item.channelSettingDataLists && transformFields(item.channelSettingDataLists, {
          label: 'title',
          value: 'id'
        }).map((item) => {
          item.value = item.value.toString()
          return item
        })
        item.dataType = SHOW_TYPE[item.dataType.toString()]
        this.$set(this.configFormData, item.keyCode, item.channelSettingValues ? item.channelSettingValues : [])
      }
      item.childChannelSetting && this.formatTreeList(item.childChannelSetting)
    })
  }
  /**
   * 保存
   */
  async save() {
    // 校验表头字段
    console.log(this.$refs)
    await (this.$refs.formlist as any).saveTable()
    await (this.$refs.channelGroup as any).$refs.formlist.saveTable()
    await (this.$refs.financeGroup as any).$refs.formlist.saveTable()
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
        const formData = JSON.parse(JSON.stringify(this.formData))
        const { customFieldMap, channelSaleDiscountList, ...other } = formData
        // 把固定tab的自定义字段值都放到  customFieldMap 中
        for (const key in customFieldMap) {
          if (Object.keys(formData).includes(key)) {
            customFieldMap[key] = other[key]
            delete other[key]
          }
        }
        delete other.area
        delete other.organization
        let filterChannelSaleDiscountList = []
        if (channelSaleDiscountList) {
          filterChannelSaleDiscountList = channelSaleDiscountList.filter((item) => !item.edit)
        }
        const channelSettingSaveParams:any[] = Object.keys(this.configFormData).map((item) => {
          return {
            keyCode: item,
            values: this.configFormData[item] ? [].concat(this.configFormData[item]) : ['']
          }
        })
        const saveData = {
          channel: Object.assign({}, other, { channelSaleDiscountList: filterChannelSaleDiscountList }),
          customFieldMap,
          channelSettingSaveParams
        }
        const url = this.v_status === 'add' ? apiUrl.addChannel : apiUrl.updateChannel
        const res =
          this.v_status === 'add'
            ? await this._post({ url, data: saveData })
            : await this._put({ url, data: saveData })

        if (res.code === 0) this.m_dealSaveAction(res)
      })
      .catch(() => {})
  }

  /**
   * 重置
   */
  reset() {
    // this.formData = initFormData()
    this.m_reset()
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
}
.tree-list {
  border-bottom: 1px solid #eee;
}
.config-list {
  padding-bottom: 15px;
  // min-height: calc(100vh - 148px);
  &-box {
    height: auto;
    transition: height 0.5s ease;
  }
  &-header {
    height: 28px;
    line-height: 28px;
    display: flex;
    font-size: 12px;
    border: 1px solid #eee;
    border-bottom: none;
  }
  .common-placeholder {
    width: 32px;
    line-height: 28px;
    text-align: center;
    transition: all 0.5s;
  }
  .bg-e {
    background: #eee;
  }
}
.no-data {
  min-height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* height: min-content; */
  color: $colorTextPlaceholder;
  flex: 1;
  border: 1px solid #eee;
  &-img {
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
}
</style>
