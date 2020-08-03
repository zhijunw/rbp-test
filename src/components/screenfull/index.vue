<template>
  <div id="screenfull">
    <svg-icon
      :name="isFullscreen ? 'exit-fullscreen' : 'top_full_scream'"
      @click="click" />
  </div>
</template>

<script lang="ts">
import screenfull from 'screenfull'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'Screenfull'
})
export default class extends Vue {
  private isFullscreen = false
  mounted() {
    this.init()
  }
  beforeDestory() {
    this.destroy()
  }
  private click(): void | boolean {
    if (!screenfull.enabled) {
      this.$message({
        message: 'you browser can not work',
        type: 'warning'
      })
      return false
    }
    screenfull.toggle()
  }
  private change() {
    this.isFullscreen = screenfull.isFullscreen
  }
  private init() {
    if (screenfull.enabled) {
      screenfull.on('change', this.change)
    }
  }
  private destroy() {
    if (screenfull.enabled) {
      screenfull.off('change', this.change)
    }
  }
}
</script>
