<template>
  <div class="list-prop f14">
    <div class="list-prop__title flex-space">
      <div class="list_title_icon">
        <svg-icon
          name="field_nature"
          className="w20 h20 mgr-6" />
        {{ $t('fieldConfiguration.list.fieldsProp') }}
      </div>
      <div class="list_title_btn">
        <template v-if="['add', 'edit'].includes(v_status)">
          <el-button
            id="btn_g_gray"
            @click="cancel">
            {{ $t('layout.btns.cancel') }}
          </el-button>
          <el-button
            id="btn_g_d_blue"
            @click="save">
            {{ $t('layout.btns.save') }}
          </el-button>
        </template>
        <template v-else-if="!!v_id">
          <el-button
            id="btn_g_d_blue"
            @click="edit">
            {{ $t('layout.btns.edit') }}
          </el-button>
        </template>
      </div>
    </div>
    <div class="list-prop__box">
      <formlist
        ref="formlist"
        :formList="formList"
        :formData="detailData.column"
        :status="v_status"
        :disabled="v_disabled"
        class="border-b-base-1 mgb-20" />
      <formlist
        :formList="filterFormList"
        :formData="detailData.column"
        :disabled="v_disabled"
        @defaultValue="defaultValueChange"
        @length="lengthChange" />
      <div
        v-show="showSelectTable"
        class="list-prop__table mgb-20">
        <p class="f12 mgb-6">
          {{ $t('commonWord.option') }}
        </p>
        <base-table
          :colunmData="fieldsPropTableHeader"
          :tableData="detailData.valueList"
          :disabled="v_disabled"
          class="base-table"
          :class="{ 'select-table': !detailData.valueList.length }"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            maxHeight: '400px',
            height: selectHeight,
            operatWidth: 50
          }">
          <template v-slot:tableCell="{ scope: { row, item, index, $index } }">
            <template v-if="item.value === 'defaultFlag'">
              <el-radio
                v-model="SelectRadio"
                :label="row['index']"
                :disabled="v_disabled"
                class="select-radio pdl-10" />
            </template>
            <template v-else-if="item.value === 'userFlag'">
              <el-checkbox
                v-model="row[item.value]"
                class="pdl-10"
                :disabled="v_disabled" />
            </template>
            <template v-else>
              <el-input
                :ref="'selectInput' + $index"
                v-model="row[item.value]"
                size="small"
                :disabled="v_disabled"
                class="select-input no-border-input"
                clearable />
            </template>
          </template>
          <template v-slot="{ scope }">
            <el-button
              id="btn_t_gray"
              type="text"
              size="mini"
              :disabled="v_disabled"
              @click="delFn(scope)">
              {{ $t('layout.btns.delete') }}
            </el-button>
          </template>
        </base-table>
        <div class="add-box f12">
          <span class="add-box-text">{{ detailData.valueList.length + 1 }}</span>
          <el-button
            id="btn_t_d_blue"
            class="mgl-10"
            type="text"
            size="mini"
            :disabled="v_disabled"
            @click="addSelectOptions">
            +{{ $t('layout.btns.addFields') }}
          </el-button>
        </div>
      </div>
      <div class="list-prop__table mgb-20">
        <p class="f12 mgb-6">
          <!-- 多语言 -->
          {{ $t('commonWord.lang') }}
        </p>
        <base-table
          :colunmData="langTableHeader"
          :tableData="detailData.languageList"
          :disabled="v_disabled"
          class="base-table"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: true,
            isShowOpera: false,
            height: langHeight,
            rowId: 'languageCode'
          }">
          <template v-slot:tableCell="{ scope: { row, item } }">
            <template v-if="item.value === 'name'">
              <el-input
                v-model="row[item.value]"
                size="small"
                class="lang-input no-border-input"
                :disabled="v_disabled"
                :placeholder="$t('form.placeholder.input', { msg: '' })"
                clearable />
            </template>
            <template v-else>
              <span class="pdl-10">{{ row[item.value] }}</span>
            </template>
          </template>
        </base-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary } from '@/typings'
import { listConfig, FilterFormlistConfig, initData } from '../configs'
import apiUrl from '@/api/config-center/fields-config'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

import detailMixins from '@/mixins/detail-mixins'

