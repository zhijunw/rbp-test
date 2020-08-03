<template>
  <base-dialog
    :dialogObj="systemDialogConfig"
    class="base-dialog"
    @confirm="result(true)"
    @cancel="result(false)"
    v-on="$listeners">
    <template v-slot:content>
      {{ content }}
    </template>
  </base-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DialogObj } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
@Component({
  name: 'systemDialog',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue')
  }
})
export default class App extends Vue {
  systemDialogConfig: DialogObj = {
    title: '系统提醒',
    isShowDialog: false,
    appendToBody: true,
    width: '680px'
  }
  content: string = ''
  result: Function = () => {}
  message(content: string, result: Function) {
    this.content = content
    this.result = result
    this.systemDialogConfig.isShowDialog = true
  }
}
</script>

<style scoped></style>
