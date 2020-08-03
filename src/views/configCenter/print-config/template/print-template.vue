<template>
  <div class="table-template">
    <div class="add-box">
      <el-button
        plain
        @click="add">
        {{ $t('layout.btns.add') }}
      </el-button>
      <el-button
        plain
        @click="batchImport">
        {{ $t('layout.btns.batchImport') }}
      </el-button>
      <el-button
        plain
        @click="batchExport">
        {{ $t('layout.btns.batchExport') }}
      </el-button>
      <base-input
        :value.sync="templateName"
        class="right base-input"
        :inputProps="{
          placeholder: 'form.placeholder.configPlaceholder',
          prefixIcon: 'el-icon-search'
        }"
        @enter="handleSearch" />
    </div>
    <base-table
      :colunmData="tableHeader"
      :tableData="tableData"
      class="base-table"
      :tableConfig="{
        isIndex: true,
        isMultiSelect: true,
        highlightCurrentRow: false,
        isShowOpera: true,
        operatWidth: '200px'
      }">
      <template v-slot="{ scope }">
        <div class="btn-group">
          <el-button
            id="btn_t_blue"
            type="text"
            size="mini"
            @click.stop.prevent="editItem(scope)">
            {{ $t('layout.btns.edit') }}
          </el-button>
          <el-button
            id="btn_t_blue"
            type="text"
            size="mini"
            @click.stop.prevent="copyItem(scope)">
            {{ $t('layout.btns.copy') }}
          </el-button>
          <template v-if="scope.row.status === 100">
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="disableItem(scope)">
              {{ $t('layout.btns.batchDisable') }}
            </el-button>
          </template>
          <template v-else>
            <el-button
              id="btn_t_blue"
              type="text"
              size="mini"
              @click.stop.prevent="enableItem(scope)">
              {{ $t('layout.btns.batchEnable') }}
            </el-button>
          </template>
          <el-button
            id="btn_t_gray"
            type="text"
            size="mini"
            @click.stop.prevent="exportItem(scope)">
            {{ $t('layout.btns.singleExport') }}
          </el-button>
          <el-button
            id="btn_t_gray"
            type="text"
            size="mini"
            @click.stop.prevent="deleteItem(scope)">
            {{ $t('layout.btns.delete') }}
          </el-button>
        </div>
      </template>
      <template v-slot:tableCell="{ scope: { row, item } }">
        <template v-if="item.value ==='templateName'">
          <p class="templateText">
            <span class="pdl-10">{{ row[item.value] }}</span>
            <svg-icon
              name="edit"
              class="edit_svg"
              @click="editTempName(row)" />
          </p>
        </template>
        <span
          v-else
          class="pdl-10">
          {{ row[item.value] }}
        </span>
      </template>
    </base-table>

    <base-dialog
      :dialogObj="addDialogObj"
      class="base-dialog"
      @confirm="confirm">
      <template v-slot:content>
        <div class="content">
          <div class="name-box">
            <p class="designer-save-text f12 mgb-12">
              方案名称
            </p>
            <base-input :value.sync="plainName" />
          </div>
          <div
            v-if="dialogType==='add'"
            class="radio-box">
            <el-radio
              v-model="sizeModel"
              label="0">
              尺码横排
            </el-radio>
            <el-radio
              v-model="sizeModel"
              label="1">
              尺码竖排
            </el-radio>
          </div>
        </div>
      </template>
    </base-dialog>

    <base-dialog
      :dialogObj="uploadConfig"
      class="base-dialog"
      @confirm="uploadEvent">
      <template v-slot:content>
        <div class="content">
          <div class="name-box">
            <el-upload
              ref="upload_"
              :on-remove="uploadChange"
              :on-change="uploadChange"
              :auto-upload="false"
              class="upload-demo"
              drag
              action="''"
              multiple>
              <div class="upload_box">
                <p class="el-upload__text">
                  将.mrt文件拖放到此处上传，或<em>点击上传</em>
                </p>
                <p class="el-upload__text">
                  支持选择多个文件上传，支持拖拽上传
                </p>
              </div>
            </el-upload>
          </div>
          <div class="radio-box">
            <el-radio
              v-model="uploadSizeModel"
              :label="0">
              尺码横排
            </el-radio>
            <el-radio
              v-model="uploadSizeModel"
              :label="1">
              尺码竖排
            </el-radio>
          </div>
        </div>
      </template>
    </base-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Emit, Prop, Watch } from 'vue-property-decorator'
