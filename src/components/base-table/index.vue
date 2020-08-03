<template>
  <el-table
    ref="table"
    :data="tableData"
    :stripe="config.stripe"
    :highlightCurrentRow="config.highlightCurrentRow"
    :height="config.height"
    :max-height="config.maxHeight"
    :show-header="config.showHeader"
    :border="config.border"
    :show-summary="config.showSummary"
    :summary-method="getSummaries"
    :default-expand-all="config.defaultExpandAll"
    row-key="id"
    size="mini"
    class="base-table"
    :row-class-name="getRowClass"
    header-row-class-name="base-table-header__row"
    cell-class-name="row"
    :style="{width: config.width}"
    @row-dblclick="viewDetail"
    @row-click="rowClick"
    @select-all="select"
    @select="select"
    @filter-change="filterChange"
    @cell-mouse-enter="cellMove">
    <el-table-column
      v-if="config.isMultiSelect"
      fixed="left"
      type="selection"
      :selectable="selectable"
      width="35"
      align="center" />
    <el-table-column
      v-if="config.isIndex"
      type="index"
      width="60"
      :label="$t('reportCommonWord.index')"
      align="left"
      class-name="pdl-10" />
    <el-table-column
      v-for="(item, index) in colunmData"
      :key="item.value"
      :show-overflow-tooltip="!item.tooltip"
      :label="$t(item.lang)|| item.label || item.lable"
      :prop="item.value"
      :min-width="item.width"
      :width="item.width"
      filter-placement="bottom"
      :fixed="item.fixed"
      :filters="item.filters"
      :column-key="item.filterKey"
      :class-name="item.filters?'':'no-filters'"
      :align="item.align || 'left'">
      <template slot="header">
        <!-- 这里要自行写方法 -->
        <slot
          name="headerCell"
          :scope="{item,index}">
          <!-- 如果有必填 -->
          <span
            v-if="item.required"
            class="pdl-10 color-red">*</span>
          <span class="pdl-10">{{ $t(item.lang)|| item.label }}</span>
        </slot>
      </template>
      <template slot-scope="{ row, $index }">
        <slot
          name="tableCell"
          :scope="{row,item,index, $index}">
          <span class="pdl-10">{{ row[item.value] }}</span>
        </slot>
      </template>
    </el-table-column>
    <el-table-column
      v-if="config.isShowOpera"
      :fixed="config.isRight"
      :label="$t('layout.btns.operation')"
      align="center"
      :width="config.operatWidth">
      <template slot-scope="scope">
        <slot :scope="scope">
          <div class="btn-group">
            <div v-if="!scope.row.edit">
              <el-button
                id="btn_t_blue"
                type="text"
                size="mini"
                :disabled="disabled"
                @click.stop.prevent="editItem(scope)">
                {{
                  $t('layout.btns.edit')
                }}
              </el-button>
              <el-button
                id="btn_t_gray"
                type="text"
                size="mini"
                :disabled="disabled"
                @click.stop.prevent="deleteItem(scope)">
                {{
                  $t('layout.btns.delete')
                }}
              </el-button>
            </div>
            <div v-else>
              <el-button
                id="btn_t_blue"
                type="text"
                :disabled="disabled"
                size="mini"
                @click.stop.prevent="saveItem(scope)">
                {{
                  $t('layout.btns.save')
                }}
              </el-button>
              <el-button
                id="btn_t_gray"
                type="text"
                :disabled="disabled"
                size="mini"
                @click.stop.prevent="cancelItem(scope)">
                {{
                  $t('layout.btns.cancel')
                }}
              </el-button>
            </div>
          </div>
        </slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { TableHeaderConfig, PageObj, TabelConfig } from '@/typings'

const DEFAULT_CONFIG: TabelConfig = {
  isMultiSelect: true,
  isShowOpera: true,
  fieldsArr: ['id'],
  // height: 'auto',
  maxHeight: '600px',
  border: true,
  isRight: 'right',
  width: '100%',
  stripe: false,
  isIndex: false,
  operatWidth: 100,
  showHeader: true,
  rowId: 'id',
  showSummary: false,
  highlightCurrentRow: true,
  id: 'id',
  defaultExpandAll: false
  // rowId: 'id'
}

@Component({
  name: 'base-table'
})
export default class App extends Vue {
  @Prop({ required: true }) tableData: any[]

  @Prop() tableConfig: TabelConfig

  @Prop({ required: true }) colunmData: TableHeaderConfig[]

  @Prop({ default: false }) disabled: boolean

