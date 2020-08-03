<template>
  <div>
    <common-index
      :showTab="m_showTab"
      :configs="layoutConfigs"
      :layoutActiveTab="v_activeName"
      @change-tab="m_changeTab">
      <transition
        name="fade-transform"
        mode="out-in"
        :duration="{
          enter:50,
          leave: 50
        }">
        <keep-alive>
          <component
            :is="v_activeName"
            :ref="v_activeName" />
        </keep-alive>
      </transition>
    </common-index>
    <integratedQuery :dictionary="moduleList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { layoutConfigs, detailConfig, highSearchDialog } from './configs/index'
import indexMixins from '@/mixins/index-mixins'
import registVuexModuleMixins from './configs/registVuex-module'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Dictionary, Response } from '@/typings'
import apiUrl from '@/api/organization-center/supplie'
import { Tools } from '@/utils/tools'

import { transformFields, nest } from '@/utils'
// interface PermissionConfig {
//   action: string[]
//   page: { check: string[], edit: string[]}
//   fields: { hide: string[], edit: string[]}
// }
@Component({
  name: 'router-120002',
  components: {
    list: () => import('./list.vue'),
    detail: () => import('./detail.vue'),
    integratedQuery: () => import('@/components/integrated-query/index.vue'),
    commonIndex: () => import('@/layout-components/common-index/index.vue')
  }
})
export default class App extends mixins(
  indexMixins,
  vuexMixins,
  registVuexModuleMixins
) {
  layoutConfigs = layoutConfigs
  moduleList: Dictionary = {
    moduleList: [
      {
        label: '字段配置',
        value: 1,
        lang: 'plannedOrder',
        en: 'Field Configuration'
      }
    ],
    formList: [
      {
        label: 'xxx报表1',
        value: 1,
        lang: 'plannedOrder',
        en: 'Form'
      }
    ]
  }
  created() {
    this.getConfig()
  }
  // 获取配置信息
  async getConfig() {
    const res:Response<any[]> = await this._get({ url: apiUrl.getSelect })
    if (res.code === 0) {
      const data = res.data
      const supplieHeaderForm = detailConfig.formList
      const supplieProp = detailConfig.supplieProp
      const financialInfo = detailConfig.financialInfo
      const highSearchForm = highSearchDialog.formList

      const actions = new Map<any, any>([
        [['areaTreeIds'], (val, keys) => {
          const nestResult = nest(val, 0, 'parentId', false) || []
          Tools.setValueAndName(nestResult)
          Tools.setOptions(nestResult, keys, supplieProp)
          Tools.setOptions(nestResult, keys, highSearchForm)
        }],
        [['typeIds', 'receiveDifferentTypeIds', 'natureIds', 'gradeIds', 'fundAccountIds', 'statusIds'], (val, keys) => {
          Tools.setValueAndName(val)
          Tools.setOptions(val, keys, supplieHeaderForm)
          Tools.setOptions(val, keys, financialInfo)
          Tools.setOptions(val, keys, highSearchForm)
          Tools.setOptions(val, keys, supplieProp)
        }],

        ['default', () => {}]
      ])

      for (const k in res.data) {
        actions.forEach((value, keys) => {
          const action: any = keys.includes(k) ? value : actions.get('default')
          action.call(this, res.data[k] || [], k)
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
