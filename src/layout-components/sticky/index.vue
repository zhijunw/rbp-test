<template>
  <div
    class="sticky"
    :style="getPosition">
    <div class="sticky-warp">
      <slot />
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
export default class detail extends Vue {
  get getPosition() {
    var position = this.cssSupport('position', 'sticky') ? 'sticky' : 'relative'
    return 'position:' + position
  }

  mounted() {
    this.init()
  }
  deactivated() {
    if (this.cssSupport('position', 'sticky')) {
      return
    }
    /* 复位*/
    var elWarp: any = this.$el.querySelector('.sticky-warp')
    elWarp.position = 'absolute'
  }
  init() {
    if (this.cssSupport('position', 'sticky')) {
      return
    }
    var el = this.$el
    var target = this.$el.parentNode
    var elWarp: any = this.$el.querySelector('.sticky-warp')
    var top = this.getNumberValue(document.defaultView!.getComputedStyle(el).top)!
    this.addScrollListen(target, (event) => {
      if (el.getBoundingClientRect().top <= top) {
        elWarp.style.position = 'fixed'
      }
      if (el.getBoundingClientRect().top >= 0 && elWarp.style.position !== 'absolute') {
        elWarp.style.position = 'absolute'
      }
    })
  }
  cssSupport(attr, value) {
    var element = document.createElement('div')
    if (attr in element.style) {
      element.style[attr] = value
      return element.style[attr] === value
    } else {
      return false
    }
  }
  getNumberValue(pxValue) {
    var value = String(pxValue).match(/^\-?\+?[0-9]+/g)
    return value ? Number(value) : undefined
  }
  addScrollListen(target, cb) {
    target.addEventListener('y-scroll', (event) => {
      cb && cb(event)
    })
  }
}
</script>

<style>
.sticky {
  width: 100%;
}
.sticky .sticky-warp {
  width: 100%;
  background: inherit;
  will-change: change;
  height: inherit;
  top: inherit;
}
</style>
