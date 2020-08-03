<template>
  <common-index
    :showTab="m_showTab"
    :configs="layoutConfigs"
    :layoutActiveTab="v_activeName"
    @change-tab="m_changeTab">
    <transition
      name="fade-transform"
      mode="out-in"
      :duration="{ enter: 100, leave: 100 }">
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
import { layoutConfigs } from './configs/index'
import indexMixins from '@/mixins/index-mixins'
import registVuexModuleMixins from './configs/registVuex-module'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import api from '@/api/apiConfig'
@Component({
  name: 'router-110002',
  components: {
    list: () => import('./list.vue'),
    detail: () => import('./detail.vue'),
    commonIndex: () => import('@/layout-components/common-index/index.vue')
  }
})
export default class App extends mixins(indexMixins, registVuexModuleMixins, vuexMixins) {
  layoutConfigs = layoutConfigs
}
</script>
<style lang="scss" scoped></style>
