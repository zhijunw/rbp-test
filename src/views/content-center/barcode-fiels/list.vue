<template>
  <div class="list-warrper">
    <list-operation
      :btnConfigs="listConfig.btns"
      :inputConfig="listConfig.InputConfig"
      class="list-warrper__operation"
      @createdBarcode="batchCreatedBarcode"
      @filter="m_filter">
      <div
        slot="input"
        class="search-box right">
        <el-dropdown
          class="search-type"
          trigger="click"
          @command="handleCommand">
          <el-button
            plain
            icon="el-icon-arrow-down">
            <!-- {{$t(searchLabel) || $t('barcode.list.createBarcode.goodsSearch')}} -->
            {{ $t(searchLabel) }}
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item
              v-for="(item,index) in serachList"
              :key="index"
              :command="item.value">
              {{ $t(item.lang) }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <base-input
          ref="baseInput"
          class="search-input"
          :inputProps="listConfig.InputConfig"
          :value="inputValue"
          @enter="inputEnter" />
      </div>
    </list-operation>
    <div class="list-box">
      <list-table
        ref="listTable"
        class="left-table"
        :page="m_page"
        :colunmData="listConfig.tableHeader"
        :tableConfig="{
          isShowOpera: false,
          isMultiSelect: false
        }"
        :tableData="m_tableData"
        @changePage="m_changePage"
        @changePageSize="m_changePageSize"
        @viewDetail="viewDetail" />
      <template v-if="!!currentName">
        <div class="size-box">
          <div class="size-box-header">
            <p class="f16 current-name">
              {{ currentName }}
            </p>
            <div class="size-box-btn">
              <template v-if="status==='add'">
                <el-button
                  :disabled="sizeData.length === 0"
                  @click="edit">
                  {{ $t('layout.btns.edit') }}
                </el-button>
              </template>
              <template v-else>
                <el-button @click="reset">
                  {{ $t('layout.btns.cancel') }}
                </el-button>
                <el-button
                  type="primary"
                  @click="confirm">
                  {{ $t('layout.btns.sure') }}
                </el-button>
              </template>
            </div>
          </div>
          <base-table
            ref="baseTable"
            :key="tableKey"
            :colunmData="sizeHeader"
            :tableData="sizeData"
            class="barcode-table"
            :tableConfig="{
              isMultiSelect: false,
              isShowOpera: false,
              highlightCurrentRow: false
            }">
            <template v-slot:headerCell="{ scope: { item, $index } }">
              <template v-if="item.type === 'code'">
                <span class="pdl-10">{{ $t(item.lang)|| item.label }}</span>
                <el-button
                  :key="$index"
                  type="text"
                  class="hover right color-info"
                  :disabled="status === 'add'"
                  @click="makeupCode(item)">
                  {{ $t('barcode.list.createBarcode.quickly') }}
                </el-button>
                <!-- <span class="hover right color-info" @click="makeupCode(item)">{{$t('barcode.list.createBarcode.quickly')}}</span> -->
              </template>
              <template v-else>
                <span class="pdl-10"> {{ $t(item.lang)|| item.label }} </span>
              </template>
            </template>
            <template v-slot:tableCell="{ scope: { row, item } }">
              <template v-if="item.type === 'code'">
                <!-- <div class="customer-cell"> -->
                <el-input
                  v-model="row[item.value]"
                  size="small"
                  :disabled="status === 'add'"
                  class="select-input no-border-input"
                  clearable />
                <!-- </div> -->
              </template>
              <template v-else>
                <span class="pdl-10"> {{ row[item.value] }} </span>
              </template>
            </template>
          </base-table>
        </div>
      </template>
      <template v-else>
        <div class="no-data">
          <img
            src="@/assets/common/nodata.png"
            class="no-data-img"
            alt="暂无数据">
          <p class="f12">
            未选择货品
          </p>
        </div>
      </template>
    </div>

    <base-drawer
      :drawerObj="m_drawerObj"
      :formList="formList"
      :formData="formData"
      @reset="m_reset"
      @query="m_query" />
    <barcode-dialog
      :dialogObj="barcodeDialogObj" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { listConfig, barcodeDialog } from './configs'
