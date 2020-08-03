<template>
  <div class="sticky detail-btn">
    <detailOperation
      :btnList="btnList"
      :billStatus="billStatus"
      :btnsAuth="v_btnsAuth"
      @edit="m_edit"
      @cancel="m_cancel"
      @save="m_save"
      @add="m_add"
      @enable="m_enable"
      @disable="m_disable"
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
  permissBtnList: DetailOperationConfig[] = []
  btnList = detailConfig.btns
  get billStatus() {
    const obj = { '101': 'disable', '100': 'enable' }
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
@import 'src/styles/common-detail-operation.scss';
</style>
