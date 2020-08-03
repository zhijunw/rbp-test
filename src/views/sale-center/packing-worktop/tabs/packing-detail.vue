<template>
  <div class="packing-detail-warrper">
    <div class="packing-detail">
      <div class="table-box">
        <mulite-entry />
        <base-table
          ref="packingDetailTable"
          :tableData="packingTableData"
          :colunmData="packingTableHeader"
          :class="[getTableHeight, 'base-table', 'mgb-8']"
          :tableConfig="{
            isMultiSelect: true,
            isIndex: true,
            isShowOpera: false,
            height: '50vh'
          }"
          @viewDetail="viewDetail"
          @rowClick="viewDetail" />
        <!-- 尺码数据的表格 -->
        <base-table
          ref="skuTable"
          :tableData="skuTableData"
          :colunmData="skuTableHeader"
          class="sku-table"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            isShowOpera: true,
            showSummary: true,
            height: '20vh'
          }">
          <template v-slot="{ scope }">
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="checkOnly(scope)">
              {{ $t('commonWord.checkOnlyCode') }}
            </el-button>
          </template>
        </base-table>
      </div>
      <div class="table-right">
        <div class="differ-box">
          <p class="f16 differ-box-title">
            差异汇总
          </p>
          <div class="differ-overview">
            <div
              v-for="(item, index) in differOverview"
              :key="index"
              class="differ-overview-item">
              <p
                class="f18 bold"
                :class="item.className">
                {{ item.value }}
              </p>
              <p class="f12">
                {{ item.label }}
              </p>
            </div>
          </div>
          <base-table
            ref="differTable"
            :class="[getTableHeight, 'differ-table']"
            :tableData="differTableData"
            :colunmData="differTableHeader"
            :tableConfig="{
              isMultiSelect: false,
              isIndex: false,
              isShowOpera: false,
              border: false
            }" />
        </div>
        <barcode-record
          class="right barcode-record"
          :barcodeRecord="barcodeRecord"
          :isOpen="true" />
      </div>
    </div>
    <check-onlycode :dialogObj="checkOnlycodeDialog" />
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import {
  Dictionary,
  AnchorConfig,
  Response,
  TableHeaderConfig,
  CommonConfig,
  DialogObj
} from '@/typings'
import { Watch } from 'vue-property-decorator'
import { transformFields } from '@/utils'
import { detailConfig } from '../configs'
interface BarcodeRecordConfig {
  id: number
  desc: string
  status: string
  infoText: string
  time: Date
  number: number
}
interface DifferOverviewConfig extends Pick<CommonConfig, 'label' | 'value'> {
  className?: string
}
@Component({
  name: 'packing-detail',
  components: {
    muliteEntry: () => import('@/layout-components/mulite-entry/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    barcodeRecord: () => import('@/layout-components/barcode-record/index.vue'),
    checkOnlycode: () => import('../components/check-onlycode.vue')
  }
})
export default class App extends Vue {
  packingTableData: any[] = []
  packingTableHeader: TableHeaderConfig[] = detailConfig.packingDetail.packingTableHeader
  skuTableData: any[] = [
    {
      hh: '1',
      pm: '1222',
      color: '121',
      lc: '121',
      size: '3333',
      number: '12'
    }
  ]
  skuTableHeader: TableHeaderConfig[] = detailConfig.packingDetail.skuTableHeader
  differTableHeader: TableHeaderConfig[] = detailConfig.packingDetail.differTableHeader
  differTableData: any[] = []
  barcodeRecord: BarcodeRecordConfig[] = [
    {
      id: 1222,
      desc: '测试描述',
      status: '成功',
      infoText: '成功',
      time: new Date(),
      number: 1
    },
    {
      id: 1221,
      desc: '测试描述',
      status: '失败',
      infoText: '成功',
      time: new Date(),
      number: 1
    }
  ]
  differOverview: DifferOverviewConfig[] = [
    {
      label: '欠数',
      value: 122
    },
    {
      label: '已装箱数',
      value: 50,
      className: 'color-info'
    },
    {
      label: '待装箱数',
      value: 80,
      className: 'warning'
    }
  ]
  checkOnlycodeDialog: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '30%'
  }
  get getTableHeight() {
    if (this.packingTableData.length < 3) {
      return 'min-table-height'
    }
    return ''
  }

  checkOnly() {
    this.checkOnlycodeDialog.isShowDialog = true
    this.checkOnlycodeDialog.title = this.$t(
      'packingWorktop.detail.packingDetail.checkOnlyCodeDialog.title'
    )
  }
  viewDetail() {}
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
/*默认*/
@media (min-width: 1280px) {
  .packing-detail {
    /deep/.base-table {
      height: 60vh !important;
    }

    /deep/.base-table.min-table-height {
      height: 40vh !important;
    }
    /deep/.differ-table.min-table-height {
      height: calc(40vh - 70px) !important;
    }
    /deep/.differ-table {
      height: calc(60vh - 70px) !important;
    }
    /deep/.barcode-record {
      height: 20vh !important;
    }
    /deep/.sku-table {
      height: 20vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1440px*/
@media (min-width: 1440px) {
  .packing-detail {
    /deep/.base-table {
      height: 44vh !important;
    }

    /deep/.base-table.min-table-height {
      height: 30vh !important;
    }
    /deep/.differ-table {
      height: calc(44vh - 70px) !important;
    }
    /deep/.differ-table.min-table-height {
      height: calc(30vh - 70px) !important;
    }
    /deep/.barcode-record {
      height: 18vh !important;
    }
    /deep/.sku-table {
      height: 18vh !important;
    }
  }
}
@media (min-width: 1600px) {
  .packing-detail {
    /deep/.base-table {
      height: 52vh !important;
    }
    /deep/.base-table.min-table-height {
      height: 35vh !important;
    }
    /deep/.differ-table {
      height: calc(52vh - 70px) !important;
    }
    /deep/.differ-table.min-table-height {
      height: calc(35vh - 70px) !important;
    }
    /deep/.barcode-record {
      height: 22vh !important;
    }
    /deep/.sku-table {
      height: 22vh !important;
    }
  }
}
.packing-detail {
  display: flex;
  .table-box {
    flex: 1;
    min-width: 600px;
  }
  .table-right {
    width: 380px;
    margin-left: 8px;
    .differ-box {
      border: 1px solid #eee;
      &-title {
        color: $colorTextPrimary;
        height: 36px;
        line-height: 36px;
        text-align: center;
        border-bottom: 1px solid #eee;
      }
    }
    .differ-overview {
      display: flex;
      height: 68px;
      align-items: center;
      justify-content: space-around;
      &-item {
        line-height: 1.5;
      }
    }
  }
}
</style>
