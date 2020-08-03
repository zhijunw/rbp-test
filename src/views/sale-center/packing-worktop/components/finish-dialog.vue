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
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Options, Dictionary, DialogObj } from '@/typings'
import { detailConfig } from '../configs/index'
@Component({
  name: 'finish-dialog',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    formList: () => import('@/components/formlist/index.vue')

  }
})
export default class tableheaderConfig extends Vue {
  @Prop() dialogObj: DialogObj
  formList = detailConfig.finishDialog.formList
  formData: Dictionary = {}

  confirm() {
    this.dialogObj.isShowDialog = false
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
