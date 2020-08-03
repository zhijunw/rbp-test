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
import { layoutConfigs } from './configs/index'
import indexMixins from '@/mixins/index-mixins'
import registVuexModuleMixins from './configs/registVuex-module'
import vuexMixins from './configs/vuex-module'
import { Dictionary, Response } from '@/typings'
import apiUrl from '@/api/content-center/goods-fiels'
import commonApiUrl from '@/api/common-api'

import { transformFields } from '@/utils'
interface PermissionConfig {
  action: string[]
  page: { check: string[], edit: string[]}
  fields: { hide: string[], edit: string[]}
}
@Component({
  name: 'router-120003',
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
    // this.getModulePermissionData()
  }
  // 获取该模块下面的权限
  async getModulePermissionData() {
    const res = await this._get({ url: `${commonApiUrl.getModulePermissionData}/${this.m_moduleId}` })
    if (res.code === 0) {
      const data = res.data
      const permissionObj:PermissionConfig = {
        action: [],
        page: { check: [], edit: [] },
        fields: { hide: [], edit: [] }
      }
      data.forEach((item) => {
        if (item.type === 'Action' && item.authority.length) {
          item.authority.forEach((item) => {
            if (item.value === 1) {
              permissionObj.action.push(item.key)
            }
          })
        }
        if (item.type === 'Page' && item.authority.length) {
          // -1 全部  1 浏览 2 编辑
          item.authority.forEach((item) => {
            if (item.value === -1 || item.value === 2) {
              permissionObj.page.check.push(item.key)
              permissionObj.page.edit.push(item.key)
            }
            if (item.value === 1) {
              permissionObj.page.check.push(item.key)
            }
          })
        }
        // if(item.type === 'Field' && item.authority.length ) {
        //   // -1 全部  1 隐藏 2 修改
        //   console.log('authority',item.authority.length)
        //     item.authority.forEach((item) => {
        //        if(item.value === -1 || item.value === 2 ) {
        //          permissionObj.fields.edit.push(item.key)

        //        }
        //        if(item.value === 1 ) {
        //          permissionObj.fields.hide.push(item.key)
        //        }
        //     })
        // }
      })

      console.log('permissionObj', permissionObj)

      this.$store.commit(`${this.m_moduleId}/SET_PERMISSION`, permissionObj)
    }
  }
  // 获取配置信息
  async getConfig() {
    const res:Response<any[]> = await this._get({ url: apiUrl.getSelect })
    if (res.code === 0) {
      const selectData = res.data
      const obj: Dictionary<any[]> = {}
      // 货品属性的下拉框
      for (const k in selectData) {
        if (!['tagPriceList', 'barcodeRuleList', 'sizeClassId', 'ageRangeId', 'colorList'].includes(k) && Array.isArray(selectData[k])) {
          selectData[k] = transformFields(selectData[k], { label: 'name', value: 'id' })
        } else if (k === 'ageRangeId') {
          selectData[k].forEach((item) => {
            item.value = item.id
            item.label = `${item.minAge}-${item.maxAge}`
          })
        } else if (k === 'colorList') {
          selectData[k].forEach((item) => {
            item.value = item.id
            item.label = `${item.code}-${item.name}`
          })
        }
      }
      this.$store.commit(`${this.m_moduleId}/SET_DETAIL_CONFIG`, selectData)
    }
  }
}
</script>
<style lang="scss" scoped></style>
