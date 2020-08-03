<template>
  <div class="barcode">
    <base-title
      :title="$t('goodsFiels.detail.anchorConfig.barcodeInfo')" />
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData"
          :span-method="objectSpanMethod"
          class="base-table"
          cell-class-name="row"
          header-row-class-name="base-table-header__row"
          border>
          <el-table-column
            v-for="(item, index) in barcodeHeader"
            :key="index"
            show-overflow-tooltip
            :label="$t(item.lang)|| item.label"
            :prop="item.value"
            :width="item.width"
            class-name="table-row">
            <template
              slot="header">
              <template v-if="item.type === 'code'">
                <span>{{ $t(item.lang)|| item.label }}</span>
                <span
                  class="hover float color-info"
                  @click="makeupCode(item)">一键生成</span>
              </template>
              <template v-else>
                {{ $t(item.lang)|| item.label }}
              </template>
            </template>
          </el-table-column>
        </el-table>
        <div class="barcode-box f12 flex mgt-16">
          <div class="barcode-box-img">
            <p class="mgb-6">
              二维码链接
            </p>
            <el-input
              v-model="form.Goods.qrcodeLink"
              size="small" />
          </div>
          <div class="barcode-box-checkbox flex-1">
            <p class="mgb-6">
              是否有唯一码
            </p>
            <el-radio
              v-model="form.Goods.qrcodeLink"
              label="1">
              是
            </el-radio>
            <el-radio
              v-model="form.Goods.qrcodeLink"
              label="0">
              否
            </el-radio>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Dictionary } from '@/typings'
import { Watch, Prop } from 'vue-property-decorator'
import { detailConfig } from '../configs'
import vuexMixins from '../configs/vuex-module'

@Component({
  name: 'barcode-info',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
  @Prop() form: Dictionary
  @Watch('form.Goods.sizeClassId', { deep: true })
  onsizeTypeChanged(val: string[], oldVal: string[]) {
  //  console.log('goodsSize size val',val,'oldval',oldVal)
    if (val !== oldVal) {
      this.$nextTick(() => {
        this.makeUpLimitData()
      })
    }
  }

  @Watch('form.GoodsLong.longId', { deep: true })
  onsizeChanged(val: string[], oldVal: string[]) {
  //  console.log('inside size val',val,'oldval',oldVal)
  }

  @Watch('form.GoodsColor', { deep: true })
  ongoodsColorChanged(val: string[], oldVal: string[]) {
  //  console.log('goodsColor color val',val,'oldval',oldVal)
  }
  get barcodeHeader() {
    if (this.v_detailConfig.barcodeRuleList) {
      const rows = this.v_detailConfig.barcodeRuleList.map((item) => {
        return {
          label: item.name,
          value: item.id,
          type: 'code'
        }
      })
      return [...detailConfig.barcodeInfo, ...rows]
    }
    return detailConfig.barcodeInfo
  }
  // tableHeader = detailConfig.barcodeInfo
  tableData: any[] = []
  // 一键生成国标码
  makeupCode(value) {
    console.log('value', value, 'tableData', this.tableData)
  }
  // 合并单元格
  objectSpanMethod({ row, column, rowIndex, columnIndex }): any {
    // console.log('row',row,'column',column,'rowIndex',rowIndex,'columnIndex',columnIndex)
    if (columnIndex === 0 || columnIndex === 1) {
      if (row.mergeRow) {
        return {
          rowspan: row.mergeRow,
          colspan: 1
        }
      } else {
        return {
          rowspan: 0,
          colspan: 0
        }
      }
    }
  }
  // 生成条码信息
  makeUpLimitData() {
    const colorOptions = this.form.GoodsColor
    const insideLengthOption = this.form.GoodsLong.longId
    // const sizeTypeOption = this.form.goodsSize.sizeType
    const sizeTypeOption = this.v_sizeKeyData

    const sizeLimitData: any[] = []
    for (const colors of colorOptions) {
      for (const inside of insideLengthOption) {
        for (const size of sizeTypeOption) {
          const obj = {
            color: colors.name,
            colorId: colors.colorId,
            colordesc: colors.colorName,
            longId: inside,
            insideLength: this.v_detailConfig.goodsLongList.find((item) => item.value === inside).label,
            sizeId: size.name,
            code: '1234'
          }
          sizeLimitData.push(obj)
        }
      }
    }
    sizeLimitData.forEach((item, index) => {
      if (index % insideLengthOption.length * sizeTypeOption.length === 0) item.mergeRow = colorOptions.length * sizeTypeOption.length
    })
    this.tableData = sizeLimitData
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.base-table {
  /deep/th {
    padding: 0 !important;
    height: $thHeight;
  }
  /deep/.row {
    padding: 0 !important;
    height: $thHeight;
  }
  /deep/.el-table-column--selection {
    /deep/ .cell {
      padding: 0 !important;
    }
  }
}
.barcode-box{
  &-img{
    flex: 2;
  }
  &-checkbox{
    padding-left: 116px;
  }
}

</style>
