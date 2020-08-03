<template>
  <div class="detail">
    <!-- 操作栏 -->
    <operation @save="save" />
    <!-- 表格列表 -->
    <formlist
      :formList="formList"
      :formData="formData"
      :disabled="v_disabled"
      class="form-module mgt-12" />
    <!--    &lt;!&ndash;平台编号设置&ndash;&gt;-->
    <!--    <platform-number-setting :contactsList="[]" :disabled="false"/>-->
    <!--    &lt;!&ndash; 锚点导航 &ndash;&gt;-->
    <base-anchor
      :element="$refs"
      :anchor="anchor" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component'
import { detailConfig, tabsConfig, initFormData } from './configs'
import { Watch } from 'vue-property-decorator'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

import detailMixins from '@/mixins/detail-mixins'
import apiUrl from '@/api/organization-center/logistics'
import { Dictionary } from '@/typings'

@Component({
  name: 'channelOrganization-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    baseTitle: () => import('@/components/base-title/index.vue'),
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    platformNumberSetting: () => import('./tabs/platform-Number-Setting.vue')
  }
})
export default class detail extends mixins(vuexMixins, detailMixins) {
  formList = detailConfig.formList
  formData: Dictionary<any> = initFormData()
  anchor = tabsConfig.anchorConfig.list

  // 双击表单行获取详情
  @Watch('v_id', { immediate: true })
  async onRolesDetailIdChanged(val) {
    if (val) {
      const id = val.split('_')[0]
      this.getLogisticsCompanyDetail(id)
    }
  }

  // 新增？编辑
  @Watch('v_status')
  onv_statusChange(val, oldval) {
    console.log('val', val, 'oldVal', oldval)
    if (['add', 'cancel'].includes(val)) this.reset()
  }

  // 获取物流公司资料详情
  async getLogisticsCompanyDetail(id: string) {
    const res = await this._get({
      url: apiUrl.detail + '/' + id
    })
    if (res.code === 0) {
      const data = res.data
      this.formData = data
      this.$store.dispatch(`${this.m_moduleName}/v_setBtnsAuth`, data.status + '')
    }
  }

  // 修改保存[创建][上下页切换]
  async save() {
    const confirmText = this.$t('dialogPrompt.save')
    this._confirm({ content: confirmText })
      .then(async() => {
        let data = JSON.parse(JSON.stringify(this.formData))
        const url = this.v_status === 'add' ? apiUrl.create : apiUrl.update
        this.v_status === 'add' &&
          (() => {
            const Dictionary = data.formData
            delete data.formData
            data = { ...Dictionary, ...data }
          })()
        const res =
          this.v_status === 'add'
            ? await this._post({ url, data: { data }})
            : await this._put({ url, data: { data }})
        if (res.code === 0) this.m_dealSaveAction(res)
      })
      .catch(() => {})
  }

  // 重置
  reset() {
    this.formData = initFormData()
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
.detail {
  background: #fff;
}
</style>
