<template>
  <div class="small-pagination">
    <span class="f12">当前{{ total }}条/{{ totalPage }}页</span>
    <base-select
      :value.sync="pageSize"
      class="page-select"
      :selectProps="{
        clearable: false,
        collapseTags: false,
        filterable: false,
      }"
      :item="{
        options: pageOptions
      }"
      @selectChange="selectChange" />
    <div class="btn-group">
      <el-button
        size="mini"
        icon="el-icon-d-arrow-left"
        :disabled="currentPage === 1"
        @click="firstPageFn" />
      <el-button
        size="mini"
        icon="el-icon-arrow-left"
        :disabled="currentPage === 1"
        @click="prePageFn" />
      <el-input
        v-model.number="currentPage"
        class="pagination-input"
        @change="inputChange" />
      <el-button
        size="mini"
        icon="el-icon-arrow-right"
        :disabled="currentPage === Math.ceil(total / 10)"
        @click="nextPageFn" />
      <el-button
        size="mini"
        icon="el-icon-d-arrow-right"
        :disabled="currentPage === Math.ceil(total / 10)"
        @click="lastPageFn" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
@Component({
  name: 'small-pagination',
  components: {
    baseSelect: () => import('@/components/base-select/index.vue')
  }
})
export default class extends Vue {
  @Prop({ required: true }) total: number

  // @Watch('total', { immediate: true })
  // onTotalChange(val) {
  //   this.totalPage = Math.ceil(val / this.pageSize)
  // }
  get totalPage() {
    return Math.ceil(this.total / this.pageSize)
  }

  currentPage: number = 1
  // totalPage: number = 1
  pageOptions: any[] = [
    {
      label: '10条/页',
      value: 10
    },
    {
      label: '20条/页',
      value: 20
    }
  ]
  pageSize: number = 10

  // 重置页码
  resetCurrentPage() {
    this.currentPage = 1
    // this.total = 0
  }
  selectChange(val) {
    // console.log('page val', val)
    // this.pageSize =
    this.$emit('changePageSize', val)
  }
  // 通过输入框设置页码
  inputChange(val) {
    this.currentPage = val
    this.$emit('changePage', this.currentPage)
  }

  //  第一页
  firstPageFn() {
    this.currentPage = 1
    this.$emit('changePage', this.currentPage)
  }
  //   上一页
  prePageFn() {
    this.currentPage = +this.currentPage === 1 ? 1 : this.currentPage - 1
    this.$emit('changePage', this.currentPage)
  }
  // 下一页
  nextPageFn() {
    this.currentPage =
      +this.currentPage === Math.ceil(this.total / 10)
        ? Math.ceil(this.total / 10)
        : this.currentPage + 1
    this.$emit('changePage', this.currentPage)
  }
  // 最后一页
  lastPageFn() {
    this.currentPage = Math.ceil(this.total / 10)
    this.$emit('changePage', this.currentPage)
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.small-pagination {
  display: flex;
  height: 32px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #d7d7d7;
  border-top: none;
  padding: 0 10px;
  box-shadow: 0px 0px 6px 0px rgba(238, 238, 238, 1);
  color: $colorTextSecondary;
  .page-select {
    width: 80px !important;
    height: 22px;
    /deep/.el-input {
      height: 23px;
      line-height: 22px;
    }
    /deep/.el-input__inner {
      padding: 0 8px;
      height: 22px;
    }
    /deep/.el-icon-circle-check{
      display: none;
    }
  }
  .btn-group {
    display: flex;
    align-items: center;
  }
  /deep/.el-button--mini {
    padding: 4px;
    border: none;
  }
  /deep/ .el-button+.el-button{
    margin: 0;
  }
  .pagination-input {
    margin: 0 5px;
    height: 22px;
    line-height: 21px;
    /deep/.el-input__inner {
      width: 40px;
      height: 22px;
      line-height: 22px;
      padding: 0 10px;
      text-align: left;
      font-size: 12px;
    }
  }
}
</style>
