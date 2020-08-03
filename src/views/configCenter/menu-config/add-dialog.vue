<template>
  <base-dialog
    :dialog-obj="dialogObj"
    class="base-dialog"
    @confirm="confirm">
    <div
      slot="content"
      class="box">
      <el-form
        ref="form"
        label-position="top"
        :rules="rules"
        class="category-form"
        size="mini"
        label-width="80px"
        :model="formData">
        <el-form-item
          prop="name"
          label="分类名称">
          <el-input
            v-model="formData.name"
            size="mini" />
        </el-form-item>
        <el-form-item
          v-if="formData.depth === 1"
          label="分类图标"
          prop="icon">
          <el-select
            v-model="formData.icon"
            size="mini"
            style="width: 100%"
            popper-class="icon-select"
            placeholder="请选择">
            <el-option
              v-for="item in iconList"
              :key="item"
              :value="item">
              <div class="options-list">
                <!-- <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span> -->
                <svg-icon
                  :name="item"
                  className="w20 h20 mgr-6 bd-e" />
              </div>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </base-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Options, Dictionary, DialogObj } from '@/typings'
import { iconList } from './configs'
import apiUrl from '@/api/config-center/menu-config'

@Component({
  name: 'add-category',
  components: {
    baseDialog: () => import('@/components/base-dialog/index.vue'),
    formList: () => import('@/components/formlist/index.vue')
  }
})
export default class tableheaderConfig extends Vue {
  @Prop() dialogObj: DialogObj
  @Prop({ default: { name: '', icon: '' }}) formData: Dictionary
  iconList = iconList
  //   formData = {
  //     name: '',
  //     icon: ''
  //   }
  rules = {
    name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }],
    icon: [{ required: true, message: '请选择分类图标', trigger: 'change' }]
  }
  confirm() {
    (this.$refs['form'] as any).validate((valid) => {
      if (valid) {
        this.save()
      } else {
        console.log('error submit!!')
      }
    })
  }
  async save() {
    const url = this.formData.edit ? apiUrl.update : apiUrl.create
    const action = this.formData.edit ? '_put' : '_post'
    const res = await this[action]({ url, data: {
      data: {
        ...this.formData
      }
    }})
    if (res.code === 0) {
      const successMessage = this.formData.edit ? 'edit' : 'save'
      // 设置页面状态
      this._message({ message: this.$t('commonWord.actionSuccess', { action: this.$t('operationGroup.btns')[successMessage] }), type: 'success' })
      this.$emit('refresh')
      this.dialogObj.isShowDialog = false
    }
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
.icon-select {
  width: 200px;
}
.icon-select .el-select-dropdown__item {
  display: inline-block;
  width: 25%;
}
</style>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.box {
  display: flex;
  padding: 16px 0;
  color: $colorTextRegular;
}
.category-form{
    width: 100%;
    /deep/.el-form-item{
        margin-bottom: 12px;
    }
    /deep/.el-form-item__label{
        font-size: 14px;
        padding: 0;
    }
}
</style>
