<template>
  <div>
    <operation :formData="formData" />
    <div class="formlist-warrper mgt-12">
      <div
        v-if="v_packingType !=='noDirect'"
        class="related-bill">
        <el-row
          :gutter="36">
          <el-col
            v-for="(item,index) in relatedBillData"
            :key="index"
            :span="6"
            class="related-bill-item">
            <span>{{ item.label }}</span>:<span> {{ item.value }} </span>
          </el-col>
        </el-row>
      </div>
      <formlist
        ref="formlist"
        :formList="formList"
        :formData="formData"
        :disabled="v_disabled"
        class="form-module" />
    </div>
    <common-tabs
      id="tabBox"
      ref="commonTab"
      :tabMapOptions="tabMapOptions"
      :activeName.sync="activeName"
      class="mgt-10 pdb-12">
      <template v-slot:packingDetail>
        <packing-detail
          id="packingDetail"
          ref="packingDetail"
          :formData="formData" />
      </template>
      <template v-slot:freightInfo="{item}">
        <freight-info
          v-if="item.value === activeName"
          ref="freightInfo"
          :formData="formData" />
      </template>
    </common-tabs>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { initFormData, detailConfig } from './configs'
import { Dictionary, CommonConfig } from '@/typings'
import { Watch } from 'vue-property-decorator'
import vuexMixins from './configs/vuex-module'
import apiUrl from '@/api/packingwork/packingworktop'
@Component({
  name: 'packing-worktop-detail',
  components: {
    operation: () => import('./operation.vue'),
    formlist: () => import('@/components/formlist/index.vue'),
    commonTabs: () => import('@/layout-components/common-tabs/index.vue'),
    packingDetail: () => import('./tabs/packing-detail.vue'),
    freightInfo: () => import('./tabs/freight-info.vue')
  }
})
export default class App extends mixins(vuexMixins) {
  formData: Dictionary<any> = initFormData()
  formList = detailConfig.formList
  tabMapOptions = detailConfig.tabsList
  activeName: string = 'packingDetail'

  relatedBillData: Pick<CommonConfig, 'label'| 'value'>[] = [
    {
      label: '关联指令单/类型',
      value: '5626565'
    },
    {
      label: '发货渠道',
      value: '发货渠道啊'
    },
    {
      label: '收货渠道',
      value: '收货渠道啊'
    },
    {
      label: '关联指令单',
      value: '44242'
    }
  ]

  @Watch('v_packingType', { immediate: true })
  onPackingTypeChange(val, oldval) {
    if (val === 'noDirect') {
      this.formList = detailConfig.formList
    } else {
      this.formList = detailConfig.formList.slice(2)
    }
  }
  @Watch('v_detailData', { deep: true, immediate: true })
  onDetailData(val, oldval) {
    if (val && val !== oldval) {
      this.relatedBillData[0].value = `${val.noticeBillNo}/${val.noticeBillTypeName}`
      this.relatedBillData[1].value = `${val.toChannelCode}-${val.toChannelName}`
      this.relatedBillData[2].value = `${val.channelCode}-${val.channelName}`
      this.relatedBillData[3].value = val.oldNoticeBillNo
    }
  }
}
</script>
<style scoped lang="scss">
@import 'src/styles/variables.scss';
.related-bill{
  font-size: 12px;
    background: #f7f8fa;
    padding: 16px 12px 0 12px;
}
</style>
