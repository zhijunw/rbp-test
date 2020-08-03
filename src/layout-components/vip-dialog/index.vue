<template>
  <base-dialog
    class="vip_wrap"
    :dialogObj="dialogObj">
    <div
      slot="content"
      class="vip_wrap_ct">
      <slot name="filter-tab">
        <div
          v-if="!dialogData.isSingleSelect"
          class="left_area_t flex-align">
          <div class="select-box">
            <p
              class="f12 flex-1 select hover"
              :class="[activeTab === 'select' ? 'active' : '']"
              @click="switchTab('select')">
              {{ $t('commonWord.positiveFilter') }}
            </p>
            <!-- <p
              class="f12 flex-1 unselect hover"
              :class="[activeTab === 'unSelect' ? 'active' : '']"
              @click="switchTabUnselect('unSelect')">
              <el-checkbox
                v-model="isCheckedReverse"
                @change.stop.prevent="changeRevers" />
              <span class="mgl-4">{{ $t('commonWord.reverseFilter') }}</span>
            </p> -->
            <p
              class="f12 flex-1 unselect hover pdl-4"
              :class="[activeTab === 'unSelect' ? 'active' : '']">
              <el-checkbox
                v-model="isCheckedReverse"
                @change="changeRevers" />
              <span
                class="pdl-4 flex-1"
                @click="switchTabUnselect('unSelect')">{{ $t('commonWord.reverseFilter') }}</span>
            </p>
          </div>
        </div>
      </slot>
      <div class="content-box">
        <div class="vip_wrap_ct_l">
          <div class="vip_wrap_ct_l_title">
            {{ $t('commonWord.attrFilter') }}
          </div>
          <div class="left_area">
            <slot name="filter">
              <div class="left_area_ct">
                <el-scrollbar
                  ref="filterScrollbar"
                  style="height:100%;">
                  <formlist
                    ref="vipDialogFormList"
                    :formList="dialogData.formList"
                    :formData="formData[activeTab]" />
                </el-scrollbar>
              </div>
            </slot>
            <slot name="filter-btn">
              <div class="area_b">
                <el-button
                  type="text"
                  class="black"
                  size="small"
                  @click="reset">
                  {{ $t('layout.btns.clearQuery') }}
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  @click="query">
                  {{ $t('layout.btns.query') }}
                </el-button>
              </div>
            </slot>
          </div>
        </div>
        <div class="vip_wrap_ct_m">
          <div class="vip_wrap_ct_m_title">
            {{ $t('commonWord.queryResult') }}
          </div>
          <div class="middle_area">
            <base-table
              ref="baseTable"
              :colunmData="dialogData.tableColumn"
              :tableData="tableData"
              :tableConfig="{
                isShowOpera: false,
                height: '100%',
                isMultiSelect: !dialogData.isSingleSelect
              }"
              @select="handleSelectionChange"
              @viewDetail="doubleClick"
              @rowClick="rowClick" />
            <small-pagination
              ref="resultPagination"
              :total="tableTotal"
              @changePage="changePage" />
          </div>
        </div>
        <div
          v-if="!dialogData.isSingleSelect"
          class="vip_wrap_ct_btnDom">
          <el-button
            size="mini"
            icon="el-icon-d-arrow-right"
            @click="allRightFn" />
          <el-button
            size="mini"
            icon="el-icon-arrow-right"
            @click="rightFn" />
          <el-button
            size="mini"
            icon="el-icon-d-arrow-left"
            @click="allLeftFn" />
          <el-button
            size="mini"
            icon="el-icon-arrow-left"
            @click="leftFn" />
        </div>
        <div
          v-if="!dialogData.isSingleSelect"
          class="vip_wrap_ct_r">
          <div class="vip_wrap_ct_r_title">
            <el-tooltip
              placement="top"
              effect="dark">
              <div
                slot="content"
                class="info-content">
                点击确定提交时，<br>
                若“已选项”中有值，则按照已选项过滤货品；<br>
                若“已选项”中无值，按照最左侧的属性筛选过滤货品。<br>
              </div>
              <el-button class="iconfont no-brdoer icon-btn rbp-signal_notice" />
            </el-tooltip>
            {{ $t('commonWord.selectedList') }}
          </div>
          <div class="right_area">
            <base-table
              :colunmData="dialogData.tableColumn"
              :tableData="chooseTableData"
              :tableConfig="{
                isShowOpera: false,
                height: '100%',
                width: '300px'
              }"
              @select="handleSelectionChange2" />

            <div class="area_b">
              <span>共{{ chooseTableData.length }}条</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      slot="footerBtn"
      class="vip_wrap_b">
      <el-button
        size="medium"
        @click="cancel">
        {{ $t('layout.btns.cancel') }}
      </el-button>
      <!-- <el-button>{{ $t('layout.btns.directFilter') }}</el-button> -->
      <el-button
        type="primary"
        size="medium"
        @click="submit">
        {{ $t('layout.btns.sure') }}
      </el-button>
    </div>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch, Emit } from 'vue-property-decorator'
