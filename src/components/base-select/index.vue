<template>
  <el-select
    :key="componentKeys"
    v-model="selectVal"
    :disabled="disabled"
    :clearable="config.clearable"
    :popper-append-to-body="config.popperAppendToBody"
    :popper-class="config.popperClass"
    :size="config.size"
    :collapse-tags="config.collapseTags"
    :placeholder="$t(config.placeholder)"
    :filterable="config.filterable"
    :multiple="config.multiple"
    :allowCreate="config.allowCreate"
    style="width:100%;"
    @change="selectChange($event)"
    @visible-change="visibleChange">
    <template>
      <div
        v-show="canRefresh"
        class="refresh">
        <el-button
          circle
          @click="selectRefresh(item.refreshKey, item.refreshAPI)">
          <svg-icon
            name="refresh" />
          <span>刷新选项</span>
        </el-button>
      </div>
    </template>
    <el-option
      v-for="(el, index) in item.options"
      :key="index"
      :label="el.label"
      :disabled="el.disabled"
      :value="el.value" />
    <!-- <div slot="empty">
      <slot name="empty"><p class="empty">无数据</p></slot>
    </div> -->
  </el-select>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { ListInterface, Dictionary, Partial, ElBaseConfig, Options } from '@/typings'

const DEFAULT_CONFIG: ElBaseConfig = {
  clearable: true,
  collapseTags: true,
  filterable: true,
  size: 'mini',
  multiple: false,
  allowCreate: false,
  popperAppendToBody: true,
  placeholder: 'form.placeholder.select'
}

@Component({
  name: 'base-select'
})

/**
 * @param value = 传入值
 * @param selectProps = 基础属性
 * @param item = 元数据
 * @method change = 值改变时触发
 * */
export default class baseSelect extends Vue {
  @Prop({ default: false }) disabled: boolean
  @Prop() selectProps: Partial<ElBaseConfig>
  @Prop() value: string | string[]
  @Prop({ required: true }) item: ListInterface

  @Watch('selectProps', { immediate: true, deep: true })
  onSelectPropsChanged(val: Dictionary<any>, oldVal: Dictionary<any>) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }
  @Watch('value', { immediate: true })
  onValueChanged(val) {
    this.selectVal = val
  }
  selectKey: string = Date.now().toString(36)

  get componentKeys() {
    return (this.item.refreshKey || '') + this.selectKey
  }

  selectVal: string | string[] = ''
  config: ElBaseConfig = DEFAULT_CONFIG
  get canRefresh():boolean {
    return this.item.hasOwnProperty('refreshKey') && this.item.refreshKey !== '' &&
           this.item.hasOwnProperty('refreshAPI') && this.item.refreshAPI !== ''
  }
  selectChange(value) {
    this.$emit('update:value', value)
    this.$emit('selectChange', value)
  }

  visibleChange(flag) {
    this.$emit('visibleChange', flag)
  }
  async selectRefresh(key, api) {
    const res = await this._post({ url: api, data: {
      data: key
    }})
    const options:Options[] = res.data.map((item) => {
      return {
        'label': item.name,
        'value': item.id
      }
    })
    this.$nextTick(() => {
      this.selectKey = Date.now().toString(36)
      this.$set(this.item, 'options', options)
    })
  }
}
</script>

<style lang="scss" scoped>
.empty {
  padding: 10px 0;
  margin: 0;
  text-align: center;
  color: #999;
  font-size: 12px;
}
.refresh {
  position: relative;
  height: 35px;
  padding: 0 10px 0 10px;
  .el-button {
    // float: right;
    border:none;
    span {
      margin-left: 4px;
      color: #186CFF;
    }
    &:focus,
    &:hover {
      background: transparent !important;
    }
  }
  svg {
    color: #4689ff;
  }
}
</style>
