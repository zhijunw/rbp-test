<template>
  <el-time-picker
    v-model="timeValue"
    :disabled="disabled"
    :is-range="config.isRange"
    :readonly="config.readonly"
    :clearable="config.clearable"
    :arrow-control="config.arrowControl"
    :placeholder="config.placeholder"
    :start-placeholder="config.startPlaceholder"
    :end-placeholder="config.endPlaceholder"
    :range-separator="config.rangeSeparator"
    @change="change" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import { Partial, Dictionary, TimePickerConfig } from '@/typings'

const DEFAULT_CONFIG: TimePickerConfig = {
  placeholder: '选择日期',
  arrowControl: false,
  readonly: false,
  clearable: false,
  isRange: false,
  rangeSeparator: '至',
  startPlaceholder: '开始时间',
  endPlaceholder: '结束时间'
}

@Component({
  name: 'base-timePicker'
})
/**
   * @param value = 绑定值
   * @param disabled = 是否禁用
   * @param datePickertProps = 基础属性
   * @method change = 绑定值被改变
   * */
export default class BaseTimePicker extends Vue {
  @Prop() timePickerProps: Partial<TimePickerConfig>
  @Prop({ required: true }) value: any
  @Prop({ default: false }) disabled: boolean

  @Watch('timePickerProps', { immediate: true, deep: true })
  onTimePickerPropsChanged(val: Dictionary<any>, oldVal: Dictionary<any>) {
    console.log(val)
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
    console.log(this.config)
  }

  @Watch('value')
  onValueChanged(data) {
    this.timeValue = data
  }

  @Emit('change')
  change(currentValue) {
    return currentValue
  }
  timeValue:any = ''
  config: TimePickerConfig = DEFAULT_CONFIG
}
</script>

<style lang='scss'>
</style>
