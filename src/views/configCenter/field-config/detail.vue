<template>
  <div class="fields-detail">
    <div class="fields-detail__tree mgr-12 pdtb-6">
      <base-tree
        ref="baseTree"
        class="base-tree"
        :optionDatas="menuList"
        :treeConfig="treeConfig"
        @nodeClick="nodeClick" />
    </div>
    <div class="flex-1 fields-detail__box">
      <div class="mgb-12">
        <svg-icon
          name="field_table"
          className="w20 h20 mgr-6" />
        {{ $t('fieldConfiguration.list.fieldsList') }}
        <el-button
          v-show="allowAddAndDelete"
          id="btn_g_d_blue"
          class="mgl-12"
          @click="addTable">
          {{ $t('layout.btns.addCategory') }}
        </el-button>
      </div>
      <draggable
        :list="moduleTableData"
        @end="groupSort">
        <div
          v-for="(item, index) in moduleTableData"
          :key="index"
          :ref="'dragWarrper' + index"
          class="mgb-12">
          <div class="table-title">
            <el-input
              v-model="item.groupName"
              size="small"
              class="table-title-input"
              @change="change($event,item)" />
            <div class="table-title-btn">
              <svg-icon
                v-show="allowAddAndDelete"
                name="delete_btn"
                className="w18 h16 mgr-26 hover"
                @click="deleteItem(item,index)" />
              <svg-icon
                name="rank_btn"
                className="w18 h16 hover-move" />
            </div>
          </div>
          <base-table
            :ref="'dragTable' + index"
            :colunmData="detailConfig.tableHeader"
            :tableData="item.columnList"
            :class="{ dragTable: !item.columnList.length }"
            class="base-table"
            :tableConfig="{
              isMultiSelect: false,
              isShowOpera: false,
              showHeader: index === 0
            }"
            @cellMove="cellMove($event,index)">
            <template v-slot:tableCell="{ scope: { row, item: cellItem, $index } }">
              <template v-if="cellItem.type === 'checkbox'">
                <el-checkbox
                  v-model="row[cellItem.value]"
                  @change="checkboxChange($event,row,cellItem.value)" />
              </template>
              <template v-else-if="cellItem.value === 'sort'">
                <svg-icon
                  name="rank_btn"
                  className="w18 h14 hover-move" />
              </template>
              <template v-else-if="cellItem.value === 'operation'">
                <el-button
                  id="btn_t_gray"
                  type="text"
                  size="mini"
                  @click="delFn(row,$index,item.columnList)">
                  {{ $t('layout.btns.delete') }}
                </el-button>
              </template>
              <template v-else>
                <span>{{ row[cellItem.value] }}</span>
              </template>
            </template>
          </base-table>
          <div class="add-box f12">
            <span class="add-box-text">{{ item.columnList.length + 1 }}</span>
            <p
              class="inline-block"
              @click="addFields(item,index)">
              +{{ $t('layout.btns.addFields') }}
            </p>
          </div>
        </div>
      </draggable>
    </div>
    <base-dialog
      :dialogObj="dialogObj"
      class="base-dialog"
      @confirm="confirm">
      <div slot="content">
        <p class="f12 mgb-6">
          <!-- 自定义字段 -->
          {{ $t('fieldConfiguration.tabs.list') }}
        </p>
        <base-fuzzy
          :fuzzyConfig="fuzzyConfig"
          :value.sync="fuzzyConfig.value"
          @fuzzyChange="fuzzyChange" />
      </div>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { DialogObj, FuzzyConfig, Dictionary, TreeConfig, TreeObject } from '@/typings'
import { moduleSettings } from './configs'
import { mockDetailTableData } from './configs/mock'
import Sortable from 'sortablejs'
import apiUrl from '@/api/config-center/fields-config'
import { nest, transformFields } from '@/utils'
import draggable from 'vuedraggable'

