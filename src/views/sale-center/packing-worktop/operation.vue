<template>
  <div class="sticky detail-btn">
    <div class="handle-btn-group">
      <el-button
        v-for="item in outerLayerBtns"
        :id="item.id || ''"
        :key="item.name"
        :icon="item.icon"
        :type="item.type || ''"
        :plain="item.plain ? true : false"
        :class="[{ warningClass: warningBtn.includes(item.value) }, item.class]"
        @click="handleEvent(item.value, item.lang, item.interface)">
        <i
          v-if="!item.hiddenIcon"
          class="iconfont f14"
          :class="item.svgIcon" />
        <span :class="[!item.hiddenIcon ? 'mgl-6' : '']">{{ $t(item.lang) }}</span>
      </el-button>
      <!-- 打印 -->
      <el-dropdown
        v-if="printBtns.length > 0"
        size="small"
        trigger="click"
        placement="bottom"
        :hide-on-click="false">
        <el-button
          type="text"
          class="prev-btn">
          <i class="iconfont f14 rbp-operate_print " />
          <span class="mgl-6">{{ $t('operationGroup.btns.print') }}</span>
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in printList"
            :key="item.id"
            class="hover print-list">
            <span
              class="f12 hover"
              @click="printPlain(item)">{{ item.templateName }}</span>
            <span
              class="f12 color-info mgl-6"
              @click="preview(item)">{{ $t('commonWord.preview') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-button
        v-for="item in rightBtns"
        :id="item.id || ''"
        :key="item.name"
        :icon="item.icon"
        :type="item.type || ''"
        :plain="item.plain ? true : false"
        :class="[{ warningClass: warningBtn.includes(item.value) }, item.class]"
        @click="handleEvent(item.value, item.lang, item.interface)">
        <i
          v-if="!item.hiddenIcon"
          class="iconfont f14"
          :class="item.svgIcon" />
        <span :class="[!item.hiddenIcon ? 'mgl-6' : '']">{{ $t(item.lang) }}</span>
      </el-button>
    </div>

    <createbox-dialog :dialogObj="createboxDialogConfig" />

    <finishbox-dialog :dialogObj="finishboxDialogConfig" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component, { mixins } from 'vue-class-component'
import { detailConfig } from './configs'
import vuexMixins from './configs/vuex-module'
import { Watch, Prop } from 'vue-property-decorator'
import { DetailOperationConfig, Dictionary, ListBtnApiConfig, DialogObj } from '@/typings'
import commonApi from '@/api/common-api/index'
const RIGHT_BTNS = ['refresh', 'close']

const PRINT_BTNS = ['print']
@Component({
  name: 'detail-operation',
  components: {
    detailOperation: () => import('@/layout-components/detail-operation/index.vue'),
    createboxDialog: () => import('./components/createbox-dialog.vue'),
    finishboxDialog: () => import('./components/finish-dialog.vue')
  }
})
export default class detail extends mixins(vuexMixins) {
  @Prop({ required: true }) formData: Dictionary
  permissBtnList: DetailOperationConfig[] = []
  btnList = detailConfig.btns
  outerLayerBtns: DetailOperationConfig[] = []
  rightBtns: DetailOperationConfig[] = []
  printBtns: DetailOperationConfig[] = []
  warningBtn: any[] = []
  printList: any[] = []
  createboxDialogConfig: DialogObj = {
    isShowDialog: false,
    title: '',
    modalAppendToBody: true,
    appendToBody: true,
    width: '30%'
  }
  finishboxDialogConfig: DialogObj = {
    isShowDialog: false,
    title: '',
    modalAppendToBody: true,
    appendToBody: true,
    width: '30%'
  }
  @Watch('btnList', { immediate: true })
  onBtnListChange(val, newVal) {
    if (val.length) {
      const outerLayer = [...RIGHT_BTNS, ...PRINT_BTNS]
      this.outerLayerBtns = val.filter((item) => !outerLayer.includes(item.value))
      this.rightBtns = val.filter((item) => RIGHT_BTNS.includes(item.value))
      this.printBtns = val.filter((item) => PRINT_BTNS.includes(item.value))
    }
  }
  handleEvent(event, name, config) {
    if (event === 'createBox' || event === 'finishBox') {
      this[event]()
      return
    }
    this.$emit(event, Object.assign({}, config, { name }))
  }
  createBox() {
    this.createboxDialogConfig.isShowDialog = true
    this.createboxDialogConfig.title = this.$t('packingWorktop.detail.createBoxDialog.title')
  }
  finishBox() {
    this.finishboxDialogConfig.isShowDialog = true
    this.finishboxDialogConfig.title = this.$t('packingWorktop.detail.finishDialog.title')
  }
}
</script>

<style scoped lang="scss">
@import 'src/styles/variables.scss';
@import 'src/styles/common-detail-operation.scss';
.handle-btn-group {
  background: #fff;
  height: 44px;
  line-height: 44px;
  padding-right: 16px;
  .status-box {
    float: right;
    font-size: 14px;
  }
  /deep/.el-button--text {
    color: $colorTextPrimary;
    padding: 7px 0 7px 20px !important;
    &:hover {
      color: $basic;
    }
  }
  /deep/ .warningClass.el-button--text {
    &:hover {
      color: $danger;
    }
  }
  /deep/.el-button.is-disabled {
    color: $colorTextPlaceholder;
  }
  /deep/.el-button + .el-button {
    margin-left: 0;
  }
  /deep/.is-disabled.is-plain {
    background-color: #fff !important;
    border-color: #eee !important;
    color: $colorTextPlaceholder !important;
    &:hover {
      background-color: #fff !important;
      border-color: #eee !important;
      color: $colorTextPlaceholder !important;
    }
  }
  .status-box {
    display: flex;
    flex-direction: column;
    line-height: 1;
    align-items: center;
    height: 44px;
    justify-content: space-around;
  }
  .status {
    color: $success;
    padding: 7px 0;
  }
  .prev-btn {
    position: relative;
    margin-left: 20px !important;
    &::before {
      position: absolute;
      top: 6px;
      left: 0;
      content: '';
      width: 1px;
      height: 20px;
      background: $borderColorBase;
    }
  }
}
</style>
