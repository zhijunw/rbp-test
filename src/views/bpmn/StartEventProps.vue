<template>
  <div>
    <el-form-item
      label="编号">
      <el-input
        v-model="id"
        disabled />
    </el-form-item>
    <!-- <el-form-item label="名称">
      <el-input v-model="name" />
    </el-form-item>

    <el-form-item
      label="启动流程的人的id">
      <el-input v-model="initiator" />
    </el-form-item> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'
@Component({
  name: 'StartEventProps'
})
export default class App extends Vue {
  @Prop({ required: true }) element: any
  @Inject('bpmnModelerOver') bpmnModelerOver: any

  id = this.element.id || ''
  name = ''
  initiator = ''
  modeling: any = null

  @Watch('name')
  onNameChange(newValue, oldValue) {
    this.modeling.updateProperties(this.element, {
      name: newValue
    })
  }

  @Watch('initiator')
  onInitiatorChange(newValue, oldValue) {
    this.modeling.updateProperties(this.element, {
      'activiti:initiator': newValue
    })
  }

  mounted() {
    const bpmnModeler = this.bpmnModelerOver()
    this.modeling = bpmnModeler.get('modeling')
  }
}
</script>

<style scoped></style>
