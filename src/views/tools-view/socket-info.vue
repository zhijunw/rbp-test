<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @batch-delete="batchDelete"
      @enter="inputEnter" />

    <list-table
      ref="listTable"
      :page="page"
      :colunmData="listConfig.tableHeader"
      :tableData="tableData"
      @select="select"
      @changePage="changePage"
      @changePageSize="changePageSize">
      <template v-slot="{ scope }">
        <!--操作失败/导出成功 有下载按钮-->
        <el-button
          v-if="scope.statusName === '失败' || (scope.statusName === '成功' && scope.type === 1)"
          id="btn_t_blue"
          type="text"
          size="mini"
          @click="download(scope)">
          {{ $t('commonWord.download') }}
        </el-button>
        <span v-else />
      </template>
    </list-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import listMixins from '@/mixins/list-mixins'
import { Watch } from 'vue-property-decorator'
import commonApiUrl from '@/api/common-api'
import { PageObj } from '@/typings'
import { download } from '@/api/apiConfig'
@Component({
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue')
  }
})
export default class list extends Vue {
  page: PageObj = {
    total: 0,
    pageNo: 1,
    pageSize: 25,
    pageCount: 1
  }
  tableData: any[] = []
  selectData: any[] = []
  inputValue: string = ''
  listConfig: any = {
    btns: [
      {
        name: '删除',
        value: 'batchDelete',
        lang: 'layout.btns.batchDelete',
        event: 'batch-delete',
        id: 'btn_g_red',
        plain: true,
        interface: {
          name: 'batch-delete'
        }
      }
    ],
    InputConfig: {
      placeholder: 'form.placeholder.projectPlaceholder',
      long: true,
      prefixIcon: 'el-icon-search'
    },
    tableHeader: [
      {
        label: '项目',
        value: 'taskName',
        en: 'project',
        width: '150px',
        lang: 'commonWord.project'
      },
      {
        label: '所属模块',
        value: 'moduleName',
        en: 'moduleName',
        lang: 'commonWord.belongModule'
      },
      {
        label: '操作情况',
        value: 'statusName',
        lang: 'commonWord.operation'
      },
      {
        label: '操作人',
        value: 'operateByName',
        lang: 'commonWord.operator'
      },
      {
        label: '操作时间',
        value: 'operateTime',
        en: 'operateTime',
        lang: 'commonWord.operateTime'
      }
    ]
  }
  created() {
    this.query()
  }

  async query() {
    const res = await this._post({
      url: '/asyncTask/page',
      data: {
        data: this.inputValue,
        page: this.page.pageNo,
        pageSize: this.page.pageSize
      }
    })
    if (res.code === 0) {
      const { total, pageSize, pageCount, data } = res

      Object.assign(this.page, { total, pageSize, pageCount })
      this.tableData = data
    }
  }
  select({ section, formatSection }) {
    /**
     * TODO:
     * 这里先 默认用 formatSection 的数据 如果有特殊的 可以在某个功能的 按钮组下面配置参数
     */
    this.selectData = formatSection
  }
  changePage(page: number) {
    this.page.pageNo = page
    this.query()
  }
  changePageSize(size: number) {
    this.page.pageSize = size
    this.query()
  }
  async batchDelete() {
    if (this.selectData.length === 0) {
      this._message({ message: '请先选择数据', type: 'warning' })
      return
    }
    const res = await this._post({ url: '/asyncTask/delete', data: {
      data: this.selectData
    }})
    if (res.code === 0) {
      this._message({ message: '删除成功', type: 'success' })
      this.query()
    }
  }
  download(row) {
    download(row.taskName, row.fileUrl)
  }
  inputEnter(value: string) {
    this.inputValue = value.trim()
    this.query()
  }
}
</script>
<style lang="scss" scoped>
.list-warrper {
  padding: 0 16px;
  background: #fff;
  /deep/.warrper {
    top: 74px;
  }
}
</style>
