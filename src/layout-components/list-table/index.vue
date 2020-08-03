<template>
  <div class="list-table pdb-4">
    <el-table
      ref="table"
      :data="tableData"
      border
      highlightCurrentRow
       v-loading="tableLoading"
      :height="config.height"
      :max-height="config.maxHeight"
      :show-summary="config.showSummary"
      :summary-method="getSummaries"
      size="mini"
      style="width:100%"
      :row-class-name="tableRowClassName"
      class="base-list-table"
      header-row-class-name="base-table-header__row"
      cell-class-name="row"
      :cell-style="cellStyle"
      @select-all="select"
      @select="select"
      @row-dblclick="viewDetail">
      <!-- 选择项 -->
      <el-table-column
        v-if="config.isMultiSelect"
        :selectable="selectable"
        fixed="left"
        type="selection"
        width="35"
        align="center" />
      <!-- 序号 -->
      <el-table-column
        v-if="config.isIndex"
        type="index"
        width="50"
        label="序号"
        align="left" />
      <el-table-column
        v-for="(item, index) in colunmData"
        :key="index"
        show-overflow-tooltip
        :label="$t(item.lang) || item.label"
        :prop="item.value"
        :width="item.width"
        :min-width="100"
        :class-name="item.isEdit ? 'edit-row' : ''"
        align="left">
        <!-- 头部 -->
        <template
          slot="header"
          slot-scope="{ column }">
          <template v-if="item.searchable">
            <span v-show="!column.searchable">{{ $t(item.lang) || item.label }}</span>
            <!-- 表头搜索 -->
            <el-input
              v-show="column.searchable"
              :ref="item.value"
              v-model="column[item.property + '_search']"
              class="table_search-input"
              size="mini"
              :placeholder="$t('form.placeholder.input', { msg: '' })"
              clearable />
            <svg-icon
              name="table_search"
              className="w14 h14 hover table_search"
              @click.stop="tableSearch(column)" />
          </template>
          <template v-else>
            <!-- {{ $t(item.lang) }} -->
            {{ item.label }}
          </template>
        </template>
        <!-- 内容 -->
        <template slot-scope="{ row }">
          <div
            v-if="item.isImage"
            class="image-warrper"
            @mouseenter.prevent="enterImage(row.goodsImg, $event)"
            @mouseleave="leaveImage">
            <el-image
              class="image"
              lazy
              :src="row[item.value]"
              fit="contain" />
          </div>
          <div
            v-if="item.isLink"
            class="link-text hover"
            @click="linkWhere(row)">
            <span> {{ row[item.value] }}</span>
          </div>
          <!-- 如果有审核工作流 -->
          <div v-else-if="item.value === 'flowTypeName'&& row.flowTypeName">
            <span :class="row.activityClass">{{ row.flowTypeName }}: {{ row.flowStatusName }}</span>
          </div>
          <div v-else-if="item.isExpand">
            <span
              class="expand-btn"
              @click.stop="toogleExpand(row, $event)">+</span>
          </div>
          <div v-else-if="item.type === 'other'">
            <slot
              name="other"
              :scope="row" />
          </div>
          <div
            v-else
            :class="[['statusName'].includes(item.value) ? row.statusClass : '']">
            {{ row[item.value] }}
          </div>
        </template>
      </el-table-column>
      <!-- 展开表格 -->
      <!-- <el-table-column
        v-if="config.isShowExpand"
        type="expand"
        width="-1">
        <template slot-scope="{ row }">
          <div
            class="expand-box"
            :style="{ 'margin-left': `${expandLeft}px` }">
            <el-table
              :data="row.size.datas"
              :row-style="{ background: '#F5F9FF' }"
              :header-row-style="{ color: '#7C7E85' }"
              border
              size="mini"
              show-overflow-tooltip>
              <el-table-column
                v-for="item in row.size.header"
                :key="item.value"
                align="center"
                :prop="item.value"
                :label="item.label"
                :class-name="item.value === 'color' ? 'column-first' : ''"
                width="100" />
            </el-table>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column
        v-if="config.isShowOpera"
        fixed="right"
        :label="$t('layout.btns.operation')"
        align="center"
        :width="config.operatWidth"
        :min-width="config.operatWidth">
        <template slot-scope="{ row }">
          <div class="btn-group">
            <slot :scope="row">
              <el-button
                id="btn_t_blue"
                type="text"
                size="mini"
                @click="viewDetail(row)">
                {{ $t('layout.btns.checkDetail') }}
              </el-button>
              <el-button
                id="btn_t_gray"
                type="text"
                size="mini"
                @click="deleteItem(row)">
                {{ $t('layout.btns.delete') }}
              </el-button>
            </slot>
          </div>
        </template>
      </el-table-column>
      <div
        v-show="tableData.length > 0"
        slot="append"
        class="append">
        {{ $t('commonWord.noMoreData') }}
      </div>
    </el-table>
    <!-- 分页 -->
    <base-pagination
      :page="page"
      v-on="$listeners" />

    <transition
      name="fade"
      mode="out-in">
      <div
        v-if="showImgSrc"
        class="show-img"
        :style="{ top: `${showImgTop}px`, left: `${showImgLeft}px` }">
        <img :src="showImgSrc">
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { TableHeaderConfig, PageObj, TabelConfig } from '@/typings'
const DEFAULT_CONFIG: TabelConfig = {
  isShowExpand: false,
  isMultiSelect: true,
  isShowOpera: true,
  isIndex: true,
  isShowPagination: true,
  fieldsArr: ['id'],
  height: '76vh',
  operatWidth: 150,
  showSummary: true
  // maxHeight: '76vh'
}

