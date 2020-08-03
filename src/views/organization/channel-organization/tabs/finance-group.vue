<template>
  <div class="finance-group">
    <slot name="title" />
    <formlist
      ref="formlist"
      :formList="financeFormList"
      :formData="financeFormData"
      :disabled="disabled"
      :status="status" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { tabsConfig } from '../configs'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'finance-group',
  components: {
    formlist: () => import('@/components/formlist/index.vue')
  }
})
export default class detail extends Vue {
  @Prop({ required: true }) financeFormData : object
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) financeFormList
  @Prop() status
}
</script>

<style lang="scss">
  .finance-group {
    width: 100%;
    position: relative;
  }
  .credit-limit {
    width: 25.5%;
    padding-left: 36px;
    position: absolute;
    top: 36px;
    right: 0;
    p {
      font-size: 12px;
      line-height: 28px;
      height: 29px;
      color: #353D51;
      font-weight: 700;
    }
    .el-input {
      height: 26px;
      line-height: 26px;
      >.el-input__inner {
        height: 26px;
        line-height: 26px;
        font-size: 12px;
      }
    }
  }
</style>
