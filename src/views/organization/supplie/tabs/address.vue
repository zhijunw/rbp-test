<template>
  <div class="address-group">
    <base-title
      :title="$t('supplie.detail.anchorConfig.shipAddress')" />
    <el-row>
      <el-col :span="18">
        <base-table
          :colunmData="addressTableHeader"
          :tableData="addressList"
          :disabled="disabled"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            highlightCurrentRow: false
          }"
          class="address-table"
          @saveItem="saveItem"
          @cancelItem="cancelItem"
          @deleteItem="deleteItem"
          @editItem="editItem">
          <template v-slot:tableCell="{ scope: { row, item } }">
            <template v-if="['input','number'].includes(item.type) && row.edit">
              <el-input
                v-model="row[item.value]"
                size="small"
                :type="item.type"
                class="select-input no-border-input"
                :placeholder="$t('form.placeholder.input',{ msg: '' })"
                clearable />
            </template>
            <template v-else-if="item.type === 'radio'">
              <el-radio
                v-model="selectRadio"
                :label="row['defaultFlag']"
                :disabled="!row.edit"
                class="select-radio pdl-10"
                @change="radioChange($event,row)" />
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
            @click="addAdress">
            +{{ $t('supplie.detail.addAdress') }}
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { detailConfig } from '../configs'
import { deepCopy } from '@/utils'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import ValidataStrage from '@/utils/vaildateStrage'
@Component({
  name: 'ship-address',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')

  }
})
export default class App extends mixins(vuexMixins) {
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) addressList: any[]

  addressTableHeader = detailConfig.shipAddress
  // addressList: any[] = []
  selectRadio: boolean = true

  // 拷贝一份数据
  deepTableData: any[] = []
  @Watch('v_status', { immediate: true })
  onv_statusChange(val, oldval) {
    if (['add', 'edit', 'cancel'].includes(val)) {
      this.deepTableData = deepCopy(this.addressList)
    }
  }

  editItem({ row, $index }) {
    this.$set(row, 'edit', true)
  }

  deleteItem({ row, $index }) {
    this.addressList.splice($index, 1)
    this.deepTableData.splice($index, 1)
  }
  saveItem({ row, $index }) {
    const validate = new ValidataStrage()
    const validateMsg = validate.changeState('isMobile', 'isCode', 'isPostcode')
      .goes({ isMobile: { value: row.mobile }, isCode: { value: row.code }, isPostcode: { value: row.postCode }})
    if (validateMsg) {
      // this._message({ message: '请输入编码', type: 'error' })
      this._message({ message: validateMsg, type: 'error' })

      return
    }
    this.$set(row, 'edit', false)
    this.$set(this.deepTableData, $index, Object.assign({}, row))
  }
  cancelItem({ row, $index }) {
    if (!row.id) {
      this.addressList.splice($index, 1)
      this.deepTableData.splice($index, 1)
    } else {
      this.$set(this.addressList, $index, Object.assign({}, this.deepTableData[$index]))
      this.$set(row, 'edit', false)
    }
  }
  // 单选框
  radioChange(val, row) {
    this.addressList.forEach((item) => {
      item.defaultFlag = false
    })
    row.defaultFlag = true
    this.selectRadio = true
  }

  addAdress() {
    this.addressList.push({
      edit: true,
      defaultFlag: 0,
      code: '',
      // index: this.addressList.length + 1,
      address: '',
      contactsPerson: '',
      postCode: '',
      mobile: ''

    })
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.address-table {
  /deep/.cell{
    padding: 0 !important
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
/deep/.select-radio .el-radio__label {
    display: none;
}
</style>
