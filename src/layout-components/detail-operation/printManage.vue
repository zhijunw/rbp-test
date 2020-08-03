<template>
  <!--打印方案管理-->
  <el-dialog
    class="printManageDialog"
    :append-to-body="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="true"
    title="打印方案管理"
    :visible.sync="dialogVisible"
    width="50%">
    <printTemplate
      :activeTab="m_moduleId"
      @switchView="close" />
  </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
@Component({
  name: 'print-manages',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    printTemplate: () => import('@/views/configCenter/print-config/template/print-template.vue')
  }
})
export default class App extends Vue {
  // 打印管理
  dialogVisible: boolean = false
  get m_moduleId() {
    return this.$route.meta.moduleId
  }
  open() {
    this.dialogVisible = true
  }
  close() {
    this.dialogVisible = false
  }
  created() {}
}
</script>

<style lang="scss">
.printManageDialog {
  .el-dialog__body {
    padding: 20px 10px;
  }
}
</style>
