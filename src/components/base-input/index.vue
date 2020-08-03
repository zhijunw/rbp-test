<template>
  <div class="base-input">
    <el-input
      v-model="inputValue"
      :type="type"
      :class="{ long: config.long }"
      :disabled="disabled"
      :size="config.inputSize"
      :show-password="config.showPassword"
      :maxlength="config.maxlength"
      :minlength="config.minlength"
      :placeholder="$t(config.placeholder, { msg: '' })"
      :clearable="config.clearable"
      :prefix-icon="config.prefixIcon"
      :suffix-icon="config.suffixIcon"
      show-word-limit
      @change="change"
      @input="input"
      @mousewheel.native.prevent
      @keydown.native.enter="enter">
      <el-select
        v-if="config.selectOptions && config.selectOptions.length>0"
        slot="prepend"
        v-model="selectValue"
        class="input-select"
        :placeholder="$t(config.placeholder, { msg: '' })"
        @change="(e)=>{$emit('inputSelectChange',e)}">
        <el-option
          v-for="(item,index) in config.selectOptions "
          :key="index"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </el-input>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { Partial, InputConfig, Dictionary } from '@/typings'

const DEFAULT_CONFIG: InputConfig = {
  inputSize: 'small',
  showPassword: false,
  long: false,
  placeholder: 'form.placeholder.input',
  prefixIcon: '',
  suffixIcon: '',
  minlength: 0,
  clearable: true
}
@Component({
  name: 'base-input'
})

/**
 * @param type = 表单类型
 * @param value = 传入值
 * @param long = 使用长表单
 * @param disabled = 是否禁用
 * @param inputProps = 基础属性
 * @method change = 值改变时触发
 * */
export default class baseSelect extends Vue {
  @Prop() inputProps: Partial<InputConfig>
  @Prop({ default: 'text' }) type: string
  @Prop({ default: false }) disabled: boolean
  @Prop() value: string

  @Watch('inputProps', { immediate: true, deep: true })
  onInputPropsChanged(val: Dictionary<any>, oldVal: Dictionary<any>) {
    this.selectValue = val.selectDefault
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }

  @Watch('value', { immediate: true })
  onValueChange(current) {
    this.inputValue = current
  }

  config: InputConfig = DEFAULT_CONFIG
  inputValue: string = ''
  selectValue:any = ''
  change(currentValue) {
    this.$emit('update:value', currentValue)
    this.$emit('change', currentValue)
  }
  enter(currentValue) {
    this.$emit('update:value', this.inputValue)
    this.$emit('enter', this.inputValue)
  }
  input(currentValue) {
    this.$emit('update:value', currentValue)
    this.$emit('input', this.inputValue)
  }
}
</script>

<style lang="scss" scoped>
.base-input {
  .el-textarea {
    width: 320px;
    /deep/.el-textarea__inner {
      height: 80px;
    }
  }
  /deep/.rbp-baifenbi{
        font-size: 12px;
    display: inline-block;
    border-left: 1px solid #d7d7d7;
  }
  ::-webkit-scrollbar {
    width: 4px;
  }
  ::-webkit-scrollbar-track {
    background-color: #fff;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(166, 167, 173, 1);
    border-radius: 3px;
  }
  /deep/input::-webkit-outer-spin-button,
  /deep/input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  /deep/input[type='number'] {
    -moz-appearance: textfield;
  }
  .long {
    width: 320px;
  }
}
</style>
<style lang="scss">
  .input-select{
    width: 100px;
    input{
      color: #282828 !important;
      padding-left: 20px !important;
    }
  }
</style>
