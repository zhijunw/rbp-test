<template>
  <div>
    <!-- 全选 -->
    <el-checkbox
      v-if="config.showCheckAll"
      v-model="checkAll"
      :indeterminate="isIndeterminate"
      :disabled="disabled"
      class="all-text"
      @change="handleCheckAllChange">
      {{ langText }}
    </el-checkbox>
    <!-- 反选 -->
    <el-checkbox
      v-if="config.showCheckReverse"
      @change="checkReverse">
      {{
        $t('commonWord.reverseSelection')
      }}
    </el-checkbox>
    <el-checkbox-group
      :value="checkList"
      :class="{ inline: config.isLine }"
      @change="handleCheckedChange"
      @input="changeModel">
      <template v-for="item in checkGroupList">
        <el-tooltip
          v-if="!item.hideElement"
          :key="item.value"
          :content="$t(item.lang) || item.label"
          :disabled="($t(item.lang) || item.label).length < 10"
          placement="top"
          effect="dark">
          <el-checkbox
            :label="item.value"
            :disabled="item.disabled || disabled"
            @change="(val) => handleCurrentBox(val, item.value)">
            {{ $t(item.lang) || item.label }}
          </el-checkbox>
        </el-tooltip>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { Options, CheckboxConfig } from '@/typings'

const DEFAULT_CONFIG: CheckboxConfig = {
  showCheckAll: true,
  showCheckReverse: false,
  isLine: false // 是否在一行显示
}
@Component({
  name: 'base-checkbox'
})

/**
 * @param checkGroupList = 元数据
 * @param checkList = 已选择项
 * @param showCheckAll = 是否显示全选
 * @param showCheckReverse = 是否显示反选
 * @method change = 选择项有改动
 * @method checkAll = 点击全选
 * @method checkReverse = 点击反选
 * */
export default class baseSelect extends Vue {
  @Prop() selectProps: CheckboxConfig
  @Prop({ required: true }) checkGroupList: Options[]
  @Prop({ required: false }) checkList: any[]
  @Prop({ default: false }) disabled: boolean
  @Prop() checkAllText: string // 自定义“全选”复选框的名称
  // @Prop({ default: false }) isWatchCheckListImmediate: boolean // 是否初始化时就监听CheckList

  @Watch('selectProps', { immediate: true, deep: true })
  onSelectPropsChanged(val: CheckboxConfig, oldVal: CheckboxConfig) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
    this.langText = this.checkAllText ? this.checkAllText : this.$t('commonWord.allSelect')
  }

  // 选中项是否等于已有选项 根据条件 => 显示 => 全选 和 部分选择
  @Watch('checkList', { immediate: true })
  onCheckListChange(val) {
    this.checkAll = val.length > 0 && (val.length === this.checkGroupList.length)
    this.isIndeterminate = val.length > 0 && val.length < this.checkGroupList.length
  }

  get checkAllOptions() {
    return this.checkGroupList.map((item) => {
      return item.value
    })
  }

  config: CheckboxConfig = DEFAULT_CONFIG
  checkAll: boolean = false
  isIndeterminate: boolean = false
  langText: any = ''

  handleCheckAllChange(checkType) {
    const checkList = checkType ? this.checkAllOptions : []
    this.$emit('handleCheckAllChange', checkType)

    // sync修饰符 对应的 双向绑定事件
    this.$emit('update:checkList', checkList)
  }
  // 多选按钮组的事件
  handleCheckedChange(value) {
    // this.$emit('handleCheckedChange', value)
    // const checkedCount = value.length
    // this.checkAll = checkedCount === this.checkGroupList.length
    // this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkGroupList.length
  }

  // 按钮的事件
  handleCurrentBox(val, current) {
    this.$emit('checkedCurrentChange', { val, current })
  }

  changeModel(val) {
    // sync修饰符 对应的 双向绑定事件
    this.$emit('update:checkList', val)
  }
  // 反选
  @Emit('checkReverse')
  checkReverse() {
    const result = this.checkGroupList
      .filter((item) => {
        return !this.checkList.includes(item.value)
      })
      .map((filterItem) => {
        return filterItem.value
      })
    // sync修饰符 对应的 双向绑定事件
    this.$emit('update:checkList', result)
  }

  // created() {
  //   if (this.isWatchCheckListImmediate) {
  //     this.onCheckListChange(this.checkList)
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.inline {
  display: inline-block;
}
// .all-text{
//   min-width: 100px;
// }
/deep/.el-checkbox {
  margin-right: 20px;
}
</style>
