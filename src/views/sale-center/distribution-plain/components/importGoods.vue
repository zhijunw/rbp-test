<template>
  <el-dialog
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    title="导入货品"
    :visible.sync="dialogVisible"
    width="50%">
    <!--        <el-table :data="gridData" @selection-change="(array)=>{selectArray = array}" ref="ImportGoodsTable">-->
    <!--            <el-table-column type="selection" width="55"></el-table-column>-->
    <!--            <el-table-column type="index" width="55" label="序号"></el-table-column>-->
    <!--            <el-table-column property="goodsName" label="货号" width="150"></el-table-column>-->
    <!--            <el-table-column property="quantity" label="数量" width="200"></el-table-column>-->
    <!--            <el-table-column property="oweQuantity" label="欠数"></el-table-column>-->
    <!--        </el-table>-->
    <base-table
      ref="GoodsTable"
      :tableData="gridData"
      :colunmData="colunmData"
      class="size-table pdb-8"
      :tableConfig="tableConfig"
      @select="selectRow" />
    <span
      slot="footer"
      class="dialog-footer">
      <el-button @click="unImport">不导入</el-button>
      <el-button
        type="primary"
        @click="importData">导入</el-button>
    </span>
  </el-dialog>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import apiUrl from '@/api/sale-center/distribution-plain'
import { TableHeaderConfig } from '@/typings'
@Component({
  name: 'ImportGoodsDialog',
  components: {
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class App extends Vue {
  dialogVisible: boolean = false
  gridData: any[] = []
  selectArray: any[] = []
  importControls: Function
  colunmData: TableHeaderConfig[] = [
    {
      label: '货号',
      value: 'goodsName',
      lang: 'reportCommonWord.goodsName'
    },
    {
      label: '数量',
      value: 'quantity',
      lang: 'reportCommonWord.quantity'
    },
    {
      label: '欠数',
      value: 'oweQuantity',
      lang: 'reportCommonWord.oweQuantity'
    }
  ]
  tableConfig: any = {
    isMultiSelect: true,
    isIndex: true,
    isShowOpera: false,
    showSummary: false,
    height: '20vh'
  }
  // 导入
  importData() {
    this.dialogVisible = false
    const array = JSON.parse(JSON.stringify(this.selectArray))
    this.importControls(array, JSON.parse(JSON.stringify(this.gridData)))
  }
  // 不导入
  unImport() {
    this.dialogVisible = false
    this.importControls([], JSON.parse(JSON.stringify(this.gridData)))
  }
  // 弹窗
  async showImportGoodsDialog(saleId, callback) {
    const res = await this._post({
      url: `${apiUrl.saleList}?salePlanBillId=${saleId}&moduleId=${this.$route.meta.moduleId}`
    })
    if ((res['data'] || []).length === 0) {
      this.$message.warning('当前选择的销售计划单无货品需配货，请选择其他销售计划单！')
      callback([], [])
      return
    }
    this.dialogVisible = true
    this.importControls = callback
    if (res['code'] === 0) {
      this.gridData = res['data']
      this.$nextTick(() => {
        ;((this.$refs['GoodsTable'] as any).$refs['table'] as any).toggleAllSelection()
      })
    }
  }
  selectRow({ section }) {
    this.selectArray = section
  }
}
</script>

<style scoped></style>