  @Watch('tableConfig', { immediate: true, deep: true })
  onValueChanged(val: TabelConfig, oldVal: TabelConfig) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }

  config: TabelConfig = DEFAULT_CONFIG
  chooseData: any[]
  deepcolunmData: any[] = []
  checkList: any[] = []
  // methods

  select(section) {
    const formatSection = this.commonSelectMethods(section)
    this.$emit('select', { section, formatSection })
  }
  @Emit('viewDetail')
  viewDetail(row) {
    return row
  }
  @Emit('rowClick')
  rowClick(row) {
    return row
  }
  editItem({ row, $index }) {
    this.$emit('editItem', { row, $index })
  }
  deleteItem({ row, $index }) {
    this.$emit('deleteItem', { row, $index })
  }
  saveItem({ row, $index }) {
    this.$emit('saveItem', { row, $index })
  }
  cancelItem({ row, $index }) {
    this.$emit('cancelItem', { row, $index })
  }
  // 表格的筛选数据
  filterHandler(value, row, column) {
    const property = column['columnKey']
    // return row[property] === value
    return row[property].includes(value)
  }
  filterChange(filters) {
    this.$emit('filterChange', filters)
    // const filterTable = this.tableData.filter((item) => filters.filesValue.findIndex((k) => item.filesValue.includes(k)) > -1)
    // console.log('filterTable: ', filterTable)
  }

  commonSelectMethods(table) {
    const fields = this.config.fieldsArr
    if (!fields) return []
    return fields.reduce((k: any[], m: string) => {
      for (const item of table) {
        k.push({ [m]: item[m] })
      }
      return k
    }, [])
  }
  // 高亮当前行
  setHighLightRow(row) {
    ;(this.$refs.table as any).setCurrentRow(row)
  }
  // 设置某项已勾选
  setToggleRowSelection(row) {
    ;(this.$refs.table as any).toggleRowSelection(row, true)
  }

  selectable() {
    return !this.disabled
  }
  cellMove() {
    this.$emit('cellMove')
  }
  sort(prop) {
    (this.$refs.table as any).sort(prop, 'ascending')
  }
  sortChange(sort) {}
  doLayout() {
    (this.$refs.table as any).doLayout()
  }
  // 滚动到具体行
  tableScroll(height: number) {
    const dom: any = this.$refs.table
    this.$nextTick(() => {
      dom.bodyWrapper.scrollTop = height
    })
  }
  // 滚动到最底部
  tableScrollBottom() {
    const dom: any = this.$refs.table
    this.$nextTick(() => {
      dom.bodyWrapper.scrollTop = dom.bodyWrapper.scrollHeight
    })
  }

  getRowClass({ row, rowIndex }) {
    // row.index = rowIndex;
    if (row.class) {
      return row.class
    }
  }
  getSummaries(param) {
    const { columns, data } = param
    // const res = await this._post({ url: '/bill/salePlanBill/page', data: {
    //   'data': {
    //   },
    //   'page': 1,
    //   'pageSize': 10
    // }})
    // console.log(res)
    // return 12
    // console.log('columns', columns, 'data', data)
    const sums: string[] = []
    columns.forEach((column, index) => {
      if (index === 0) {
        sums[index] = '合计'
        return
      }
      if (!column.property) return
      // 不需要合计的行直接跳过
      if (!this.colunmData.find((item) => item.value === column.property)!.isShowTotal) {
        return
      }
      const values = data.map(item => Number(item[column.property]))

      // console.log('values', values, 'column.property', column.property)
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return Number((prev + curr).toFixed(2))
          } else {
            return prev
          }
        }, 0)
      }
    })
    return sums
  }
}
</script>

<style lang="scss">
@import 'src/styles/variables.scss';
.base-table {
  /deep/.is-left.pdl-10{
    padding-left: 10px !important;
  }
  /deep/.no-filters .el-table__column-filter-trigger {
    display: none;
  }
  .caret-wrapper {
    height: $thHeight;
    .sort-caret {
      border-width: 4px;
    }
    .sort-caret.ascending {
      top: 5px;
    }
    .sort-caret.descending {
      bottom: 5px;
    }
  }
  th {
    padding: 0 !important;
    height: $thHeight;
  }
  .row {
    padding: 0 !important;
    height: $thHeight;
  }
  /deep/.el-table-column--selection {
    /deep/ .cell {
      padding: 0 !important;
    }
  }
  /deep/.el-table__footer-wrapper {
     /deep/ .cell {
      padding:0 10px !important;
    }
  }
}
.btn-group {
  display: inline-block;
}
</style>
<style lang="scss" scoped>
.filter-btn{
  text-align: right;
    height: 32px;
    line-height: 32px;
    margin: 6px -12px -12px -12px;
    box-shadow: 0px 0px 6px 0px rgba(238,238,238,1);
    padding: 0 12px;
}
</style>
