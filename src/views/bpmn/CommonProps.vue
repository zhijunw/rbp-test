<template>
  <div>
    CommonProps
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'
@Component({
  name: 'CommonProps'
})
export default class App extends Vue {
  @Prop({ required: true }) element: any
  @Inject('bpmnModelerOver') bpmnModelerOver: any
}
</script>

<style scoped></style>
