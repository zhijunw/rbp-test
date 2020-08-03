<template>
  <formlist
    ref="formlist"
    :formList="formList"
    :formData="formData.billLogistics"
    :disabled="v_disabled"
    :status="v_status"
    class="form-module mgt-12" />
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'

import { Prop, Watch } from 'vue-property-decorator'
import { detailConfig } from '../configs'
import vuexMixins from '@/mixins/vuex-modulel-mixins'
import { Dictionary } from '@/typings'

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
}
</script>

<style scoped>

</style>
