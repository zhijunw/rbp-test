<template>
  <div>
    <common-index
      :showTab="m_showTab"
      :configs="layoutConfigs"
      :layoutActiveTab="activeName">
      <keep-alive>
        <component
          :is="activeName"
          :ref="activeName" />
      </keep-alive>
    </common-index>
    <integratedQuery :dictionary="moduleList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { layoutConfigs } from './configs/index'
import indexMixins from '@/mixins/index-mixins'

import { Dictionary, Response } from '@/typings'
import apiUrl from '@/api/content-center/goods-fiels'
import { transformFields } from '@/utils'

@Component({
  name: 'router-120004',
  components: {
    list: () => import('./list.vue'),
    integratedQuery: () => import('@/components/integrated-query/index.vue'),
    commonIndex: () => import('@/layout-components/common-index/index.vue')
  }
})
export default class App extends mixins(
  indexMixins

) {
  layoutConfigs = layoutConfigs
  activeName = 'list'
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
