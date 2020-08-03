<template>
  <div>
    <slot name="title" />
    <el-button
      id="btn_g_d_blue"
      :plain="true"
      :disabled="v_disabled"
      @click="handleAdd">
      {{ $t('layout.btns.add') }}
    </el-button>
    <el-button
      id="btn_g_red"
      :plain="true"
      :disabled="v_disabled"
      @click="handleDeleteAll">
      {{ $t('layout.btns.delete') }}
    </el-button>
    <div class="table-box">
      <base-table
        :tableData="dataInfos"
        :colunmData="datasetTableHeader"
        :tableConfig="tableConfig"
        @select="handleSelect">
        <template
          v-slot:tableCell="{ scope: { row, item,$index } }">
          <el-select
            v-if="item.type === 'select' "
            v-model="row.name"
            size="small"
            class="no-border"
            :placeholder="$t('form.placeholder.select')"
            @change="handleChange(row,$index,$event)">
            <el-option
              v-for="items in v_dataSetList"
              :key="items.id"
              :disabled="items.disabled"
              :label="items.name"
              :value="items.id" />
          </el-select>
        </template>
        <template v-slot="{ scope }">
          <el-button
            id="btn_t_delete"
            type="text"
            size="mini"
            align="center"
            :disabled="v_disabled"
            @click="handleDelete(scope.row,scope.$index)">
            {{ $t('layout.btns.delete') }}
          </el-button>
        </template>
      </base-table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { datasetData } from '../configs/mock'
import { Prop, Watch } from 'vue-property-decorator'
import { tabsConfig } from '../configs'
import { TabelConfig } from '@/typings'
import vuexMixins from '../configs/vuex-module'
import { deepCopy } from '@/utils'
@Component({
  name: 'dataset-group',
  components: {
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class detail extends mixins(vuexMixins) {
  datasetTableHeader = tabsConfig.datasetConfig.list
  dataIdArr:any = []
  dataInfos:any = []
  tableConfig: TabelConfig = {
    height: '175px',
    isIndex: true
  }
  getDatasetGroupData(dataInfos) {
    this.$nextTick(() => {
      this.dataInfos = dataInfos
      this.disabledItem()
    })
  }
  handleDelete(row, $index) {
    this.dataInfos.splice($index, 1)
    this.disabledItem()
  }
  handleDeleteAll() {
    if (!this.dataIdArr.length) {
      this._message({ message: this.$t('rolesPermission.detailTabs.userTab.deleteTips'), type: 'warning' })
      return
    }
    this.dataIdArr.find((id): any => {
      const index = this.dataInfos.findIndex((k: any) => k.id === id)
      index > -1 && this.dataInfos.splice(index, 1)
    })
    this.disabledItem()
  }
  handleAdd() {
    this.dataInfos.push({ code: '', name: '' })
  }
  handleSelect({ section }) {
    const dataIdArr = section.map(val => {
      return val.id
    })
    this.dataIdArr = dataIdArr
  }
  handleChange(row, $index, key) {
    const option: any = deepCopy(this.v_dataSetList.find((item) => item.id === key))
    this.$set(this.dataInfos, $index, option)
    this.disabledItem()
  }
  disabledItem() {
    this.v_dataSetList.forEach((item) => {
      item.disabled = false
    })
    this.dataInfos.forEach((item) => {
      const index = this.v_dataSetList.findIndex((list) => list.id === Number(item.id))
      index > -1 && this.$set(this.v_dataSetList[index], 'disabled', true)
    })
  }
}
</script>

<style scoped lang="scss">
.table-box{
  width:500px;
  margin-top:12px;
}
.no-border{
  /deep/.el-input__inner{
    border: none;
    background: transparent;
  }
}
</style>
