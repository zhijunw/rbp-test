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
      @prev="m_prev"
      @next="m_next">
      <span slot="beforeStatus">{{ $t('operationGroup.enableStatusDesc') }}：</span>
    </detailOperation>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { detailConfig } from './configs'
import operationMixins from '@/mixins/operation-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

@Component({
  name: 'detail-operation',
  props: {
    orderDisable: { default: false }
  },
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
