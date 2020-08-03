<template>
  <div class="barcode-dialog">
    <base-dialog
      :dialogObj="dialogObj"
      class="base-dialog"
      @confirm="confirm"
      @cancel="cancel">
      <div
        slot="content"
        class="box">
        <form-list
          ref="formlist"
          :formList="barcodeDialog.formList"
          :formData="barcodeDialog.formData"
          @rules="rulesChange" />
        <div class="f12 text-box invalid">
          <p class="f12">
            生成规则说明：
          </p>
          <p class="f12">
            1、只对已选货号中无条码的进行生成，已有条码的货号将跳过；
          </p>
          <p class="f12">
            2、条码规则：按照 {{ rulesDesc }} 字符拼接生成。
          </p>
        </div>
      </div>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { DialogObj, Dictionary, Response } from '@/typings'
import { barcodeDialog } from '../configs'
import apiUrl from '@/api/content-center/barcode-fiels'
import { transformFields } from '@/utils'

@Component({
  name: 'barcode-dialog',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    highSearchDialog: () => import('@/layout-components/vip-dialog/index.vue'),
    formList: () => import('@/components/formlist/index.vue')

  }
})
export default class App extends Vue {
  @Prop({ required: true }) dialogObj: DialogObj

  barcodeDialog = barcodeDialog
  rulesDesc: string = ''
  async confirm() {
    if (this.barcodeDialog.formData.goodsFilterParam) {
      // 这里是避免校验规则
      this.$set(this.barcodeDialog.formData, 'goodsIds', 'value')
    }
    await (this.$refs.formlist as any).saveTable()
    if (this.barcodeDialog.formData.goodsFilterParam) {
      // 这里是避免校验规则
      delete this.barcodeDialog.formData.goodsIds
    }
    const postData = this.barcodeDialog.formData
    const res = await this._post({ url: apiUrl.batchCreatedBarcode, data: { data: postData }})
    if (res.code === 0) {
      this._message({ message: '生成条码成功', type: 'success' })
      this.dialogObj.isShowDialog = false
    }
  }
  cancel() {
    this.dialogObj.isShowDialog = false
  }
  rulesChange(obj) {
    this.rulesDesc = obj.label
  }
  confirmSearchOption() {

  }
}
</script>
<style lang="scss" scoped>
.text-box{
  line-height: 1.5;
}
.base-dialog {
  // z-index: 2006 !important;
  /deep/.el-dialog__body {
    padding: 20px 16px;
    border-bottom: none;
  }
  /deep/.el-dialog__footer{
      padding-bottom: 16px;
  }
}
</style>
