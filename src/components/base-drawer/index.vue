<template>
  <div class="drawer-content">
    <el-drawer
      :visible.sync="config.isShowDrawer"
      :direction="config.direction"
      :show-close="config.isshowClose"
      :before-close="cancel"
      :wrapperClosable="config.wrapperClosable"
      :modal-append-to-body="config.modalAppendToBody"
      :append-to-body="config.appendToBody"
      :modal="config.modal"
      class="drawer"
      size="45%"
      v-on="$listeners">
      <div
        slot="title"
        class="drawer-title flex-space">
        <p>{{ $t(config.title) }}</p>
        <div class="btn-group">
          <el-button @click="cancel">
            {{ $t('layout.btns.cancel') }}
          </el-button>
          <el-button @click="reset">
            {{ $t('layout.btns.reset') }}
          </el-button>
          <el-button
            type="primary"
            @click="query">
            {{ $t('layout.btns.filter') }}
          </el-button>
        </div>
      </div>
      <slot name="content">
        <form-list
          :formList="$attrs.formList"
          :formData="$attrs.formData"
          class="form-list"
          v-on="$listeners" />
      </slot>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit, Watch } from 'vue-property-decorator'
import { DrawerConfig } from '@/typings'
const DEFAULT_CONFIG: DrawerConfig = {
  isShowDrawer: false,
  direction: 'rtl',
  title: 'layout.btns.filters',
  isshowClose: false,
  wrapperClosable: true,
  modalAppendToBody: false,
  appendToBody: false,
  modal: true
}
@Component({
  name: 'base-drawer',
  components: {
    formList: () => import('@/components/formlist/index.vue')
  }
})
export default class baseDrawer extends Vue {
  @Prop() drawerObj: DrawerConfig

  @Watch('drawerObj', { immediate: true, deep: true })
  onValueChanged(val: DrawerConfig, oldVal: DrawerConfig) {
    this.config = Object.assign(DEFAULT_CONFIG, val)
  }

  config: DrawerConfig = DEFAULT_CONFIG

  cancel() {
    this.$set(this.drawerObj, 'isShowDrawer', false)
  }
  reset() {
    // this.$set(this.drawerObj, 'isShowDrawer', false)
    this.$emit('reset')
  }
  query() {
    this.$set(this.drawerObj, 'isShowDrawer', false)

    this.$emit('query')
  }
}
</script>
<style lang="scss" scoped>
.drawer-content {
  /deep/.v-modal {
    left: 180px;
    top: 70px;
  }
}
.drawer {
  /deep/.el-drawer__header {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    padding: 14px 16px;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.el-drawer__header {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12);
}
.el-dialog__wrapper {
  top: 70px;
  left: $sideBarWidth;
}
.drawer {
  position: fixed;
  top: 70px;
  left: $sideBarWidth;
  right: 0;
  bottom: 0;
  overflow: auto;
  margin: 0;
  // z-index: 2107 !important;
}

.el-drawer__body .query-module {
  background: #fff;
}
.drawer {
  .form-list {
    padding: 14px 16px;
  }
  /deep/.el-drawer__body {
    overflow: auto;
  }
}
</style>
