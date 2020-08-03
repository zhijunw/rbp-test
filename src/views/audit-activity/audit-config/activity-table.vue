<template>
  <div class="table-template">
    <div v-for="parent in tableData" :key="parent.flowType" class="mgb-12 table-template-item">
      <base-title :title="parent.groupName" class="audit-title" />

      <base-table
        :colunmData="tableHeader"
        :tableData="parent.flowDetailList"
        class="base-table"
        :tableConfig="{
          isIndex: true,
          isMultiSelect: false,
          highlightCurrentRow: false,
          isShowOpera: true,
          operatWidth: '200px'
        }"
      >
        <template v-slot="{ scope }">
          <div class="btn-group">
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="editItem(scope.row, parent)"
            >
              {{ $t('layout.btns.edit') }}
            </el-button>

            <template v-if="scope.row.status === 100">
              <el-button
                id="btn_t_blue"
                type="text"
                size="mini"
                @click.stop.prevent="disableItem(scope)"
              >
                {{ $t('layout.btns.batchDisable') }}
              </el-button>
            </template>
            <template v-else>
              <el-button
                id="btn_t_blue"
                type="text"
                size="mini"
                @click.stop.prevent="enableItem(scope)"
              >
                {{ $t('layout.btns.batchEnable') }}
              </el-button>
            </template>
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="copyItem(scope.row, parent)"
            >
              {{ $t('layout.btns.copy') }}
            </el-button>
            <el-button
              id="btn_t_gray"
              type="text"
              size="mini"
              @click.stop.prevent="deleteItem(scope)"
            >
              {{ $t('layout.btns.delete') }}
            </el-button>
          </div>
        </template>
        <template v-slot:tableCell="{ scope: { row, item } }">
          <template v-if="item.value === 'flowName'">
            <span class="pdl-10 pdr-10">{{ row[item.value] }}</span>
            <el-button
              type="text"
              size="small"
              class="right mgr-10"
              icon="el-icon-edit"
              @click="editName(row)"
            />
          </template>
          <template v-else>
            <span class="pdl-10">{{ row[item.value] }}</span>
          </template>
        </template>
      </base-table>
      <div class="add-box f12">
        <el-button type="text" class="inline-block" @click="add(parent)">
          +{{ $t('layout.btns.addActivity') }}
        </el-button>
      </div>
    </div>

    <base-dialog :dialogObj="addDialogObj" class="base-dialog" @confirm="confirm">
      <template v-slot:content>
        <div class="content">
          <div class="name-box">
            <p class="designer-save-text f12 mgb-12">
              {{ $t('commonWord.flowTypeName') }}
            </p>
            <base-input :value.sync="flowName" />
          </div>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { TableHeaderConfig, Dictionary, DialogObj } from '@/typings'
import apiUrl from '@/api/audit-activity/audit-config'

