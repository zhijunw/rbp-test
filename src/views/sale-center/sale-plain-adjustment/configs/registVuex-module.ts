import commonModule, { CommonState } from '@/store/modules/common-module'
import { Vue, Component } from 'vue-property-decorator'
const rigistModule = {
  namespaced: true,

  state() {
    return {
      // 这里是通用的 vuex
      ...commonModule.state()
    }
  },

  mutations: {
    // 这里是通用的 vuex
    ...commonModule.mutations
  },

  actions: {
    ...commonModule.actions
  }
}
@Component({})
export default class registVuexModule extends Vue {
  get routerMeta() {
    return this.$route.meta
  }
  created() {
    if (!this.$store.state[this.routerMeta.moduleId]) {
      console.log('销售计划调整 created', this.routerMeta.moduleId)
      this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
    }
  }
  activated() {
    if (!this.$store.state[this.routerMeta.moduleId]) {
      console.log('销售计划调整 activated', this.routerMeta.moduleId)
      this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
    }
  }
  deactivated() {
    if (!this.$store.state[this.routerMeta.moduleId]) {
      console.log('销售计划 deactivated', this.routerMeta.moduleId)
      this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
    }
  }
}
