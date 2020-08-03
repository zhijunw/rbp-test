<template>
  <el-pagination
    class="base-pagination"
    :page-sizes="pageSizes"
    :layout="layout"
    :page-size="page.pageSize"
    :current-page="page.pageNo"
    :total="page.total"
    @size-change="changePageSize"
    @current-change="changePage">
    <div class="size">
      {{
        $t('layout.pagination.total', {
          total: page.total,
          pageNo: page.pageNo,
          pageCount: page.pageCount
        })
      }}
    </div>
  </el-pagination>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'
import { PageObj } from '@/typings'
@Component({
  name: 'base-pagination'
})
export default class App extends Vue {
  @Prop({ default: () => [25, 50, 100, 200] }) pageSizes: number[]
  @Prop({ default: 'slot, prev, pager, next, sizes,jumper' }) layout: string
  @Prop({ required: true }) page: PageObj
  //   @Prop({ default: false }) autoScroll: boolean
  @Emit('changePage')
  changePage(pageNo) {
    // if (this.autoScroll) {
    //   scrollTo(0, 800)
    // }
    return pageNo
  }

  @Emit('changePageSize')
  changePageSize(size) {
    // if (this.autoScroll) {
    //   scrollTo(0, 800)
    // }
    return size
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';

.base-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border: 1px solid #eee;
  border-top: none;
  position: sticky;
  bottom: 0;
  background: #fff;
  z-index: 1003;
  box-shadow: 0px -1px 3px 0px rgba(236, 238, 247, 1);
  /deep/.el-input--mini .el-input__inner {
    height: 24px;
    line-height: 24px;
  }
  .size {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: $colorTextSecondary;
    margin-right: 18px;
  }
  /deep/.el-pagination__jump {
    margin-left: 0;
  }
  /deep/.el-select .el-input {
    margin: 0 0 0 10px;
    width: 80px;
  }
  /deep/ .el-pagination__total {
    color: $colorTextSecondary;
  }
}
</style>
