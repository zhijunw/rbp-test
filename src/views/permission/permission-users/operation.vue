<template>
  <div class="sticky detail-btn">
    <detailOperation
      :btnList="btnList"
      :billStatus="billStatus"
      :btnsAuth="v_btnsAuth"
      @add="m_add"
      @delete="m_delete"
      @edit="m_edit"
      @cancel="m_cancel"
      @save="m_save"
      @enable="m_enable"
      @disable="m_disable"
      @prev="m_prev"
      @next="m_next" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig } from './configs'
import operationMixins from '@/mixins/operation-mixins'
import vuexMixins from './configs/vuex-module'

@Component({
  name: 'detail-operation',
  components: {
    detailOperation: () => import('@/layout-components/detail-operation/index.vue')
  }
})
export default class detail extends mixins(operationMixins, vuexMixins) {
  btnList = detailConfig.btns
  get billStatus() {
    const obj = { '101': 'disable', '100': 'enable' }
    return obj[this.v_billStatus] || ''
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/common-detail-operation.scss";
</style>