import { highSearchDialogConfig } from './index'
import { mergeArray, formatHighSearchCascader, nest } from '@/utils'
import { configs } from './config'
import { Tools } from '@/utils/tools'
import { DialogObj } from '../../typings'

interface SelectDataConfig {
  tableTotal: number
  tableData: any[]
  chooseTableData: any[]
  selectArr: any[]
  chooseSelect: any[]
}
interface QueryData {
  select: SelectDataConfig
  unSelect: SelectDataConfig
}
@Component({
  name: 'vip-dialog',
  components: {
    formlist: () => import('@/components/formlist/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    smallPagination: () => import('@/components/small-pagination/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue')
  }
})
/**
 * @method visibleChange = 监听显示状态是否改变
 * @method change = 返回函数
 * @param dialogData = 弹框基本信息
 * */
export default class VipDialog extends Vue {
  @Prop({ required: true }) dialogData: highSearchDialogConfig
  @Prop({ required: true }) dialogObj: DialogObj
  @Prop() defaultFilter

  @Watch('dialogObj.isShowDialog')
  OnDialogShow(val: boolean, oldVal: boolean) {
    if (val) {
      this.getSelect()
      if (this.dialogData.isSingleSelect) {
        this.$nextTick(() => {
          console.log('已打开高级筛选器弹窗')
          setTimeout(async() => {
            await (this.$refs['vipDialogFormList'] as any).configDefaultFilter(this.defaultFilter)
            this.queryFn()
          }, 200)
        })
      }
    }
  }
  @Watch('activeTab')
  onActiveTabChange(val, oldVal) {
    if (val === 'unSelect') {
      this.isCheckedReverse = true
    }
  }
  //  @Watch('isCheckedReverse')
  // onCheckedReverseChange(val, oldVal) {
  //   console.log('isCheckedReverse', val)
  //   // if(val === 'unSelect') {
  //   //   this.isCheckedReverse = true
  //   // }
  //   if (!val) {
  //     this.activeTab = 'select'
  //   } else {
  //     this.activeTab = 'unSelect'
  //   }
  // }
  // radio = '正向筛选'
  isCheckedReverse: boolean = false
  activeTab: string = 'select'
  // dialogData: highSearchDialogConfig = {}
  // 存储 筛选条件的值
  formData = {
    select: {},
    unSelect: {}
  }
  // 正向筛选 反向筛选的 存储的数据
  queryData: QueryData = {
    select: {
      tableTotal: 0, // 左边列表的 总数
      tableData: [], // 左边列表的数据
      chooseTableData: [], // 右边已选列表数据
      selectArr: [], // 左边列表 勾选的 数据
      chooseSelect: [] // 右边列表已勾选的数据
    },
    unSelect: {
      tableTotal: 0,
      tableData: [],
      chooseTableData: [], // 右边已选列表数据
      selectArr: [], // 左边列表 勾选的 数据
      chooseSelect: []
    }
  }
  get tableData() {
    return this.queryData[this.activeTab].tableData
  }

  get tableTotal() {
    return this.queryData[this.activeTab].tableTotal
  }

  get chooseTableData() {
    return this.queryData[this.activeTab].chooseTableData
  }

  // 获取筛选条件下拉框的选项值
  async getSelect() {
    if (!this.dialogData.selectApi) return
    let url = this.dialogData.selectApi
    if (this.dialogData.needModuleId) {
      url = `${url}?moduleId=${this.$route.meta.moduleId}`
    }
    const res = await this._get({ url })
    const data = res.data
    // const channelProperties = tabsConfig.channelProperties.list
    // const highSearchDialogFromlist = highSearchDialog.formList
    // const financialInformation = tabsConfig.financialInformation.list
    // const salePolicy = tabsConfig.salePolicy

    const formlist = this.dialogData.formList

    const actions = new Map<any, any>([
      [
        ['areaTreeList', 'organizationTreeList'],
        (val, keys) => {
          const nestResult = nest(val, 0, 'parentId', false) || []
          Tools.setValueAndName(nestResult)
          Tools.setOptions(nestResult, keys, formlist)
        }
      ],
      [
        [
          'brandId',
          'businessFormatId',
          'gradeId',
          'bandId',
          'categoryId',
          'patternId',
          'saleClassId',
          'seasonId',
          'seriesId',
          'sexId',
          'statusIds',
          'styleId',
          'businessTypeIds',
          'priceTypeId',
          'yearId',
          'data',
          'role'
        ],
        (val, keys) => {
          Tools.setValueAndName(val)
          Tools.setOptions(val, keys, formlist)
        }
      ],
      ['default', () => {}]
    ])
    for (const k in data) {
      actions.forEach((value, keys) => {
        const action: any = keys.includes(k) ? value : actions.get('default')
        action.call(this, data[k] || [], k)
      })
    }
  }

  handleSelectionChange({ section }) {
    this.queryData[this.activeTab].selectArr = section
  }

  handleSelectionChange2({ section }) {
    this.queryData[this.activeTab].chooseSelect = section
  }
  // 切换筛选条件
  switchTab(tab) {
    this.activeTab = tab
  }
  switchTabUnselect(tab) {
    // console.log('switchTabUnselect tab', tab)
    this.activeTab = tab
    // this.isCheckedReverse = !this.isCheckedReverse
    // if (!this.isCheckedReverse) {
    //   this.activeTab = 'select'
    //   // this.isCheckedReverse = false
    // }
  }
  // 反向选择的复选框
  changeRevers(val) {
    // console.log('changeRevers val', val, 'this.activeTab', this.activeTab)
    if (!val && this.activeTab === 'unSelect') {
      this.activeTab = 'select'
    } else {
      this.activeTab = 'unSelect'
    }
  }
  // 单击选中数据 只能单选
  rowClick(row) {
    // this.queryData[k].selectArr
    if (this.dialogData.isSingleSelect) {
      this.queryData[this.activeTab].selectArr = []
      this.queryData[this.activeTab].selectArr.push(row)
    }
  }
  // 双击选中数据
  doubleClick(row) {
    ;(this.$refs.baseTable as any).setToggleRowSelection(row)
    // 如果是单选渠道的 则不执行下面
    if (this.dialogData.isSingleSelect) {
      this.$set(this.dialogObj as Object, 'isShowDialog', false)
      // this.$emit('singleChannelChoose', { label: row.name, code: row.code, value: row.id })
      this.$emit('singleChannelChoose', { row })
      return
    }
    this.queryData[this.activeTab].selectArr.push(row)
    // this.rowClick(row)
    this.rightFn()
  }
  // 切换页数
  changePage(currIndex) {
    this.queryFn(currIndex)
  }

  async queryFn(currentPage?: number) {
    const cascaderValue = formatHighSearchCascader(
      this.dialogData.formList,
      this.formData[this.activeTab]
    )
    const postData = Object.assign({}, this.formData[this.activeTab], cascaderValue)

    Object.keys(postData).forEach((item) => {
      if (!postData[item]) {
        delete postData[item]
      }
      if (item === 'primaryKeys') {
        delete postData[item]
      }
    })

    const res = await this._post({
      url: this.dialogData.api!,
      data: {
        page: currentPage || 1,
        pageSize: 10,
        // 根据选择的 tab 传入对应的格式

        data: postData
      }
    })

    if (res.code === 0) {
      // this.$nextTick(() => {
      this.queryData[this.activeTab].tableData = res.data
      this.queryData[this.activeTab].tableTotal = res.total
      const tableDom: any = this.$refs.baseTable
      // 默认高亮第一条
      // ;(this.$refs.baseTable as any).setHighLightRow(res.data[0])
      if (tableDom) {
        tableDom.setHighLightRow(res.data[0])
      }
      // 如果是单选默认添加第一条
      if (this.dialogData.isSingleSelect) {
        this.queryData[this.activeTab].selectArr.push(res.data[0])
      }
      // })

      // this.queryData[this.activeTab].chooseTableData = []
    }
  }
  // 查询
  query() {
    const resultPagination: any = this.$refs.resultPagination
    // 重置分页
    resultPagination.resetCurrentPage()
    this.queryFn()
  }
  // 重置
  reset() {
    const currentFormdata = this.formData[this.activeTab]

    for (const key in this.formData) {
      for (const k in this.formData[key]) {
        if (k === 'primaryKeys') {
          delete this.formData[key][k]
        } else {
          this.$set(this.formData[key], k, Array.isArray(currentFormdata) ? [] : '')
        }
      }
      this.queryData[key].chooseTableData = []
      this.queryData[key].selectArr = []
    }

    this.queryFn()
  }
  allRightFn() {
    this.queryData[this.activeTab].chooseTableData = this.queryData[this.activeTab].tableData.slice(
      0
    )
  }

  rightFn() {
    if (this.queryData[this.activeTab].selectArr.length > 0) {
      this.queryData[this.activeTab].chooseTableData = mergeArray(
        this.queryData[this.activeTab].chooseTableData,
        this.queryData[this.activeTab].selectArr
      )
    }
  }

  allLeftFn() {
    this.queryData[this.activeTab].chooseTableData = []
  }

  leftFn() {
    if (this.queryData[this.activeTab].chooseSelect.length === 0) {
      return
    }
    const newList: any[] = []
    this.queryData[this.activeTab].chooseTableData.map((item) => {
      const n = this.queryData[this.activeTab].chooseSelect.findIndex((i) => i.id === item.id)
      if (n < 0) {
        newList.push(item)
      }
    })
    this.queryData[this.activeTab].chooseTableData = newList
  }

  cancel() {
    this.$set(this.dialogObj as Object, 'isShowDialog', false)
  }

  submit() {
    // 单选渠道
    if (this.dialogData.isSingleSelect) {
      const chooseData = this.queryData[this.activeTab].selectArr[0]
      this.$set(this.dialogObj as Object, 'isShowDialog', false)
      // this.$emit('singleChannelChoose', {
      //   label: chooseData.name,
      //   code: chooseData.code,
      //   value: chooseData.id
      // })
      this.$emit('singleChannelChoose', { row: chooseData })

      return
    }
    // 多选渠道
    // 这里判断如果 已选列表 有选择 则把 已选的 id 作为查询参数放入 formdata 对应的 select unselect 里面

    for (const k in this.queryData) {
      // const chooseData = this.dialogData.isSingleSelect ? this.queryData[k].selectArr : this.queryData[k].chooseTableData
      const chooseData = this.queryData[k].chooseTableData

      if (chooseData.length) {
        const choose = chooseData.map((item) => {
          return item.id
        })
        this.$set(this.formData, k, {})
        this.$set(this.formData[k], 'primaryKeys', choose)
      } else {
        delete this.formData[k].primaryKeys
        // this.$set(this.formData[k],'primaryKeys',choose)
      }
    }
    this.$set(this.dialogObj as Object, 'isShowDialog', false)
    // 如果没有勾选反选 则清空反选的 选择数据
    if (!this.isCheckedReverse) {
      this.$set(this.formData, 'unSelect', {})
    }
    this.$emit('confirm', this.formData)
  }
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

/deep/.el-dialog__body {
  padding: 0 !important;
}

.vip_wrap {
  height: auto;
  .vip_wrap_ct {
    // height: 420px;
    // min-height: 68vh;
    padding: 16px 16px 0 16px;
    .left_area_t {
      border-bottom: 1px solid #eee;
      margin-bottom: 8px;
    }
    .select-box {
      display: flex;
      width: 190px;
    }
    .select {
      height: 32px;
      line-height: 32px;
      border: 1px solid #eee;
      border-bottom: none;
      margin-right: 2px;
      text-align: center;
      border-radius: 2px 2px 0px 0px;
    }
    .unselect {
      height: 32px;
      line-height: 32px;
      border: 1px solid #eee;
      display: flex;
      // align-items: center;
      justify-content: center;
      border-bottom: none;
      border-radius: 2px 2px 0px 0px;
    }
    .active {
      color: $basic !important;
    }
  }
  .content-box {
    display: flex;
    align-items: center;
    .vip_wrap_ct_l {
      max-width: 220px;
      .vip_wrap_ct_l_title {
        margin-bottom: 8px;
      }
      .left_area {
        // position: relative;
        height: 378px;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        border: 1px solid rgba(215, 215, 215, 1);
        box-sizing: initial;
        .left_area_ct {
          // max-height: 345px;
          height: 345px;
          overflow: auto;
          /deep/ .el-col {
            padding: 0 8px !important;
            // height: auto !important;
          }
          /deep/.el-form-item--mini .el-form-item__label {
            padding-bottom: 6px;
            font-size: 12px;
            font-weight: 400;
            line-height: normal;
          }
        }
      }
    }
    .vip_wrap_ct_m {
      min-width: 300px;
      flex: 1;
      margin-left: 20px;
      .vip_wrap_ct_m_title {
        margin-bottom: 8px;
      }
      .middle_area {
        position: relative;
        height: 380px;
        padding-bottom: 32px;
        background: rgba(255, 255, 255, 1);
        border-radius: 2px;
        .el-table--border,
        .el-table--group {
          border: 1px solid #d7d7d7;
          border-radius: 2px;
        }
      }
    }
    .vip_wrap_ct_btnDom {
      display: flex;
      align-items: center;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 16px;
      button {
        margin: 0 0 12px 0;
        &:nth-of-type(3) {
          margin-top: 32px;
        }
      }
    }
    .vip_wrap_ct_r {
      float: left;
      position: relative;
      .vip_wrap_ct_r_title {
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 8px;
        text-align: right;
      }
      .right_area {
        height: 380px;
        background: white;
        padding-bottom: 32px;
        .el-table--border,
        .el-table--group {
          border: 1px solid #d7d7d7;
          border-radius: 2px;
        }
        .area_b {
          border: 1px solid #d7d7d7;
          border-top: none;
        }
      }
    }
  }
  .vip_wrap_b {
    height: 48px;
    line-height: 48px;
    padding: 0 16px;
    text-align: right;
  }
}
.left_area {
  /deep/.el-scrollbar__wrap {
    overflow-x: hidden;
    // padding: 16px 10px;
    padding: 6px 12px;
  }
}

.area_b {
  height: 32px;
  line-height: 32px;
  text-align: right;
  padding: 0 10px;
  background-color: #fff;
  border-top: 1px solid rgba(215, 215, 215, 1);
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  .black {
    color: $colorTextSecondary;
  }
  /deep/.el-button--text{
    padding: 0 ;
  }
  span {
    font-size: 12px;
    color: rgba(124, 126, 133, 1);
  }
}
.no-brdoer {
  border: none;
  padding: 0;
  font-size: 14px;
}
.info-content {
  width: 206px;
  font-size: 12px;
  line-height: 16px;
}
.icon-btn {
  &:hover {
    color: #aeb3be;
    border-color: #aeb3be;
    background-color: #fff;
  }
}
</style>
