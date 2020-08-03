<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      @add="m_add"
      @batch-enable="m_batchEnable"
      @batch-disable="m_batchDisable"
      @filter="m_filter"
      @enter="m_inputEnter" />

    <list-table
      ref="listTable"
      :page="m_page"
      :colunmData="listConfig.tableHeader"
      :tableData="m_tableData"
      @select="m_select"
      @changePage="m_changePage"
      @viewDetail="m_viewDetail"
      @changePageSize="m_changePageSize">
      <template v-slot="{scope}">
        <el-button
          id="btn_t_blue"
          type="text"
          size="mini"
          @click="m_viewDetail(scope)">
          {{ $t('layout.btns.checkDetail') }}
        </el-button>
      </template>
    </list-table>

    <base-drawer
      :drawerObj="m_drawerObj"
      :formList="formList"
      :formData="formData"
      @reset="m_reset"
      @query="m_query" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { listConfig } from './configs'
import listMixins from '@/mixins/list-mixins'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Dictionary, DialogObj, Response, FormListConfig } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/config-center/module-config'
import commonApiUrl from '@/api/common-api'
import { transformFields } from '@/utils'

@Component({
  name: 'module-list',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue')
  }
})
export default class list extends mixins(listMixins, vuexMixins) {
  listConfig = listConfig
  tableData: any[] = []
  listApi: string = apiUrl.list
  deleteItemApi: string = apiUrl.deletes
  formList = listConfig.formList
  formData: Dictionary = {}

  created() {
    this.m_query()
  }
}
</script>
<style lang="scss" scoped>

</style>