import { Loading } from 'element-ui'
@Component({
  name: 'print-template',
  components: {
    baseTable: () => import('@/components/base-table/index.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseInput: () => import('@/components/base-input/index.vue'),
    baseDialog: () => import('@/components/base-dialog/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) activeTab: Dictionary

  @Watch('activeTab.id', { immediate: true })
  OnActiveTabChange(val, oldVal) {
    if (val) {
      this.getList()
    }
  }
  addDialogObj: DialogObj = {
    isShowDialog: false,
    title: ''
  }
  currentRow: Dictionary = {}
  flowName: string = ''
  tableHeader: TableHeaderConfig[] = [
    {
      label: '工作流名称',
      value: 'flowName',
      lang: 'commonWord.flowTypeName'
    },
    {
      label: '状态',
      value: 'statusName',
      lang: 'commonWord.status'
    }
  ]
  tableData: any[] = []

  mounted() {}

  activated() {
    this.getList()
  }
  async getList() {
    const res = await this._post({
      url: apiUrl.list,
      params: {
        moduleId: this.activeTab.id
      }
    })
    if (res.code === 0) {
      const mockData = res.data
      mockData.forEach((item) => {
        if (item.flowDetailList.length) {
          item.flowDetailList.forEach((list) => {
            if (list.status === 100) {
              list.statusName = '启用'
            }
            if (list.status === 101) {
              list.statusName = '禁用'
            }
          })
        }
      })
      this.tableData = mockData
    }
  }
  add(item) {
    this.$router.push({
      name: 'bpmnView',
      params: {
        flowType: item.flowType,
        groupName: item.groupName,
        ...this.activeTab
      }
    })
  }
  editName(row) {
    this.currentRow = row
    this.flowName = row.flowName
    this.addDialogObj.isShowDialog = true
    this.addDialogObj.title = `${this.$t('operationGroup.btns.edit')} ${this.$t(
      'commonWord.flowTypeName'
    )}`
  }
  async confirm() {
    const res = await this._put({
      url: apiUrl.update,
      data: {
        data: {
          flowName: this.flowName,
          flowDefinitionId: this.currentRow.flowDefinitionId,
          status: this.currentRow.status,
          id: this.currentRow.id
        }
      }
    })
    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', {
          action: this.$t('operationGroup.btns.edit')
        }),
        type: 'success'
      })

      this.getList()
    }
  }

  editItem(row, parent) {
    if (!row.resourceText) {
      this._message({ message: '没有配置工作流', type: 'warning' })
      return
    }
    this.$router.push({
      name: 'bpmnView',
      params: {
        xmlJson: row.resourceText,
        flowType: row.flowType,
        groupName: parent.groupName,
        flowName: row.flowName,
        moduleFlowDetailId: row.id,
        ...this.activeTab
      }
    })
    // const routeData = this.$router.resolve({
    //   name: 'bpmnView',
    //   params: {
    //     xmlJson: row.resourceText,
    //     flowType: row.flowType,
    //     groupName: parent.groupName,
    //     flowName: row.flowName,
    //     moduleFlowDetailId: row.id,
    //     ...this.activeTab
    //   }
    // })
    // window.open(routeData.href, '_blank')
  }
  async disableItem({ row }) {
    const res = await this._put({
      url: apiUrl.update,
      data: {
        data: {
          status: 101,
          flowType: row.flowType,
          flowDefinitionId: row.flowDefinitionId,
          id: row.id
        }
      }
    })
    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', {
          action: this.$t('operationGroup.btns.disable')
        }),
        type: 'success'
      })
      this.getList()
    }
  }
  async enableItem({ row }) {
    const res = await this._put({
      url: apiUrl.update,
      data: {
        data: {
          status: 100,
          flowType: row.flowType,
          flowDefinitionId: row.flowDefinitionId,
          id: row.id
        }
      }
    })
    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', {
          action: this.$t('operationGroup.btns.enable')
        }),
        type: 'success'
      })
      this.getList()
    }
  }
  copyItem(row, parent) {
    if (!row.resourceText) {
      this._message({ message: '没有配置工作流', type: 'warning' })
      return
    }
    // const routeData = this.$router.resolve({
    //   name: 'bpmnView',
    //   params: {
    //     xmlJson: row.resourceText,
    //     flowType: row.flowType,
    //     groupName: parent.groupName,
    //     flowName: row.flowName,
    //     ...this.activeTab
    //   }
    // })
    // window.open(routeData.href, '_blank')
    this.$router.push({
      name: 'bpmnView',
      params: {
        xmlJson: row.resourceText,
        flowType: row.flowType,
        groupName: parent.groupName,
        flowName: row.flowName,
        ...this.activeTab
      }
    })
  }
  async deleteItem({ row }) {
    const res = await this._post({
      url: apiUrl.deletes,
      data: {
        data: [row.id]
      }
    })
    if (res.code === 0) {
      this._message({
        message: this.$t('commonWord.actionSuccess', {
          action: this.$t('operationGroup.btns.delete')
        }),
        type: 'success'
      })
      this.getList()
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';
.table-template {
  .audit-title {
    margin: 0 0 16px 0;
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
    // width: 200px;
    padding-left: 10px;
    color: $info;
    &:hover {
      cursor: pointer;
    }
  }
}
.base-table {
  /deep/.cell {
    padding: 0 !important;
  }
}

.base-dialog {
  /deep/ .el-dialog__body {
    padding: 20px 16px;
  }
}
.no-border-input {
  /deep/.el-input__inner {
    padding: 0 10px;
  }
}
</style>
