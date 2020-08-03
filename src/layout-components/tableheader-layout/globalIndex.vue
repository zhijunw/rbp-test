<template>
  <div class="layout-warrper">
    <el-dropdown
      class="layout f12"
      trigger="click"
      placement="bottom">
      <span class="el-dropdown-link">
        <span class="layout-text">{{ $t('reportCommonWord.layout') }}</span>{{ currentLayout }}<i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <div class="layout-box-warrper">
          <div
            v-for="(item, index) in layoutList"
            :key="index"
            class="layout-box f12">
            {{ item.name }}
            <div
              v-for="children in item.children"
              :key="children.id"
              class="layout-box-name"
              @click="chooseLayout(children)">
              <span>{{ children.name }}</span>
              <i :class="{ 'el-icon-check': children.id === currentLayoutId }" />
            </div>
          </div>
        </div>
        <div class="layout-box-add">
          <el-button
            id="btn_t_blue"
            type="text"
            icon="el-icon-plus"
            @click="addLayout">
            {{ $t('reportCommonWord.addLayout') }}
          </el-button>
          <el-button
            type="text"
            icon="el-icon-user"
            class="layout-btn"
            @click="getLayoutView(0)">
            {{ $t('reportCommonWord.managePersonLayout') }}
          </el-button>
          <el-button
            v-if="isAdmin"
            type="text"
            icon="el-icon-box"
            class="layout-btn"
            @click="getLayoutView(1)">
            {{ $t('reportCommonWord.manageAdminLayout') }}
          </el-button>
        </div>
      </el-dropdown-menu>
    </el-dropdown>
    <base-dialog :dialogObj="dialogObj">
      <template v-slot:content>
        <base-table
          class="test_"
          :tableData="tableData"
          :colunmData="tableHeader"
          :tableConfig="{
            isRight: false,
            isMultiSelect: false,
            isIndex: true,
            operatWidth: '160px'
          }">
          <template v-slot="{ scope }">
            <el-button
              id="btn_t_blue"
              class="sort"
              type="text"
              size="mini">
              <span style="cursor: move"> {{ $t('layout.btns.sort') }}</span>
            </el-button>
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="copy(scope)">
              {{ $t('layout.btns.copy') }}
            </el-button>
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="editItem(scope)">
              {{ $t('layout.btns.edit') }}
            </el-button>
            <el-button
              id="btn_t_gray"
              :disabled="scope.row.id === currentLayoutId"
              type="text"
              size="mini"
              @click.stop.prevent="deleteItem(scope)">
              {{ $t('layout.btns.delete') }}
            </el-button>
          </template>
        </base-table>
        <div class="add-box f12">
          <p
            class="inline-block"
            @click="addLayout">
            +{{ $t('layout.btns.addView') }}
          </p>
        </div>
      </template>
      <template v-slot:footerBtn>
        <div class="empty" />
      </template>
    </base-dialog>
    <tableheader-config
      :config="tableHeaderFieldsConfig"
      :dialogObj="fieldsDialog"
      @confirmView="confirmView"
      v-on="$listeners" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Inject } from 'vue-property-decorator'
import { ListOperationBtnsConfig, LayoutConfig, DialogObj, TableHeaderConfig } from '@/typings'
import { getCookie } from '@/utils/auth'
import commonApiUrl from '@/api/common-api'
import Sortable from 'sortablejs'
import boxLayout from 'echarts/src/model/mixin/boxLayout'
let sortTarget = null
interface TableHeaderFieldsConfig {
  fields: any[]
  choose?: string[]
  name: string
  isSortRules?: boolean
  viewId?: number
  noCommit?: boolean
}
@Component({
  name: 'tableheader-layout',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue')
  }
})
export default class commonIndex extends Vue {
  @Prop() dataHeader: any[]
  // @Inject('ModuleId') readonly ModuleId!: number

