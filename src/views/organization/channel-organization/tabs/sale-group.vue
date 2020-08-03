<template>
  <div class="finance-group">
    <slot name="title" />
    <el-row>
      <el-col :span="12">
        <base-table
          :colunmData="salePolicyHeader"
          :tableData="saleTableData"
          :disabled="disabled"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true
          }"
          @saveItem="saveItem"
          @cancelItem="cancelItem"
          @deleteItem="deleteItem"
          @editItem="editItem">
          <template v-slot:tableCell="{ scope: { row, item } }">
            <template v-if="item.type === 'select'">
              <base-select
                :value.sync="row[item.value]"
                :disabled="!row.edit"
                :item="item"
                class="no-border" />
            </template>
            <template v-else>
              <el-input
                v-model.number="row[item.value]"
                :type="item.type"
                size="small"
                :disabled="!row.edit"
                class="select-input"
                clearable />
            </template>
          </template>
        </base-table>
        <div class="add-box f12">
          <el-button
            id="btn_t_d_blue"
            class="mgl-10"
            type="text"
            size="mini"
            :disabled="disabled"
            @click="addSalePolicy">
            +{{ $t('channelOrganization.tabs.addSalePolicy') }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { tabsConfig } from '../configs'
import { deepCopy } from '@/utils'

@Component({
  name: 'sale-group',
  components: {
    formlist: () => import('@/components/formlist/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue')

  }
})
export default class detail extends Vue {
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) saleTableData: any[]

  salePolicyHeader = tabsConfig.salePolicy
  // 拷贝一份数据
  deepTableData: any[] = []
  // saleTableData: any[] = []
  @Watch('v_status', { deep: true })
  onv_statusChange(val, oldval) {
    if (['add', 'edit', 'cancel'].includes(val)) {
      this.deepTableData = deepCopy(this.saleTableData)
    }
  }
  editItem({ row, $index }) {
    this.$set(row, 'edit', true)
  }

  deleteItem({ row, $index }) {
    this.saleTableData.splice($index, 1)
    this.deepTableData.splice($index, 1)
  }
  saveItem({ row, $index }) {
    this.$set(row, 'edit', false)
    this.$set(this.deepTableData, $index, Object.assign({}, row))
  }
  cancelItem({ row, $index }) {
    if (!row.id) {
      this.saleTableData.splice($index, 1)
      this.deepTableData.splice($index, 1)
    } else {
      this.$set(this.saleTableData, $index, Object.assign({}, this.deepTableData[$index]))
      this.$set(row, 'edit', false)
    }
  }

  addSalePolicy() {
    this.saleTableData.push({
      edit: true,
      saleTypeId: '',
      discount: ''
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

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
    width: 200px;
    padding-left: 10px;
    color: $basic;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