import { TableHeaderConfig, Dictionary, DialogObj } from '@/typings'
import vuexMixins from '../configs/vuex-module'
import apiUrl from '@/api/config-center/print-config'
import { Loading } from 'element-ui'
import { download } from '@/api/apiConfig'
// setTimeout用于
const uploadEnd : any = null
  @Component({
    name: 'print-template',
    components: {
      baseTable: () => import('@/components/base-table/index.vue'),
      baseInput: () => import('@/components/base-input/index.vue'),
      baseDialog: () => import('@/components/base-dialog/index.vue')
    }
  })
export default class App extends mixins(vuexMixins) {
    @Prop({ required: true }) activeTab: string

    @Watch('activeTab', { immediate: true })
    OnActiveTabChange(val, oldVal) {
      if (val) {
        this.moduleId = val
        this.getList()
      }
    }

    templateName: string = ''
    sizeModel: number = 0
    dialogType:string = ''
    plainName: string = ''
    addDialogObj: DialogObj = {
      isShowDialog: false,
      title: '',
      appendToBody: true
    }
    tableHeader: TableHeaderConfig[] = [
      {
        label: '方案名称',
        value: 'templateName',
        lang: 'commonWord.printName'
      },
      {
        label: '状态',
        value: 'statusName',
        lang: 'commonWord.status'
      }
    ]
    moduleId: string = ''
    tableData: any[] = []
    uploadConfig:DialogObj = {
      isShowDialog: false,
      title: '',
      appendToBody: true
    }
    uploadSizeModel:number = 0
    // 上传需要解析的文件
    analyticalFileArray:any[] = [];
    mounted() {}

