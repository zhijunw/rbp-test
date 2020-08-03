<template>
  <el-autocomplete
    v-model="inputValue"
    type="text"
    :disabled="disabled"
    :value-key="valueKey"
    :fetch-suggestions="querySearch"
    :maxlength="config.maxlength"
    :minlength="config.minlength"
    :placeholder="config.placeholder"
    :clearable="config.clearable"
    :prefix-icon="config.prefixIcon"
    :suffix-icon="config.suffixIcon"
    @change="change"
    @select="select" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { Partial, InputConfig, Dictionary } from '@/typings'

const DEFAULT_CONFIG: InputConfig = {
  maxlength: 20,
  placeholder: '请输入',
  clearable: true
}
@Component({
  name: 'base-inputSearch'
})

/**
 * @param value = 传入值
 * @param inputProps = 基础属性
 * @param valueKey = 搜索依据哪个字段
 * @param disabled = 是否禁用
 * @param dataSource = 元数据
 * @method change = 值改变时触发
 * @method select = 下拉选中
 * */

export default class baseSelect extends Vue {
  @Prop() inputProps: Partial<InputConfig>
  @Prop({ required: false }) value:string
  @Prop({ default: 'value' }) valueKey:string
  @Prop({ default: false }) disabled:boolean
  @Prop() dataSource:any[]

  @Watch('inputProps', { immediate: true, deep: true })
  onInputPropsChanged(val: Dictionary<any>, oldVal: Dictionary<any>) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }

  @Watch('value')
  onValueChange(current) {
    this.inputValue = current
  }

  config: InputConfig = DEFAULT_CONFIG
  inputValue: string = ''

  change(currentValue) {
    this.$emit('change', currentValue)
  }

  select(current) {
    this.$emit('select', current)
  }

  querySearch(queryString, cb) {
    const dataSource = this.dataSource
    const results = queryString ? dataSource.filter(this.createFilter(queryString)) : dataSource
    cb(results)
  }

  createFilter(queryString) {
    return (dataSource) => {
      return (dataSource[this.valueKey].toLowerCase().indexOf(queryString.toLowerCase()) === 0)
    }
  }
}
</script>

<style  lang="scss" scoped>
</style>
