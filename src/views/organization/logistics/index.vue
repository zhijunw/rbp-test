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
  </div>
</template>

<script lang="ts">
import { mixins } from 'vue-class-component'
import { layoutConfigs } from './configs/index'
import { Component } from 'vue-property-decorator'
import indexMixins from '@/mixins/index-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

import registVuexModuleMixins from './configs/registVuex-module'
    @Component({
      name: 'logistics',
      components: {
        commonIndex: () => import('@/layout-components/common-index/index.vue'),
        list: () => import('./list.vue'),
        detail: () => import('./detail.vue')
      }
    })
export default class logistics extends mixins(indexMixins, vuexMixins, registVuexModuleMixins) {
        layoutConfigs = layoutConfigs;
}
</script>

<style scoped>

</style>