    async getList() {
      const res = await this._post({
        url: apiUrl.list,
        data: {
          netNeedModuleId: true,
          moduleId: this.moduleId,
          templateName: this.templateName
        }
      })
      if (res.code === 0) {
        this.tableData = res.data
        this.tableData.forEach((item) => {
          if (item.status === 100) {
            item.statusName = '启用'
          }
          if (item.status === 101) {
            item.statusName = '禁用'
          }
        })
      }
    }
    add() {
      this.dialogType = 'add'
      this.addDialogObj.isShowDialog = true
      this.addDialogObj.title = this.$t('commonWord.addPlain')
    }
    async confirm(parameter) {
      if (!this.plainName) {
        this._message({ message: '请输入方案名称', type: 'warning' })
        this.resetDialogConfig()
        return
      }
      this.dialogType === 'add' ? await this.loadingFn({ moudleId: this.moduleId, title: this.plainName, type: Number(this.sizeModel) }) : await this.editRequest(Object.assign(parameter, { templateName: this.plainName }))
      this.resetDialogConfig()
    }
    handleSearch() {
      this.getList()
    }
    async editItem({ row }) {
      this.loadingFn({
        id: row.id,
        action: 'edit'
      })
    }
    async copyItem({ row }) {
      this.loadingFn({
        id: row.id
      })
    }
    loadingFn(params) {
      return new Promise(resolve => {
        const routeData = this.$router.resolve({
          name: 'addPrintConfig',
          query: params
        })
        window.open(routeData.href, '_blank')
        resolve()
      })
    }
    async disableItem({ row }) {
      const res = await this._put({
        url: apiUrl.batchDisable,
        data: {
          data: [row.id]
        }
      })
      if (res.code === 0) {
        this.getList()
      }
    }
    async enableItem({ row }) {
      const res = await this._put({
        url: apiUrl.batchEnable,
        data: {
          netNeedModuleId: true,
          data: [row.id]
        }
      })
      if (res.code === 0) {
        this.getList()
      }
    }
    async deleteItem({ row }) {
      const res = await this._post({
        url: apiUrl.deletes,
        data: {
          netNeedModuleId: true,
          data: [row.id]
        }
      })
      res.code === 0 && this.getList()
    }
    // 单个导出
    async exportItem({ row }) {
      const res = await this._get({ url: `${apiUrl.detail}/${row.id}` })
      if (res.code === 0) {
        const content = JSON.stringify(res.data.templateFileContent)
        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
        download(`${this.moduleIdMapName(this.moduleId)}-${row.templateName}.mrt`, URL.createObjectURL(blob), true)
      }
    }
    // 导入
    batchImport() {
      this.uploadConfig.isShowDialog = true
      this.uploadConfig.title = this.$t('commonWord.importScheme');
      (this.$refs['upload_'] as any).clearFiles()
      this.uploadSizeModel = 0
      this.analyticalFileArray = []
    }
    // 批量导出
    batchExport() {}
    // 编辑弹窗
    async editTempName(row) {
      this.dialogType = 'edit'
      this.addDialogObj.isShowDialog = true
      this.plainName = row.templateName
      this.addDialogObj.title = this.$t('commonWord.editPlainName')
      this.addDialogObj.parameter = row
    }
    // 编辑请求
    async editRequest(parameter) {
      const res = await this._put({ url: apiUrl.update, data: { data: parameter }})
      if (res.code === 0) {
        this.$message.success('打印模板名称修改成功')
        // parameter.templateName = this.plainName
      } else {
        this.$message.warning('打印模板名称修改失败！')
      }
    }
    // 模块Id映射[目前只有销售计划/指令单]
    moduleIdMapName(moduleId) {
      const map = new Map([['700001', '销售计划'], ['700003', '指令单']])
      return map.get(moduleId.toString())
    }
    // 重置弹窗
    resetDialogConfig() {
      this.addDialogObj = {
        isShowDialog: false,
        title: '',
        appendToBody: true
      }
      this.dialogType = ''
      this.plainName = ''
    }
    // 监听上传文件
    uploadChange(file, fileList) {
      this.analyticalFileArray = fileList
    }
    // onload改同步
    onloadSync(file, name) {
      return new Promise(resolve => {
        const reader = new FileReader()
        reader.readAsText(file)
        reader.onload = () => {
          // 用try catch 捕获格式是否json
          try {
            const file = JSON.parse(JSON.parse((reader.result as string)))
            resolve(file)
          } catch (err) {
            this.$message.error(`${name}格式有误`)
            resolve(false)
          }
        }
      })
    }
    // 确定上传
    uploadEvent() {
      this.analyticalFileArray.forEach(async(item, index) => {
        const FileResult = await this.onloadSync(item.raw, item.name)
        if (FileResult) {
          const res = await this._post({
            url: apiUrl.create,
            data: {
              data: {
                moduleId: this.moduleId,
                status: 100,
                templateFileContent: JSON.stringify(FileResult),
                templateName: item.name.replace('.mrt', ''),
                type: this.uploadSizeModel
              }
            }})
          if (res.code === 0) {
            index === this.analyticalFileArray.length - 1 && (() => {
              this.$message.success('导入成功')
              this.getList()
            })()
          } else {
            this.$message.error(`${item.name}导入失败`)
          }
        }
      })
    }
}
</script>
<style lang="scss" scoped>
  .upload_box{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    .el-upload__text{
      font-size: 12px;
      line-height: 16px;
    }
  }
  .templateText{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .edit_svg{
      opacity: 0.5;
      cursor: pointer;
      margin-right: 10px;
    }
  }
  .base-input {
    display: inline-block;
  }
  .base-table {
    /deep/.cell {
      padding: 0 !important;
    }
  }
  .add-box {
    margin-bottom: 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    .name-box {
      margin-bottom: 12px;
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
