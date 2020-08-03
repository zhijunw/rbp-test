<template>
  <div class="feature-group">
    <base-title
      :title="$t('moduleConfig.detail.anchorConfig.featuresConfig')" />
    <el-row>
      <el-col :span="18">
        <base-table
          :colunmData="featureTableHeader"
          :tableData="featureData"
          :disabled="disabled"
          class="feature-table"
          :tableConfig="{
            isMultiSelect: false,
            isShowOpera: false,
            highlightCurrentRow: false
          }">
          <template v-slot:tableCell="{ scope: { row, item } }">
            <template v-if="item.type === 'checkbox'">
              <el-checkbox
                v-model="row[item.value]"
                :disabled="disabled"
                class="pdl-10" />
            </template>
            <template v-else-if="item.type === 'input' && [1,2].includes(row.dataType)">
              <base-input
                :value.sync="row[item.value]"
                :disabled="disabled"
                class="no-border-input" />
            </template>
            <template v-else-if="item.type === 'input' && [5,6].includes(row.dataType)">
              <base-select
                class="no-border-input"
                :value.sync="row[item.value]"
                :disabled="disabled"
                :item="{options: row.itemList}"
                :selectProps="row.dataType === 6 ? {
                  multiple: true
                }: {}" />
            </template>
            <template v-else-if="item.type === 'input' && row.type === 3">
              <base-date-picker
                :value.sync="row[item.value]"
                :disabled="disabled"
                class="no-border-input" />
            </template>

            <template v-else>
              <span class="pdl-10">{{ row[item.value] }}</span>
            </template>
          </template>
        </base-table>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { detailConfig } from '../configs'
import { deepCopy } from '@/utils'

@Component({
  name: 'contacts',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseCheckbox: () => import('@/components/base-checkbox/index.vue'),
    baseDatePicker: () => import('@/components/base-datePicker/index.vue')

  }
})
export default class detail extends Vue {
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) featureData: any[]

  featureTableHeader = detailConfig.featuresConfig

  // contactsList: any[] = []
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.feature-table {
   /deep/.cell{
    padding: 0 !important
  }
}

</style>
