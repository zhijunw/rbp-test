<template>
  <div>
    <slot name="title" />
    <formlist
      ref="formlist"
      :formList="channelFormList"
      :formData="channelFormData"
      :disabled="disabled"
      :status="status" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'channel-group',
  components: {
    formlist: () => import('@/components/formlist/index.vue')
  }
})
export default class detail extends Vue {
  @Prop({ required: true }) channelFormData : object
  @Prop({ default: false }) disabled: boolean
  @Prop({ required: true }) channelFormList
  @Prop() status
}
</script>

<style scoped lang="scss"></style>
