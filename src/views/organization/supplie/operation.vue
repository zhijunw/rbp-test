<template>
  <div class="sticky detail-btn">
    <detailOperation
      :btnList="btnList"
      :billStatus="billStatus"
      :btnsAuth="v_btnsAuth"
      @delete="m_delete"
      @edit="m_edit"
      @cancel="m_cancel"
      @restore="m_restore"
      @save="m_save"
      @add="m_add"
      @audit="m_audit"
      @unaudit="m_unaudit"
      @invalid="m_invalid"
      @next="m_next"
      @prev="m_prev" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig } from './configs'
import operationMixins from '@/mixins/operation-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Watch, Prop } from 'vue-property-decorator'
import { DetailOperationConfig } from '@/typings'
@Component({
  name: 'detail-operation',
  components: {
    detailOperation: () => import('@/layout-components/detail-operation/index.vue')
  }
})
export default class detail extends mixins(operationMixins, vuexMixins) {
//   @Watch('v_permission.action', {deep: true, immediate: true })
//   onPremissionChanged(val: string[], oldVal: string[]) {
//     if(val) {
//       this.permissBtnList = this.getRoleOperation(val)
//     }
//   }
  permissBtnList:DetailOperationConfig[] = []
  btnList = detailConfig.btns
  get billStatus() {
    const obj = { '0': 'unaudit', '1': 'audit', '2': 'reverseAudit', '3': 'invalid' }
    return obj[this.v_billStatus] || ''
  }
  getRoleOperation(val) {
    const operationPermissionId = val
    return this.btnList.reduce((k: any[], m) => {
      if (operationPermissionId.includes(m.operationId!) || m.isValidatePermisssion) {
        k.push(m)
      }
      return k
    }, [])
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/common-detail-operation.scss";
</style>
