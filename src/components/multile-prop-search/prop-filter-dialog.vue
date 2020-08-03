<template>
  <base-dialog
    :dialogObj="$attrs.dialogObj"
    class="dataset-dialog"
    @confirm="confirm"
    @cancel="cancel">
    <div
      slot="content"
      class="dataset-dialog__content">
      <section class="dataset-dialog__tabs w220 mgr-20">
        <p class="f14">
          {{ $t('commonWord.attrFilter') }}
        </p>
        <div class="tabs-box mgt-8 border-base-1">
          <div
            v-for="(item, index) in propFilterTabs"
            :key="index"
            :class="{ active: activeObj.value === item.value }"
            class="tabs__item flex border-b-base-1 pdl-12 hover">
            <template v-if="isSingleSelect">
              <template>
                <el-radio
                  v-model="propSingleValue"
                  :label="item.value" />
              </template>
            </template>
            <template v-else>
              <el-checkbox
                v-model="checkedObj[item.value]"
                disabled />
            </template>

            <p
              class="mgl-4 flex-1"
              @click.prevent="switchGroup(item)">
              {{ item.label }}
            </p>
          </div>
        </div>
      </section>
      <section class="dataset-dialog__tabs flex-1">
        <p class="f14">
          {{ $t('commonWord.chooseArea') }}
        </p>
        <div class="mgt-8 border-base-1 choose-area">
          <p class="f14 mgb-8">
            {{ activeObj.label }}
          </p>
          <keep-alive>
            <template v-if="activeObj.type === 'checkboxTemplate'">
              <base-checkbox
                :checkGroupList="activeObj.options"
                :checkList.sync="dataGroup[activeObj.value]"
                class="tabs-box__checkbox" />
            </template>
            <template v-else-if="activeObj.type === 'cascaderTemplate'">
              <base-cascader
                :options="activeObj.options"
                :value.sync="dataGroup[activeObj.value]"
                class="tabs-box__cascader" />
            </template>
            <template v-else-if="activeObj.type === 'tableTemplate'">
              <div class="table-box">
                <div class="table-box-search">
                  <base-input
                    :inputProps="{ prefixIcon: 'el-icon-search' }"
                    class="mgb-10"
                    :value.sync="tableSearch"
                    @enter="tableSearchEnter" />

                  <base-table
                    :key="activeObj.value"
                    :colunmData="activeObj.tableHeader"
                    :tableData="tableData"
                    :tableConfig="activeObj.tableConfig"
                    class="base-table select-table"
                    @select="selectTable" />
                  <samll-pagination
                    :total="tablePageObj.total"
                    @changePage="changePage"
                    @changePageSize="changePageSize" />
                  <!-- <base-pagination
                    :page="tablePageObj"
                    @changePage="changePage"
                    @changePageSize="changePageSize"
                  /> -->
                </div>
                <div class="table-box-choose">
                  <p class="choose-text">
                    {{ $t('commonWord.hasChooseChannel') }}
                  </p>
                  <div
                    v-for="(item, index) in dataGroup[activeObj.value]"
                    :key="index"
                    class="choose-item">
                    <span class="f12">{{ item.name }}-{{ item.code }}</span>
                    <i
                      class="el-icon-close big-click-icon hover"
                      @click="deleteItem(index)" />
                  </div>
                </div>
              </div>
            </template>
            <template v-else-if="activeObj.type === 'treeTemplate'">
              <div class="tree-template">
                <base-tree
                  :optionDatas="activeObj.treeOptions"
                  :treeConfig="
                    Object.assign({}, activeObj.treeConfig, {
                      defaultCheckedKeys: dataGroup[activeObj.value]
                    })
                  "
                  @check="checkChange" />
              </div>
            </template>
          </keep-alive>
        </div>
      </section>
    </div>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { DialogObj, Dictionary, CommonConfig, PageObj } from '@/typings'
import { mergeArray } from '@/utils'

@Component({
  name: 'prop-filter',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseCheckbox: () => import('@/components/base-checkbox/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseCascader: () => import('@/components/base-cascader/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseFuzzy: () => import('@/components/base-fuzzy/index.vue'),
    baseTree: () => import('@/components/base-tree/index.vue'),
    basePagination: () => import('@/components/base-pagination/index.vue'),
    samllPagination: () => import('@/components/small-pagination/index.vue')
  }
})
export default class datasetGroup extends Vue {
  @Prop({ default: true }) propFilterTabs: any[]
  @Prop({ default: false }) isSingleSelect: Boolean
  @Prop({ required: true }) dataGroup: Dictionary<any>

