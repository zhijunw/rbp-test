<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar" />
    <!-- <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    /> -->
    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <!-- <header-search class="right-menu-item" /> -->
        <error-log class="errLog-container right-menu-item hover-effect" />
        <screenfull class="right-menu-item hover-effect" />
        <!-- <lang-select class="right-menu-item hover-effect" /> -->
        <theme class="right-menu-item hover-effect" />
        <header-notice class="right-menu-item hover-effect" />
      </template>
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click">
        <div class="avatar-wrapper">
          <svg-icon name="user_avatar" />
          <span class="username">{{ name }}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              {{ $t('navbar.dashboard') }}
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span
              style="display:block;"
              @click="logout">{{ $t('navbar.logOut') }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import Breadcrumb from '@/components/breadcrumb/index.vue'
import Hamburger from '@/components/hamburger/index.vue'

// import HeaderSearch from '@/components/header-search/index.vue'
import ErrorLog from '@/components/error-log/index.vue'
import LangSelect from '@/components/lang-select/index.vue'
import Theme from '@/components/theme/index.vue'
import Screenfull from '@/components/screenfull/index.vue'
import headerNotice from '@/components/header-notice/index.vue'

import SizeSelect from '@/components/size-select/index.vue'
import { getCookie } from '@/utils/auth'

@Component({
  name: 'Navbar',
  components: {
    Breadcrumb,
    ErrorLog,
    Hamburger,
    Theme,
    headerNotice,
    // HeaderSearch,
    LangSelect,
    Screenfull,
    SizeSelect
  }
})
export default class extends Vue {
  get sidebar() {
    return this.$store.state.app.sidebar
  }

  get device() {
    return this.$store.state.app.device
  }
  get name() {
    return getCookie('userName')
  }
  get avatar() {
    return this.$store.state.user.avatar
  }

  private toggleSideBar() {
    this.$store.dispatch('app/toggleSideBar')
  }

  private async logout() {
    await this.$store.dispatch('user/logout')
    this.$router.push(`/login?redirect=${this.$route.fullPath}`)
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 36px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    padding: 0 15px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;
    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 24px;
          height: 24px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -13px;
          top: 15px;
          font-size: 12px;
        }
        .username{
          font-size: 14px;
          margin-left: 6px;
          color: #24283F;
        }
      }
    }
  }
}
</style>