@Component({
  name: 'list-table',
  components: {
    basePagination: () => import('@/components/base-pagination/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) tableData: any[]

  @Prop() tableConfig: TabelConfig

  @Prop({ required: true }) colunmData: TableHeaderConfig[]

  @Prop() page: PageObj

  @Prop({ default: false }) tableLoading:boolean

  @Prop({ default: () => [] }) errorIds: string[]

  @Prop() totalData: any

  @Watch('tableConfig', { immediate: true, deep: true })
  onValueChanged(val: TabelConfig, oldVal: TabelConfig) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }

  config: TabelConfig = DEFAULT_CONFIG
  chooseData: any[]
  showImgSrc: string = ''
  showImgTop: number = 0
  showImgLeft: number = 0
  expandLeft: number = 0

  // methods
  select(section) {
    const formatSection = this.commonSelectMethods(section)
    this.$emit('select', { section, formatSection })
  }

  edit(row, index) {
    this.$set(this.tableData[index], 'edit', !row.edit)
  }
  save(row) {
    const isEditFields = this.colunmData.filter((item) => item.isEdit).map((k) => k.value)
    if (isEditFields.length) {
      isEditFields.forEach((field) => {
        row[`original-${field}`] = row[field]
      })
    }
    row.edit = false
  }
  tableRowClassName({ row }) {
    if (this.errorIds.includes(row.id)) {
      return 'warning-row'
    }
    return ''
  }
  toogleExpand(row, e) {
    if (!this.expandLeft) {
      const { clientX, layerX } = e
      this.expandLeft = clientX - (layerX + 207)
    }
    const $table: any = this.$refs.table
    this.tableData.forEach((item) => {
      if (item.id === row.id) {
        $table.toggleRowExpansion(item)
      }
    })
    this.$nextTick(() => {
      const target = e.target
      if (target.innerHTML === '+') {
        target.innerHTML = '-'
        target.classList.add('expand-open')
      } else {
        target.innerHTML = '+'
        target.classList.remove('expand-open')
      }
    })
  }
  cellStyle(data) {
    let cellStyle
    switch (data.row.zt) {
      case '已审核':
        cellStyle = 'color:#23C811'
        break
      case '未审核':
        cellStyle = 'color:#FA4150'
        break
      case '反审核':
        cellStyle = 'color:#FF7F14'
        break
      case '已作废':
        cellStyle = 'color:#7C7E85'
        break
      default:
        cellStyle = ''
    }
    if (data.column.label === '状态' || data.column.label === 'status') {
      return cellStyle
    }
  }
  cancel(row) {
    // 找到所有可编辑的字段
    const isEditFields = this.colunmData.filter((item) => item.isEdit).map((k) => k.value)
    if (isEditFields.length) {
      isEditFields.forEach((field) => {
        row[field] = row[`original-${field}`]
      })
    }
    row.edit = false
  }
  enterImage(src, e) {
    const { clientX, clientY, offsetX, offsetY, target } = e
    const { offsetWidth, offsetHeight, childNodes } = target
    const { clientWidth } = childNodes[0]
    const left = clientX - offsetX + ((offsetWidth - clientWidth) / 2 + clientWidth + 10)
    const top = clientY - offsetY + (offsetHeight / 2 - 82)
    this.showImgLeft = left
    this.showImgTop = top
    this.showImgSrc = src
  }
  leaveImage() {
    this.showImgSrc = ''
  }
  tableSearch(column) {
    this.$set(column, 'searchable', !column.searchable)
  }

  @Emit('viewDetail')
  viewDetail(row) {
    return row
  }

  @Emit('deleteItem')
  deleteItem(row) {
    return row
  }
  linkWhere(row) {
    this.$emit('linkWhere', row)
  }
  // 是否重复选择 根据物料号进行判别
  selectable(row) {
    if (!this.config.rowId) {
      return true
    }
    return !this.tableData.some(
      (el) => el[this.config.rowId as string] === row[this.config.rowId as string]
    )
  }
  commonSelectMethods(table) {
    const fields = this.config.fieldsArr
    if (!fields) return []
    return fields.reduce((k: any[], m: string) => {
      for (const item of table) {
        k.push(item[m])
      }
      return k
    }, [])
  }
  doLayout() {
    ;(this.$refs.table as any).doLayout()
  }
  // 高亮当前行
  setHighLightRow(row) {
    ;(this.$refs.table as any).setCurrentRow(row)
  }

  getSummaries(param) {
    const { columns, data } = param

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
      if (this.totalData.hasOwnProperty(column.property)) sums[index] = this.totalData[column.property]
    })
    this.$nextTick(() => { // 对表格重新布局, 解决合计初次初始化不显示问题
      (this.$refs.table as any).doLayout()
    })
    return sums
  }
  // todo
  // 1. 需要做  根据传入参数 获取到 tableData 的值以及 pageObj 的值
  // 2. 根据传入的 tableConfig 中的 fields 数组字段 获取到 需要的数据数组
}
</script>
<style lang="scss">
@import 'src/styles/variables.scss';
.base-table-header__row th {
  background: $baseTableBg;
}
.list-table {
  th,
  td {
    padding: 0 !important;
    height: $thHeight !important;
    line-height: $thHeight;
  }
  .image-warrper {
    display: flex;
    align-items: center;
    justify-content: center;
    .image {
      width: 48px;
      height: 48px;
    }
  }
  .table_search {
    // margin-top: 3px;
    float: right;
    margin-top: -5px;
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .table_search-input {
    max-width: 120px;
    line-height: 0;
    vertical-align: middle;
    .el-input__inner {
      height: 24px;
      line-height: 24px;
      border: none;
      background: none;
    }
  }
  // .warning-row {
  //   background: $danger;
  // }
  .append {
    text-align: center;
    color: $colorTextPlaceholder;
    line-height: 23px;
  }
  .el-table-column--selection {
    .cell {
      padding: 0 !important;
    }
  }
  .edit-input {
    background: #f5f9ff;
    .el-input__inner {
      border: 1px solid $basic;
      background: #f5f9ff;
    }
  }
  .el-table__row {
    .edit-row {
      background: #f5f9ff;
    }
  }
  .expand-btn {
    display: inline-block;
    text-align: center;
    font-size: 14px;
    line-height: 13px;
    width: 15px;
    height: 15px;
    color: rgba(0, 0, 0, 0.65);
    border: solid 1px #e8e8e8;
    cursor: pointer;
    transition: all 0.1s;
    border-radius: 2px;
    &:hover {
      color: $basic;
      border-color: $basic;
    }
  }
  .expand-open {
    color: $basic;
    border-color: $basic;
  }
  .expand-box {
    .el-table tbody tr:hover > td {
      background: #fff !important;
    }
  }
  .column-first {
    background: #f5f5f7;
  }
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';

/*默认*/
@media (min-width: 1280px){
  .list-table{
  height: 67vh;
  display: flex;
  flex-direction: column;
  /deep/.base-list-table{
    flex: 1;
    height: 64vh !important;
    }
  }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1440px) {
  .list-table{
  // min-height: calc(100vh - 250px);
  height: 75vh;
  // min-height: 77vh;
  // overflow: auto;
  display: flex;
  flex-direction: column;
  /deep/.base-list-table{
    flex: 1;
    height: 70vh !important;
    }
  }
 }
 @media (min-width: 1600px) {
  .list-table{
  // min-height: calc(100vh - 250px);
  height: 80vh;
  // min-height: 77vh;
  // overflow: auto;
  display: flex;
  flex-direction: column;
  /deep/.base-list-table{
    flex: 1;
    height: 75vh !important;
    }
  }
 }

.btn-group {
  // display: inline-block;
  display: flex;
  justify-content: center;
}
.cancel-btn {
  margin-left: 6px !important;
}
.link-text{
  text-decoration: underline;
  color: $basic;
}
.show-img {
  position: fixed;
  width: 164px;
  height: 164px;
  img {
    width: inherit;
    height: inherit;
  }
}
</style>
