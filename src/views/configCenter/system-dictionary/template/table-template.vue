<template>
  <div class="table-template">
    <div class="add-box">
      <el-button
        plain
        @click="add">
        {{ $t('layout.btns.add') }}
      </el-button>
      <el-input
        v-model="searchValue"
        class="search mgl-10"
        prefix-icon="el-icon-search"
        :placeholder="$t('form.placeholder.keywordPlaceholder')"
        @keydown.native.enter="handleSearch" />
    </div>
    <base-table
      :colunmData="tableHeader"
      :tableData="tableData"
      class="base-table"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: true,
        highlightCurrentRow: false
      }"
      @saveItem="saveItem"
      @cancelItem="cancelItem"
      @deleteItem="deleteItem"
      @editItem="editItem">
      <template v-slot:tableCell="{ scope: { row, item} }">
        <template v-if="['input','number'].includes(item.type) && row.edit">
          <base-input
            :value.sync="row[item.field]"
            :type="item.type"
            class="no-border-input" />
        </template>
        <template v-else-if="item.type === 'multInput' && row.edit">
          <div class="input-box">
            <base-input
              :value.sync="row['min'+item.field]"
              :type="item.type"
              :max="row['max'+item.field]"
              class="no-border-input flex-1" /> -
            <base-input
              :value.sync="row['max'+item.field]"
              :type="item.type"
              :min="row['min'+item.field]"
              class="no-border-input flex-1" />
          </div>
        </template>
        <template v-else-if="item.type === 'select'">
          <base-select
            :value.sync="row[item.field]"
            class="no-border-input"
            :item="{options: item.options}"
            :disabled="!row.edit" />
        </template>
        <template v-else-if="item.type === 'multInput' && !row.edit">
          <span class="pdl-10">{{ row['min'+item.field] }}-{{ row['max'+item.field] }}</span>
        </template>
        <template v-else>
          <span class="pdl-10">{{ row[item.field] }}</span>
        </template>
      </template>
    </base-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { TableHeaderConfig, Dictionary } from '@/typings'
import vuexMixins from '../configs/vuex-module'
import { templateConfig } from '../configs'
import apiUrl from '@/api/config-center/system-dictionary'
import { transformFields } from '@/utils'
import ValidataStrage from '@/utils/vaildateStrage'

type Apikey = 'templateOne' | 'templateTwo' | 'templateAge' | 'templateThereElement'
const TEMPLATE_ARR = ['templateOne', 'templateTwo', 'templateAge', 'templateThereElement']
@Component({
  name: 'table-template',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
  // 观察当前 tab
  @Watch('v_activeTab', { immediate: true })
  async onActiveTabChange(val, oldval) {
    if (val) {
      const config = templateConfig[val]
      // 这里 table-template模版 只适用于 apikey => templateOne templateTwo templateAge
      if (TEMPLATE_ARR.includes(config.apiKey)) {
        this.tableHeader = config.tableHeader
        this.tableName = config.className
        this.apiKey = config.apiKey
        this.searchValue = ''
        await this.getSelect()
        this.getList()
      }
    }
  }
  searchValue:string = ''
  tableHeader: TableHeaderConfig[] = []
  tableData: any[] = []
  tableName: string = ''
  apiKey: Apikey
  // deepTableData: any[] = []

  async getSelect() {
    // 如果没有获取下拉框接口则不需要执行下面的步骤
    if (!(apiUrl[this.apiKey] as Dictionary).getSelect) return

    const res = await this._get({ url: (apiUrl[this.apiKey] as Dictionary).getSelect })
    if (res.code === 0) {
      this.tableHeader.forEach((item) => {
        if (item.type === 'select') {
          const optionsData = res.data[item.matchSelectKey!]
          if (optionsData) {
            item.options = transformFields(optionsData, { label: 'name', value: 'id' }).map((item) => {
              item.value = item.value.toString()
              return item
            })
          }
        }
      })
    }
  }
  // 新增做校验 是否有行数据没保存
  add() {
    const falg:boolean = this.checkEdit(this.tableData)
    if (!falg) {
      const keysObj: Dictionary = {
        edit: true
      }
      this.tableHeader.forEach((item) => {
        keysObj[item.field] = ''
      })
      this.tableData.push(keysObj)
    }
  }

  async getList() {
    const res = await this._post({
      url: apiUrl[this.apiKey].list,
      data: {
        data: {
          className: this.tableName,
          name: this.searchValue
        }
      }
    })
    if (res.code === 0) {
      this.tableData = res.data
    }
  }
  // 模糊搜索
  handleSearch() {
    this.getList()
  }
  // 校验 tableData 里面是否有 edit 字段 如果有则代表某条数据处于保存态 需要先保存
  checkEdit(tableData) {
    const result = tableData.some(val => val.edit)
    if (result) {
      this._message({ message: this.$t('commonWord.saveEdit'), type: 'warning' })
    }
    return result
  }
  // 验证必填字段不能为空 如编号和name
  validate(row):boolean | void {
    const requiredArr:Pick<TableHeaderConfig, 'value' | 'label' | 'lang'>[] = []
    this.tableHeader.forEach((item) => {
      if (!item.require) requiredArr.push({ value: item.field, label: item.label, lang: item.lang })
    })
    const obj = requiredArr.find((item) => {
      if (this.tableName === 'ageRange') {
        return !row.maxAge || !row.minAge
      }
      return !row[item.value]
    })
    if (obj) {
      this._message({
        message: this.$t('form.placeholder.input', { msg: this.$t(obj.lang!) }),
        type: 'error'
      })
      return true
    }
  }
  // 保存
  async saveItem({ row }) {
    if (this.validate(row)) return
    const action = row.id ? 'update' : 'create'
    const infoMsg = row.id ? 'edit' : 'new'
    const method = row.id ? '_put' : '_post'
    const res = await this[method]({
      url: apiUrl[this.apiKey][action],
      data: {
        data: Object.assign({}, row, { className: this.tableName })
      }
    })
    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns')[infoMsg] }),
        type: 'success'
      })
      this.getList()
    }
  }
  //
  cancelItem({ row, $index }) {
    // 如果没有 id 则代表是新建的 直接删除 如果有id 则代表是编辑 回到初始数据
    if (!row.id) {
      this.tableData.splice($index, 1)
    } else {
      this.getList()
    }
  }

  async deleteItem({ row, $index }) {
    let url = `${apiUrl[this.apiKey].deletes}/${row.id}`
    if (this.tableName !== 'ageRange') {
      url = `${url}/${this.tableName}`
    }
    this._confirm({ content: this.$t('dialogPrompt.deleteItem') }).then(async() => {
      const res = await this._delete({ url })
      if (res.code === 0) {
        this._message({
          message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns.delete') }),
          type: 'success'
        })
        this.tableData.splice($index, 1)
      }
    }).catch(() => {})
  }

  editItem({ row, $index }) {
    this.$set(row, 'edit', true)
  }
}
</script>
<style lang="scss" scoped>
.base-table {
  /deep/.cell{
    padding: 0 !important
  }
}
.add-box{
    display: flex;
    max-width: 400px;
    margin-bottom: 10px;
}
.input-box{
      display: flex;
    background: #F5F9FF;
}
</style>
