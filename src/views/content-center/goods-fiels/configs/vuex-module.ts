import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class vuexMixins extends Vue {
  v_vuexStore: any = {}
  created() {
    // const state = this.$store.state[this.$route.meta.moduleId]
    this.$nextTick(() => {
      // 这里是根据vuex 在用一个对象进行接受  因为用 计算属性 moduleId 变了 计算属性也会跟着变 导致后面 watch v_status 也会再次执行
      this.v_vuexStore = this.$store.state[this.$route.meta.moduleId]
    })
  }

  get m_moduleId() {
    return this.$route.meta.moduleId
  }
  get v_activeName() {
    return this.v_vuexStore.v_activeName
  }
  get v_btnsAuth() {
    return this.v_vuexStore.v_btnsAuth
  }
  get v_disabled() {
    return this.v_vuexStore.v_disabled
  }
  get v_refreshListTable() {
    return this.v_vuexStore.v_refreshListTable
  }
  get v_status() {
    return this.v_vuexStore.v_status
  }
  get v_id() {
    return this.v_vuexStore.v_id
  }
  get v_turnBoundary() {
    return this.v_vuexStore.v_turnBoundary
  }
  get v_billStatus() {
    return this.v_vuexStore.v_billStatus
  }
  get v_resetDetail() {
    return this.v_vuexStore.v_resetDetail
  }
  get v_detailConfig() {
    return this.v_vuexStore.v_detailConfig
  }
  get v_sizeKeyData() {
    return this.v_vuexStore.v_sizeKeyData
  }
  get v_permission() {
    return this.v_vuexStore.v_permission
  }
}
