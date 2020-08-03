<template>
  <div :class="{'has-logo': showLogo}">
    <sidebar-logo
      :isCollapse="isCollapse" />
    <header-search
      v-show="!isCollapse"
      class="right-menu-item" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical">
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import SidebarItem from './SidebarItem.vue'
import SidebarLogo from './SidebarLogo.vue'
import variables from '@/styles/variables.scss'
import HeaderSearch from '@/components/header-search/index.vue'

@Component({
  name: 'SideBar',
  components: {
    SidebarItem,
    SidebarLogo,
    HeaderSearch
  }
})
export default class extends Vue {
  get sidebar() {
    return this.$store.state.app.sidebar
  }

  get routes() {
    return this.$store.state.permission.routers
  }

  get showLogo() {
    return this.$store.state.settings.showSidebarLogo
  }

  // get menuActiveTextColor() {
  //   if (SettingsModule.sidebarTextTheme) {
  //     return SettingsModule.theme
  //   } else {
  //     return variables.menuActiveText
  //   }
  // }

  get variables() {
    return variables
  }

  get activeMenu() {
    const route = this.$route
    const { meta, path } = route
    // if set path, the sidebar will highlight the path you set
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
  }

  get isCollapse() {
    return !this.sidebar.opened
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - 50px);
  }
}

.el-menu {
  border: none;
  height: 100%;
  width: 100% !important;
}
</style>
