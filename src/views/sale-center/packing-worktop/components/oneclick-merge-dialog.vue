<template>
  <base-dialog
    :dialog-obj="dialogObj"
    class="base-dialog"
    @confirm="confirm">
    <div
      slot="content"
      class="box">
      <p class="content-title">
        合并为发货计划后，装箱时引用发货计划进行装箱，被合并的配货指令单将不再可见。如需撤销合并，请点击发货计划单的“撤销合并”按钮作废发货计划。
      </p>
      <!-- 查询的表单 -->
      <form-list
        key="queryForm"
        :formList="queryFormlist"
        class="query-form"
        :formData="queryFormdata">
        <template v-slot:btnsGroup>
          <div class="query-btn-group">
            <el-button
              class="reset-border"
              @click="reset">
              {{ $t('layout.btns.reset') }}
            </el-button>
            <el-button
              type="primary"
              class="reset-border"
              @click="query">
              {{ $t('layout.btns.filter') }}
            </el-button>
          </div>
        </template>
      </form-list>
      <!-- 输入的表单 -->
      <form-list
        key="formlist"
        :formList="formList"
        :formData="formData" />
      <!-- <base-table
        ref="deliverPlanTable"
        key="deliverPlanTable"
        class="base-table"
        :tableData="tableData"
        :colunmData="deliverPlanTableHeader"
        :tableConfig="{
          isMultiSelect: true,
          isShowOpera: false,
        }" /> -->
      <el-table
        ref="table"
        :data="tableData"
        highlightCurrentRow
        size="mini"
        style="width:100%"
        class="base-list-table"
        cell-class-name="row"
        @select-all="selectAll"
        @expand-change="expandChange"
        @select="select">
        <!-- 展开表格 -->
        <el-table-column
          type="expand"
          fixed="left">
          <template slot-scope="{ row }">
            <div class="childrem-table">
              <el-table
                :ref="'tableKey'+row.groupCode"
                :data="row.noticeBillList"
                border
                :show-header="false"
                size="mini"
                style="width:100%"
                show-overflow-tooltip
                @select="selectChildren($event,row)">
                <!-- 选择项 -->
                <el-table-column
                  fixed="left"
                  type="selection"
                  width="50"
                  align="center" />
                <!-- 序号 -->
                <el-table-column
                  type="index"
                  width="50"
                  label="序号"
                  align="left" />
                <el-table-column
                  v-for="item in deliverPlanTableHeader"
                  :key="item.id"
                  show-overflow-tooltip
                  align="left"
                  :prop="item.value"
                  :label="item.label"
                  :min-width="item.width" />
              </el-table>
            </div>
          </template>
        </el-table-column>
        <!-- 选择项 -->
        <el-table-column
          fixed="left"
          type="selection"
          width="50"
          align="center" />
        <el-table-column
          type="index"
          width="50"
          label="序号"
          align="left" />
        <el-table-column
          v-for="(item, index) in deliverPlanTableHeader"
          :key="index"
          :label="item.label"
          :prop="item.value"
          :min-width="item.width"
          align="left">
          <template slot-scope="scope">
            <template v-if="item.value === 'billNo'">
              <span>{{ scope.row.billTypeName }}</span>
            </template>
            <template v-else-if="item.value === 'billDate'">
              <span>发货渠道:</span>
              <span>{{ scope.row.channelName }}</span>
            </template>
            <!-- <template v-else-if="item.value === 'noticeQuantity'">
              <span>{{ scope.row.channelCode }}-{{ scope.row.channelName }}</span>
            </template> -->
            <template v-else-if="item.value === 'manualId'">
              <span>收货渠道:{{ scope.row.toChannelName }}</span>
            </template>
            <!-- <template v-else-if="item.value === 'manualId'">
              <span>{{ scope.row.toChannelCode }}-{{ scope.row.toChannelName }}</span>
            </template> -->
            <template v-else-if="item.value === 'notes'">
              <span>可合并单数</span>
            </template>
            <template v-else />
          </template>
        </el-table-column>
      </el-table>
    </div>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Options, Dictionary, DialogObj } from '@/typings'
import { listConfig } from '../configs/index'
import apiUrl from '@/api/packingwork/packingworktop'

