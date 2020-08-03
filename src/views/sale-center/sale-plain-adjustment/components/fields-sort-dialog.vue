<template>
  <base-dialog
    :dialogObj="fieldsSortDialog"
    class="base-dialog"
    @confirm="confirmSort"
    v-on="$listeners">
    <template v-slot:content>
      <base-table
        ref="draggableTable"
        :tableData="deepFieldsList"
        :colunmData="fieldsColumn"
        class="sort-table"
        :tableConfig="{
          isMultiSelect: false,
          height: '300px',
        }">
        <template v-slot>
          <svg-icon
            name="rank_btn"
            className="w18 h14 hover-move" />
        </template>
      </base-table>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DialogObj } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import { TableHeaderConfig } from '@/typings'
import commonApi from '@/api/common-api'
import draggable from 'vuedraggable'
import Sortable from 'sortablejs'
import { deepCopy } from '@/utils'
@Component({
  name: 'fields-sort',
  components: {
    // draggable,
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) fieldsList: any[]
  fieldsSortDialog: DialogObj = {
    title: '',
    isShowDialog: false,
    appendToBody: true,
    width: '680px'
  }
  deepFieldsList: any[] = []
  newList: any[] = []
  fieldsColumn: TableHeaderConfig[] = [
    {
      label: '序号',
      value: 'index',
      width: '60px',
      lang: 'reportCommonWord.index'
    },
    {
      label: '字段',
      value: 'label',
      lang: 'reportCommonWord.fields'
    }
  ]
  sortable: Sortable | null = null
  @Watch('fieldsList', { immediate: true, deep: true })
  onFieldsListChange(val, oldval) {
    if (val.length) {
      this.deepFieldsList = deepCopy(val)
      this.newList = val.slice()
    }
  }

  // 字段的排序
  private setSort(el) {
    this.sortable = Sortable.create(el, {
      ghostClass: 'sortable-ghost', // Class name for the drop placeholder
      onEnd: evt => {
        if (typeof (evt.oldIndex) !== 'undefined' && typeof (evt.newIndex) !== 'undefined') {
          const current = this.deepFieldsList
          current.splice(evt.newIndex, 0, current.splice(evt.oldIndex, 1)[0])
          var newArray = this.deepFieldsList.slice(0)
          this.deepFieldsList = []
          this.$nextTick(async function() {
            this.deepFieldsList = newArray.map((item, index) => {
              return Object.assign(item, { index: index + 1 })
            })
          })
        }
      }
    })
  }

  async open() {
    this.fieldsSortDialog.isShowDialog = true
    this.fieldsSortDialog.title = this.$t('commonWord.fieldsSortConfig')
    this.$nextTick(() => {
      const ref: any = this.$refs.draggableTable
      const el = ref.$refs.table.$el.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.setSort(el)
    })
  }
  confirmSort() {
    this.$emit('confirmSort', this.deepFieldsList)
  }
}
</script>

<style scoped lang="scss">
.base-dialog {
  /deep/.el-dialog__body {
    padding: 16px;
  }
}
.base-pagetion {
  justify-content: center !important;
  /deep/.page-select {
    margin: 0 10px;
  }
}
.query-group {
  display: flex;
  align-items: center;
  &-form {
    flex: 1;
  }
  &-btn {
    // margin-left: 10px;
    margin: 5px 0 0 10px;
  }
}
.sort-list {
  border: 1px solid #eee;
  &-header,
  &-item {
    display: flex;
    color: #353d51;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    // padding: 0 10px;
    border-bottom: 1px solid #eee;

  }
  .content {
    text-align: left;
    padding: 0 10px;
    border-left: 1px solid #eee;
    border-right: 1px solid #eee;

  }
  .bg-g{
    background: #f5f5f7;
  }
}
</style>
