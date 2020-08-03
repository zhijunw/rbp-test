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
              <i :class="{ 'el-icon-check': children.name === currentLayout }" />
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
          :tableData="tableData"
          :colunmData="tableHeader"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            operatWidth: '140px'
          }">
          <template v-slot="{scope}">
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="copy(scope)">
              {{
                $t('layout.btns.copy')
              }}
            </el-button>
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
  @Prop() layoutList: any[]
  @Prop() tableHeaderFieldsConfig: TableHeaderFieldsConfig

  @Inject('reportId') readonly reportId!: number

  @Watch('layoutList', { immediate: true, deep: true })
  onLayoutListChange(layoutlist: LayoutConfig[]) {
    if (layoutlist.length) {
      layoutlist.forEach((item) => {
        item.children.forEach((list) => {
          if (list.default) this.currentLayout = list.name
          // console.log('this.currentLayout', this.currentLayout)
        })
      })
    }
  }

  currentLayout: string = ''
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    appendToBody: true
  }
  type: number = -1
  viewStatus: string = ''
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

  get isAdmin() {
    return getCookie('userNo') === 'admin'
  }
  chooseLayout(item) {
    this.currentLayout = item.name
    this.$emit('chooseView', item.id)
  }
  addLayout() {
    this.fieldsDialog.isShowDialog = true
    this.fieldsDialog.title = this.$t('reportCommonWord.layoutConfig')
  }

  async getLayoutView(type) {
    // this.type = type === 'admin' ? 1 : 0
    // 视图类型 0.个人视图;1.系统视图
    this.type = type
    const res = await this._post({ url: '/report/reportView/list', params: {
      moduleId: this.reportId,
      type: this.type
    }})
    if (res.code === 0) {
      this.tableData = res.data
      this.dialogObj.isShowDialog = true
      this.dialogObj.title = `${this.$t('reportCommonWord.saleReport')} - ${this.$t('reportCommonWord')[type === 1 ? 'admin' : 'person']}`
    }
  }

  async editItem({ row }) {
    this.viewStatus = 'edit'
    const res = await this._get({ url: `/report/reportView/${row.id}` })
    if (res.code === 0) {
      const { reportViewColumnList, name, type, moduleId } = res.data
      const choosFieldsData = reportViewColumnList.map((item) => item.columnKey)
      this.$set(this.tableHeaderFieldsConfig, 'choose', choosFieldsData)
      this.$set(this.tableHeaderFieldsConfig, 'name', name)
      this.$set(this.tableHeaderFieldsConfig, 'viewId', row.id)
      this.$set(this.tableHeaderFieldsConfig, 'noCommit', false)
      this.fieldsDialog.isShowDialog = true
      this.fieldsDialog.title = this.$t('reportCommonWord.layoutConfig')
    }
  }
  async confirmView({ reportViewColumnList, viewName, saveAsView }) {
    const action = this.tableHeaderFieldsConfig.viewId ? '_put' : '_post'
    const url = this.tableHeaderFieldsConfig.viewId ? '/report/reportView/update' : '/report/reportView/create'
    const postData = {
      reportViewColumnList,
      name: viewName,
      moduleId: this.reportId,
      type: saveAsView ? 1 : this.type > -1 ? this.type : 0,
      id: this.tableHeaderFieldsConfig.viewId
    }
    const res = await this[action]({ url, data: { data: postData }})
    if (res.code === 0) {
      this.fieldsDialog.isShowDialog = false
      this._message({ message: this.$t('reportCommonWord')[this.viewStatus === 'edit' ? 'editViewSuccess' : 'createdView'], type: 'success' })
      if (this.type > -1) {
        this.getLayoutView(this.type)
      }
    }
  }

  deleteItem(scope) {
    this._confirm({ content: this.$t('reportCommonWord.deleteView') }).then(async() => {
      const res = await this._post({ url: '/report/reportView/delete', data: {
        data: [scope.row.id]
      }})
      if (res.code === 0) {
        this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t('layout.btns.delete') }), type: 'success' })
        this.getLayoutView(this.type)
      }
    })
  }
  async copy(scope) {
    console.log(scope.row)
    const res = await this._post({ url: '/report/reportView/copy', params: {
      fromId: scope.row.id
    }})
    if (res.code === 0) this.getLayoutView(this.type)
  }
}
</script>
<style lang="scss">
.el-dialog__body{
 padding: 20px 16px;
}
</style>
<style lang="scss" scoped>
@import 'src/styles/common-index.scss';

.layout {
  line-height: 30px;
  margin-right: 10px;
  &-text{
    color:$colorTextSecondary;
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
      /deep/.el-button + .el-button {
        margin: 0;
      }
      /deep/.el-button--text {
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
