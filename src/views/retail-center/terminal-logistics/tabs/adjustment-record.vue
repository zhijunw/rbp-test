<template>
  <div class="adjustment-record">
    <base-table
      ref="adjustmentTable"
      key="adjustmentTable"
      :tableData="adjustmentData"
      :colunmData="adjustmentTableHeader"
      class="audit-table"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: true,
        isShowOpera: false
      }" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'

import { DialogObj } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary, TableHeaderConfig } from '@/typings'
import apiUrl from '@/api/sale-center/sale-plain'
import { detailConfig } from '../configs'
import vuexMixins from '../configs/vuex-module'
import { Tools } from '@/utils/tools'

@Component({
  name: 'adjustmentRecord',
  components: {
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  // @Watch('v_id', { immediate: true })
  // onv_idChange(val, oldval) {
  //   console.log('change', val)
  // }
  adjustmentTableHeader: TableHeaderConfig[] = detailConfig.adjustmentRecord
  adjustmentData: any[] = []
  // mounted() {
  //   console.log('mounted adjustment-record')
  //   this.$nextTick(() => {
  //     this.getAdjustmentsData()
  //   })
  // }
  activated() {
    this.getAdjustmentsData()
    console.log('activated adjustment-record')
  }
  async getAdjustmentsData() {
    const id = this.v_id.split('_')[0]

    if (!id) {
      this.adjustmentData = []
      return
    }
    const res = await this._post({
      url: apiUrl.adjustmentRecord,
      data: {
        data: id,
        page: 1,
        pageSize: 100
      }
    })
    if (res.code === 0) {
      this.adjustmentData = res.data
    }
  }
}
</script>

<style scoped lang="scss">
/deep/.table-bd {
  /deep/ .row {
    background: #f7f8fa;
  }
}
</style>
