<template>
  <div
    :class="{ collapse: isCollapse }"
    class="sidebar-logo-container">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="isCollapse"
        class="sidebar-logo-link"
        to="/">
        <img
          src="@/assets/login_images/logo.png"
          class="collapse-sidebar-logo">
      </router-link>
      <router-link
        v-else
        class="sidebar-logo-link"
        to="/">
        <img
          src="@/assets/login_images/logo_text.png"
          class="sidebar-logo">
      </router-link>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  name: 'SidebarLogo'
})
export default class extends Vue {
  @Prop({ required: true }) private isCollapse: boolean

  private title = 'RBP'
}
</script>

<style lang="scss" scoped>
@import 'src/styles/variables.scss';

.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 56px;
  line-height: 56px;
  // background: $menuBg;
  text-align: center;
  overflow: hidden;
  padding-left: 12px;
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    text-align: left;

    & .sidebar-logo {
      width: 55px;
      height: 25px;
      vertical-align: middle;
    }
    & .collapse-sidebar-logo{
       width: 18px;
      height: 25px;
      vertical-align: middle;
    }

    & .sidebar-title {
      display: block;
      text-align: left;
      margin: 0;
      color: #fff;
      font-weight: bold;
      line-height: 56px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      // vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
