<template>
  <div class="user-group pgb-12">
    <slot name="title" />
    <div class="user-group__btn">
      <el-button
        id="btn_g_d_blue"
        plain
        :disabled="disabled"
        @click="add">
        {{ $t('layout.btns.add') }}
      </el-button>
      <el-button
        id="btn_g_red"
        plain
        :disabled="disabled"
        @click="batchDelete">
        {{
          $t('layout.btns.delete')
        }}
      </el-button>
    </div>
    <base-table
      :colunmData="userDatasetTable"
      :tableData="tableData"
      :tableConfig="tableConfig"
      class="user-group__table"
      @select="selectAll">
      <template v-slot="{ scope }">
        <el-button
          id="btn_t_delete"
          type="text"
          size="mini"
          align="center"
          :disabled="disabled"
          @click="deleteItem(scope.row, scope.$index)">
          {{ $t('layout.btns.delete') }}
        </el-button>
      </template>
    </base-table>

    <special
      ref="highSearch"
      :dialogData="dialogData"
      :dialogObj="dialogObj"
      @confirm="confirm">
      <div slot="filter-tab" />
    </special>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { TabelConfig, DialogObj, Response } from '@/typings'
// import apiUrl from '@/api/permission/dataset'
import apiUrl from '@/api/common-api'
import { tabsConfig } from '../configs/index'
import { Prop } from 'vue-property-decorator'
import { mergeArray, transformFields, nest } from '@/utils'
import { Tools } from '@/utils/tools'
import { userSearchConfig } from '@/layout-components/vip-dialog/config'

@Component({
  name: 'users-group',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    special: () => import('@/layout-components/vip-dialog/index.vue')
  }
})
export default class userGroup extends Vue {
  @Prop({ default: false }) disabled: boolean

  userDatasetTable = tabsConfig.userDataset.list
 dialogData:any = userSearchConfig
  tableData: any[] = []
  chooseItem: any[] = []
  tableConfig: TabelConfig = {
    maxHeight: '300px',
    fieldsArr: ['id'],
    isRight: 'right',
    width: '472px',
    isIndex: true
  }
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '970px'
  }
  reset() {
    ;(this.$refs.highSearch as any).reset()
    this.tableData = []
  }
  // 从父组件得到列表值
  getUserGroupData(userdata) {
    this.$nextTick(() => {
      // this.tableData = userdata
      // 把返回字段转换成 前端需要的格式
      // this.tableData = transformFields(userdata, { name: 'userName', code: 'userNo', id: 'userId' })
      this.tableData = userdata
    })
  }

  deleteItem(row, index) {
    this.tableData.splice(index, 1)
  }
  selectAll({ section, formatSection }) {
    this.chooseItem = formatSection
  }
  // 删除
  batchDelete() {
    if (!this.chooseItem.length) {
      this._message({ message: this.$t('commonWord.noDataWarning'), type: 'warning' })
      return
    }
    this.chooseItem.find((item): any => {
      const index = this.tableData.findIndex((k) => k.id === item.id)
      index > -1 && this.tableData.splice(index, 1)
    })
  }

  async confirm(formdata) {
    const { primaryKeys, ...other } = formdata.select
    const query = {}
    if (!primaryKeys) {
      Object.assign(query, other)
    } else {
      Object.assign(query, { userIds: primaryKeys })
    }
    const res = await this._post({ url: apiUrl.getUserList, data: { data: query }})
    if (res.code === 0) {
      const data = res.data
      // 合并数据并且去重
      this.tableData = mergeArray(this.tableData, data)
    }
  }
  // 这里是转换成后端需要的格式
  transformTable() {
    // return transformFields(this.tableData, { userName: 'name', userNo: 'code', userId: 'id' })
    return this.tableData
  }
  add() {
    this.dialogObj.isShowDialog = true
    this.dialogObj.title = this.$t('datasetPermission.detailTabs.dialogTitle')
  }
}
</script>
<style lang="scss" scoped>
.user-group {
  /deep/.base-title {
    margin-top: 6px;
  }

  &__btn {
    margin: 16px 0 12px;
  }
}
</style>
