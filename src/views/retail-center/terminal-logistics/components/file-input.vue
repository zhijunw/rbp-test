<template>
  <div
    v-if="showInput"
    class="file-import">
    <base-upload-file
      ref="upload"
      :disabled="importDisabled"
      :action="uploadAction"
      :uploadProps="uploadProps"
      @downLoadExcel="downLoadExcel_"
      @success="success">
      <div
        slot="header"
        style="width: 100%;">
        <el-form
          label-position="top"
          :inline="true">
          <el-form-item
            required>
            <div style="display: flex;">
              <el-select
                v-model="uploadType"
                size="mini"
                :placeholder="$t('commonWord.placeSelectFileType')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value" />
              </el-select>
              <p
                class="f12 color-info text-underline hover mgl-20"
                @click="$refs['upload'].downLoadExcel()">
                {{ $t('commonWord.downloadSampleFile') }}
              </p>
            </div>
            <template v-slot:label>
              <span
                class="f14"
                style="font-weight: normal">导入模板类型:</span>
            </template>
          </el-form-item>
        </el-form>
      </div>
      <template slot="other" />
    </base-upload-file>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { globalConfigs } from '../configs/index'
import baseUrl from '@/api/baseUrl'
import commonApiUrl from '@/api/common-api'
import { _downUrl } from '@/api/apiConfig'

    @Component({
      name: 'goods-input',
      components: {
        baseUploadFile: () => import('@/components/base-upload-file/index.vue')
      }
    })
export default class App extends Vue {
        @Prop({ default: false }) disabled: boolean
        @Prop() status: string
        @Prop() formData: any
        uploadAction: string = baseUrl + commonApiUrl.uploadDetailExcel;
        importDisabled:boolean = false;
        queryParam:any = {};
        options:any[] = [
          { label: '尺码竖排导入', value: 'vertical' },
          { label: '尺码横排导入', value: 'horizontal' },
          { label: '条形码导入', value: 'barcode' }
        ];
        // 导入模式选择
        uploadType:any = 'vertical';
        // 导入配置
        uploadProps = {};
        // 深度监听价格类型渠道
        @Watch('formData', { deep: true })
        onChange() {}

        @Watch('uploadType', { deep: true })
        uploadTypeOnChange(value) {
          this.uploadProps = {
            autoUpload: true,
            data: {
              moduleId: globalConfigs.realModuleId,
              type: value,
              queryParam: this.queryParam
            }
          }
        }
        // 下载模板文件
        async downLoadExcel_() {
          if (this.uploadType === 'barcode') {
            this.$message.warning('没有条形码导入模板,请选择其他类型的导入模板！')
          } else {
            try {
              await _downUrl({ url: commonApiUrl.getImportModel, params: {
                moduleId: globalConfigs.realModuleId,
                type: this.uploadType
              }, fileName: '样式模板文件.xlsx' })
            } catch (err) {
              console.log('err', err)
            }
          }
        }
        // 反馈结果
        success(res) {
          if (res.code === 0) {
            const record = res.data.recordList
            record.forEach((item) => {
              item.goodsFields = {
                goodsBuildDate: '',
                goodsStyleName: ''
              }
              if (item.customFieldMap) {
                for (const k in item.customFieldMap) {
                  item[k] = item.customFieldMap[k]
                }
              }
              item.quantity = item.billSizeList.reduce((x, em) => {
                return x + Object.keys(em).reduce((a, y) => {
                  return a + Number((y.match(/^s\d+/) ? em[y] || 0 : 0))
                }, 0)
              }, 0)
            })
            record.forEach(item => {
              (this.$parent as any).goodsInput(item, true)
            })
          }
        }

        get showInput() {
          return (!['detail', 'cancel', ''].includes(this.status))
        }
        ClickEvent() {
          // 校验价格类型/渠道类型
          const { channelId, priceTypeId } = this.formData.salePlain
          if (!channelId || !priceTypeId) {
            this.$message.warning('请选择价格类型/渠道')
            return
          }
          this.queryParam = JSON.stringify({
            priceTypeId, channelId
          })
          this.uploadProps = {
            autoUpload: true,
            data: {
              moduleId: globalConfigs.realModuleId,
              type: this.uploadType,
              queryParam: this.queryParam
            }
          };
          (this.$refs['upload'] as any).open()
        }
}
</script>

<style scoped lang="scss">
    .file-import {
        display: inline-block;
    }
</style>