interface SelectTable {
  value: string
  defaultFlag: string
  userFlag: boolean
  code: string
  id?: string
  index?: number
  dataFlag: string
}
@Component({
  name: 'field-prop',
  components: {
    formlist: () => import('@/components/formlist/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class App extends mixins(detailMixins, vuexMixins) {
  @Watch('detailData.column.type')
  onFieldTypeChange(val) {
    console.log('type', val)
    if (val) {
      // 切换的时候把默认值清空
      // this.detailData.column.defaultValue = ''
      this.$set(this.detailData.column, 'defaultValue', '')
      this.$set(this.detailData.column, 'length', '')

      const filterlist = listConfig.filterFormList
      this.filterFormList = filterlist.filter((item) => {
        return item.match.includes(val)
      })
      this.showSelectTable = val === 'select'
    }
  }

  // 观察 ID
  @Watch('v_id', { immediate: true })
  onv_idChange(val) {
    if (val) this.viewDetail(val.split('_')[0])
  }

  @Watch('v_status')
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }

  get selectHeight() {
    return (this.detailData.valueList.length + 1) * 29
  }
  get langHeight() {
    return (this.detailData.languageList.length + 1) * 28
  }

  formList = listConfig.fieldsPropFormlist
  filterFormList: FilterFormlistConfig[] = []
  fieldsPropTableHeader = listConfig.fieldsPropTableHeader
  langTableHeader = listConfig.langTableHeader
  detailData: Dictionary = initData()
  showSelectTable = false
  SelectRadio: number = 0
  deleteSecltTabel: any[] = []

  // 获取详情
  async viewDetail(val) {
    const res = await this._get({ url: `${apiUrl.getDetailData}/${val}` })
    if (res.code === 0) {
      this.detailData = res.data
      this.detailData.valueList = this.detailData.valueList || []
      this.detailData.valueList.forEach((item, index) => {
        item.index = index + 1
        if (item.defaultFlag) this.SelectRadio = item.index
      })
    }
  }
  defaultValueChange(obj) {
    if (obj.val && this.detailData.column.type === 'text' && this.detailData.column.length) {
      if (obj.val.length > Number(this.detailData.column.length)) {
        this._message({ message: '输入的默认值长度不能大于字数限制', type: 'warning' })
        this.$set(this.detailData.column, 'defaultValue', '')
      }
    }
  }
  lengthChange(obj) {
    if (obj.val && this.detailData.column.type === 'text' && this.detailData.column.defaultValue) {
      if (this.detailData.column.defaultValue.length > Number(obj.val)) {
        this._message({ message: '输入的默认值长度不能大于字数限制', type: 'warning' })
        this.$set(this.detailData.column, 'length', this.detailData.column.defaultValue.length)
      }
    }
  }
  //   添加下拉框的 选项
  addSelectOptions() {
    const item: SelectTable = {
      value: '',
      defaultFlag: '',
      userFlag: false,
      index: this.detailData.valueList.length + 1,
      code: '',
      dataFlag: 'create'
    }

    this.detailData.valueList.push(item)

    this.$nextTick(() => {
      setTimeout(() => {
        ;(this.$refs[`selectInput${this.detailData.valueList.length - 1}`] as any).focus()
      }, 20)
    })
  }
  edit() {
    this.$store.commit(`${this.m_moduleId}/SET_STATUS`, 'edit')
    this.$store.commit(`${this.m_moduleId}/SET_READ_STATUS`, false)
  }
  cancel() {
    /**
     * 1.设置当前页面状态 cancel
     * 2.设置页面只可读
     * 3.重置 详情信息
     * 4.如果有 ID 则重新获取接口 没有则回到原始状态
     */
    this.$store.commit(`${this.m_moduleId}/SET_STATUS`, 'cancel')

    this.$store.commit(`${this.m_moduleId}/SET_READ_STATUS`, true)

    if (this.v_id) {
      // 重新获取查看详情接口
      this.$store.commit(`${this.m_moduleId}/SET_ID`, `${this.v_id}_${new Date().getTime()}`)
    }
  }
  reset() {
    this.SelectRadio = 0
    this.showSelectTable = false
    this.detailData = initData()
  }
  async save() {
    await (this.$refs.formlist as any).saveTable()
    this.detailData.valueList = [...this.detailData.valueList, ...this.deleteSecltTabel]
    this.detailData.valueList.forEach((item, index) => {
      item.defaultFlag = item.index === this.SelectRadio
      item.dataFlag = item.dataFlag || 'update'
    })
    const data = Object.assign({}, this.detailData, { user: 'admin' })
    const action = this.v_status === 'add' ? '_post' : '_put'
    const url = this.v_status === 'add' ? apiUrl.addFields : apiUrl.updateFields
    const res = await this[action]({ url, data: { data }})
    if (res.code === 0) this.m_dealSaveAction(res)
  }
  delFn(scope) {
    scope.row.dataFlag = 'remove'
    this.detailData.valueList.splice(scope.$index, 1)
    this.deleteSecltTabel.push(scope.row)
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.base-table {
  /deep/.cell {
    padding: 0 !important;
  }
}
.list-prop {
  &__title {
    height: 48px;
  }
  &__box {
    border: 1px solid #eeeeee;
    border-radius: 2px;
    padding: 0px 12px;
    min-height: calc(100vh - 20vh);
    max-height: 80vh;
  }
  /deep/.lang-input .el-input__inner {
    border: none;
    background: none;
    height: 26px;
    line-height: 26px;
  }
  /deep/.select-input .el-input__inner {
    border-radius: 0;
  }
  /deep/.select-radio {
    position: relative;
    top: 4px;
    width: 24px;
    overflow: hidden;
  }
  .select-add {
    color: $basic;
    &:hover {
      cursor: pointer;
    }
  }
}
.add-box {
  color: $colorTextRegular;
  height: 28px;
  line-height: 28px;
  border: 1px solid #eee;
  border-top: none;
  &-text {
    width: 60px;
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
/deep/.select-table {
  /deep/.el-table__body-wrapper {
    height: 0;
  }
  /deep/.el-table__empty-block {
    height: 0;
  }
  /deep/.el-table__empty-text {
    display: none;
  }
}
</style>
