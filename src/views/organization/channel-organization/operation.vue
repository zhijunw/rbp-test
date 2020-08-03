<template>
  <div class="sticky detail-btn">
    <detailOperation
      :btnList="btnList"
      :billStatus="billStatus"
      :btnsAuth="v_btnsAuth"
      @audit="m_audit"
      @unaudit="m_unaudit"
      @invalid="m_invalid"
      @delete="m_delete"
      @edit="m_edit"
      @cancel="m_cancel"
      @save="m_save"
      @add="m_add"
      @restore="m_restore"
      @prev="m_prev"
      @next="m_next" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig } from './configs'
import operationMixins from '@/mixins/operation-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
@Component({
  name: 'detail-operation',
  components: {
    detailOperation: () => import('@/layout-components/detail-operation/index.vue')
  }
})
export default class detail extends mixins(operationMixins, vuexMixins) {
  btnList = detailConfig.btns
  get billStatus() {
    const obj = { '0': 'unaudit', '1': 'audit', '2': 'reverseAudit', '3': 'invalid' }
    return obj[this.v_billStatus] || ''
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/common-detail-operation.scss";
</style>
