<template>
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
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { layoutConfigs, listConfig } from './configs/index'
import indexMixins from '@/mixins/index-mixins'
import registVuexModuleMixins from './configs/registVuex-module'
import vuexMixins from './configs/vuex-module'
import { transformFields } from '@/utils'
import { Options } from '@/typings'
@Component({
  name: 'router-110001',
  components: {
    list: () => import('./list.vue'),
    detail: () => import('./detail.vue'),
    commonIndex: () => import('@/layout-components/common-index/index.vue')
  }
})
export default class App extends mixins(indexMixins, registVuexModuleMixins, vuexMixins) {
  layoutConfigs = layoutConfigs
  created() {
    this.getInitData()
  }
  activated() {
    this.getInitData()
  }
  getSelectData(url, name, index) {
    this._get({ url }).then(res => {
      this.$store.state['usersPermissionModule'][name] = res.data
      const result: Options[] = transformFields(res.data, { label: 'name', value: 'id' })
      // listConfig.formList[index].options = result
      listConfig.formList[index].options = result
    })
  }
  getInitData() {
    this.getSelectData('/system/data/queryDataSet/100', 'v_dataSetList', 3)
    this.getSelectData('/system/role/queryRole/100', 'v_roleList', 6)
  }
}
</script>
<style lang="scss" scoped></style>
