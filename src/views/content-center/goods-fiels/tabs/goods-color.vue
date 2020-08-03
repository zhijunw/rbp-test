<template>
  <div class="goods-color">
    <base-title
      :title="$t('goodsFiels.detail.anchorConfig.goodsColor')" />
    <el-row>
      <el-col :span="12">
        <base-table
          :colunmData="tableHeader"
          :tableData="tableData"
          class="base-table"
          :tableConfig="{
            isMultiSelect: false,
            isShowOpera: true,
            highlightCurrentRow: false
          }">
          <template v-slot:tableCell="{ scope: { row, item } }">
            <template v-if="item.type === 'select'">
              <base-select
                :value.sync="row[item.value]"
                :disabled="v_disabled"
                :item="{options:v_detailConfig.colorList}"
                class="no-border-input"
                @selectChange="selectChange($event,row)" />
            </template>
            <template v-else>
              <el-input
                v-model="row[item.value]"
                size="small"
                :disabled="v_disabled"
                class="select-input no-border-input"
                clearable />
            </template>
          </template>
          <template v-slot="{ scope }">
            <el-button
              id="btn_t_gray"
              type="text"
              size="mini"
              :disabled="v_disabled"
              @click="delFn(scope)">
              {{ $t('layout.btns.delete') }}
            </el-button>
          </template>
        </base-table>
        <div class="add-box f12">
          <el-button
            type="text"
            :disabled="v_disabled"
            class="inline-block"
            @click="addLine">
            +{{ $t('layout.btns.addColor') }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { detailConfig } from '../configs'
import vuexMixins from '../configs/vuex-module'
import { transformFields } from '@/utils'
import { ListInterface } from '@/typings'

@Component({
  name: 'goods-color',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
    @Prop({ required: true }) tableData: any[]

    @Watch('tableData', { deep: true })
    ontableDataChanged(val: any[], oldVal: any[]) {
      // console.log('val',val,'options', this.v_detailConfig)
      // 这里列表的颜色不能选择重复
      this.v_detailConfig.colorList.forEach((item) => {
        const index = val.findIndex((k) => k.colorId === item.value)
        item.disabled = index > -1
      })
    }

    tableHeader = detailConfig.goodsColor
    // options:any[] = []
    // 删除某行
    delFn(scope) {
      this.tableData.splice(scope.$index, 1)
    }

    // 下拉框事件
    selectChange(val, row) {
      const label = this.v_detailConfig.colorList.find((item) => item.value === val).label
      row.name = label
    }
    addLine() {
      this.tableData.push({
        colorId: '',
        name: '',
        goodsId: '',
        // id: '',
        colorName: ''
      })
    }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.base-table {
  /deep/.el-table__body-wrapper {
    /deep/.cell {
      padding: 0 !important;
    }
  }
  /deep/.el-table__header-wrapper {
    /deep/.cell {
      padding: 0 !important;
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
      // width: 200px;
      padding-left: 10px;
      color: $info;
      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
