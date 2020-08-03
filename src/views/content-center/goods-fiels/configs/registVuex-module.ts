import commonModule, { CommonState } from '@/store/modules/common-module'
import { Vue, Component } from 'vue-property-decorator'

const rigistModule = {
  namespaced: true,

  state() {
    return {
      // 这里是通用的 vuex
      ...commonModule.state(),
      v_detailConfig: {},
      v_sizeKeyData: []

    }
  },

  mutations: {
    // 这里是通用的 vuex
    ...commonModule.mutations,
    SET_DETAIL_CONFIG(state: CommonState, data: any) {
      state.v_detailConfig = data
    },
    SET_SIZE_KEY_DATA(state: CommonState, data: any) {
      state.v_sizeKeyData = data
    }

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

