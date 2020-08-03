<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData"
      @save="save" />
    <!-- 表单列表 -->
    <formlist
      ref="formlist"
      :formList="formList"
      :formData="formData"
      :disabled="v_disabled"
      :status="v_status"
      class="form-module mgt-12" />
    <!-- 权限分配 -->
    <dataset-group
      ref="datasetGroup"
      :disabled="v_disabled">
      <div slot="title">
        <base-title
          :ref="anchorConfig[0].ref"
          :title="$t(anchorConfig[0].lang)" />
      </div>
    </dataset-group>
    <!-- 用户分配 -->
    <user-group
      ref="userGroup"
      :disabled="v_disabled">
      <div slot="title">
        <base-title
          :ref="anchorConfig[1].ref"
          :title="$t(anchorConfig[1].lang)" />
      </div>
    </user-group>
    <!-- 锚点导航 -->
    <base-anchor
      :anchor="anchorConfig"
      :element="$refs" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig, tabsConfig, initFormData } from './configs'
import { Dictionary } from '@/typings'
import { Watch } from 'vue-property-decorator'
import apiUrl from '@/api/permission/dataset'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import detailMixins from '@/mixins/detail-mixins'
@Component({
  name: 'dataset-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    datasetGroup: () => import('./tabs/dataset-group.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    userGroup: () => import('./tabs/user-group.vue')
  }
})
export default class detail extends mixins(vuexMixins, detailMixins) {
  formList = detailConfig.formList
  formData: any = initFormData()
  anchorConfig = detailConfig.anchorConfig

  // 观察 ID
  @Watch('v_id', { immediate: true })
  onv_idChange(val) {
    if (val) this.viewDetail(val.split('_')[0])
  }

  @Watch('v_status')
  onv_statusChange(val, oldval) {
    if (['add', 'cancel'].includes(val)) this.reset()
  }

  // 查看详情
  async viewDetail(id) {
    const res = await this._get({ url: `${apiUrl.checkDeatil}/${id}` })
    const { authResp, data: formdata, userList } = res.data
    this.formData = formdata
    ;(this.$refs.datasetGroup as any).getDatasetGroupData(authResp)

    this.$nextTick(() => {
      ;(this.$refs.userGroup as any).getUserGroupData(userList)
      // ;(this.$refs.datasetGroup as any).getDatasetGroupData(authResp)
    })
    // 0 禁用 => 10 ,1 启用 => 11
    // const status = formdata.enableStatus ? '11' : '10'
    // const status = this.formData ? '11' : '10'
    this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, this.formData.status + '')
    // this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, formdata.status + '')
  }
  // 重置
  // TODO: 重置需优化 => 把存放的数据都储存在一个对象里面 集中处理清空数据逻辑
  reset() {
    this.formData = initFormData()
    this.$nextTick(() => {
      ;(this.$refs.userGroup as any).reset([])
      ;(this.$refs.datasetGroup as any).getDatasetGroupData({
        goodsList: [],
        mainChannelList: [],
        minorChannelList: [],
        supplierList: []
      })
    })
  }
  // 保存
  async save() {
    await (this.$refs.formlist as any).saveTable()
    const confirmText = this.$t('dialogPrompt.save')

    this._confirm({ content: confirmText }).then(async() => {
      const datasetGroup = (this.$refs.datasetGroup as any).save()
      const userGroup = (this.$refs.userGroup as any).transformTable()
      const saveData = {
        data: {
          authResp: datasetGroup,
          data: this.formData,
          userList: userGroup
        }
      }
      const url = this.v_status === 'add' ? apiUrl.creatDataset : apiUrl.updatedDataset
      const res = await this._post({ url, data: saveData })
      if (res.code === 0) this.m_dealSaveAction(res)
    }).catch(() => {
    })
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
}
</style>
