<template>
  <el-dialog
    :title="dialogObj.title"
    :visible.sync="dialogObj.isShowDialog"
    :width="dialogObj.width || '30%'"
    :append-to-body="!!dialogObj.appendToBody"
    :modal="!dialogObj.modal"
    :modal-append-to-body="!dialogObj.modalAppendToBody">
    <slot name="content">
      <form-list
        :formList="$attrs.formList"
        :formData="$attrs.formData" />
    </slot>
    <slot name="footerBtn">
      <div
        slot="footer"
        class="dialog-footer">
        <el-button @click="cancel">
          {{ $t('layout.btns.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="confirm">
          {{ $t('layout.btns.sure') }}
        </el-button>
      </div>
    </slot>
    <slot name="extraContent" />
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import { DialogObj } from '@/typings'
@Component({
  name: 'common-dialog',
  components: {
    formList: () => import('@/components/formlist/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) dialogObj: DialogObj

  // methods

  confirm() {
    // 这里后续会传值出去
    if (!this.dialogObj.setShow) {
      this.$set(this.dialogObj, 'isShowDialog', false)
    }
    this.$emit('confirm', this.dialogObj.parameter)
  }

  @Emit('cancel')
  cancel() {
    this.$emit('cancel')
    this.$set(this.dialogObj, 'isShowDialog', false)
  }
}
</script>

<style lang='scss'>
.el-dialog__header{
  height: 40px;
  line-height: 40px;
  padding: 0 16px;
}
.el-dialog__headerbtn{
  top: 12px;
  right: 16px;
}
.el-dialog__body {
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.el-dialog__title {
  font-size: 16px;
}
</style>
