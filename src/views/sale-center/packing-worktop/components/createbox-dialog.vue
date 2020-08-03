<template>
  <base-dialog
    :dialog-obj="dialogObj"
    class="base-dialog"
    @confirm="confirm">
    <div
      slot="content"
      class="box">
      <form-list
        :formList="formList"
        :formData="formData" />
    </div>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Options, Dictionary, DialogObj } from '@/typings'
import { detailConfig } from '../configs/index'
import vuexMixins from '../configs/vuex-module'
import apiUrl from '@/api/packingwork/packingworktop'

@Component({
  name: 'createbox-dialog',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    formList: () => import('@/components/formlist/index.vue')

  }
})
export default class tableheaderConfig extends mixins(vuexMixins) {
  @Prop() dialogObj: DialogObj
  formList = detailConfig.createBoxDialog.formList
  formData: Dictionary = {}

  async confirm() {
    const data = {
      ...this.formData,
      boxBill: {
        billId: this.v_detailData.id,
        channelId: this.v_detailData.channelId,
        toChannelId: this.v_detailData.toChannelId,
        moduleId: this.m_moduleId
      }
    }
    const res = await this._post({ url: apiUrl.createBox, data: {
      data
    }})
    if (res.code === 0) {
      this._message({ message: '创建箱成功', type: 'success' })
      this.dialogObj.isShowDialog = false
    }
  }
}
</script>
<style lang="scss">
.base-dialog {
  .el-dialog__body {
    padding: 0 16px;
  }
  .el-dialog__footer{
      padding: 12px 16px 16px 16px;
  }
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.box{
    display: flex;
    padding: 16px 0;
    color:$colorTextRegular;
}
</style>
