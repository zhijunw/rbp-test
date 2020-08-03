<template>
  <div class="app-container-warrper">
    <!-- <div class="fixed-bar" /> -->
    <div class="app-container">
      <div class="container-tabs-module">
        <el-menu
          class="menu-group"
          :default-active="layoutActiveTab"
          mode="horizontal"
          @select="changeTab">
          <el-menu-item
            v-for="tab in configs.tabs"
            :key="tab.value"
            :index="tab.value"
            class="f16">
            {{ $t(tab.lang) }}
          </el-menu-item>
        </el-menu>
      </div>
      <div class="menu-tabs">
        <slot v-if="showTab" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { TabIndex } from '@/typings'

@Component({
  name: 'common-index'
})
export default class commonIndex extends Vue {
    @Prop({ default: 'list', required: true }) layoutActiveTab: TabIndex

    @Prop({ required: true }) configs: any

    @Prop({ default: false, required: true }) showTab: boolean

    changeTab(tabName) {
      this.$emit('change-tab', tabName)
    }
}
</script>

<style lang="scss" scoped>
@import "src/styles/common-index.scss";
</style>
