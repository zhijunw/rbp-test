
import { Vue, Component } from 'vue-property-decorator'
const rigistModule = {
  namespaced: true,

  state() {
    return {
      v_activeTab: 'color',
      v_activeTemplate: 'multTableTemplate',
      v_showSection: 0,
      v_refresh: ''
    }
  },

  mutations: {
    SET_ACTIVETAB(state: any, activeTabs: string) {
      state.v_activeTab = activeTabs
    },
    SET_ACTIVE_TEMPLATE(state: any, activeTemplate: string) {
      state.v_activeTemplate = activeTemplate
    },
    SET_SHOW_SECTION(state: any, showSection: any) {
      state.v_showSection = showSection
    },
    SET_REFRESH(state: any, v_refresh: Date) {
      state.v_refresh = v_refresh
    }
  },

  actions: {}
}
@Component({})
export default class registVuexModule extends Vue {
  get routerMeta() {
    return this.$route.meta
  }
  created() {
    if (!this.$store.state[this.routerMeta.moduleId]) {
      this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
    }
  }
  activated() {
    console.log('执行 activated', this.routerMeta.moduleId)
    if (!this.$store.state[this.routerMeta.moduleId]) {
      this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
    }
  }
  deactivated() {
    console.log('失活 deactivated', this.routerMeta.moduleId)
    if (!this.$store.state[this.routerMeta.moduleId]) {
      this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
    }
  }
}
