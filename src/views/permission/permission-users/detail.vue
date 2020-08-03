<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation
      :formData="formData"
      @save="save" />
    <!-- 表格列表 -->
    <formlist
      ref="formRef"
      :formList="formList"
      :disabled="v_disabled"
      :formData="formData"
      class="form-module mgt-12" />
    <!-- 用户资料 -->
    <user-group
      ref="userRef"
      :formData="formData">
      <template v-slot:title>
        <base-title
          :ref="anchor[0].ref"
          :title="$t(anchor[0].lang)" />
      </template>
    </user-group>
    <!-- 用户角色 -->
    <character-group ref="characterGroup">
      <template v-slot:title>
        <base-title
          :ref="anchor[1].ref"
          :title="$t(anchor[1].lang)" />
      </template>
    </character-group>
    <!-- 数据集 -->
    <dataset-group ref="datasetGroup">
      <template v-slot:title>
        <base-title
          :ref="anchor[2].ref"
          :title="$t(anchor[2].lang)" />
      </template>
    </dataset-group>
    <!-- 锚点导航 -->
    <base-anchor
      :element="$refs"
      :anchor="anchor" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import vuexMixins from './configs/vuex-module'
import { detailConfig, tabsConfig } from './configs'
import { Watch } from 'vue-property-decorator'
import detailMixins from '@/mixins/detail-mixins'
import apiUrl from '@/api/permission/usersPermission'
import { Dictionary } from '@/typings'
@Component({
  name: 'usersPermission-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    userGroup: () => import('./tabs/user-group.vue'),
    characterGroup: () => import('./tabs/character-group.vue'),
    datasetGroup: () => import('./tabs/dataset-group.vue')
  }
})
export default class detail extends mixins(detailMixins, vuexMixins) {
    @Watch('v_id', { immediate: true, deep: true })
  onv_idChange(val) {
    if (val) this.viewDetail(val.split('_')[0])
  }
  @Watch('v_status')
    onv_statusChange(val, oldval) {
      if (['add', 'cancel'].includes(val)) this.reset()
    }
  formList = detailConfig.formList
  formData:Dictionary<any> = {}
  anchor = tabsConfig.anchorConfig.list

  reset() {
    // for (const k in this.formData) {
    //   this.formData[k] = ''
    // }
    this.formData = {}
    this.$nextTick(() => {
      ;(this.$refs.characterGroup as any).getCharacterGroupData([])
      ;(this.$refs.datasetGroup as any).getDatasetGroupData([])
    })
  }
  async viewDetail(id) {
    const res = await this._get({ url: `${apiUrl.getUsersItem}/${id}` })
    const { roleInfos, user: formdata, dataInfos } = res.data
    this.formData = formdata
    ;(this.$refs.characterGroup as any).getCharacterGroupData(roleInfos)
    ;(this.$refs.datasetGroup as any).getDatasetGroupData(dataInfos)
    // const status = formdata.enableStatus ? '11' : '10'
    const status = this.formData.status
    this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, status + '')
  }
  async validateForm() {
    const result = await (this.$refs.formRef as any).saveTable()
    const resultUser = await (this.$refs.userRef as any).validateForm()
    if (result && resultUser) {
      return true
    }
    return false
  }
  async save() {
    let response:any
    const validateResult = await this.validateForm()
    const roleIds = (this.$refs.characterGroup as any).roleInfos.map(val => val.id).filter((item) => item)
    const dataIds = (this.$refs.datasetGroup as any).dataInfos.map(val => val.id).filter((item) => item)
    if (validateResult) {
      const saveData = {
        data: {
          user: this.formData,
          roleIds,
          dataIds
        }
      }
      if (this.v_status === 'add') {
        response = await this._post({ url: apiUrl.createUsers, data: saveData })
      } else {
        response = await this._put({ url: apiUrl.updateUsers, data: saveData })
      }
      if (response.code === 0) {
        this.m_dealSaveAction(response)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
}
</style>
