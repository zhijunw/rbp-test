<template>
  <div>
    <slot name="title" />
    <formlist
      ref="form"
      :formList="userFormList"
      :disabled="v_disabled"
      :formData="formData" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { tabsConfig } from '../configs'
import { Prop } from 'vue-property-decorator'
import vuexMixins from '@/mixins/vuex-modulel-mixins'

@Component({
  name: 'user-group',
  components: {
    formlist: () => import('@/components/formlist/index.vue')
  }

})
export default class detail extends mixins(vuexMixins) {
  userFormList = tabsConfig.userConfig.list
  @Prop({ default: () => {} }) formData:any
  async validateForm() {
    return await (this.$refs.form as any).saveTable()
  }
}
</script>

<style scoped lang="scss"></style>
