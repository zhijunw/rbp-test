<template>
  <div class="user-group pdall-16">
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
      :tableData="userData"
      :tableConfig="tableConfig"
      :disabled="disabled"
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
      ref="heighSearch"
      :dialogData="dialogData"
      :dialogObj="dialogObj"
      @confirm="confirm">
      <div slot="filter-tab" />
    </special>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import { TabelConfig, DialogObj, Dictionary, Response } from '@/typings'
import { tabsConfig, apiList } from '../configs/index'
import { mergeArray, nest } from '@/utils'
import apiUrl from '@/api/common-api'
import { Tools } from '@/utils/tools'
import { userSearchConfig } from '@/layout-components/vip-dialog/config'
@Component({
  name: 'user-group',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    special: () => import('@/layout-components/vip-dialog/index.vue')
  }
})

export default class userGroup extends Vue {
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) userData: object[]

  userDatasetTable = tabsConfig.userTab.list
  chooseItem: any[] = []
  tableConfig: TabelConfig = {
    fieldsArr: ['id'],
    isRight: 'right',
    width: '472px',
    height: '250px',
    isIndex: true
  }
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '添加用户',
    width: '970px'
  }
  dialogData:any = userSearchConfig

  reset() {
    ;(this.$refs.heighSearch as any).reset()
  }
  deleteItem(row, index) {
    this.userData.splice(index, 1)
    // this.getOrderNumber()
  }
  selectAll({ section, formatSection }) {
    this.chooseItem = formatSection
  }
  batchDelete() {
    if (!this.chooseItem.length) {
      this._message({ message: this.$t('rolesPermission.detailTabs.userTab.deleteTips'), type: 'warning' })
      return
    }
    this.chooseItem.find((item): any => {
      const index = this.userData.findIndex((k: any) => k.id === item.id)
      index > -1 && this.userData.splice(index, 1)
    })
    // this.getOrderNumber()
  }
  add() {
    this.dialogObj.isShowDialog = true
    this.dialogObj.title = this.$t('datasetPermission.detailTabs.dialogTitle')
  }

  async confirm(formdata) {
    // console.log('formdata',formdata)
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
      const userData = mergeArray(this.userData, data)
      userData.forEach((item, index) => {
        this.$set(this.userData, index, item)
      })
    }
  }

  // 给表格排序
  // getOrderNumber() {
  //   this.userData.forEach((e: Dictionary, index) => {
  //     e.xh = index
  //   })
  // }
}
</script>
<style lang="scss" scoped>
.user-group {
  // min-height: calc(100vh - 212px);

  /deep/.base-title {
    margin-top: 6px;
  }

  &__btn {
    margin-bottom: 12px;
  }
}
</style>
