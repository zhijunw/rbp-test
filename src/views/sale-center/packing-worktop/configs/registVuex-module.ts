import commonModule, { CommonState } from '@/store/modules/common-module'
import { Vue, Component } from 'vue-property-decorator'
import { Dictionary } from '@/typings'
const rigistModule = {
  namespaced: true,

  state() {
    return {
      // 这里是通用的 vuex
      ...commonModule.state(),
      v_packingType: '',
      v_detailData: {},
      v_formData: {}
    }
  },

  mutations: {
    // 这里是通用的 vuex
    ...commonModule.mutations,
    // 设置装箱类型
    SET_PACKING_TYPE(state, type: string) {
      state.v_packingType = type
    },
    SET_DETAIL_DATA(state, data: Dictionary) {
      state.v_detailData = data
    },
    SET_FORMDATA(state, data: Dictionary) {
      state.v_formData = data
    }
  },

  actions: {
    ...commonModule.actions,
    addFn({ commit }, boxType: string) {
      commit(`SET_ACTIVENAME`, 'detail')
      commit(`SET_READ_STATUS`, false)
      commit(`SET_PACKING_TYPE`, boxType)
    }
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
