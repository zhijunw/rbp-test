<template>
  <div class="table-content">
    <div
      v-if="tableHeader.length > 0"
      class="table-content-box">
      <DxDataGrid
        id="gridContainer"
        :ref="gridRefKey"
        :data-source="tableData"
        :allow-column-reordering="true"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :show-borders="true"
        :show-column-lines="true"
        :show-row-lines="true"
        @row-click="onRowClick"
        @content-ready="onContentReady">
        <DxColumnFixing :enabled="true" />
        <DxHeaderFilter :visible="true" />
        <DxSorting mode="single" />
        <DxLoadPanel :enabled="true" />
        <DxScrolling mode="virtual" />
        <!-- <DxFilterPanel :visible="true" /> -->

        <!-- <DxSearchPanel :visible="true" /> -->
        <DxColumn
          data-field="index"
          :caption="$t('reportCommonWord.index')"
          :allowFiltering="false"
          width="50px"
          alignment="left" />
        <DxColumn
          v-for="item in tableHeader"
          :key="item.dataField"
          :data-field="item.dataField"
          :caption="item.caption"
          :fixed="item.fixed"
          :fixedPosition="item.fixedPosition"
          :allow-sorting="item.allowSorting"
          :allowFiltering="item.allowFiltering"
          :cell-template="item.cellTemplate"
          alignment="left">
          <DxColumn
            v-for="second in item.children"
            :key="second.dataField"
            :data-field="second.dataField"
            :caption="second.caption"
            :allow-sorting="second.allowSorting"
            :allowFiltering="second.allowFiltering"
            :cell-template="second.cellTemplate"
            alignment="left">
            <DxColumn
              v-for="third in second.children"
              :key="third.dataField"
              :data-field="third.dataField"
              :caption="third.caption"
              :allow-sorting="third.allowSorting"
              :allowFiltering="third.allowFiltering"
              :cell-template="third.cellTemplate"
              alignment="left" />
          </DxColumn>
        </DxColumn>
        <DxSummary class="table-total">
          <DxTotalItem
            column="index"
            :display-format="$t('reportCommonWord.total')" />
          <DxTotalItem
            v-for="(keys, index) in totalColumns"
            :key="index"
            :column="keys.columnKey"
            :display-format="keys.total + ''" />
        </DxSummary>
        <!-- 图片模板 -->
        <template #pictureTemplate="cell">
          <table-image :imageSrc="cell.data.value" />
        </template>
        <!-- 下钻模板 -->
        <template #DrillDownTemplate="cell">
          <span
            id="btn_t_blue"
            class="hover"
            @click="subData(cell.data)">{{
              cell.data.value
            }}</span>
        </template>
      </DxDataGrid>
      <base-pagination
        :page="page"
        v-on="$listeners" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
// const {
//   DxDataGrid,
//   DxColumn,
//   DxColumnChooser,
//   DxColumnFixing,
//   DxHeaderFilter,
//   DxSearchPanel,
//   DxFilterPanel,
//   DxSorting,
//   DxLoadPanel,
//   DxScrolling,
//   DxSummary,
//   DxTotalItem
// } = require('devextreme')
import {
  DxDataGrid,
  DxColumn,
  DxColumnChooser,
  DxColumnFixing,
  DxHeaderFilter,
  DxSearchPanel,
  DxFilterPanel,
  DxSorting,
  DxLoadPanel,
  DxScrolling,
  DxSummary,
  DxTotalItem
} from 'devextreme-vue/data-grid'
import { Prop, Emit, Inject } from 'vue-property-decorator'
import { PageObj } from '@/typings'
import { Tools } from '@/utils/tools'
import 'devextreme/dist/css/dx.common.css'
import 'devextreme/dist/css/dx.light.css'
import { loadMessages, locale } from 'devextreme/localization'
import dxDictionary from '@/lang/dx.message.zh'
import { getCookie } from '@/utils/auth'
@Component({
  name: 'report',
  components: {
    DxDataGrid,
    DxColumn,
    DxColumnChooser,
    DxColumnFixing,
    DxHeaderFilter,
    DxSearchPanel,
    DxFilterPanel,
    DxSorting,
    DxScrolling,
    DxLoadPanel,
    DxSummary,
    DxTotalItem,
    tableImage: () => import('./table-img.vue'),
    basePagination: () => import('@/components/base-pagination/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) page: PageObj
  @Prop({ required: true }) tableHeader: any[]
  @Prop({ required: true }) tableData: any[]
  @Prop() totalColumns: any[]

  @Inject('reportId') readonly reportId!: number

  gridRefKey = 'data-grid'
  // employees = generateData(1000)
  // 这里要计算哪里需要合计行
  // get totalKeys() {
  //   return Tools.withChildrenFlatten(this.tableHeader).map((item) => {
  //     if (item.isTotal) return item.dataField
  //   }).filter((k) => k)
  // }

  get dataGrid() {
    return (this.$refs[this.gridRefKey] as any).instance
  }
  // 加载多语言
  created() {
    loadMessages(dxDictionary)
    const lang = getCookie('language') || 'zh'
    locale(lang)
  }
  onContentReady(e) {
    e.component.option('loadPanel.enabled', false)
  }
  onRowClick(e) {
    this.$emit('rowClick', e.data)
  }

  async subData(row) {
    const { column, data } = row
    this.$message({ message: '这是一个跳转功能', type: 'success' })
    const res = await this._post({
      url: '/report/href',
      data: {
        drillFieldName: column.dataField,
        reportId: this.reportId,
        drillRowData: data
      }
    })
    if (res.code === 0) {
    }
  }

  //   calculateCellValue(data) {
  //     return [data.Title, data.FirstName, data.LastName].join(' ')
  //   }
  //   applyFilter(filterType, values) {
  //     this.filterType = filterType
  //     this.filterValues = values
  //   }
  //   setSearchValue(searchText) {
  //     this.searchText = searchText
  //   }
  //   filterByCost() {
  //     console.log('1')
  //     this.dataGrid.filter([
  //       ['zkj', '>', 1000],
  //       'and',
  //       ['dpj', '<=', 2000]
  //     ])
  //   }
  //   getCombinedFilter() {
  //     return this.dataGrid.getCombinedFilter(true)
  //   }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

/*默认*/
@media (min-width: 1280px) {
  .table-content-box {
    height: 67vh;
    display: flex;
    flex-direction: column;
    #gridContainer {
      flex: 1;
      height: 64vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1440px) {
  .table-content-box {
    // min-height: calc(100vh - 250px);
    height: 77vh;
    // min-height: 77vh;
    // overflow: auto;
    display: flex;
    flex-direction: column;
    #gridContainer {
      flex: 1;
      height: 72vh !important;
    }
  }
}
@media (min-width: 1600px) {
  .table-content-box {
    // min-height: calc(100vh - 250px);
    height: 82vh;
    // min-height: 77vh;
    // overflow: auto;
    display: flex;
    flex-direction: column;
    #gridContainer {
      flex: 1;
      height: 76vh !important;
    }
  }
}
.click-text {
  color: $info;
}
</style>
