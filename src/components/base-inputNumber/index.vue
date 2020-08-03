<template>
  <div class="input-number">
    <el-input-number
      v-model="inputValue"
      :placeholder="$t('form.placeholder.inputNumber')"
      :step-strictly="true"
      :disabled="disabled"
      :min="min"
      :max="max"
      size="small"
      @change="change" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Prop, Watch } from 'vue-property-decorator'
import Component from 'vue-class-component'

@Component({
  name: 'base-inputNumber'
})

/**
 * @param value = 绑定值
 * @param max = 最大值
 * @param min = 最小值
 * @param disabled = 是否禁用
 * @method change = 绑定值被改变
 * */

export default class baseInput extends Vue {
  @Prop() value:number
  @Prop() max:number
  @Prop() min:number
  @Prop({ default: false }) disabled:boolean

  @Watch('value', { immediate: true })
  onValueChange(current) {
    this.inputValue = current
  }

  inputValue = ''

  change(currentValue) {
    this.$emit('update:value', currentValue)
    this.$emit('change', currentValue)
  }
}
</script>

<style lang="scss" scoped>
.input-number{
  // width: 144px;
  .el-input-number{
    /deep/.el-input-number__increase{
      border-radius: 0 4px 4px 0;
      background: #fff;
    }
    /deep/.el-input-number__decrease{
      border-radius: 4px 0 0 4px;
      background: #fff;

    }
    /deep/.el-input__inner{
      border-radius: 4px;
    }
  }

}
</style>