@Component({
  name: 'one-click-merge',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    formList: () => import('@/components/formlist/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class tableheaderConfig extends Vue {
  // @Prop() dialogObj: DialogObj
  dialogObj: DialogObj = {
    isShowDialog: false,
    title: '',
    width: '60%'
  }

  chooseData: Dictionary = {}
  formList = listConfig.oneClickMergeDialog.formList
  formData: Dictionary = {}

  queryFormlist = listConfig.oneClickMergeDialog.queryForm
  queryFormdata: Dictionary = {}

  deliverPlanTableHeader = listConfig.oneClickMergeDialog.tableHeader
  tableData: any[] = [
    {
      id: 100,
      dh: 100000,
      djrq: '2018-8-18',
      zls: 120,
      wzxs: 100,
      sgdh: '10000s000',
      ywlx: '类型1',
      jglx: '类型2',
      notes: '备注2',
      datas: [
        {
          id: 101,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        },
        {
          id: 102,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        },
        {
          id: 103,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        },
        {
          id: 104,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        }
      ]
    },
    {
      id: 200,
      dh: 100000,
      djrq: '2018-8-18',
      zls: 120,
      wzxs: 100,
      sgdh: '10000s000',
      ywlx: '类型1',
      jglx: '类型2',
      notes: '备注2',
      datas: [
        {
          id: 201,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        },
        {
          id: 202,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        },
        {
          id: 203,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        },
        {
          id: 204,
          dh: 100000,
          djrq: '2018-8-18',
          zls: 120,
          wzxs: 100,
          sgdh: '10000s000',
          ywlx: '类型1',
          jglx: '类型2',
          notes: '备注2'
        }
      ]
    }
  ]
  async confirm() {
    const filterNoticeList: Object[] = []
    for (const keys in this.chooseData) {
      if (this.chooseData[keys].length > 1) {
        filterNoticeList.push({
          sendPlanBillRelationList: this.chooseData[keys],
          channelId: this.tableData.find((item) => item.groupCode === keys).channelId,
          toChannelId: this.tableData.find((item) => item.groupCode === keys).toChannelId
        })
      }
    }
    const data = {
      ...this.formData,
      filterNoticeList
    }
    const res = await this._post({ url: apiUrl.confirmOneClickMerge, data })
    if (res.code === 0) {
      this._message({ message: '合并成功', type: 'success' })
      this.$emit('refreshList')
    }
  }
  reset() {}
  async query() {
    const res = await this._post({ url: apiUrl.oneClickMerge, data: {
      data: this.queryFormdata
    }})
    if (res.code === 0) {
      this.tableData = res.data
    }
  }

  selectAll(section) {
    console.log('selectAll', section)
    if (section.length === 0) {
      this.chooseData = {}
      return
    }
    section.forEach((item) => {
      this.updateChoose(item.noticeBillList, item.groupCode)
    })
  }
  expandChange(row, expandedRows) {
    const currentRowChoose = this.chooseData[row.groupCode]
    // 如果 chooseData 里面有改行的数据 并且已选 chooseData 的长度 === 改行子级数据的长度 则代表 全选
    if (currentRowChoose && currentRowChoose.length) {
      this.$nextTick(() => {
        const chooseItem = row.noticeBillList.filter((item) => currentRowChoose.findIndex((row) => row.noticeId === item.noticeId) > -1)
        chooseItem.forEach((el) => {
          (this.$refs[`tableKey${row.groupCode}`] as any).toggleRowSelection(el)
        })
      })
    }
  }
  select(section, row) {
    console.log('section', section, 'row', row)
    // 判断 父级是选中还是取消选中
    const index = section.findIndex((k) => {
      return (k.groupCode === row.groupCode)
    })
    if (row.noticeBillList) {
      // 设置父级下面的子集 是否被选中
      row.noticeBillList.forEach((el) => {
        (this.$refs[`tableKey${row.groupCode}`] as any).toggleRowSelection(el, index >= 0)
      })
      this.updateChoose(index >= 0 ? row.noticeBillList : [], row.groupCode)
    }
  }
  selectChildren(section, row) {
    this.updateChoose(section, row.groupCode)
  }
  updateChoose(chooseArr, groupKey) {
    const ids = chooseArr.length ? chooseArr.map((item) => {
      return {
        noticeId: item.noticeId,
        salePlanId: item.salePlanId
      }
    }) : []
    this.$set(this.chooseData, groupKey, ids)
  }
  async open(args) {
    await this.query()
    this.dialogObj.isShowDialog = true
    this.dialogObj.title = this.$t('packingWorktop.list.oneClickMergeDialog.title')
  }
}
</script>
<style lang="scss">
.base-dialog {
  .el-dialog__body {
    padding: 0 16px;
  }
  .el-dialog__footer {
    padding: 12px 16px 16px 16px;
  }
}
.el-table__expanded-cell{
  padding:0 0 0 46px !important;
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.content-title {
  background: #aeb3be;
  font-size: 12px;
  height: 26px;
  line-height: 26px;
  margin: 0 -16px 16px -16px;
  padding: 0 16px;
  color: #fff;
}
.query-form {
  border: 1px solid #eee;
  padding: 6px 12px 0px 12px;
  margin-bottom: 16px;
}
.query-btn-group {
  display: flex;
  justify-content: flex-end;
  padding-top: 22px;
}
.base-table {
  margin-top: 4px;
}
.reset-border {
  border-radius: 2px;
}
.childrem-table{
  /deep/.el-table__row td {
    background: rgba(245,245,247,1);
  }
}
</style>
