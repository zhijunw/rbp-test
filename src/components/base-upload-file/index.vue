
<template>
  <base-dialog
    :dialogObj="uploadDialog"
    class="base-dialog">
    <template v-slot:content>
      <div class="content">
        <slot name="header" />
        <el-upload
          ref="baseUpload"
          :disabled="disabled"
          :action="action"
          :file-list="fileList"
          :data="config.data"
          :limit="config.limit"
          :accept="config.accept"
          :multiple="config.multiple"
          :show-file-list="config.showFileList"
          :auto-upload="config.autoUpload"
          :drag="config.drag"
          :on-change="onChange"
          :before-upload="beforeUpload"
          :on-remove="onRemove"
          :on-success="onSuccess"
          :on-error="onError"
          :on-progress="onProgress"
          :on-preview="onPreview">
          <svg-icon
            class="file-status-icon"
            :name="iconName" />
          <div
            slot="tip"
            class="el-upload__down">
            <p class="f14 invalid">
              拖拽文件到此处或点击上传文件
            </p>
            <slot name="other">
              <p
                class="f14 color-info mgt-20 text-underline hover"
                @click="downLoadExcel">
                下载样表文件
              </p>
            </slot>
            <p
              v-if="hasWarning"
              class="f14 danger mgt-20 text-underline hover"
              @click="downLoadWarningExcel">
              下载错误文件
            </p>
          </div>
        </el-upload>
        <slot name="extra" />
      </div>
    </template>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { Partial, Dictionary, UploadConfig, DialogObj } from '@/typings'
import { _downUrl, download } from '@/api/apiConfig'
import baseUrl from '@/api/baseUrl'
const DEFAULT_CONFIG: UploadConfig = {
  multiple: true,
  name: 'file',
  drag: true,
  showFileList: true,
  autoUpload: true,
  limit: 1
}

@Component({
  name: 'base-upload',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue')
  }
})
/**
   * @param dialogVisible = 上传弹出的显示隐藏
   * @param action = 上传地址
   * @param data = 上传附带数据
   * @param fileList = 文件列表
   * @param disabled = 是否禁用
   * @param uploadProps = 基础配置
   * @method onChange = 文件任意状态改变
   * @method beforeUpload = 上传之前
   * @method onRemove = 文件列表点删除
   * @method onPreview = 点击文件列表
   * @method onSuccess = 上传成功
   * @method onError = 上传失败
   * @method onProgress = 上传中

   * */
export default class App extends Vue {
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) action: string
  @Prop() uploadProps: Partial<UploadConfig>

  @Watch('uploadProps', { immediate: true })
  onValueChanged(val: Dictionary<any>, oldVal: string) {
    this.config = Object.assign({}, DEFAULT_CONFIG, val)
  }

  config: UploadConfig = DEFAULT_CONFIG
  iconName: String = 'file_default'
  hasWarning: boolean = false
  fileList: object[] = []
  errorUrl: string = ''
  uploadDialog: DialogObj = {
    title: '',
    isShowDialog: false,
    modalAppendToBody: true,
    appendToBody: true,
    width: '480px'
  }
  @Emit('onChange')
  onChange(file) {
    return file
  }

  @Emit('beforeUpload')
  beforeUpload(file) {
    return file
  }

  @Emit('onRemove')
  onRemove(file) {
    return file
  }

  @Emit('onSuccess')
  onSuccess(response) {
    if (response.code === 0) {
      this._message({ message: '任务创建成功', type: 'success' })
      this.$emit('success', response)
      this.$nextTick(() => {
        ;(this.$refs['baseUpload'] as any).clearFiles()
        this.uploadDialog.isShowDialog = false
      })
      return
    } else {
      this._message({ message: response.msg || '任务创建失败', type: 'warning' })
      ;(this.$refs.baseUpload as any).clearFiles()
      this.hasWarning = true
      this.errorUrl = typeof response.data === 'string' ? response.data : response.data.errorFileUrl
    }
    return response
  }

  @Emit('onError')
  onError(err) {
    if (err.code === 0) {
      this._message({ message: '任务创建成功', type: 'success' })
      this.$nextTick(() => {
        ;(this.$refs['baseUpload'] as any).clearFiles()
        this.uploadDialog.isShowDialog = false
      })
      return
    }
    if (err.code === 30001) {
      this._message({ message: '任务创建失败', type: 'warning' })
      ;(this.$refs.baseUpload as any).clearFiles()
      this.hasWarning = true
      this.errorUrl = typeof err.data === 'string' ? err.data : err.data.errorFileUrl
    }
    return err
  }

  @Emit('onProgress')
  onProgress(event) {
    return event
  }

  @Emit('onPreview')
  onPreview(file) {
    return file
  }
  open() {
    this.uploadDialog.title = this.$t('commonWord.importTitle')
    this.uploadDialog.isShowDialog = true
  }
  downLoadExcel() {
    this.$emit('downLoadExcel')
  }
  downLoadWarningExcel() {
    if ('download' in document.createElement('a')) {
      const elink = document.createElement('a')
      elink.download = '错误文件'
      elink.style.display = 'none'
      elink.href = `${baseUrl}${this.errorUrl}`
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else {
      const iframe = document.createElement('iframe')
      iframe.src = `${baseUrl}${this.errorUrl}`
      document.body.appendChild(iframe)
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000 * 3)
    }
    this.hasWarning = false
  }
}
</script>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

/deep/ .el-dialog__footer {
  padding: 12px 16px 12px 16px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  /deep/ .el-upload-dragger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 148px;
    height: 148px;
  }

  /deep/ .el-upload__tip {
    margin-top: 16px;
  }
  /deep/ .el-upload__down {
    margin-top: 16px;
  }
  .file-status-icon {
    width: 60px;
    height: 72px;
    margin-bottom: 10px;
  }
}
</style>
Regent Soft Git Server (5.0.1.0) © 2015 · 丽晶软件 软件下载
