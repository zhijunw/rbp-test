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
        @change="handleSearch" />
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
      <template v-slot:tableCell="{ scope: { row, item } }">
        <template v-if="['input','number'].includes(item.type) && row.edit">
          <base-input
            :value.sync="row[item.field]"
            :type="item.type"
            class="no-border-input" />
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
type Apikey = 'templateSize' | 'templateShape'
const TEMPLATE_ARR = ['templateSize', 'templateShape']
@Component({
  name: 'size-template',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  // 观察当前 tab
  @Watch('v_activeTab', { immediate: true })
  onActiveTabChange(val, oldval) {
    if (val) {
      const config = templateConfig[val]
      //   这里要表头要加上尺码 默认到25
      // 这里 table-template模版 只适用于 apikey => templateOne templateTwo templateAge
      if (TEMPLATE_ARR.includes(config.apiKey)) {
        this.sizeHeader = []
        for (let index = 1; index < 25; index++) {
          this.sizeHeader.push({
            label: `S${index}`,
            value: `s${index}`,
            field: `s${index}`,
            type: 'input',
            width: '60px'
          })
        }
        this.tableHeader = [...config.tableHeader, ...this.sizeHeader]
        this.apiKey = config.apiKey
        this.searchValue = ''
        this.getList()
      }
    }
  }
  searchValue:string = ''
  sizeHeader:TableHeaderConfig[] = []
  tableHeader: TableHeaderConfig[] = []
  tableData: any[] = []
  apiKey: Apikey

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
        data: this.searchValue
      }
    })
    if (res.code === 0) {
      this.tableData = res.data.map((item, index) => {
        const { detailList, ...other } = item
        if (detailList && detailList.length) {
          detailList.forEach((k) => {
            other[k.fieldName] = k.name
          })
        }
        return other
      })
    }
  }
  handleSearch() {
    this.getList()
  }
  // 校验 tableData 里面是否有 edit 字段 如果有则代表某条数据处于保存态 需要先保存
  checkEdit(tableData) {
    const result = tableData.some(val => {
      return val.edit
    })
    if (result) {
      this._message({ message: this.$t('commonWord.saveEdit'), type: 'warning' })
    }
    return result
  }

  // 保存
  async saveItem({ row, $index }) {
    const action = row.id ? 'update' : 'create'
    const infoMsg = row.id ? 'edit' : 'new'
    const method = row.id ? '_put' : '_post'
    const obj: any = {
      detailList: []
    }
    // 讲 尺码数据放入到 detailList 中
    Object.keys(row).forEach((keys) => {
      if (this.sizeHeader.findIndex((j) => j.value === keys.toString()) > -1) {
        obj.detailList.push({
          fieldName: keys,
          name: row[keys]
        })
      } else {
        obj[keys] = row[keys]
      }
    })
    const res = await this[method]({
      url: apiUrl[this.apiKey][action],
      data: {
        data: obj
      }
    })

    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns')[infoMsg] }),
        type: 'success'
      })
      // this.$set(row, 'edit', false)
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
      // this.$set(row,'edit',false)
    }
  }

  deleteItem({ row, $index }) {
    this._confirm({ content: this.$t('dialogPrompt.deleteItem') }).then(async() => {
      const res = await this._post({
        url: apiUrl[this.apiKey].deletes,
        data: { data: [row.id] }
      })
      if (res.code === 0) {
        this._message({
          message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns.delete') }),
          type: 'success'
        })
        this.tableData.splice($index, 1)
      }
    }).catch((err) => {
      console.log('err', err)
    })
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
.no-border-input {
  /deep/.el-input__inner{
    padding: 0 10px;
  }
}

</style>
