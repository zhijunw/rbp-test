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
import apiUrl from '@/api/retail-center/terminal-logistics'
import { globalConfigs } from '../configs'
import { TableHeaderConfig } from '@/typings'
    @Component({
      name: 'ImportGoodsDialog',
      components: {
        baseTable: () => import('@/components/base-table/index.vue')
      }
    })
export default class App extends Vue {
        dialogVisible:boolean = false
        goodsData:any = {}
        gridData:any[] = []
        selectArray:any[] = []
        importControls: Function
        colunmData: TableHeaderConfig[]=[
          {
            label: '货号',
            value: 'goodsCode',
            lang: 'reportCommonWord.goodsCode'
          },
          {
            label: '品名',
            value: 'goodsName',
            lang: 'reportCommonWord.goodsName'
          },
          {
            label: '数量',
            value: 'quantity',
            lang: 'reportCommonWord.quantity'
          }
        ]
        tableConfig:any = {
          isMultiSelect: true,
          isIndex: true,
          isShowOpera: false,
          showSummary: false,
          height: '20vh'
        };
        // 导入
        importData() {
          this.dialogVisible = false
          const array = JSON.parse(JSON.stringify(this.selectArray))
          const data = JSON.parse(JSON.stringify(this.goodsData))
          this.importControls(data, array, JSON.parse(JSON.stringify(this.gridData)))
        }
        // 不导入
        unImport() {
          this.dialogVisible = false
          const data = JSON.parse(JSON.stringify(this.goodsData))
          this.importControls(data, [], JSON.parse(JSON.stringify(this.gridData)))
        }
        // 弹窗
        async showImportGoodsDialog(saleId, callback) {
          const res = await this._get({ url: `${apiUrl.sendList}?id=${saleId}&moduleId=${globalConfigs.realModuleId}` })
          if (res.code === 0) {
            const billGoodsList:any = res.data.billGoodsList
            if (billGoodsList.length === 0) {
              this.$message.warning('当前选择的发货单无货品需配货，请选择其他发货单！')
              callback([], [])
              return
            }
            this.dialogVisible = true
            this.importControls = callback
            this.gridData = billGoodsList
            this.goodsData = res.data
            this.$nextTick(() => {
              ((this.$refs['GoodsTable'] as any).$refs['table'] as any).toggleAllSelection()
            })
          }
        }
        selectRow({ section }) {
          this.selectArray = section
        }
}
</script>

<style scoped>

</style>
