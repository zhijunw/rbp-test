import commonModule, { CommonState } from '@/store/modules/common-module'
import { globalConfigs } from './index'
import { Vue, Component } from 'vue-property-decorator'

const rigistModule = {
  namespaced: true,

  state() {
    return {
      // 这里是通用的 vuex
      ...commonModule.state(),
      deliverType: 'deliveryByorder'
    }
  },

  mutations: {
    // 这里是通用的 vuex
    ...commonModule.mutations,
    SET_DELIVERTYPE(state, deliveryType: any) {
      state.deliverType = deliveryType
    }
  },

  actions: {
    ...commonModule.actions
  }
}
@Component({})
export default class registVuexModule extends Vue {
  created() {
    console.log('this.router', this.$route.meta)
    if (!this.$store.state[this.$route.meta.moduleId]) {
      this.$store.registerModule(this.$route.meta.moduleId, rigistModule)
    }
  }

  activated() {
    console.log('执行 activated', this.$route.meta.moduleId)
    if (!this.$store.state[this.$route.meta.moduleId]) {
      this.$store.registerModule(this.$route.meta.moduleId, rigistModule)
    }
  }

  deactivated() {
    console.log('失活 deactivated', this.$route.meta.moduleId)
    if (!this.$store.state[this.$route.meta.moduleId]) {
      this.$store.registerModule(this.$route.meta.moduleId, rigistModule)
    }
  }

  beforeDestroy() {
    if (this.$store.state[this.$route.meta.moduleId]) {
      this.$store.unregisterModule(this.$route.meta.moduleId)
    }
  }
}
