<template>
  <div class="sticky detail-btn">
    <detailOperation
      :btnList="btnList"
      :billStatus="billStatus"
      :btnsAuth="v_btnsAuth"
      @delete="m_delete"
      @edit="m_edit"
      @copy="m_copy"
      @cancel="m_cancel"
      @restore="m_restore"
      @save="m_save"
      @add="m_add"
      @audit="m_audit"
      @unaudit="m_unaudit"
      @invalid="m_invalid"
      @next="m_next"
      @prev="m_prev"
      @record="m_record" />

    <record-dialog
      ref="recordLog"
      :recordLogConfig="recordLogConfig" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, recordLogObj } from './configs'
import operationMixins from '@/mixins/operation-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Watch, Prop } from 'vue-property-decorator'
import { DetailOperationConfig, Dictionary } from '@/typings'
import { ListBtnApiConfig } from '@/typings'

@Component({
  name: 'detail-operation',
  components: {
    detailOperation: () => import('@/layout-components/detail-operation/index.vue'),
    recordDialog: () => import('@/layout-components/record-log/index.vue')
  }
})
export default class detail extends mixins(operationMixins, vuexMixins) {
  @Prop() formData: Dictionary
  permissBtnList:DetailOperationConfig[] = []
  btnList = detailConfig.btns
  recordLogConfig = recordLogObj
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
  // 删除
  async m_delete(config: ListBtnApiConfig) {
    const res = await this._post({ url: config.apiUrl!, data: {
      data: {
        ids: [this.billId],
        moduleId: this.m_moduleId
      }
    }})

    if (res.code === 0) {
      this.m_dealSuccessAction(config.name, 'default')
      // this.m_cancel()
      this.$store.commit(`${this.m_moduleId}/SET_STATUS`, 'cancel')
      this.$store.commit(`${this.m_moduleId}/SET_ID`, '')
    } else {
      this._message({ message: res.msg, type: 'error' })
    }
  }
  // 操作记录
  async m_record() {
    (this.$refs.recordLog as any).open({
      args: { billNo: this.formData.billNo, billId: this.billId, moduleId: this.m_moduleId },
      from: 'detail'
    })
  }
}
</script>

<style scoped lang="scss">
@import "src/styles/common-detail-operation.scss";
</style>