  @Watch('layoutList', { immediate: true, deep: true })
  onLayoutListChange(layoutlist) {
    if (layoutlist.length) {
      layoutlist.forEach((item) => {
        item.children.forEach((list) => {
          if (list.default) this.currentLayout = list.name
        })
      })
    }
  }
  ModuleId: string = ''
  layoutList: any[] = []
  tableHeaderFieldsConfig: any = {
    fields: [],
    choose: [],
    moduleId: this.ModuleId,
    isSortRules: true,
    viewId: null
  }
  // 当前视图ID
  currentLayoutId: any = ''
  // 当前视图名称
  currentLayout: string = ''
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    appendToBody: true,
    width: '40vw'
  }
  type: number = -1
  tableData: any[] = []
  tableHeader: TableHeaderConfig[] = [
    {
      label: '视图名称',
      value: 'name',
      en: 'reportCommonWord.layoutName'
    },
    {
      label: '创建时间',
      value: 'createdTime',
      en: 'reportCommonWord.layoutCreatTime'
    }
  ]
  fieldsDialog: DialogObj = {
    isShowDialog: false,
    appendToBody: true,
    setShow: true,
    title: '',
    width: '50%'
  }
  // 全部表头
  moduleLayoutColumns: any[] = []
  // 编辑映射
  editArrayMap: object = {}

  get isAdmin() {
    return getCookie('userNo') === 'admin'
  }

  // 是否没有原始默认视图
  haveNotView: boolean = false

  /** 选择视图*/
  async chooseLayout(item) {
    const res_ = await this._put({
      url: `/moduleLayout/defaultLayout?moduleId=${this.ModuleId}&id=${item.id}`
    })
    if (res_.code === 0) {
      this.$emit('updateModuleView')
      this.currentLayout = item.name
      this.currentLayoutId = item.id
    }
  }
  mounted() {
    this.ModuleId = this.$route.meta.moduleId
    this.tableHeaderFieldsConfig.moduleId = this.$route.meta.moduleId
    // setTimeout(() => {
    this.$nextTick(() => {
      this.getGlobalView()
    })
    // }, 20)
  }
  /** 新建视图*/
  addLayout() {
    this.fieldsDialog.isShowDialog = true
    this.fieldsDialog.title = this.$t('reportCommonWord.layoutConfig')
    let selected: any[] = []
    selected = this.moduleLayoutColumns
      .filter((item) => {
        return item.requiredFlag === true
      })
      .map((item) => {
        return item.columnKey
      })
    this.$set(this.tableHeaderFieldsConfig, 'viewId', null)
    this.$set(this.tableHeaderFieldsConfig, 'name', null)
    this.$set(this.tableHeaderFieldsConfig, 'choose', selected)
  }

  /** 管理视图弹窗*/
  async getLayoutView(type) {
    this.$set(this, 'tableData', this.layoutList[type].children)
    this.dialogObj.isShowDialog = true
    this.type = type
    this.dialogObj.title = `管理${this.$t('reportCommonWord')[type === 1 ? 'admin' : 'person']}`
    this.$nextTick(() => {
      this.rowDrop()
    })
  }

  /** 编辑视图*/
  async editItem({ row }) {
    const res = await this._get({ url: `${commonApiUrl.layoutDetail}/${row.id}` })
    if (res.code === 0) {
      const { moduleLayoutColumnList, name, moduleId } = res.data
      const select = moduleLayoutColumnList.map((item) => {
        // 设置映射表
        this.editArrayMap[item.columnKey] = item.id
        return item.columnKey
      })
      this.$set(this.tableHeaderFieldsConfig, 'choose', select)
      this.$set(this.tableHeaderFieldsConfig, 'name', name)
      this.$set(this.tableHeaderFieldsConfig, 'viewId', row.id)
      this.$set(this.tableHeaderFieldsConfig, 'noCommit', false)
      this.fieldsDialog.isShowDialog = true
      this.fieldsDialog.title = this.$t('reportCommonWord.layoutConfig')
    }
  }

  /** 新增/编辑 回调*/
  async confirmView({ reportViewColumnList, viewName, saveAsView }) {
    /** 新增接口Post  更新接口update*/
    const isEditStatus = !!this.tableHeaderFieldsConfig.viewId
    const method = isEditStatus ? '_put' : '_post'
    const url = isEditStatus ? commonApiUrl.layoutUpdate : commonApiUrl.layoutCreate
    const postData = {
      moduleLayoutColumnList: this.dataHander(reportViewColumnList, isEditStatus),
      name: viewName,
      moduleId: this.ModuleId,
      /** 视图类型 1系统 0个人*/
      type: isEditStatus ? this.type : saveAsView ? 1 : 0,
      id: this.tableHeaderFieldsConfig.viewId
    }
    // 新增/没有任何视图，就设置为默认视图
    if (!isEditStatus && this.haveNotView) {
      postData['defaultFlag'] = true
      this.haveNotView = false
    }
    const res = await this[method]({ url, data: { data: postData }})
    if (res.code === 0) {
      this.fieldsDialog.isShowDialog = false
      if (this.type > -1) {
        await this.getViewList(this.ModuleId, this.type)
        this.$set(this, 'tableData', this.layoutList[this.type].children)
        this.currentLayoutId === this.tableHeaderFieldsConfig.viewId &&
        this.$emit('updateModuleView')
      }
      await this.getGlobalView()
      this._message({
        message: this.$t('reportCommonWord')[isEditStatus ? 'editViewSuccess' : 'createdView'],
        type: 'success'
      })
    }
  }

  /** 编辑/新增数据预处理 editStatus === true  编辑状态*/
  dataHander(array, editStatus) {
    return array.map((item, index) => {
      const other = {}
      if (editStatus) {
        other['layoutId'] = this.tableHeaderFieldsConfig.viewId
        other['id'] = this.editArrayMap[item.columnKey]
      }
      return { ...item, orderNumber: index, ...other }
    })
  }

  /** 删除*/
  async deleteItem(scope) {
    const res = await this._post({ url: commonApiUrl.layoutDelete, data: { data: [scope.row.id] }})
    if (res.code === 0) {
      await this.getViewList(this.ModuleId, this.type)
      this.$set(this, 'tableData', this.layoutList[this.type].children)
      this._message({
        message: this.$t('commonWord.actionSuccess', { action: this.$t('layout.btns.delete') }),
        type: 'success'
      })
    }
  }

  /** 复制*/
  async copy(scope) {
    const res = await this._post({ url: commonApiUrl.layoutCopy, params: { fromId: scope.row.id }})
    if (res.code === 0) {
      await this.getViewList(this.ModuleId, this.type)
      this.$set(this, 'tableData', this.layoutList[this.type].children)
      this._message({
        message: this.$t('commonWord.actionSuccess', { action: this.$t('layout.btns.copy') }),
        type: 'success'
      })
    }
  }

  /** 获取单独模块视图列表*/
  async getViewList(moduleId, type) {
    const res = await this._post({
      url: `${commonApiUrl.layoutList}?moduleId=${moduleId}&type=${type}`
    })
    if (res.code === 0) {
      const target = (this.layoutList || []).find((item) => {
        return item.id === Number(type)
      })
      target && (target.children = res.data || [])
    }
  }

  /** 获取全局视图列表*/
  async getGlobalView() {
    const res = await this._get({ url: `${commonApiUrl.layoutModule}?moduleId=${this.ModuleId}` })
    if (res.code === 0) {
      const { moduleLayoutColumns, personalViews, systemViews, layoutId, layoutName } = res.data
      const kingType: object = {}
      moduleLayoutColumns.forEach((item) => {
        if (kingType[item.kindName]) {
          kingType[item.kindName].push(item)
        } else {
          kingType[item.kindName] = [item]
        }
      })
      const array: any[] = []
      Object.keys(kingType).forEach((item) => {
        array.push({
          kindName: item,
          children: kingType[item].map((em) => {
            return {
              ...em,
              value: em.columnKey,
              label: em.columnTitle,
              disabled: em['requiredFlag'] === true,
              hideElement: false
            }
          })
        })
      })
      this.$set(this.tableHeaderFieldsConfig, 'fields', array)
      this.moduleLayoutColumns = moduleLayoutColumns
      this.layoutList = [
        {
          name: '个人视图',
          id: 0,
          children: personalViews
        },
        {
          name: '系统视图',
          id: 1,
          children: systemViews
        }
      ]
      this.haveNotView = (personalViews || []).length === 0 && (systemViews || []).length === 0
      this.$nextTick(() => {
        const target = [...systemViews, ...personalViews].find((item) => {
          return item.id === layoutId
        })
        this.currentLayout = target ? target.name : '默认视图'
        this.currentLayoutId = layoutId
      })
    }
  }

  /** 列表移动*/
  async viewListMove(fromIndex, toIndex) {
    const res = await this._put({
      url: `${commonApiUrl.layoutMove}?fromId=${this.tableData[fromIndex].id}&toId=${this.tableData[toIndex].id}`
    })
    if (res.code !== 0) {
      this.$message.error('行移动失败!')
    }
  }

  /** 绑定行拖拽*/
  rowDrop() {
    // 要拖拽元素的父容器
    const tbody = document.querySelector('.test_ .el-table__body-wrapper tbody')
    const _this = this
    sortTarget = Sortable.create(tbody, {
      //  指定父元素下可被拖拽的子元素
      draggable: '.el-table__row',
      onEnd({ newIndex, oldIndex }) {
        const currRow = _this.tableData.splice(oldIndex, 1)[0]
        _this.tableData.splice(newIndex, 0, currRow)
        _this.viewListMove(oldIndex, newIndex)
      }
    })
  }

  /** 入口*/
}
</script>
<style lang="scss">
.el-dialog__body {
  padding: 20px 16px;
}
</style>
<style lang="scss" scoped>
@import 'src/styles/common-index.scss';

.layout {
  line-height: 30px;
  margin-right: 10px;

  &-text {
    color: $colorTextSecondary;
    margin-right: 8px;
  }

  &-box-warrper {
    max-height: 150px;
    overflow: auto;
  }

  &-box {
    padding: 0 10px;
    line-height: 1.5;
    color: $colorTextPlaceholder;

    &-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 10px;
      margin: 0 -10px;
      width: 198px;
      height: 28px;
      line-height: 28px;
      color: $colorTextRegular;

      &:hover {
        background: #f5f5f7;
        color: $basic;
        cursor: pointer;
      }

      &:last-child {
        margin-bottom: 4px;
      }
    }

    &-add {
      display: flex;
      flex-direction: column;
      text-align: left;
      align-items: flex-start;
      box-shadow: 0px -1px 3px -2px rgba(124, 126, 133, 0.5);

      /deep/ .el-button + .el-button {
        margin: 0;
      }

      /deep/ .el-button--text {
        padding: 7px 10px;
      }

      .layout-btn {
        color: $colorTextRegular;
      }
    }
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