@Component({
  name: 'fieldConfig-detail',
  components: {
    formlist: () => import('@/components/formlist/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseTree: () => import('@/components/base-tree/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseFuzzy: () => import('@/components/base-fuzzy/index.vue'),
    draggable
  }
})
export default class detail extends mixins(vuexMixins) {
  menuList: TreeObject[] = []
  detailConfig: any = moduleSettings
  sortable = null
  currentTreeId: string = '1'
  currentTreeObj: Dictionary = {}
  moduleTableData: any[] = []
  tableData = mockDetailTableData
  currentTableIndex: number = 0
  recordCurrentAddFields: Dictionary = {}
  allowAddAndDelete: boolean = true
  fuzzyConfig: FuzzyConfig = {
    apiUrl: apiUrl.getModuleFields,
    value: ''
  }
  treeConfig: TreeConfig = {
    indent: 8,
    // iconClass: 'el-icon-caret-top',
    defaultExpandAll: true,
    currentNodeKey: ''
  }
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    setShow: true,
    width: '360px'
  }
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.getModule()
      }, 20)
    })
  }
  // 获取模块数据
  async getModule() {
    const res: any = await this._get({ url: apiUrl.getTree })
    if (res.code === 0) {
      const moduleData: TreeObject[] = res.data.moduleTreeStructure
      const data = nest(moduleData, 0, 'parentId', true)
      this.menuList = data

      this.getTreeId(data)
      this.getModuleCategoryData(this.currentTreeObj)

      this.$nextTick(() => {
        ;(this.$refs.baseTree as any).setCurrentKey(this.currentTreeObj.id)
      })
    }
  }
  // 获取到第一个id
  getTreeId(tree) {
    for (const k of tree) {
      if (k.children.length) {
        this.getTreeId(k.children)
      } else {
        this.currentTreeObj = k
        return
      }
      return
    }
  }
  // 字段的排序
  setSort(dom) {
    this.sortable = Sortable.create(dom, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
      animation: 150,
      sort: true,
      setData: function(dataTransfer) {
        // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        dataTransfer.setData('Text', '')
      },
      onEnd: (evt) => {
        const current = this.moduleTableData[this.currentTableIndex].columnList
        current.splice(evt.newIndex, 0, current.splice(evt.oldIndex, 1)[0])
        var newArray = this.moduleTableData[this.currentTableIndex].columnList.slice(0)
        this.moduleTableData[this.currentTableIndex].columnList = []

        this.$nextTick(async function() {
          this.moduleTableData[this.currentTableIndex].columnList = newArray.map((item, index) => {
            return Object.assign(item, { index: index + 1 })
          })
          const arr = this.moduleTableData[this.currentTableIndex].columnList.map((item) => {
            return {
              id: item.id,
              orderNumber: item.index
            }
          })
          const res = await this._put({ url: apiUrl.updateGroupFieldsSort, data: { data: arr }})
        })
      }
    })
  }
  // 组的排序
  async groupSort(evt) {
    const arr = this.moduleTableData.map((item, index) => {
      item.index = index + 1
      return {
        id: item.id,
        orderNumber: index + 1
      }
    })
    const res = await this._put({ url: apiUrl.updateGroupSort, data: { data: arr }})
  }
  // 点击模块获取数据
  async nodeClick(val) {
    if (!val.children.length) {
      this.allowAddAndDelete = !val.billflag
      this.currentTreeObj = val
      this.getModuleCategoryData(val)
    }
  }
  async getModuleCategoryData(module) {
    const data = {
      moduleId: module.moduleId
    }
    const res = await this._post({ url: apiUrl.getModuleCategoryData, data: { data }})
    if (res.code === 0) {
      this.moduleTableData = res.data
      this.moduleTableData.forEach((item, findex) => {
        item.index = findex + 1
        if (item.columnList) {
          item.columnList.forEach((item, index) => {
            item.index = index + 1
          })
        }
      })

      this.$nextTick(() => {
        setTimeout(async() => {
          this.moduleTableData.forEach((item, index) => {
            const ref = this.$refs[`dragTable${index}`][0]
            const el = ref.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            this.setSort(el)
          })
        }, 200)
      })
    }
  }
  // 输入框输入表名
  async change(event, item) {
    const data = {
      moduleId: item.moduleId,
      groupName: event,
      id: item.id,
      orderNumber: item.orderNumber
    }
    const res = await this._post({ url: apiUrl.creatModuleGroup, data: { data }})
  }
  // 增加字段
  addFields(item, index) {
    if (!item.groupName) {
      this._message({ message: this.$t('fieldConfiguration.list.tableWarning'), type: 'warning' })
      return
    }
    this.currentTableIndex = index
    this.dialogObj.title = this.$t('fieldConfiguration.moduleSettings.addCustomField')
    this.dialogObj.isShowDialog = true
  }
  // 增加表格
  async addTable() {
    const item = {
      columnList: []
    }
    const data = {
      moduleId: this.currentTreeObj.moduleId,
      groupName: '',
      id: '',
      orderNumber: this.moduleTableData.length + 1
    }

    const res = await this._post({ url: apiUrl.creatModuleGroup, data: { data }})
    if (res.code === 0) {
      this.moduleTableData.push(Object.assign({}, item, data, { id: res.data }))
      const length = this.moduleTableData.length

      this.$nextTick(() => {
        setTimeout(() => {
          const ref = this.$refs[`dragTable${length - 1}`][0]
          const el = ref.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
          this.setSort(el)
        }, 200)
      })
    }
  }
  // 删除表格
  async deleteItem(item, index) {
    const res = await this._delete({ url: `${apiUrl.deleteModuleGroup}/${item.id}` })
    if (res.code === 0) {
      this.moduleTableData.splice(index, 1)
    }
  }
  // 删除单行
  async delFn(row, index, list) {
    const res = await this._delete({ url: `${apiUrl.deletegGroupFields}/${row.id}` })
    if (res.code === 0) {
      list.splice(index, 1)
      list.forEach((item, index) => {
        item.index = index + 1
      })
    }
  }
  // 更新当前行数据
  async checkboxChange(event, row, key) {
    const data = {
      id: row.id,
      [key]: event
    }
    const res = await this._put({ url: apiUrl.updateGroupFields, data: { data }})
  }
  // 确认添加字段
  async confirm() {
    // 没输入名称做校验
    if (!this.recordCurrentAddFields.name) {
      this._message({ message: this.$t('commonWord.noContentWarning'), type: 'warning' })
      return
    }
    const current = this.moduleTableData[this.currentTableIndex].columnList
    const index = current.findIndex((item) => item.customizeColumnId === this.recordCurrentAddFields.value)
    // 重复添加做校验
    if (index > -1) {
      this._message({ message: `${this.recordCurrentAddFields.label} 字段已存在,不能重复添加`, type: 'warning' })
      return
    }
    this.dialogObj.isShowDialog = false
    const commonObj = {
      customizeColumnId: this.recordCurrentAddFields.id, // 字段ID
      moduleGroupId: this.moduleTableData[this.currentTableIndex].id, // 组ID
      orderNumber: !current.length ? 1 : current[current.length - 1].orderNumber + 1
    }
    const data = Object.assign({}, {
      columnName: this.recordCurrentAddFields.code
    }, commonObj)
    const res = await this._post({ url: apiUrl.creatGroupFields, data: { data }})
    if (res.code === 0) {
      current.push(Object.assign({
        columnName: this.recordCurrentAddFields.label,
        type: this.recordCurrentAddFields.type,
        requireFlag: false,
        userFlag: true,
        index: current.length + 1,
        id: res.data // 行ID
      }, commonObj))
    }
  }
  // 移入获取到当前table
  cellMove(event, index) {
    this.currentTableIndex = index
  }
  // 模糊搜索的确认
  fuzzyChange({ value, matchValArr }) {
    this.recordCurrentAddFields = matchValArr[0]
  }
}
</script>
<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #186cff !important;
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.base-table {
  // /deep/.el-table__body-wrapper {
  //   /deep/.cell {
  //     padding: 0 !important;
  //   }
  // }
  /deep/.el-table__header-wrapper {
    /deep/.cell {
      padding: 0 !important;
    }
  }
}
/*默认*/
@media (min-width: 1280px) {
  .fields-detail {
    height: 80vh;

  }
}
/* 大屏幕 ：大于等于1440px*/
@media (min-width: 1440px) {
  .fields-detail {
    height: 80vh;

  }
}
@media (min-width: 1600px) {
  .fields-detail {
    height: 86vh;

  }
}
.fields-detail {
  display: flex;
  padding: 16px 0;
  background: #fff;
  // height: 77vh;
  // min-height: calc(100vh - 228px );
  &__tree{
    min-width: 130px;
    // min-height: calc(100vh - 178px);
    // min-height: calc(100vh -228px);
    height: 100%;
    margin-right: 12px;
    border-radius: 2px;
    border: 1px solid #eeeeee;
  }
  /deep/.base-tree .is-current .el-tree-node__label {
    color: blue;
  }
  .add-box {
    color: $colorTextRegular;
    height: 28px;
    line-height: 28px;
    border: 1px solid #eee;
    border-top: none;
    &-text {
      width: 60px;
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
  .table-title {
    display: flex;
    justify-content: space-between;
    padding: 6px 10px;
    background: #f5f9ff;
    &-input {
      width: 200px;
    }
  }
  &__box{
    min-width: 800px;
  }
}
/deep/.base-dialog .el-dialog__body {
  padding: 20px 16px;
}
/deep/.dragTable {
  /deep/.el-table__body-wrapper {
    height: 0;
  }
  /deep/.el-table__empty-block {
    height: 0;
  }
  /deep/.el-table__empty-text {
    display: none;
  }
}
</style>
