<template>
  <div class="fields-list f14">
    <div class="fields-list__header flex-space">
      <div class="fields-list__icon">
        <svg-icon
          name="field_table"
          className="w20 h20 mgr-6" />
        {{ $t('menuConfig.menu') }}
      </div>
      <el-button
        id="btn_g_d_blue"
        class="mgl-10 fields-list__box"
        @click="add">
        {{ $t('menuConfig.addMenu') }}
      </el-button>
    </div>
    <base-table
      :colunmData="menuTableHeader"
      :tableData="menuData"
      class="base-table"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: false,
        operatWidth: '250px',
        isRight: false,
        maxHeight: '720px',
        defaultExpandAll: true
      }"
      @viewDetail="viewDetail"
      @rowClick="viewDetail">
      <template v-slot:tableCell="{ scope: { row, item } }">
        <template v-if="item.value === 'icon'">
          <svg-icon
            v-if="row[item.value]"
            :name="row[item.value]"
            className="w20 h20 mgr-6 bd-e" />
        </template>
        <template v-else>
          <span> {{ row[item.value] }} </span>
        </template>
      </template>
      <template v-slot="{ scope }">
        <el-button
          v-if="scope.row.depth === 1"
          id="btn_t_blue"
          type="text"
          size="mini"
          @click="addChildrenCategory(scope)">
          {{ $t('commonWord.addChildrenCategory') }}
        </el-button>
        <el-button
          v-if="!scope.row.moduleId"
          id="btn_t_blue"
          type="text"
          size="mini"
          @click="edit(scope)">
          {{ $t('layout.btns.edit') }}
        </el-button>
        <el-button
          id="btn_t_blue"
          :disabled="scope.row.index === 0"
          type="text"
          size="mini"
          @click="up(scope)">
          {{ $t('commonWord.up') }}
        </el-button>
        <el-button
          id="btn_t_blue"
          :disabled="scope.row.disabled"
          type="text"
          size="mini"
          @click="down(scope)">
          {{ $t('commonWord.down') }}
        </el-button>
        <el-button
          id="btn_t_gray"
          type="text"
          size="mini"
          @click="deletes(scope)">
          {{ $t('layout.btns.batchDelete') }}
        </el-button>
      </template>
    </base-table>
    <addCategory
      :dialogObj="categoryDialogObj"
      :formData="formData"
      @refresh="getList" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { to, nest } from '@/utils'
import { Tools } from '@/utils/tools'
import { menuConfig } from './configs'
import apiUrl from '@/api/config-center/menu-config'
import { DialogObj, Dictionary } from '@/typings'
@Component({
  name: 'menu-list',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    addCategory: () => import('./add-dialog.vue')
  }
})
export default class App extends Vue {
  menuTableHeader = menuConfig.menuTableHeader
  menuData: any[] = []
  categoryDialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    setShow: true,
    width: '360px'
  }
  flattenMenuData: any[] = []
  formData: Dictionary = {
    name: '',
    icon: ''
  }
  disabledDown(row) {
    console.log('disabledDown row', row)
  }
  mounted() {
    this.getList()
  }
  async getList() {
    const res = await this._post({ url: apiUrl.getList })
    if (res.code === 0) {
      const tableData = nest(res.data, 0, 'parentId')
      //   给每一个位置添加一个 是否是最后一个的标识
      this.menuData = tableData
      this.addTreeDataAttr(this.menuData, this.menuData.length - 1)
      this.flattenMenuData = Tools.withChildrenFlatten(this.menuData)
    }
  }
  addTreeDataAttr(arr: any[], length: number) {
    arr.forEach((k, index) => {
      k.disabled = index === length
      if (k.children && k.children.length) {
        this.addTreeDataAttr(k.children, k.children.length - 1)
      }
    })
  }
  add() {
    this.categoryDialogObj.isShowDialog = true
    this.categoryDialogObj.title = this.$t('menuConfig.addCategory')
    this.formData = Object.assign(this.formData, { parentId: 0, depth: 1 })
  }
  async up({ row }) {
    const prevLevelId = this.findAppointId(row, 'up')
    this.moveFn({ fromId: row.id, toId: prevLevelId })
  }
  findAppointId(row, type) {
    let appointId = ''
    const flattenMenuData = this.flattenMenuData.filter((item) => item.parentId === row.parentId)
    for (let index = 0; index < flattenMenuData.length; index++) {
      if (row.id === flattenMenuData[index].id) {
        appointId = type === 'up' ? flattenMenuData[index - 1].id : flattenMenuData[index + 1].id
      }
    }
    return appointId
  }
  async down({ row }) {
    const nextLevelId = this.findAppointId(row, 'down')
    this.moveFn({ fromId: row.id, toId: nextLevelId })
  }
  async moveFn(params) {
    const res = await this._put({ url: apiUrl.movePosition, params })
    if (res.code === 0) {
      this.getList()
    }
  }
  addChildrenCategory({ row }) {
    const { name, id, parentId, depth, icon } = row
    this.formData = Object.assign({}, { parentId: id, depth: depth + 1 })
    this.categoryDialogObj.isShowDialog = true
    this.categoryDialogObj.title = this.$t('menuConfig.addCategory')
  }
  edit({ row }) {
    const { name, id, parentId, depth, icon } = row
    this.formData = Object.assign(this.formData, { name, id, parentId, depth, icon, edit: true })
    this.categoryDialogObj.isShowDialog = true
    this.categoryDialogObj.title = this.$t('menuConfig.editCategory')
  }
  async deletes({ row }) {
    //   如果没有 moduleId 则代表的是文件夹
    if (!row.moduleId) {
      this._confirm({
        content: '删除分类后将会把分类下的模块删除，确认删除吗 ？',
        info: '系统提示'
      }).then(() => {
        this.deleteFn([row.id])
      })
      return
    }
    this.deleteFn([row.id])
  }
  async deleteFn(args) {
    const res = await this._post({
      url: apiUrl.deletes,
      data: {
        data: args
      }
    })
    if (res.code === 0) {
      this._message({ message: '删除成功', type: 'success' })
      this.getList()
      this.$emit('refresh')
    }
  }
  viewDetail(row) {
    this.$emit('chooseModule', row)
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
/*默认*/
// @media (min-width: 1280px) {
//   .fields-list {
//     height: 80vh;
//     /deep/.base-table {
//       height: 78vh !important;
//       max-height: 76vh !important;

//     }
//   }
// }
// /* 大屏幕 ：大于等于1440px*/
// @media (min-width: 1440px) {
//   .fields-list {
//     height: 80vh;
//     /deep/.base-table {
//       height: 70vh !important;
//       max-height: 76vh !important;

//     }
//   }
// }
// @media (min-width: 1600px) {
//   .fields-list {
//     height: 88vh;
//     /deep/.base-table {
//       height: 80vh !important;
//       max-height: 80vh !important;
//     }
//   }
// }
.fields-list {
  min-height: calc(100vh - 208px);
  /deep/.base-table {
    height: calc(100vh - 146px) !important;
    max-height: calc(100vh - 146px) !important;
    // /deep/.el-table__body-wrapper {
    //   height: calc(100vh - 208px) !important;
    //   max-height: calc(100vh -208px) !important;
    // }
    // /deep/.el-table__body-wrapper {
    //   height: calc(100vh - 208px) !important;
    //   max-height: calc(100vh - 208px) !important;
    // }
  }
  &__header {
    height: 48px;
    line-height: 48px;
    color: $colorTextRegular;
  }
  .list-input {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
