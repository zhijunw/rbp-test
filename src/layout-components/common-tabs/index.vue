<template>
  <el-tabs
    id="commonTab"
    v-model="activeTab"
    class="common-tab"
    type="card"
    @tab-click="tabClick">
    <el-tab-pane
      v-for="item in tabMapOptions"
      :id="item.value"
      :key="item.value"
      :label="$t(item.lang)"
      :name="item.value">
      <keep-alive>
        <slot
          :name="item.value"
          :item="item" />
      </keep-alive>
      <!-- <keep-alive>
        <slot
          name="tabs"
          :item="item" />
      </keep-alive> -->
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'common-tab',
  components: {
    sticky: () => import('@/layout-components/sticky/index.vue')
  }
})
export default class detail extends Vue {
  @Prop({ required: true }) tabMapOptions
  @Prop({ required: true }) activeName: string

  @Watch('activeName', { immediate: true })
  onActiveNameChange(val) {
    this.activeTab = val
  }

  activeTab: string = ''
  offsetTop: number = 0

  tabClick(val, $event) {
    this.$emit('update:activeName', val.name)
  }
}
</script>

<style lang="scss">
@import 'src/styles/variables.scss';

.common-tab {
  // /deep/ .el-tabs__content{
  //   padding-bottom: 8px;
  // }
  /deep/ .el-tabs__header {
    margin: 0 0 12px 0;
  }
  /deep/.el-tabs__header /deep/.el-tabs__nav {
    border: none;
  }
  /deep/.el-tabs__item {
    height: 32px;
    line-height: 32px;
    text-align: center;
    padding: 0 16px !important;
    border: 1px solid #eee !important;
    margin-right: 2px;
    border-radius: 2px 2px 0px 0px;
    border-bottom: none !important;
    color: $colorTextPlaceholder;
  }
  /deep/.el-tabs__item.is-active {
    border-bottom-color: #eee;
    font-weight: bold;
    color: $basic;
    box-shadow: 0px 2px 8px 0px rgba(166, 167, 173, 0.5);
  }
  /deep/.el-tabs__item:first-child {
    border-left: #eee;
  }
}
.is_fixed {
  /deep/.el-tabs__header {
    position: sticky;
    top: 177px;
    z-index: 1002;
    width: 100%;
    background: #fff;
  }
}
.el-tabs__nav {
  margin-left: 6px;
}
</style>
