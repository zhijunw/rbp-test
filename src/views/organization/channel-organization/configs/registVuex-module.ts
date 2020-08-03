import commonModule, { CommonState } from '@/store/modules/common-module'
import { Vue, Component } from 'vue-property-decorator'

const rigistModule = {
  namespaced: true,

  state() {
    return {
      // 这里是通用的 vuex
      ...commonModule.state(),

      // 这个是模块独有的 vuex
      v_isNotice: ''
    }
  },

  mutations: {
    // 这里是通用的 vuex
    ...commonModule.mutations

    // 这个是模块独有的 vuex
    // SET_NOTICE_SHOW(state: CommonState, v_isNotice: boolean) {
    //   state.v_isNotice = v_isNotice
    // }
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
      console.log('渠道档案执行注册')
      this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
      // console.log('渠道档案执行注册')
      // this.$store.registerModule(this.routerMeta.moduleId, rigistModule)
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
