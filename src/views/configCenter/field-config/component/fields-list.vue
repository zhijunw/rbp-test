<template>
  <div class="fields-list f14">
    <div class="fields-list__header flex-space">
      <div class="fields-list__icon">
        <svg-icon
          name="field_table"
          className="w20 h20 mgr-6" />
        {{ $t('fieldConfiguration.list.fieldsList') }}
      </div>
      <div class="fields-list__box">
        <base-input
          :inputProps="{
            placeholder: 'form.placeholder.fieldsPlaceholder',
            long: true,
            prefixIcon: 'el-icon-search'
          }"
          class="list-input"
          :value="inputValue"
          @enter="inputEnter" />
        <el-button
          id="btn_g_d_blue"
          class="mgl-10"
          @click="add">
          {{ $t('layout.btns.addFields') }}
        </el-button>
      </div>
    </div>
    <base-table
      :colunmData="fieldsListTableHeader"
      :tableData="fieldsTableData"
      class="base-table"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: true,
        id: 'index',
      }"
      @viewDetail="viewDetail">
      <template v-slot="{ scope }">
        <el-button
          id="btn_t_gray"
          type="text"
          size="mini"
          @click="deleteFn(scope)">
          {{ $t('layout.btns.delete') }}
        </el-button>
      </template>
    </base-table>
    <base-pagination
      :page="pageObj"
      @changePageSize="changePageSize"
      @changePage="changePage" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Watch } from 'vue-property-decorator'
import { listConfig } from '../configs'
import { PageObj, ListResponse } from '@/typings'
import { to } from '@/utils'
import apiUrl from '@/api/config-center/fields-config'

const textMap = new Map([
  ['text', 'commonWord.text'],
  ['number', 'commonWord.number'],
  ['select', 'commonWord.select'],
  ['datePick', 'commonWord.datePick'],
  ['default', '']
])

@Component({
  name: 'fields-list',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    basePagination: () => import('@/components/base-pagination/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  fieldsListTableHeader = listConfig.fieldsListTableHeader
  fieldsTableData: any[] = []
  pageObj: PageObj = {
    total: 1,
    pageNo: 1,
    pageSize: 25,
    pageCount: 1
  }
  inputValue:string | number = ''
  // 观察列表的刷新
  @Watch('v_refreshListTable')
  onv_refreshListTable() {
    this.query()
  }
  created() {
    this.$nextTick(() => {
      this.query()
    })
  }
  // 删除行项目
  async deleteFn({ row }) {
    const res = await this._post({ url: apiUrl.batchDelete, data: { data: [row.id], user: 'admin' }})
    if (res.code === 0) {
      this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns.delete') }), type: 'success' })
      this.query()
    }
  }
  add() {
    this.$store.commit(`${this.m_moduleId}/SET_STATUS`, 'add')
    this.$store.commit(`${this.m_moduleId}/SET_ID`, '')
    this.$store.commit(`${this.m_moduleId}/SET_READ_STATUS`, false)
  }
  changePageSize(size) {
    this.pageObj.pageSize = size
    this.query()
  }
  changePage(page) {
    this.pageObj.pageNo = page
    this.query()
  }
  // 输入单号模糊搜索
  inputEnter(val) {
    this.inputValue = val
    this.query()
  }
  async query() {
    const postData = {
      data: {
        name: this.inputValue
      },
      page: this.pageObj.pageNo,
      pageSize: this.pageObj.pageSize,
      user: ''
    }
    const [err, res] = await to(this._post({ url: apiUrl.getFieldsList, data: postData }))
    if (res) {
      const { total, pageSize, pageCount, data: tableData } = res
      Object.assign(this.pageObj, { total, pageSize, pageCount })
      this.fieldsTableData = tableData
      this.fieldsTableData.forEach((item) => {
        if (item.type) {
          const typeAction: any = textMap.get(item.type) || textMap.get('default')
          item.type = this.$t(typeAction)
        }
      })
    }
  }
  //   查看详情
  viewDetail(row) {
    if (['add', 'edit'].includes(this.v_status)) {
      this.$alert('数据尚未保存,请先保存数据', '提示', {
        confirmButtonText: '确定'
      })
    } else {
      this.$store.commit(`${this.m_moduleId}/SET_ID`, `${row.id}_${new Date().getTime()}`)
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
/*默认*/
@media (min-width: 1280px) {
  .fields-list {
    height: 80vh;
    /deep/.base-table {
      height: 78vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1440px*/
@media (min-width: 1440px) {
  .fields-list {
    height: 80vh;
    /deep/.base-table {
      height: 70vh !important;
      height: 70vh !important;
    }
  }
}
@media (min-width: 1600px) {
  .fields-list {
    height: 86vh;
    /deep/.base-table {
      height: 76vh !important;
      max-height: 76vh !important;
    }
  }
}
.fields-list {
  // height: 100%;
  // max-height: 728px;
    // min-height: calc(100vh - 228px);

  &__header {
    height: 48px;
    line-height: 48px;
    color: $colorTextRegular;
  }
  .list-input{
    display: inline-block;
    margin-right: 10px;
  }
}
</style>
