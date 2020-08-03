<template>
  <el-date-picker
    v-model="timeValue"
    :type="config.type"
    :readonly="config.readonly"
    :disabled="disabled"
    :clearable="config.clearable"
    :placeholder="$t(datePlaceholder)"
    :format="config.format"
    :unlink-panels="config.unlinkPanels"
    :value-format="config.valueFormat"
    :start-placeholder="$t(startPlaceholder)"
    :end-placeholder="$t(endPlaceholder)"
    style="width:100%;"
    size="small"
    @change="change" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import { Partial, Dictionary, DatePickerConfig } from '@/typings'

const DEFAULT_CONFIG: DatePickerConfig = {
  type: 'date',
  placeholder: '',
  readonly: false,
  clearable: true,
  format: 'yyyy-MM-dd',
  unlinkPanels: true,
  valueFormat: 'yyyy-MM-dd'
}

const DateType = new Map([
  ['date', { placeholder: 'form.placeholder.chooseDate' }],
  ['year', { placeholder: 'form.placeholder.chooseYear' }],
  ['month', { placeholder: 'form.placeholder.chooseMonth' }],
  ['week', { placeholder: 'form.placeholder.chooseWeek' }],
  ['monthrange', { startPlaceholder: 'form.placeholder.startMonth', endPlaceholder: 'form.placeholder.endMonth' }],
  ['daterange', { startPlaceholder: 'form.placeholder.startDate', endPlaceholder: 'form.placeholder.endDate' }]
])

@Component({
  name: 'base-datePicker'
})
/**
 * * @param value = 传入值
 * @param datePickertProps = 基础属性
 * @method change = 绑定值被改变
 * */
export default class BaseDatePicker extends Vue {
  @Prop() datePickertProps: Partial<DatePickerConfig>
  @Prop({ required: true }) value: any
  @Prop({ default: false }) disabled: boolean

  @Watch('datePickertProps', { immediate: true, deep: true })
  onDatePickertPropsChanged(val: Dictionary<any>, oldVal: Dictionary<any>) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }

  @Watch('config.type', { immediate: true })
  onTypeValueChanged(val: string, oldVal: string) {
    const placeholderData: any = DateType.get(val)
    const { placeholder, startPlaceholder, endPlaceholder } = placeholderData
    this.datePlaceholder = this.config.placeholder ? this.config.placeholder : placeholder
    this.startPlaceholder = startPlaceholder
    this.endPlaceholder = endPlaceholder
  }

  @Watch('value', { immediate: true })
  onValueChanged(data) {
    this.timeValue = data
  }

  @Emit('change')
  change(currentValue) {
    this.$emit('update:value', currentValue)
    return currentValue
  }

  config: DatePickerConfig = DEFAULT_CONFIG
  timeValue: any = ''
  datePlaceholder: string = ''
  startPlaceholder: string = ''
  endPlaceholder: string = ''
}
</script>

<style lang="scss"></style>
