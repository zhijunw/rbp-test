<template>
  <div>
    <p
      class="goods"
      @contextmenu.prevent="openMenu($event)">
      采购收货
    </p>
    <ul
      v-show="visible"
      :style="{ left: left + 'px', top: top + 'px' }"
      class="contextmenu">
      <li>1</li>
    </ul>
    <!-- <el-input v-model="input"></el-input> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
@Component({
  name: 'purchaseGoods'
})
export default class App extends Vue {
@Watch('visible')
  private onVisibleChange(value: boolean) {
    if (value) {
      document.body.addEventListener('click', this.closeMenu)
    } else {
      document.body.removeEventListener('click', this.closeMenu)
    }
  }

  visible: boolean = false
  private top: number = 0
  private left: number = 0
  openMenu(e) {
    console.log(`e`, e)
    const menuMinWidth = 105
    const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
    const offsetWidth = (this.$el as HTMLElement).offsetWidth // container width
    const maxLeft = offsetWidth - menuMinWidth // left boundary
    const left = e.clientX - offsetLeft + 15 // 15: margin right
    if (left > maxLeft) {
      this.left = maxLeft
    } else {
      this.left = left
    }
    this.top = e.clientY - 60
    this.visible = true
  }
  private closeMenu() {
    this.visible = false
  }
}
</script>
<style lang="scss" scoped>
.goods {
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 24px;
  line-height: 24px;
  // border: 1px solid #d8dce5;
  background: #f5f5f7;
  padding: 0 8px;
  font-size: 12px;
  margin-left: 5px;
  margin-top: 4px;
  &:hover {
    cursor: pointer;
  }
}
.contextmenu {
  margin: 0;
  background: #fff;
  z-index: 3000;
  position: absolute;
  list-style-type: none;
  padding: 5px 0;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 400;
  color: #333;
  box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

  li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
}
</style>
