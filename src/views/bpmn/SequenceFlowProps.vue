<template>
  <div>
    <el-form-item
      label="编号"
      required>
      <el-input
        v-model="id"
        disabled />
    </el-form-item>
    <el-form-item
      label="名称"
      required>
      <el-input v-model="name" />
    </el-form-item>
    <!-- <el-form-item label="条件值">
      <el-select
        v-model="condition"
        filterable
        placeholder="请选择"
        style="width: 100%">
        <el-option
          v-for="item in conditionOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value" />
      </el-select>
    </el-form-item> -->
    <div class="options-group">
      <div class="options-group-title">
        <span class="f12">流程条件:</span>
        <span class="f12">条件组之间的关系</span>
        <div class="options-group-radio">
          <el-radio
            v-model="conditionFlag"
            label="0">
            与
          </el-radio>
          <el-radio
            v-model="conditionFlag"
            label="1">
            或
          </el-radio>
        </div>
      </div>
      <div
        v-for="(item, index) in optionsGroup"
        :key="index"
        class="options-group-item">
        <div class="item-title">
          <span class="f12">条件组{{ index + 1 }}</span>
          <span class="f12">条件之间的关系</span>
          <div class="options-group-radio">
            <el-radio
              v-model="item.groupConditionFlag"
              label="0">
              与
            </el-radio>
            <el-radio
              v-model="item.groupConditionFlag"
              label="1">
              或
            </el-radio>
          </div>
        </div>
        <div
          v-for="(children, findex) in item.children"
          :key="findex"
          class="children-item">
          <base-select
            class="base-select"
            :value.sync="children.conditionValue"
            :item="{ options: conditionType }" />
          <base-select
            class="base-select"
            :value.sync="children.conditionJudgmentValue"
            :item="{ options: conditionJudgment }" />
          <base-input
            :value.sync="children.amount"
            class="base-input" />
          <el-button
            type="text"
            size="small"
            icon="el-icon-close" />
        </div>
        <el-button
          icon="el-icon-plus"
          size="small"
          type="text"
          @click="addGroupItem(item)">
          添加视图条件
        </el-button>
      </div>
      <el-button
        icon="el-icon-plus"
        plain
        size="small"
        @click="addGroup">
        添加视图条件组
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'
import bpmnHelper from './js/bpmnHelper.js'
import { Dictionary } from 'vue-router/types/router'
const eventDefinitionHelper = require('./js/EventDefinitionHelper.js')
const elementHelper = require('./js/ElementHelper.js')
@Component({
  name: 'SequenceFlowProps',
  components: {
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) element: any
  @Inject('bpmnModelerOver') bpmnModelerOver: any

  modeling: any = null
  id = this.element.id || ''
  name = ''
  condition = ''
  formKey = ''
  conditionFlag = '0'
  optionsGroup: any[] = []
  conditionType: any[] = [
    {
      label: '数量',
      value: 'quantity'
    },
    {
      label: '金额',
      value: 'amount'
    }
  ]
  conditionJudgment: any[] = [
    {
      label: '<',
      value: '<'
    },
    {
      label: '<=',
      value: '<='
    },
    {
      label: '=',
      value: '='
    },
    {
      label: '>=',
      value: '>='
    },
    {
      label: '>',
      value: '>'
    }
  ]

  @Watch('name')
  onNameChange(newValue, oldValue) {
    this.modeling.updateProperties(this.element, {
      name: newValue
    })
  }
  @Watch('element', { immediate: true, deep: true })
  onElementChange(element, oldVal) {
    console.log('SequenceFlowProps element', element)
    this.name = element.businessObject.name
    // 显示条件配置选项
    // this.defaultflow = false;
    // 获取source节点
    const sourceBo = bpmnHelper.getBo(element.source)
    if (!sourceBo) {
      return
    }
    // 获取source上的默认连线
    // let defalutSequence = element.businessObject.get('defaultflow');
    // if(defalutSequence){
    //     this.defaultflow = true;
    // }
    // 加载条件
    this.loadCondition()
  }
  @Watch('optionsGroup', { deep: true })
  onConditionChange(newVal, oldValue) {
    let conditionOrConditionExpression
    const bo = bpmnHelper.getBo(this.element)
    const bpmnModeler = this.bpmnModelerOver()
    const commandStack = bpmnModeler.get('commandStack')
    // console.log('condition', newVal, 'bo', bo, 'commandStack', commandStack)
    if (newVal) {
      const conditionalEventDefinition = eventDefinitionHelper.getConditionalEventDefinition(
        this.element
      )
      // console.log('conditionalEventDefinition', conditionalEventDefinition)
      const bpmnFactory = bpmnModeler.get('bpmnFactory')
      // 生成表达式
      newVal = '${' + this.formatOptionsGroupData(newVal) + '}'
      // 设置表达式的值
      conditionOrConditionExpression = elementHelper.createElement(
        'bpmn:FormalExpression',
        { body: newVal },
        conditionalEventDefinition || bo,
        bpmnFactory
      )
      // const source = this.element.source
      // 如果是默认条线，移除source的属性
      // if (source && source.businessObject.defaultflow) {
      //     bpmnHelper.updatePropertiesByCmd(source,commandStack,{ 'defaultflow': false });
      // }
    }
    bpmnHelper.updatePropertiesByCmd(this.element, commandStack, {
      conditionExpression: conditionOrConditionExpression
    })
    this.modeling.updateProperties(this.element, { 'activiti:condition': newVal })
  }

  mounted() {
    const bpmnModeler = this.bpmnModelerOver()
    this.modeling = bpmnModeler.get('modeling')
  }

  formatOptionsGroupData(optionsDataArr: any[]) {
    const groupValue = optionsDataArr.reduce((prev, next) => {
      if (next.children && next.children.length > 0) {
        const groupValue = next.children.map((item) => {
          return `${item.conditionValue}${item.conditionJudgmentValue}${item.amount}`
        })
        const stringValue =
          next.groupConditionFlag === '1' ? groupValue.join('||') : groupValue.join('&&')
        prev.push(`(${stringValue})`)
      }
      return prev
    }, [])
    const groupValueString =
      this.conditionFlag === '1' ? groupValue.join('||') : groupValue.join('&&')
    return groupValueString
  }
  // 加载条件
  loadCondition() {
    const bo = bpmnHelper.getBo(this.element)
    const conditionalEventDefinition = eventDefinitionHelper.getConditionalEventDefinition(
      this.element
    )
    const conditionExpression = conditionalEventDefinition
      ? conditionalEventDefinition.condition
      : bo.conditionExpression
    // console.log('loadCondition conditionExpression', conditionExpression)
    if (conditionExpression) {
      // 获取配置的条件表达
      const condition = conditionExpression.get('body')
      console.log('loadCondition condition', condition)
      this.parseCondition(condition)
    }
  }
  format(str) {
    let newStr = str
    const reg = /\)/g
    while (true) {
      const match = reg.exec(newStr)
      if (!match) break
      if (match.index !== newStr.length - 1) {
        this.conditionFlag = newStr.slice(match.index + 1, match.index + 3) === '&&' ? '0' : '1'
      }
      var strArr = newStr.split('')
      strArr.splice(match.index + 1, 2)
      newStr = strArr.join('')
    }
    return newStr
  }
  parseCondition(conditionExpress) {
    const operators = ['<', '=', '>=', '<=', '>']
    const logicOperators = ['&&', '||']
    conditionExpress = conditionExpress
      .replace('$', '')
      .replace('{', '')
      .replace('}', '')
      .replace(new RegExp('"', 'g'), '')
    conditionExpress = this.format(conditionExpress)
    console.log('conditionExpress', conditionExpress)
    this.optionsGroup = createConditionRow(conditionExpress, operators)
    function createConditionRow(conditionExpress, logic?) {
      const result: any[] = []
      var arr: any[] = []
      var str = ''
      for (var i = 0; i < conditionExpress.length; i++) {
        if (conditionExpress[i] === ')') {
          var temp = str
          arr.push(temp)
          str = ''
        }
        if (conditionExpress[i] !== '(' && conditionExpress[i] !== ')') {
          str += conditionExpress[i]
        }
      }
      console.log('createConditionRow, arr', arr)
      arr.forEach((strs) => {
        // result.children = []
        const obj: any = {
          children: []
        }
        if (strs.indexOf('&&') > 0) {
          strs.split('&&').forEach((key) => {
            const headOptIdx = findChar(key, true, false, operators)
            const footOptIdx = findChar(key, false, false, operators)
            console.log('&& headOptIdx', headOptIdx, ' && footOptIdx', footOptIdx)
            obj.children.push({
              conditionValue: key.substring(0, headOptIdx).trim(),
              conditionJudgmentValue: key.substring(headOptIdx, footOptIdx + 1).trim(),
              amount: key.substring(footOptIdx + 1, conditionExpress.length).trim()
            })
          })
          obj.groupConditionFlag = '0'
        } else if (strs.indexOf('||') > 0) {
          strs.split('||').forEach((key) => {
            const headOptIdx = findChar(key, true, false, operators)
            const footOptIdx = findChar(key, false, false, operators)
            console.log('|| headOptIdx', headOptIdx, '|| footOptIdx', footOptIdx)
            obj.children.push({
              conditionValue: key.substring(0, headOptIdx).trim(),
              conditionJudgmentValue: key.substring(headOptIdx, footOptIdx + 1).trim(),
              amount: key.substring(footOptIdx + 1, conditionExpress.length).trim()
            })
          })
          obj.groupConditionFlag = '1'
        } else {
          const headOptIdx = findChar(strs, true, false, operators)
          const footOptIdx = findChar(strs, false, false, operators)
          obj.children.push({
            conditionValue: strs.substring(0, headOptIdx).trim(),
            conditionJudgmentValue: strs.substring(headOptIdx, footOptIdx + 1).trim(),
            amount: strs.substring(footOptIdx + 1, conditionExpress.length).trim()
          })
        }
        result.push(obj)
      })
      return result
    }

    /**
     * @description 检索第一个的操作操作符
     * @param str 需要被检索的字符串
     * @param  type 类型 true:正查找 false:反查找
     * @param report 检索的字符是否需要重复 true | false
     */
    function findChar(str, type, report, operators) {
      let index = -1
      const len = str.length
      if (type) {
        for (let i = 0; i < len; i++) {
          const char = str.charAt(i)
          if (operators.includes(char)) {
            // 查找第一个
            if (report) {
              if (char === str.charAt(i + 1)) {
                index = i
                break
              }
            } else {
              index = i
              break
            }
          }
        }
      } else if (!type) {
        for (let i = len - 1; i >= 0; i--) {
          const char = str.charAt(i)
          if (operators.includes(char)) {
            // 从末尾查找最后一个
            if (report) {
              if (char === str.charAt(i - 1)) {
                index = i
                break
              }
            } else {
              index = i
              break
            }
          }
        }
      }
      return index
    }
  }
  addGroup() {
    this.optionsGroup.push({
      groupConditionFlag: '0',
      children: []
    })
  }
  addGroupItem(item) {
    item.children.push({
      conditionValue: '',
      conditionJudgmentValue: '',
      amount: ''
    })
  }
}
</script>

<style scoped lang="scss">
.options-group {
  &-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 1.5;
  }
  &-radio {
    /deep/.el-radio {
      margin-right: 10px;
    }
  }
  &-item {
    margin-bottom: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 6px;
    .item-title {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      line-height: 1.5;
    }
    .children-item {
      margin: 6px 0;
      display: flex;
    }
    .base-select,
    .base-input {
      flex: 1;
      margin-right: 6px;
    }
  }
}
</style>