import listMixins from '@/mixins/list-mixins'
// import vuexMixins from './configs/vuex-module'
import { DialogObj, Dictionary, TableHeaderConfig } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/content-center/barcode-fiels'
@Component({
  name: 'list-fiels',
  components: {
    listOperation: () => import('@/layout-components/list-operation/index.vue'),
    listTable: () => import('@/layout-components/list-table/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue'),
    baseDrawer: () => import('@/components/base-drawer/index.vue'),
    barcodeDialog: () => import('./components/barcode-dialog.vue'),
    tableheaderConfig: () => import('@/layout-components/tableheader-config/index.vue')
  }
})
export default class list extends mixins(listMixins) {
  listConfig = listConfig
  sizeData: any[] = []
  sizeHeader: TableHeaderConfig[] = []
  formData: Dictionary = {}
  status: string = 'add'
  barcodeRuleList: TableHeaderConfig[] = []
  listApi: string = apiUrl.getBarcodeList
  formList = listConfig.formList
  inputValue = ''
  currentId: string | number = ''
  serachList: any[] = [
    {
      label: '搜货品',
      lang: 'barcode.list.createBarcode.goodsSearch',
      value: 0
    },
    {
      label: '搜条码',
      lang: 'barcode.list.createBarcode.barcodeSearch',
      value: 1
    }
  ]
  searchType: number = 0
  currentName: string = ''
  barcodeDialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    setShow: true,
    width: '30%'
  }
  tableKey: number = 1
  get searchLabel() {
    return this.serachList.find((item) => item.value === this.searchType).lang
  }
  created() {
    this.m_query()
    this.getConfig()
  }
  // 获取右边列表的表头字段
  async getConfig() {
    const res = await this._get({ url: apiUrl.getConfig })
    if (res.code === 0) {
      const options = barcodeDialog.formList.find((item) => item.value === 'barcodeRuleId')!.options!
      this.barcodeRuleList = res.data.barcodeRuleList.map((item) => {
        options.push({ label: item.name, value: item.id + '' })
        return {
          label: item.name,
          value: item.id + '',
          align: 'left',
          type: 'code',
          tooltip: true,
          width: item.name.length * 12 + 24 + 100
        }
      })
      this.sizeHeader = [...listConfig.sizeHeader, ...this.barcodeRuleList]
    }
  }
  //   查看详情 设置 当前 id name
  async viewDetail(item) {
    this.currentName = item.name
    this.currentId = item.id
    this.getDetail(item.id)
  }
  async getDetail(id) {
    const res = await this._get({ url: `${apiUrl.getBarcodeDetail}/${id}` })
    if (res.code === 0) {
      const data = res.data
      this.sizeData = data.map((item, index) => {
        const { view, ...other } = item
        if (view.length) {
          view.forEach((k) => {
            other[k.ruleId + ''] = k.barcode
          })
        }
        other.index = index
        return other
      })
    }
  }
  async inputEnter(value) {
    this.m_inputValue = value

    await this.m_query({ from: 'singeInput', args: { keywordType: this.searchType }})

    this.currentName = ''
    this.currentId = ''

    // 这里对 搜条码的交互 搜条码之后在获取详情
    if (this.searchType === 1) {
      this.currentId = this.m_tableData[0].id
      this.currentName = this.m_tableData[0].name
      await this.getDetail(this.currentId)
      // 高亮当前行
      const row = this.sizeData.find((item): any => {
        for (var [k, m] of Object.entries(item)) {
          if (Number(m) === Number(value)) {
            return true
          }
        }
      })
      if (row) (this.$refs.baseTable as any).setHighLightRow(row)
    }
  }
  //   打开批量生成条码按钮
  batchCreatedBarcode() {
    this.barcodeDialogObj.isShowDialog = true
    this.barcodeDialogObj.title = this.$t('barcode.list.createBarcode.name')
  }
  reset() {
    this.getDetail(this.currentId)
    this.status = 'add'
    this.tableKey += 1
  }
  //   一键生成条码
  async makeupCode(obj) {
    if (!obj) {
      this._message({ message: '无尺码数据', type: 'error' })
      return
    }
    const barcodeData = this.sizeData.map((item) => {
      return {
        colorId: item.colorId,
        longId: item.longId,
        sizeId: item.sizeId,
        ruleId: Number(obj.value),
        id: item.goodsId,
        barcode: item[obj.value]
      }
    })
    const res = await this._post({ url: apiUrl.createdBarcode, data: { data: { barcodeData, goodsId: this.currentId }}})

    if (res.code === 0) {
      const data = res.data
      data.forEach((item) => {
        const index = this.sizeData.findIndex((size) => size.colorId === item.colorId && size.longId === item.longId && size.sizeId === item.sizeId)
        if (index > -1) {
          // 给尺码数据赋值 自定义的条码规则
          this.$set(this.sizeData[index], obj.value, item.barcode)
        }
      })
    }
  }
  //   格式化数据  把 [{ruleId1: '1',ruleId2: '2',name: 'name'}] => [{name: 'name',view:[{ruleId: '1',barcode: '1'}]}]
  async confirm() {
    const postData = this.sizeData.map((item) => {
      const obj: any = {
        view: []
      }
      Object.keys(item).forEach((keys) => {
        if (this.barcodeRuleList.findIndex((j) => j.value === keys.toString()) > -1) {
          obj.view.push({ ruleId: Number(keys), barcode: item[keys] })
        } else {
          obj[keys] = item[keys]
        }
      })
      return obj
    })

    const res = await this._post({ url: `${apiUrl.editCode}/${this.currentId}`, data: { data: postData }})
    if (res.code === 0) {
      this.status = 'add'
    }
  }
  edit() {
    this.status = 'edit'
    this.tableKey += 1
  }
  handleCommand(value) {
    this.searchType = value
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.barcode-table{
    /deep/.cell{
    padding: 0 !important
  }
}
.list-warrper__operation {
  position: sticky;
  top: 105px;
  z-index: 1003;
  background: #fff;
  .barcode-btn{
      float:left;
      display: inline-table;
      margin-right: 10px;
  }
  .search-type{
      display: inline-block;
      /deep/.el-button{
        border-right: none;
        border-radius: 4px 0px 0px 4px;
        border-color: #d7d7d7;
      }
  }
  .search-input{
      display: inline-block;
      /deep/.el-input__inner{
          border-radius:0 4px 4px 0;
      }
  }

//   /deep/.barcode-table .table-row .cell{
//           padding: 0 10px !important;
//   }
}
.list-box{
    display: flex;
    .left-table{
        display: inline-block;
        margin-right: 20px;
        min-width: 420px;
        /deep/.el-table{
            max-height: calc(100vh - 250px) !important;
        }
    }
    .right-table{
        display: inline-block;
        .customer-cell{
            margin: 0 -10px;
        }
    }
    .size-box{
        // width: 100%;
        min-width: 710px;
        flex:1;
        border: 1px solid #eee;
        padding: 12px;
        box-sizing: border-box;
        &-header{
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            align-items: center;
        }
        .current-name {
            color:$basic;
            border-left: 4px solid $basic;
            padding-left: 8px;
        }
    }
    .no-data{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        /* height: min-content; */
        color: $colorTextPlaceholder;
        flex: 1;
        border: 1px solid #eee;
        &-img{
            width: 80px;
            height: 80px;
            margin-bottom: 10px;
        }
    }
}
</style>
