<template>
  <div class="tree-list">
    <div
      v-for="(item, index) in configList"
      :key="index"
      :ref="item.keyCode"
      class="config-list-box">
      <div
        v-if="item.childChannelSetting.length"
        class="config-list-header">
        <i
          v-if="item.childChannelSetting.length"
          class="common-placeholder el-icon-arrow-down hover"
          @click="toggle(item, index, $event)" />
        <span
          class="flex-1 border-r-1"
          :class="item.parentId === 0 ? 'pdl-10': 'pdl-20'">{{ item.name }}</span>
        <span
          class="flex-1 pdl-10"
          :style="item.parentId === 0 ? 'padding-left:0': ''" />
      </div>
      <template v-if="item.childChannelSetting.length">
        <tree-folder
          :configList="item.childChannelSetting"
          :formData="formData"
          :disabled="disabled" />
      </template>
      <template v-else>
        <div class="config-list-header">
          <span class="common-placeholder" />
          <span
            class="flex-1 border-r-1"
            :class="item.parentId === 0 ? 'pdl-10': 'pdl-20'">
            {{ item.name }}
            <el-tooltip
              v-if="item.description"
              placement="bottom"
              effect="light">
              <div
                slot="content"
                class="tooltip-text">
                {{ item.description }}
              </div>
              <el-button class="iconfont no-brdoer rbp-signal_notice" />
            </el-tooltip>
          </span>
          <div
            class="flex-1 pdl-10 diff-bg"
            :style="item.parentId === 0 ? 'padding-left:0': ''">
            <template v-if="item.dataType === 'input' || item.dataType === 'number'">
              <base-input
                :key="item.keyCode"
                :value.sync="formData[item.keyCode][0]"
                :type="item.type"
                class="diff-input"
                :disabled="disabled" />
            </template>
            <template v-else-if="item.dataType === 'select'">
              <base-select
                :key="item.keyCode"
                class="diff-input"
                :value.sync="formData[item.keyCode][0]"
                :item="{ options: item.channelSettingDataLists }"
                :selectProps="{
                  multiple: false,
                  popperAppendToBody: true
                }"
                :disabled="disabled" />
            </template>
            <template v-else-if=" item.dataType === 'mulitSelect'">
              <base-select
                :key="item.keyCode"
                class="diff-input"
                :value.sync="formData[item.keyCode]"
                :item="{ options: item.channelSettingDataLists }"
                :selectProps="{
                  multiple: true,
                  popperAppendToBody: true
                }"
                :disabled="disabled" />
            </template>
            <template v-else-if="item.dataType === 'checkbox'">
              <el-checkbox
                :key="item.keyCode"
                v-model="formData[item.keyCode][0]"
                :disabled="disabled" />
            </template>
            <template v-else-if="item.dataType === 'datePick'">
              <base-date-picker
                :key="item.keyCode"
                :value.sync="formData[item.keyCode][0]"
                class="diff-input"
                :disabled="disabled" />
            </template>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { Dictionary, AnchorConfig } from '@/typings'
@Component({
  name: 'tree-folder',
  components: {
    baseInput: () => import('@/components/base-input/index.vue'),
    baseAnchor: () => import('@/components/base-anchor/index.vue'),
    baseSelect: () => import('@/components/base-select/index.vue'),
    baseCheckbox: () => import('@/components/base-checkbox/index.vue'),

    baseDatePicker: () => import('@/components/base-datePicker/index.vue')
  }
})
export default class App extends Vue {
  @Prop({ required: true }) configList: any[]
  @Prop() formData: Dictionary
  @Prop({ default: false }) disabled: boolean
  //   @Prop() anchorConfig: AnchorConfig[]

  // selectKey: string = Date.now().toString(36)

  // get componentKeys() {
  //   return this.selectKey
  // }

  get getDisable():boolean {
    return this.disabled
  }

  // 切换显示隐藏
  toggle(item, index, e) {
    const iconClass = e.target.classList
    this.$nextTick(() => {
      const target = this.$refs[item.keyCode][0]
      // console.log('target.classList',Array.from(target.classList))
      if (Array.from(target.classList).includes('expand-close')) {
        target.classList.remove('expand-close')
        iconClass.remove('expand-close-icon')
      } else {
        target.classList.add('expand-close')
        iconClass.add('expand-close-icon')
      }
    })
  }
}
</script>

<style scoped lang="scss">
@media (min-width: 1200px) {
  .config-list {
    min-height: calc(100vh - 230px);
  }
}
/* 大屏幕 ：大于等于1200px*/
@media (min-width: 1440px) {
  .config-list {
    min-height: calc(100vh - 160px);
  }
}
.config-list {
  padding: 12px 16px;

  &-box {
    height: auto;
    transition: height 0.5s ease;
  }
  &-header {
    height: 28px;
    line-height: 28px;
    display: flex;
    font-size: 12px;
    border: 1px solid #eee;
    border-bottom: none;
    // &:last-child{
    //     border-bottom: 1px solid #eee;
    // }
  }
  .common-placeholder {
    width: 32px;
    line-height: 28px;
    text-align: center;
    transition: all 0.5s;
  }
  .bg-e {
    background: #eee;
  }
  .diff-bg {
    background: #f5f9ff;
    /deep/.el-input {
      font-size: 12px;
      padding-left: 20px !important;
    }
    /deep/.el-input__prefix {
      display: inline-block;
      width: 30px;
      left: -10px;
    }
  }
  .border-r-1 {
    border-right: 1px solid #eee;
    border-left: 1px solid #eee;
  }
  .diff-input {
    /deep/.el-input__inner {
      background: #f5f9ff !important;
      border: none !important;
      height: 26px !important;
      line-height: 26px !important;
      padding: 0 !important;
    }
  }
  .expand-close {
    height: 28px;
    overflow: hidden;
    transition: height 0.5s ease;
  }
  .expand-close-icon {
    transform: rotate(-90deg);
    transition: all 0.5s;
  }
  .no-brdoer {
    border: none;
    padding: 0 4px;
    font-size: 14px;
  }
}

</style>
