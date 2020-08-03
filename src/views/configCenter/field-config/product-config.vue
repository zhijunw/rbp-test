<template>
  <div class="product-config">
    <base-input
      :value.sync="moduleName"
      class="mgb-12"
      :inputProps="{
        placeholder: 'form.placeholder.modulePlaceholder',
        long: true,
        prefixIcon: 'el-icon-search'
      }"
      @enter="getList" />
    <div class="table-box">
      <base-table
        :colunmData="productHeader"
        :tableData="productData"
        class="base-table"
        :tableConfig="{
          isMultiSelect: false,
          isIndex: true
        }"
        @saveItem="saveItem"
        @cancelItem="cancelItem"
        @deleteItem="deleteItem"
        @editItem="editItem">
        <template v-slot:tableCell="{ scope: { row, item,$index } }">
          <template v-if="item.value === 'columnNameList'">
            <mult-fields
              class="no-border-input"
              :disabled="!row.edit"
              :chooseOption="row.columnNameList"
              @openFields="openFields(row,$index)" />
          </template>
          <template v-else-if="item.value === 'moduleList'">
            <base-select
              :value.sync="row[item.value]"
              :disabled="!row.edit"
              class="no-border-input"
              :item="{
                options: moduleOptions
              }"
              :selectProps="{
                multiple: true
              }" />
          </template>
        </template>
      </base-table>
      <div class="add-box f12">
        <el-button
          id="btn_t_d_blue"
          class="mgl-10"
          type="text"
          size="mini"
          @click="addFields">
          +{{ $t('layout.btns.addFields') }}
        </el-button>
      </div>
    </div>

    <tableheader-config
      :config="filedsDataConfig"
      :dialogObj="fieldsDialog"
      @confirmView="confirmView">
      <template v-slot:header>
        <div class="empty" />
      </template>
    </tableheader-config>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { moduleSettings } from './configs'
import apiUrl from '@/api/config-center/fields-config'
import { Options, DialogObj } from '@/typings'
import { Tools } from '@/utils/tools'
interface TableHeaderFieldsConfig {
  fields: any[]
  choose: string[]
  name: string
  viewId?: number
  isSortRules?: boolean
  noCommit?: boolean
}
@Component({
  name: 'product-config',
  components: {
    baseInput: () => import('@/components/base-input/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    multFields: () => import('./component/mult-fields.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue')
  }
})

export default class App extends Vue {
    moduleName: string = ''
    productHeader = moduleSettings.productConfigHeader
    productData: any[] = []
    moduleOptions:Options[] = []
    fieldsDialog: DialogObj = {
      isShowDialog: false,
      appendToBody: true,
      setShow: true,
      title: '',
      width: '40%'
    }
    filedsDataConfig: TableHeaderFieldsConfig = {
      fields: [],
      choose: [],
      name: 'empty',
      isSortRules: true
    }
    currentIndex:number = 0
    async created() {
      this.getFields()
      //   需要先执行获取模块下拉框的数据 再去获取列表
      await this.getSelect()
      await this.getList()
    }
    async getSelect() {
      const res = await this._get({ url: apiUrl.getModuleSelect, data: {
        data: this.moduleName
      }})
      if (res.code === 0) {
        Tools.setValueAndName(res.data.billList)
        this.moduleOptions = res.data.billList
      }
    }

    async getFields() {
      const res = await this._get({ url: apiUrl.produceFieldsList })
      if (res.code === 0) {
        this.filedsDataConfig.fields = res.data.reduce((k, m) => {
          // 如果有必须要有的字段 则默认添加到 choose
          if (m.requiredFlag) this.filedsDataConfig.choose!.push(m.columnKey)
          const index = k.findIndex((item) => item.kindName === m.kindName)
          const obj = Object.assign(m, {
            value: m.columnName,
            label: m.columnTitle,
            disabled: m.requiredFlag
          })
          if (index > -1) {
            k[index].children.push(obj)
          } else {
            k.push({ kindName: m.kindName, children: [obj] })
          }
          return k
        }, [])
      }
    }
    async getList() {
      const res = await this._post({ url: apiUrl.produceModuleList, data: {
        data: this.moduleName
      }})
      if (res.code === 0) {
        this.productData = res.data
        // 这里设置不能选择相同的单据模块
        this.sameModuleDisable()
      }
    }
    // 设置已选的模块不能在被选
    sameModuleDisable() {
      if (this.productData.length) {
        let chooseAllModule: string[] = []
        this.productData.forEach((item) => {
          chooseAllModule = [...chooseAllModule, ...item.moduleList]
        })
        this.moduleOptions.forEach((item) => {
          if (chooseAllModule.includes(item.id)) item.disabled = true
        })
      }
    }
    openFields(row, $index) {
      this.currentIndex = $index
      this.filedsDataConfig.choose = row.columnNameList.map((item) => item.columnName)
      this.fieldsDialog.isShowDialog = true
      this.fieldsDialog.title = this.$t('fieldConfiguration.productConfig')
    }
    confirmView({ reportViewColumnList }) {
      this.fieldsDialog.isShowDialog = false
      this.$set(this.productData[this.currentIndex], 'columnNameList', reportViewColumnList)
    }
    editItem({ row, $index }) {
      this.$set(row, 'edit', true)
    }

    async deleteItem({ row, $index }) {
      const res = await this._post({ url: apiUrl.produceFieldsDelete, data: {
        data: {
          columnNameList: row.columnNameList.map((item) => item.columnName),
          moduleList: row.moduleList
        }
      }})
      if (res.code === 0) {
        this._message({
          message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns.delete') }),
          type: 'success'
        })
        this.getList()
      }
    }
    async saveItem({ row, $index }) {
      const url = row.id ? apiUrl.produceFieldsUpdate : apiUrl.produceFieldsCreate
      const infoMsg = row.id ? 'edit' : 'new'
      const method = row.id ? '_put' : '_post'
      const res = await this[method]({ url, data: {
        data: {
          columnNameList: row.columnNameList.map((item) => item.columnName),
          moduleList: row.moduleList
        }
      }})
      if (res.code === 0) {
        this._message({
          message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns')[infoMsg] }),
          type: 'success'
        })
        this.getList()
      }
    }
    cancelItem({ row, $index }) {
      this.getList()
    }
    checkEdit(tableData) {
      const result = tableData.some(val => val.edit)
      if (result) {
        this._message({ message: this.$t('commonWord.saveEdit'), type: 'warning' })
      }
      return result
    }
    addFields() {
      const falg:boolean = this.checkEdit(this.productData)
      if (!falg) {
        this.productData.push({
          columnNameList: [],
          moduleList: [],
          edit: true

        })
      }
    }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
/*默认*/
@media (min-width: 1280px) {
  .product-config {
    height: 80vh;
  }
}
/* 大屏幕 ：大于等于1440px*/
@media (min-width: 1440px) {
  .product-config {
    height: 80vh;
  }
}
@media (min-width: 1600px) {
  .product-config {
    height: 86vh;
  }
}
.product-config{
    // margin-top: 12px;
    padding-top: 12px;
    // height: 77vh;
    // min-height: calc(100vh - 228px);

    .table-box{
        width: 800px;
    }
}
.base-table {
   /deep/.cell{
    padding: 0 !important
  }
}
.add-box {
  color: $colorTextRegular;
  height: 28px;
  line-height: 28px;
  border: 1px solid #eee;
  border-top: none;
  &-text {
    width: 50px;
    display: inline-block;
    padding-left: 10px;
    border-right: 1px solid #eee;
  }
  .inline-block {
    display: inline-block;
    width: 200px;
    padding-left: 10px;
    color: $basic;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
