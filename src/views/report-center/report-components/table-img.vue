<template>
  <div class="table-image">
    <div
      class="image-warrper"
      @mouseenter.prevent="enterImage(imageSrc, $event)"
      @mouseleave="leaveImage">
      <img
        :src="imageSrc"
        alt="商品图片"
        class="image">
    </div>
    <transition
      name="fade"
      mode="out-in">
      <div
        v-if="showImgSrc"
        class="show-img"
        :style="{ top: `${showImgTop}px`, left: `${showImgLeft}px` }">
        <img :src="showImgSrc">
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'

@Component({
  name: 'table-image',
  components: {
  }
})
export default class App extends Vue {
  @Prop({ required: true }) imageSrc: string
  showImgSrc: string = ''
  showImgTop: number = 0
  showImgLeft: number = 0
  expandLeft: number = 0

  enterImage(src, e) {
    const { clientX, clientY, offsetX, offsetY, target } = e
    const { offsetWidth, offsetHeight, childNodes } = target
    const { clientWidth } = childNodes[0]
    const left = clientX - offsetX + ((offsetWidth - clientWidth) / 2 + clientWidth + 10)
    const top = clientY - offsetY + (offsetHeight / 2 - 82)
    this.showImgLeft = left
    this.showImgTop = top
    this.showImgSrc = src
  }
  leaveImage() {
    this.showImgSrc = ''
  }
}
</script>

<style scoped lang="scss">
 .image-warrper {
    display: flex;
    align-items: center;
    justify-content: center;
    .image {
      width: 48px;
      height: 48px;
    }
  }
  .show-img {
  position: fixed;
  width: 164px;
  height: 164px;
  z-index: 1000;
  img {
    width: inherit;
    height: inherit;
  }
}
</style>
