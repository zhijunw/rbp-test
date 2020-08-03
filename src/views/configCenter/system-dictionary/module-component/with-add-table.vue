<template>
  <div class="add-table-content">
    <base-table
      :colunmData="tableHeader"
      :tableData="tableData"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: true,
        highlightCurrentRow: false,
        maxHeight: '350px'
      }"
      class="add-table"
      v-on="$listeners">
      <!-- 行数据的插槽 -->
      <template v-slot:tableCell="{ scope: { row, item } }">
        <template v-if="['input','number'].includes(item.type) && row.edit">
          <base-input
            :value.sync="row[item.field]"
            :type="item.type"
            class="no-border-input" />
        </template>
        <template v-else-if="item.type === 'select' && row.edit">
          <base-select
            :value.sync="row[item.field]"
            :item="{options:tableConfig[item.field]}"
            class="no-border-input" />
        </template>
        <template v-else>
          <span class="pdl-10"> {{ item.type === 'select' ? row.groupName: row[item.field] }}</span>
        </template>
      </template>
      <!-- 操作栏的插槽 -->
      <template v-slot="{ scope }">
        <div class="btn-group">
          <div v-if="!scope.row.edit">
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"

              @click.stop.prevent="editItem(scope)">
              {{
                $t('layout.btns.edit')
              }}
            </el-button>
            <el-button
              id="btn_t_gray"
              type="text"
              size="mini"
              @click.stop.prevent="deleteItem(scope)">
              {{
                $t('layout.btns.delete')
              }}
            </el-button>
          </div>
          <div v-else>
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="saveItem(scope)">
              {{
                $t('layout.btns.save')
              }}
            </el-button>
            <el-button
              id="btn_t_gray"
              type="text"
              size="mini"
              @click.stop.prevent="cancelItem(scope)">
              {{
                $t('layout.btns.cancel')
              }}
            </el-button>
            <slot
              name="addBtn"
              :scope="scope.row" />
          </div>
        </div>
      </template>
    </base-table>
    <div class="add-box f12">
      <el-button
        id="btn_t_d_blue"
        class="mgl-10"
        type="text"
        size="mini"
        @click="add">
        +{{ $t('layout.btns.add') }}
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { deepCopy } from '@/utils'
import vuexMixins from '../configs/vuex-module'
import { Dictionary, TableHeaderConfig } from '@/typings'
@Component({
  name: 'mult-table-template',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
  // @Prop({ required: false }) tableData: any[]
  @Prop({ required: true }) tableHeader: TableHeaderConfig[]
  @Prop({ required: true }) apiUrl: Dictionary
  @Prop() tableConfig: Dictionary<any>
  tableData: any[] = []
  mounted() {
    this.$nextTick(() => {
      this.getList()
    })
  }
  async getList(keyword = '') {
    const res = await this._post({
      url: this.apiUrl.list,
      data: {
        data: keyword
      }
    })
    if (res.code === 0) {
      this.tableData = res.data
      this.$emit('tableDataChange', this.tableData)
    }
  }

  editItem({ row, $index }) {
    this.$set(row, 'edit', true)
  }

  deleteItem({ row, $index }) {
    this._confirm({ content: this.$t('dialogPrompt.deleteItem') }).then(async() => {
      const res = await this._post({
        url: this.apiUrl.deletes,
        data: { data: [row.id] }
      })
      if (res.code === 0) {
        this._message({
          message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns.delete') }),
          type: 'success'
        })
        this.tableData.splice($index, 1)
      }
    }).catch(() => {})
  }
  async saveItem({ row, $index }) {
    // this.$set(row,'edit',false)
    const requiredArr:Pick<TableHeaderConfig, 'value' | 'label' | 'lang'>[] = []
    this.tableHeader.forEach((item) => {
      if (!item.require) requiredArr.push({ value: item.field, label: item.label, lang: item.lang })
    })
    const obj = requiredArr.find((item) => !row[item.value])
    if (obj) {
      this._message({
        message: this.$t('form.placeholder.input', { msg: this.$t(obj.lang!) }),
        type: 'error'
      })
      return
    }
    const action = row.id ? 'update' : 'create'
    const infoMsg = row.id ? 'edit' : 'new'
    const method = row.id ? '_put' : '_post'
    const res = await this[method]({
      url: this.apiUrl[action],
      data: {
        data: Object.assign({}, row)
      }
    })
    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns')[infoMsg] }),
        type: 'success'
      })
      // this.$set(row,'edit',false)
      this.getList()
    }
    // this.$set(this.deepTableData,$index,Object.assign({},row))
  }
  cancelItem({ row, $index }) {
    if (!row.id) {
      this.tableData.splice($index, 1)
    } else {
      // this.$set(row,'edit',false)
      this.getList()
    }
  }
  // 单选框
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
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.add-table {
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
