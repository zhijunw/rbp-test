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
          enter: 100,
          leave: 100
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
import { layoutConfigs, listConfig, detailConfig } from './configs/index'
import indexMixins from '@/mixins/index-mixins'
import registVuexModuleMixins from './configs/registVuex-module'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Dictionary, Response } from '@/typings'
import apiUrl from '@/api/sale-center/sale-plain-adjustment'

import { transformFields, nest } from '@/utils'

@Component({
  name: 'router-700002',
  components: {
    list: () => import('./list.vue'),
    detail: () => import('./detail.vue'),
    integratedQuery: () => import('@/components/integrated-query/index.vue'),
    commonIndex: () => import('@/layout-components/common-index/index.vue')
  }
})
export default class App extends mixins(
  indexMixins,
  registVuexModuleMixins,
  vuexMixins
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
}
</script>
<style lang="scss" scoped></style>
