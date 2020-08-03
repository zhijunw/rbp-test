import { Component, Vue, Watch } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import store from '@/store'

const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({
  name: 'ResizeMixin'
})
export default class extends Vue {
  @Getter('sidebar') sidebar
  @Getter('device') device

  @Watch('$route')
  private onRouteChange() {
    if (this.device === 'mobile' && this.sidebar.opened) {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }

  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  }

  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  }

  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  }

  private isMobile() {
    const rect = document.body.getBoundingClientRect()
    return rect.width - 1 < WIDTH
  }

  private resizeHandler() {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')
      if (isMobile) {
        store.dispatch('app/closeSideBar', { withoutAnimation: true })
      }
    }
  }
}
