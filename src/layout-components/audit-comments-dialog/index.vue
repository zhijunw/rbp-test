<template>
  <base-dialog
    :dialogObj="auditDialogObj"
    class="base-dialog"
    v-on="$listeners">
    <template v-slot:content>
      <div class="audit-comments">
        <div class="text-box mgr-10">
          <span class="f12">审批意见</span>
          <el-input
            v-model="auditComments"
            type="textarea"
            size="small"
            class="mgt-6"
            :autosize="{ minRows: 3,maxRows: 3 }"
            placeholder="请输入内容" />
        </div>
        <div class="img-box flex-1">
          <span class="f12">图片</span>
          <img-upload
            class="mgt-6"
            :value="imgList"
            :argObj="{type:1}"
            @input="getImgList" />
        </div>
      </div>
      <div
        v-if="showRecord"
        class="audit-process">
        <p class="f12 mgb-6">
          审核进度和记录
        </p>
      </div>
      <div
        v-if="showRecord"
        class="audit-record">
        <base-table
          ref="auditTable"
          key="auditTable"
          :tableData="auditRecord"
          :colunmData="auditTableHeader"
          class="audit-table"
          :tableConfig="{
            isMultiSelect: false,
            isIndex: false,
            height: '300px',
            isShowOpera: false
          }">
          <template v-slot:tableCell="{ scope: { row, item} }">
            <!-- 如果有type 则代表有分类 -->
            <template v-if="row.type">
              <span
                v-if="row[item.value]">{{ row[item.value] }}</span>
              <span
                v-else />
            </template>
            <template v-else-if="item.type==='image'">
              <span>{{ row[item.value] }}</span>
              <!-- 如果有图片 -->
              <div
                v-if="row.billFlowLogResourceList"
                class="image-box">
                <el-image
                  v-for="imgItem in row.billFlowLogResourceList"
                  :key="imgItem.fileUrl"
                  lazy
                  :z-index="10000"
                  :preview-src-list="[imgItem.fileUrl]"
                  :src="imgItem.fileUrl"
                  class="image"
                  fit="cover" />
              </div>
            </template>
            <template v-else>
              <span>{{ row[item.value] }}</span>
            </template>
          </template>
        </base-table>
      </div>
    </template>
    <template v-slot:footerBtn>
      <div class="audit-group mgt-24">
        <template v-if="showRecord">
          <el-button
            plain
            @click="cancel">
            {{ $t('commonWord.cancel') }}
          </el-button>
          <div class="right-btn right">
            <el-button
              id="btn_red"
              plain
              @click="reject">
              {{ $t('commonWord.reject') }}
            </el-button>
            <el-button
              id="btn_green"
              plain
              @click="pass">
              {{ $t('commonWord.pass') }}
            </el-button>
          </div>
        </template>
        <template v-else>
          <div class="right-btn">
            <el-button
              plain
              @click="cancel">
              {{ $t('commonWord.cancel') }}
            </el-button>
            <el-button
              plain
              type="primary"
              @click="confirm">
              {{ $t('commonWord.confirm') }}
            </el-button>
          </div>
        </template>
      </div>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { DialogObj } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary, TableHeaderConfig } from '@/typings'
import apiUrl from '@/api/audit-activity/create-activity'
@Component({
  name: 'auditComments',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    imgUpload: () => import('@/components/img-upload/index.vue'),
    baseTable: () => import('@/components/base-table/index.vue')
  }
})
export default class App extends Vue {
  auditDialogObj: DialogObj = {
    title: '',
    isShowDialog: false,
    appendToBody: true,
    width: '840px'
  }
  auditComments: string = ''
  imgList: any[] = []
  auditTableHeader: TableHeaderConfig[] = [
    {
      label: '操作时间',
      value: 'createdTime',
      lang: 'commonWord.operationTime',
      width: '150px'
    },
    {
      label: '审批层级',
      value: 'flowNodeName',
      lang: 'commonWord.approvalLevel',
      width: '100px'

    },
    {
      label: '操作人',
      value: 'flowByName',
      lang: 'commonWord.operator',
      width: '100px'
    },
    {
      label: '操作',
      value: 'flowProcessName',
      lang: 'commonWord.operation',
      width: '100px'
    },
    {
      label: '审批意见',
      value: 'flowSuggestion',
      lang: 'commonWord.auditComments',
      type: 'image'
    }
  ]
  auditRecord: any[] = []
  flowType: number
  showRecord:boolean = true
  async getRecord(args) {
    const res = await this._get({ url: apiUrl.aitivityDetail, params: args })
    if (res.code === 0) {
      const data = res.data
      Object.keys(data).forEach((keys) => {
        if (data[keys].length > 0) {
          this.auditRecord.push({
            type: keys,
            createdTime: data[keys][0].groupName,
            class: 'table-bd'
          })
        }
        this.auditRecord = [... this.auditRecord, ...data[keys]]
      })
    }
  }

  open({ args, flowType }) {
    this.flowType = flowType
    this.auditDialogObj.isShowDialog = true
    this.auditDialogObj.title = this.$t('commonWord.approval')
    if (args) {
      this.getRecord(args)
    } else {
      this.showRecord = false
    }
  }
  cancel() {
    this.auditDialogObj.isShowDialog = false
  }

  getImgList(list) {
    if (list.length) {
      this.imgList = list.map((item) => item.response.data.fileKey)
    } else {
      this.imgList = []
    }
  }
  confirm() {
    this.auditDialogObj.isShowDialog = false
    this.$emit('createActivity', { comments: this.auditComments, flowType: this.flowType, imgUrl: this.imgList })
  }
  reject() {
    this.auditDialogObj.isShowDialog = false
    this.$emit('reject', { comments: this.auditComments, flowType: this.flowType, imgUrl: this.imgList })
  }
  pass() {
    this.auditDialogObj.isShowDialog = false
    this.$emit('pass', { comments: this.auditComments, flowType: this.flowType, imgUrl: this.imgList })
  }
}
</script>

<style scoped lang="scss">
.audit-table{

  /deep/.el-table__header-wrapper {
    /deep/.cell {
      padding: 0 !important;
    }
  }
}
.base-dialog {
  /deep/.el-dialog__body {
    padding: 12px 16px;
  }
}
/deep/.table-bd{
    /deep/ .row {
        background: #f7f8fa;
    }
}
.audit-comments {
  display: flex;
  margin-bottom: 12px;
}
.right-btn{
  text-align: right;
}
.image-box{
  display: flex;
  overflow-x: scroll;
  .image{
    width: 48px;
    height: 48px;
    margin-right: 6px;
  }
  /deep/.el-image-viewer__close{
    background: #fff;
    opacity: 0.7;
  }
}
</style>
