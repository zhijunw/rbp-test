<template>
  <div class="upload-box">
    <div
      v-if="fileList.length === 0"
      class="upload-tip">
      <div>将图片拖放到此处上传，或点击<span>上传</span></div>
      <div>为了保证图片的正常使用，仅支持5MB以内jpg、png格式图片上传</div>
      <div>支持选择多张照片上传，支持拖拽上传</div>
    </div>
    <div :class="fileList.length === 0 ? 'upload-btn' : ''">
      <el-upload
        drag
        class="upload-content"
        multiple
        :data="argObj"
        :action="baseUrl"
        list-type="picture-card"
        :file-list="fileList"
        :on-remove="handleRemove"
        :on-success="handleAdd"
        :limit="limit"
        :on-exceed="handleExceed"
        accept=".jpg,.jpeg,.png,.JPG,.JPEG,.PNG"
        :before-upload="beforeAvatarUpload">
        <div>
          <div
            slot="trigger"
            class="upload-body" />
          <i class="el-icon-plus" />
        </div>
      </el-upload>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import baseUrl from '@/api/baseUrl'
import { Dictionary } from '@/typings'
@Component({
  name: 'img-upload'
})
export default class App extends Vue {
  @Prop() value: any[]
  @Prop({ default: 9 }) limit
  @Prop() argObj: Dictionary<string>

  @Watch('value', { immediate: true, deep: true })
  onValueChanged(val: any) {
    this.fileList = val || []
  }
  fileList: any = []
  baseUrl: String = baseUrl + '/file/upload'

  handleRemove(file, fileList) {
    this.fileList = fileList
    console.log(JSON.stringify(fileList))
    this.$emit('input', fileList)
  }
  handleAdd(response, file, fileList) {
    this.fileList = fileList
    console.log(JSON.stringify(fileList))
    this.$emit('input', fileList)
  }
  // handleErr(err: any, file: any, fileList: any[]) {
  //   this.fileList = fileList
  //   this.$emit('input', fileList)
  // }
  handleExceed(files, fileList) {
    this.$message({ message: `上传的图片不能超过${this.limit}张`, type: 'warning' })
  }
  beforeAvatarUpload(file) {
    var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    const extension =
      testmsg === 'jpg' || testmsg === 'JPG' || testmsg === 'png' || testmsg === 'PNG'
    const isLt2M = file.size / 1024 / 1024 < 5

    if (!extension) {
      this.$message.error('上传的图片只能是 JPG、PNG 格式!')
    }
    if (!isLt2M) {
      this.$message.error('上传的图片大小不能超过 5MB!')
    }
    return extension && isLt2M
  }
}
</script>

<style scoped lang="scss">
.upload-box {
  position: relative;
  padding: 8px 8px 0 8px;
  height: 64px;
  border: 1px dashed #d7d7d7;
  /deep/.el-upload--picture-card {
    width: 48px;
    height: 48px;
    border: none;
    line-height: 46px;
  }
  /deep/.el-upload-list {
    position: relative;
    z-index: 2;
  }
  /deep/.el-upload--picture-card i {
    line-height: 46px;
  }
  /deep/ .el-upload-dragger {
    width: 48px;
    height: 48px;
    position: static;
    line-height: 46px;
  }
  /deep/.el-upload-list--picture-card .el-upload-list__item {
    width: 48px;
    height: 48px;
  }
  .upload-tip {
    text-align: center;
    color: #7c7e85;
    font-size: 12px;
    line-height: 16px;
    span {
      color: #1ca1ff;
    }
  }
  .upload-btn {
    position: absolute;
    opacity: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    top: 0;
    left: 0;
  }
  .upload-body {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
