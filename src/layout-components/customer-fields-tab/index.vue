<template>
  <div class="customer-tabs">
    <base-title
      :title="tabTitle" />
    <formlist
      ref="formlist"
      :formList="formList"
      :formData="customerFormdata"
      :disabled="disabled"
      :status="status"
      class="mgt-12" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { Dictionary, FormItemConfig } from '@/typings'
import { Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'customer-fields-tabs',
  components: {
    baseTitle: () => import('@/components/base-title/index.vue'),
    formlist: () => import('@/components/formlist/index.vue')

  }
})
export default class App extends Vue {
  @Prop({ required: true }) tabTitle: string
  @Prop({ required: true }) formList: FormItemConfig[]
  @Prop({ required: true }) customerFormdata: Dictionary
  @Prop({ required: true }) disabled
  @Prop({ required: true }) status
}
</script>
<style scoped lang="scss">

</style>
