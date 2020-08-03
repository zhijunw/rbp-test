<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        {{ $t('settings.title') }}
      </h3>

      <div class="drawer-item">
        <span>{{ $t('settings.theme') }}</span>
        <!-- <theme-picker
          style="float: right;height: 26px;margin: -3px 8px 0 0;"
          @change="themeChange"
        /> -->
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.showTagsView') }}</span>
        <el-switch
          v-model="tagsView"
          class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.showSidebarLogo') }}</span>
        <el-switch
          v-model="showSidebarLogo"
          class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t('settings.fixedHeader') }}</span>
        <el-switch
          v-model="fixedHeader"
          class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import ThemePicker from '@/components/ThemePicker/index.vue'

@Component({
  name: 'Settings',
  components: {
    // ThemePicker
  }
})
export default class extends Vue {
  get fixedHeader() {
    return this.$store.state.settings.fixedHeader
  }

  set fixedHeader(value) {
    this.$store.dispatch('settings/changeSetting', {
      key: 'fixedHeader',
      value: value
    })
  }

  get tagsView() {
    return this.$store.state.settings.tagsView
  }

  set tagsView(val) {
    this.$store.dispatch('settings/changeSetting', {
      key: 'tagsView',
      value: val
    })
  }

  get showSidebarLogo() {
    return this.$store.state.settings.sidebarLogo
  }

  set showSidebarLogo(val) {
    this.$store.dispatch('settings/changeSetting', {
      key: 'sidebarLogo',
      value: val
    })
  }

  private themeChange(val: string) {
    this.$store.dispatch('settings/changeSetting', {
      key: 'theme',
      value: val
    })
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
