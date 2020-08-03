<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners" />
  <svg
    v-else
    :class="svgClass"
    aria-hidden="true"
    v-on="$listeners">
    <use :href="iconName" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'
@Component({
  name: 'svg-icon'
})
export default class extends Vue {
    @Prop({ required: true }) name: string
    @Prop({ default: 'w16 h16' }) className: string

    get iconName() {
      return `#icon-${this.name}`
    }
    get isExternal() {
      return isExternal(this.name)
    }

    get svgClass() {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }

    get styleExternalIcon() {
      return {
        mask: `url(${this.name}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.name}) no-repeat 50% 50%`
      }
    }
}
</script>

<style lang='scss' scoped>
.svg-icon {
  // width: 16px;
  // height: 16px;
  vertical-align: sub;
  fill: currentColor;
  overflow: hidden;
}
.svg-external-icon {
  background-color: currentColor;
  mask-size: cover!important;
  display: inline-block;
}
 .add {
  width: 0.5em;
}
</style>
