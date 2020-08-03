<template>
  <div>
    <el-form-item
      label="编号">
      <el-input
        v-model="id"
        disabled />
    </el-form-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'
@Component({
  name: 'EndEventProps'
})
export default class App extends Vue {
  @Prop({ required: true }) element: any
  @Inject('bpmnModelerOver') bpmnModelerOver: any

  id = this.element.id || ''
  name = ''
  closer = ''
  modeling: any = null

  @Watch('element', { immediate: true, deep: true })
  onElementChange(newVal, oldVal) {
    if (newVal !== oldVal) {
      if (newVal.type === 'bpmn:EndEvent') {
        // 防止修改其他子组件的属性
        this.name = newVal.name
      }
    }
  }
  @Watch('name')
  onNameChange(newValue, oldValue) {
    this.modeling.updateProperties(this.element, {
      name: newValue
    })
  }

  @Watch('closer')
  onInitiatorChange(newValue, oldValue) {
    this.modeling.updateProperties(this.element, {
      'activiti:closer': newValue
    })
  }

  mounted() {
    const bpmnModeler = this.bpmnModelerOver()
    this.modeling = bpmnModeler.get('modeling')
  }
}
</script>

<style scoped></style>
