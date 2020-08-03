<template>
  <formlist
    ref="formlist"
    :formList="formList"
    :formData="formData.billLogistics"
    :disabled="v_disabled"
    :status="v_status"
    class="form-module mgt-12"
    @country="countryChange"
    @province="provinceChange"
    @city="cityChange" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'

import { Prop, Watch } from 'vue-property-decorator'
import { detailConfig } from '../configs'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

import { Dictionary } from '@/typings'
import apiUrl from '@/api/sale-center/distribution-plain'

@Component({
  name: 'goods-freight',
  components: {
    formlist: () => import('@/components/formlist/index.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  @Prop({ required: true }) formData
  formList = detailConfig.freight

  freightData: Dictionary = {}

  // 国家/区域 修改时后三者需要清空[]
  async countryChange({ val }) {
    this.resetArea(['province', 'city', 'county'])
    this.setLowerArea('country', val)
  }
  // 省
  async provinceChange({ val }) {
    this.resetArea(['city', 'county'])
    this.setLowerArea('province', val)
  }
  // 市
  async cityChange({ val }) {
    this.resetArea(['county'])
    this.setLowerArea('city', val)
  }
  // 选择格式化
  selectFormat(array:any[], label:string, value:string) {
    return array.map(em => {
      return {
        label: em[label],
        value: em[value].toString()
      }
    })
  }
  // 区域接口公共调用
  async areaRequite(parentId) {
    const res = await this._post({ url: `${apiUrl.areaDropDown}?parentId=${parentId || '6907360287458560'}` })
    return this.selectFormat(res.data, 'name', 'id')
  }
  // 重置某个区域
  resetArea(nameArray) {
    nameArray.forEach(name => {
      this.formData.billLogistics[name] = ''
      const target = this.formList.find(item => { return item.value === name })
      target && (target.options = [])
    })
  }
  // 设置下级区域
  async setLowerArea(area, parentId) {
    const map = { country: 'province', province: 'city', city: 'county' }
    const target = this.formList.find(item => { return item.value === map[area] })
    target && (target.options = await this.areaRequite(parentId))
  }
  // 详情进来时校验
  async detailCheck({ country, province, city }) {
    country && this.setLowerArea('country', country)
    province && this.setLowerArea('province', province)
    city && this.setLowerArea('city', city)
  }
  // 读取物流公司下拉选项
  async getDropDownConfig() {
    // 物流公司
    const res = await this._get({ url: apiUrl.getSelect, params: { moduleId: this.m_moduleId }})
    const { logisticsCompanyIds } = res.data
    const target = this.formList.find(item => { return item.label === '物流公司' })
    target && (target.options = this.selectFormat(logisticsCompanyIds, 'name', 'id'))
    // 国家区域
    // target = this.formList.find(item=> {return item.label === '国家/地区'});
    // target && (target.options = await this.areaRequite(false))
  }

  created() {
    this.getDropDownConfig()
  }
}
</script>

<style scoped>

</style>
