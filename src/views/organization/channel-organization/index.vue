<template>
  <common-index
    :showTab="m_showTab"
    :configs="layoutConfigs"
    :layoutActiveTab="v_activeName"
    @change-tab="m_changeTab">
    <keep-alive>
      <component
        :is="v_activeName"
        :ref="v_activeName" />
    </keep-alive>
  </common-index>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { layoutConfigs, highSearchDialog, tabsConfig, listConfig } from './configs/index'
import indexMixins from '@/mixins/index-mixins'
import registVuexModuleMixins from './configs/registVuex-module'
// import vuexMixins from './configs/vuex-module'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import apiUrl from '@/api/config-center/channelOrganization'
import { nest } from '@/utils/index'
import { Tools } from '@/utils/tools'
@Component({
  name: 'router-120001',
  components: {
    list: () => import('./list.vue'),
    detail: () => import('./detail.vue'),
    commonIndex: () => import('@/layout-components/common-index/index.vue')
  }
})
export default class App extends mixins(indexMixins, vuexMixins, registVuexModuleMixins) {
  layoutConfigs = layoutConfigs

  channelSrc = ''
  /**
    * 获得渠道全部下拉
    */
  async getDropDown() {
    const res = await this._get({
      url: apiUrl.getDropDown
    })

    if (res.code === 0) {
      const data = res.data
      const channelProperties = tabsConfig.channelProperties.list
      const highSearchDialogFromlist = highSearchDialog.formList
      const financialInformation = tabsConfig.financialInformation.list
      const salePolicy = tabsConfig.salePolicy

      const actions = new Map<any, any>([
        [['areaTreeList', 'organizationTreeList'], (val, keys) => {
          const nestResult = nest(val, 0, 'parentId', false) || []
          Tools.setValueAndName(nestResult)
          Tools.setOptions(nestResult, keys, channelProperties)
          Tools.setOptions(nestResult, keys, highSearchDialogFromlist)
        }],
        [['legalPersonId', 'fundAccountList', 'parentChannelId', 'branchCompanyId', 'balanceTypeId', 'tagPriceTypeId', 'salesAreaId', 'priceTypeList', 'brandId', 'gradeId', 'businessFormatId'], (val, keys) => {
          Tools.setValueAndName(val)
          Tools.setOptions(val, keys, channelProperties)
          Tools.setOptions(val, keys, financialInformation)
          Tools.setOptions(val, keys, highSearchDialogFromlist)
          Tools.setOptions(val, keys, salePolicy)
        }],
        ['default', () => {}]
      ])
      for (const k in data) {
        actions.forEach((value, keys) => {
          const action: any = keys.includes(k) ? value : actions.get('default')
          action.call(this, data[k] || [], k)
        })
      }
    }
  }

  created() {
    this.getDropDown()
  }
}
</script>
