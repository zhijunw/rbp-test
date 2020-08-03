<template>
  <div class="contacts-group">
    <base-title :title="$t('平台编号设置')" />
    <el-row>
      <el-col :span="12">
        <base-table
          :colunmData="tableHeader"
          :tableData="contactsList"
          :disabled="disabled"
          class="supplie-table"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            highlightCurrentRow: false
          }"
          @saveItem="saveItem"
          @cancelItem="cancelItem"
          @deleteItem="deleteItem"
          @editItem="editItem">
          <template v-slot:tableCell="{ scope: { row, item } }">
            <!--模板-->
            <template v-if="['input', 'number'].includes(item.type) && row.edit">
              <el-input
                v-model="row[item.value]"
                :type="item.type"
                size="small"
                :placeholder="$t('form.placeholder.input', { msg: '' })"
                class="select-input no-border-input"
                clearable />
            </template>
            <template v-else>
              <span class="pdl-10">{{ row[item.value] }}</span>
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
            @click="addContacts">
            +{{ $t('添加') }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { deepCopy } from '@/utils'
import { tabsConfig } from '../configs'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

@Component({
  name: 'contacts',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class detail extends mixins(vuexMixins) {
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) contactsList: any[]
  // 表头
  tableHeader = tabsConfig.platformNumberSetting.tableHeader

  deepTableData: any[] = []

  @Watch('v_status', { immediate: true })
  onstatusChange(val, oldval) {
    if (['add', 'edit', 'cancel'].includes(val)) {
      this.deepTableData = deepCopy(this.contactsList)
    }
  }

  editItem({ row, $index }) {
    this.$set(row, 'edit', true)
  }

  deleteItem({ row, $index }) {
    this.contactsList.splice($index, 1)
    this.deepTableData.splice($index, 1)
  }

  saveItem({ row, $index }) {
    this.$set(row, 'edit', false)
    this.$set(this.deepTableData, $index, Object.assign({}, row))
  }

  cancelItem({ row, $index }) {
    if (!row.id) {
      this.contactsList.splice($index, 1)
      this.deepTableData.splice($index, 1)
    } else {
      this.$set(this.contactsList, $index, Object.assign({}, this.deepTableData[$index]))
      this.$set(row, 'edit', false)
    }
  }

  addContacts() {
    this.contactsList.push({
      edit: true,
      companyCode: '',
      companyName: ''
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.supplie-table {
  /deep/ .cell {
    padding: 0 !important;
  }
}

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