  @Watch('propFilterTabs', { immediate: true })
  onTabsChange(val: any[], oldval: any[]) {
    if (val.length) {
      this.activeObj = val[0]
      this.propSingleValue = this.activeObj.value
    }
  }
  get checkedObj() {
    const checkedObj: Dictionary = {}
    for (const k in this.dataGroup) {
      checkedObj[k] = this.dataGroup[k].length >= 1
    }
    return checkedObj
  }

  activeObj: any = {}
  propSingleValue: any = ''
  filterText: string = ''
  tableSearch: any = ''
  tablePageObj: PageObj = {
    total: 0,
    pageNo: 1,
    pageSize: 10,
    pageCount: 1
  }
  tableData: any[] = []

  switchGroup(item) {
    this.activeObj = item
    this.tableData = []
  }

  // 级联数据只区最后一级传给后端
  checkChange({ data, nodes, filterNodes }) {
    this.$set(this.dataGroup, this.activeObj.value, filterNodes)
  }

  confirm() {
    // this.$emit('confirm', { selected: this.isSingleSelect ? this.propSingleValue : '' })
    this.$emit('confirm', this.isSingleSelect ? this.propSingleValue : '')
  }
  cancel() {}
  // 表格模板的 输入框搜索
  async tableSearchEnter() {
    const postData = {
      data: this.tableSearch,
      page: this.tablePageObj.pageNo,
      pageSize: this.tablePageObj.pageSize
    }
    const res = await this._post({ url: this.activeObj.fuzzyConfig.apiUrl, data: postData })
    if (res.code === 0) {
      const { total, pageSize, pageCount, data: tableData } = res

      Object.assign(this.tablePageObj, { total, pageSize, pageCount })

      this.tableData = tableData
    }
  }

  // 表格模板的 切换页数
  changePage(page: number) {
    this.tablePageObj.pageNo = page
    this.tableSearchEnter()
  }
  // 表格模板的 切换条数
  changePageSize(size: number) {
    this.tablePageObj.pageSize = size
    this.tableSearchEnter()
  }
  selectTable({ section }) {
    const choose = mergeArray(this.dataGroup[this.activeObj.value], section)
    this.$set(this.dataGroup, this.activeObj.value, choose)
  }
  // 删除表格模板当中的某项数据
  deleteItem(index) {
    this.dataGroup[this.activeObj.value].splice(index, 1)
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';

.dataset-dialog {
  /deep/.el-dialog__body {
    padding: 16px;
  }
  .active {
    color: $basic;
  }
  &__content {
    display: flex;
  }
  .choose-area {
    height: 400px;
    padding: 12px 12px 0 12px;
    /deep/.el-input--small {
      width: 276px;
    }
  }
  .tabs-box {
    height: 400px;
    &__export {
      height: 32px;
      line-height: 32px;
      border: 1px solid #d7d7d7;
      border-top: none;
      box-shadow: 0px -2px 6px 0px rgba(238, 238, 238, 1);
      padding-left: 16px;
    }
    &__checkbox {
      /deep/.el-checkbox {
        margin-bottom: 6px;
      }
      /deep/.el-checkbox-group {
        display: flex;
        flex-direction: column;
      }
    }
  }
  .tabs__item {
    height: 42px;
    line-height: 42px;
    /deep/.el-radio {
      line-height: 41px;
      margin-right: 0;
      padding: 0 4px;
    }
    /deep/.el-radio__label {
      display: none;
    }
  }
  .table-box {
    display: flex;
    &-choose {
      width: 200px;
      border: 1px solid $borderColorBase;
      margin: 38px 0 0 10px;
    }
    .choose-text {
      background: #f5f5f7;
      height: 28px;
      font-size: 12px;
      line-height: 28px;
      text-align: center;
      font-weight: bold;
    }
    .choose-item {
      height: 28px;
      line-height: 28px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px;
      border-bottom: 1px solid #d7d7d7;
    }
    .base-table {
      /deep/.cell {
        padding: 0 !important;
      }
    }
    .select-table {
      width: 320px !important;
    }
  }
  .tree-template {
    /deep/.tree-box {
      height: 320px;
      overflow: auto;
    }
  }
}
</style>
