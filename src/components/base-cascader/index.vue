<template>
  <el-cascader
    id="cascader"
    :disabled="disabled"
    :clearable="config.clearable"
    :filterable="config.filterable"
    :collapse-tags="config.collapseTags"
    :placeholder="$t(config.placeholder)"
    :options="options"
    :props="{multiple: config.multiple}"
    :value="value"
    @input="handleChange"
    @change="handleChange" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Partial, ElBaseConfig, CascaderOptionsConfig } from '@/typings'

const DEFAULT_CONFIG: ElBaseConfig = {
  clearable: true,
  collapseTags: true,
  filterable: true,
  multiple: false,
  placeholder: 'form.placeholder.select'
}

@Component({
  name: 'base-cascader'
})
export default class BaseCascader extends Vue {
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) value: (number | string)[]
  @Prop({ required: true }) options: CascaderOptionsConfig[]
  @Prop() selectProps: Partial<ElBaseConfig>

  // @Watch('value',{deep:true})
  // onValueChanged(val) {
  //   console.log('val: ', val);
  //   this.selectedOptions = val || []
  // }
  @Watch('selectProps', { immediate: true, deep: true })
  onSelectPropsChanged(val: ElBaseConfig, oldVal: ElBaseConfig) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }

  config: ElBaseConfig = DEFAULT_CONFIG
  selectedOptions = []

  handleChange(value) {
    // this.selectedOptions = value
    this.$emit('update:value', value)
    this.$emit('cascaderChange', value)
    // this.$emit('input', value)
  }
  //
  addTreeDataAttr(arr:CascaderOptionsConfig[], attr: boolean) {
    arr.forEach(k => {
      k.disabled = attr
      if (k.children && k.children.length) {
        this.addTreeDataAttr(k.children, attr)
      }
    })
  }
}
</script>

<style lang='scss'>
#cascader {
  width: 100%;
  &.is-disabled {
    .el-cascader__label {
      color: #606266;
    }
  }
}
</style>
