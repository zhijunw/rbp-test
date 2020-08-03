<template>
  <div class="form-warrper">
    <el-form
      ref="commonForm"
      label-position="top"
      :model="formData"
      size="mini"
      @submit.native.prevent>
      <el-row :gutter="showAllForm ? 0 : 20">
        <el-col :span="showAllForm ? 24 : 23">
          <el-row :gutter="36">
            <transition-group mode="out-in">
              <el-col
                v-for="item of spliceFormlist"
                :key="item.value"
                :span="item.setLength ? item.setLength : 6"
                :offset="item.offset"
                :push="item.push"
                :class="item.class"
                style="height:60px">
                <template v-if="['input', 'text', 'number', 'textarea'].includes(item.type)">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <base-input
                      :value.sync="formData[item.value]"
                      :type="item.type"
                      :inputProps="item.config"
                      :disabled="item.alwaysDisabled || item.disabled || disabled"
                      style="width:100%"
                      @change="Emit(item.value, item, $event)"
                      @enter="Emit(`enter-${item.value}`, item, $event)" />
                  </el-form-item>
                </template>
                <template v-else-if="item.type === 'datePick'">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <base-date-picker
                      :disabled="item.alwaysDisabled || item.disabled || disabled"
                      :datePickertProps="item.config"
                      :value.sync="formData[item.value]"
                      @change="Emit(item.value, item, $event)" />
                  </el-form-item>
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <base-select
                      :value.sync="formData[item.value]"
                      :disabled="item.alwaysDisabled || item.disabled || disabled"
                      :item="item"
                      :selectProps="item.config"
                      @selectChange="Emit(item.value, item, $event)" />
                  </el-form-item>
                </template>
                <template v-else-if="item.type === 'filter'">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <fuzzy-search
                      :fuzzyConfig="item.fuzzyConfig"
                      :value.sync="formData[item.value]"
                      :disabled="item.alwaysDisabled || item.disabled || disabled" />
                  </el-form-item>
                </template>
                <template v-else-if="item.type === 'checkbox'">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <base-checkbox
                      :checkGroupList="item.options"
                      :checkList.sync="formData[item.value]"
                      :disabled="item.alwaysDisabled || item.disabled || disabled"
                      class="checkbox-warp" />
                  </el-form-item>
                </template>
                <template v-else-if="item.type === 'radio'">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <el-radio-group v-model="formData[item.value]">
                      <el-radio
                        v-for="option in item.options"
                        :key="option.value"
                        :disabled="item.alwaysDisabled || item.disabled || disabled"
                        :label="option.value">
                        {{ option.label }}
                      </el-radio>
                    </el-radio-group>
                  </el-form-item>
                </template>
                <template v-else-if="item.type === 'cascader'">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <base-cascader
                      v-model="formData[item.value]"
                      :disabled="item.alwaysDisabled || item.disabled || disabled"
                      :options="item.options"
                      :selectProps="item.config"
                      @cascaderChange="Emit(item.value, item, $event)" />
                  </el-form-item>
                </template>
                <template v-else-if="item.type === 'highSearch'">
                  <el-form-item
                    :label="$t(item.lang) || item.label"
                    :prop="item.value"
                    :rules="item.rules">
                    <advanced-search
                      :ref="`advancedSearch${item.value}`"
                      :key="`advancedSearch${item.value}`"
                      :highSearchConfig="item.highSearchConfig"
                      :value.sync="formData[item.value]"
                      :disabled="item.alwaysDisabled || item.disabled || disabled"
                      @singleChannelChoose="(value)=>{ singleChannelChoose(value,item.highSearchConfig,item.value)}"
                      @getFilterOptions="emitFilterFunc($event, item)"
                      @updateAdvancedSearchValue="updateAdvancedSearchValue($event, item)"
                      v-on="$listeners" />
                  </el-form-item>
                </template>
                <template v-else>
                  <slot
                    :name="item.value"
                    :row="item"
                    :formData="formData" />
                </template>
              </el-col>
            </transition-group>
          </el-row>
        </el-col>
        <el-col
          v-if="!showAllForm"
          :span="1">
          <div
            class="toggle-box color-info f12 hover"
            @click="toggle">
            <i :class="[toggleFlag ? 'el-icon-arrow-up  ' : 'el-icon-arrow-down']" />
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { ElForm } from 'element-ui'
import { FormListConfig, Dictionary, BillStatus } from '@/typings'
// 保存校验的方法
import formSaveMixins from '@/mixins/form-save-mixins'
@Component({
  name: 'form-list',
  components: {
    fuzzySearch: () => import('@/components/base-fuzzy/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseCascader: () => import('@/components/base-cascader/index.vue'),
    baseCheckbox: () => import('@/components/base-checkbox/index.vue'),
    baseDatePicker: () => import('@/components/base-datePicker/index.vue'),
    advancedSearch: () => import('@/components/advanced-search/index.vue'),
    baseTimePicker: () => import('@/components/base-timePicker/index.vue')
  }
})
export default class App extends mixins(formSaveMixins) {
  @Prop({ default: () => [], required: true }) formList: FormListConfig[]

  @Prop({ default: () => {}, required: true }) formData: Dictionary

  @Prop({ default: false }) disabled: boolean

  @Prop({ default: false }) inline: boolean

  @Prop({ default: true }) showAllForm: boolean

  @Prop({ default: 4 }) columnLine: number

  @Prop() defaultFilter

  @Prop() status: BillStatus

  toggleFlag: boolean = true

  get spliceFormlist() {
    if (this.showAllForm || this.toggleFlag) {
      return this.formList
    } else {
      return this.formList.slice(0, this.columnLine)
    }
  }

  @Watch('status', { immediate: true })
  onValueChanged(val: BillStatus) {
    const obj = {
      add: 'handleAddStatus',
      edit: 'handleEditStatus',
      cancel: 'handleCancelStatus'
    }
    if (val && this[obj[val]]) this[obj[val]]()
  }

  // 根据defaultFilter修改
  configDefaultFilter(defaultFilter) {
    return new Promise(resolve => {
      console.log('defaultFilter', defaultFilter)
      this.$nextTick(() => {
        (Object.keys(defaultFilter) as any).forEach(em => {
          const target = this.formList.find(item => {
            return item.value === em
          })
          if (target) {
            switch (target.type) {
              case 'highSearch':
                this.$nextTick(() => {
                  // 判断单选或者多选
                  const isMultiple = Array.isArray(defaultFilter[em].value)
                  let options: any[] = []
                  if (isMultiple) {
                    options = defaultFilter[em].options || []
                  } else {
                    options = [{ label: `${defaultFilter[em].label}`, value: defaultFilter[em].value }]
                  }
                  (this.$refs[`advancedSearch${target.value}`] as any)[0].upDateOptionsData(options, defaultFilter[em].value)
                })
                break
              case 'select':
                target.options = defaultFilter[em].options || []
                break
              default:
                console.log('目前只支持highSearch/select')
            }
            target.disabled = defaultFilter[em].disabled
            this.$nextTick(() => {
              this.$set(this.formData, target.value, defaultFilter[em].value)
            })
          } else {
            console.log('默认配置无法匹配', em)
          }
        })
      })
      resolve()
    })
  }

  // 新建
  handleAddStatus() {
    this.formList.forEach((item) => {
      item.disabled = false
    })
    this.resetFields()
  }

  // 编辑
  handleEditStatus() {
    this.formList.forEach((item, index) => {
      if (item.editDisabled) item.disabled = true
    })
  }

  // 取消
  handleCancelStatus() {
    this.resetFields()
  }
  // 展开/收起
  toggle(e) {
    this.$emit('toggle', !this.toggleFlag)
    this.toggleFlag = !this.toggleFlag
  }
  dealCustomerFields(itemObj, val) {
    if (itemObj.fieldsType === 'customerField') {
      // 之所以删除 是应为 组件内部 更新了数据
      delete this.formData[itemObj.value]
      if (!this.formData.customizeFiledMap) {
        this.$set(this.formData, 'customizeFiledMap', {})
      }
      this.$set(this.formData.customizeFiledMap, itemObj.value, val)
    } else {
      this.$set(this.formData, itemObj.value, val)
    }
  }
  dealCascaderData(itemObj, val) {
    if (itemObj.type === 'cascader' && itemObj.cascaderConfig) {
      itemObj.cascaderConfig.forEach((value, index) => {
        if (val.length > 0) {
          this.$set(this.formData, value, val[index])
        } else {
          delete this.formData[value]
        }
      })
    }
  }
  Emit(name, itemObj, val) {
    // 如果这里的字段类型是 自定义字段 则放入 customFieldMap 集合中
    this.dealCustomerFields(itemObj, val)
    // 本地文件设置的选择后禁用的字段
    if (itemObj.chooseDisable) {
      itemObj.disabled = true
    }

    if (!name) return

    const obj: Dictionary = {
      val,
      linkField: name,
      itemObj,
      formList: this.formList
    }
    // 如果是单选下拉框则把 label 也放入 obj
    if (itemObj.type === 'select' && !Array.isArray(val)) {
      obj.label = itemObj.options.find((item) => item.value === val).label
    }
    // 如果是级联 则从配置项里面 把对应的值赋值
    this.dealCascaderData(itemObj, val)

    this.$emit(name, obj)
  }

  // 获取模糊查询组件下拉框值
  async emitFilterFunc(query, itemObj) {
    const obj = {
      val: query,
      itemObj
    }

    this.$emit(`f-${itemObj.value}`, obj)
  }

  // 高级搜索的事件
  updateAdvancedSearchValue(value, item) {
    // 手动更新 数据 先手动去掉 item.value 的数据 在更新 item.linkValue 的数据
    // this.$set(this.formData,item.value,[])
    delete this.formData[item.value]
    if (value) {
      this.$set(this.formData, item.linkValue, value)
    } else {
      delete this.formData[item.linkValue]
    }
  }
  // 清除匹配规则
  resetRules() {
    // (this.$refs.commonForm as any ).clearValidate()
    this.$nextTick(() => {
      ;(this.$refs.commonForm as any).clearValidate()
    })
  }

  // 重置匹配规则
  resetFields() {
    this.$nextTick(() => {
      ;(this.$refs.commonForm as any).resetFields()
    })
  }

  // 单选绑定预设
  singleChannelChoose(value, highSearchConfig, key) {
    const func: Function = highSearchConfig.dialogSearchConfig.singleSelectFunction
    if (func) {
      this.formData[key] = func(value.row.id, value)
    }
  }
}
</script>
<style lang="scss">
.checkbox-warp {
  .checkbox-group {
    display: flex;
    margin-left: 20px;
  }
}
.form-warrper {
  .el-form--label-top .el-form-item__label {
    padding: 0;
  }
  .el-form-item__label {
    font-size: 12px;
  }
  /deep/.el-form-item__error {
    top: -20px;
    right: 0;
    text-align: right;
  }
  /deep/.el-form-item {
    margin-bottom: 0;
  }
}
</style>
<style scoped lang="scss">
.form-warrper{
  position: relative;
  /deep/.el-form-item__label{
    line-height: 23px;
  }
}
.checkbox-warp {
  display: flex;
}
.toggle-box {
  // position: absolute;
  // top:32px;
  // right: 0;
  width: 20px;
  height: 20px;
  border: 1px solid #1ca1ff;
  line-height: 20px;
  text-align: center;
  margin-top: 28px;
  border-radius: 2px;
}
</style>
