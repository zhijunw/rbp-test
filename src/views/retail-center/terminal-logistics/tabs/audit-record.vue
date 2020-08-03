<template>
  <div
    class="audit-record">
    <base-table
      ref="auditTable"
      key="auditTable"
      :tableData="auditRecord"
      :colunmData="auditTableHeader"
      class="audit-table"
      :tableConfig="{
        isMultiSelect: false,
        isIndex: false,
        isShowOpera: false
      }">
      <template v-slot:tableCell="{ scope: { row, item} }">
        <!-- 如果有type 则代表有分类 -->
        <template v-if="row.type">
          <span
            v-if="row[item.value]">{{ row[item.value] }}</span>
          <span
            v-else />
        </template>
        <template v-else-if="item.type==='image'">
          <span>{{ row[item.value] }}</span>
          <!-- 如果有图片 -->
          <div
            v-if="row.billFlowLogResourceList"
            class="image-box">
            <el-image
              v-for="imgItem in row.billFlowLogResourceList"
              :key="imgItem.id"
              lazy
              :z-index="10000"
              :preview-src-list="[imgItem.fileUrl]"
              :src="imgItem.fileUrl"
              class="image"
              fit="cover" />
          </div>
        </template>
        <template v-else>
          <span>{{ row[item.value] }}</span>
        </template>
      </template>
    </base-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'

import { DialogObj } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary, TableHeaderConfig } from '@/typings'
import apiUrl from '@/api/audit-activity/create-activity'
import vuexMixins from '../configs/vuex-module'
import { globalConfigs } from '../configs'
@Component({
  name: 'auditRecord',
  components: {

    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  auditTableHeader: TableHeaderConfig[] = [
    {
      label: '操作时间',
      value: 'createdTime',
      lang: 'commonWord.operationTime'
    },
    {
      label: '审批层级',
      value: 'flowNodeName',
      lang: 'commonWord.approvalLevel'
    },
    {
      label: '操作人',
      value: 'flowByName',
      lang: 'commonWord.operator'
    },
    {
      label: '操作',
      value: 'flowProcessName',
      lang: 'commonWord.operation'
    },
    {
      label: '审批意见',
      value: 'flowSuggestion',
      lang: 'commonWord.auditComments'
    }
  ]
  auditRecord: any[] = []

  // mounted() {
  //   console.log('mounted audit-record')
  //   this.$nextTick(() => {
  //     this.getRecord()
  //   })
  // }
  activated() {
    console.log('activated audit-record')
    this.getRecord()
  }
  async getRecord() {
    const id = this.v_id.split('_')[0]
    // if (!id) {
    //   this.auditRecord = []
    //   return
    // }
    this.auditRecord = []
    const res = await this._get({ url: apiUrl.aitivityDetail, params: {
      billId: this.v_id.split('_')[0],
      moduleId: globalConfigs.realModuleId
    }})
    if (res.code === 0) {
      const data = res.data
      Object.keys(data).forEach((keys) => {
        if (data[keys].length > 0) {
          this.auditRecord.push({
            type: keys,
            createdTime: data[keys][0].groupName,
            class: 'table-bd'
          })
        }
        this.auditRecord = [... this.auditRecord, ...data[keys]]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.image-box{
  display: flex;
  .image{
    width: 48px;
    height: 48px;
    margin-right: 6px;
  }
  /deep/.el-image-viewer__close{
    background: #fff;
    opacity: 0.7;
  }
}
/deep/.table-bd{
    /deep/ .row {
        background: #f7f8fa;
    }
}

</style>
