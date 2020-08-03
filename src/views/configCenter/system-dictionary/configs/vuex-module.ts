import { Vue, Component } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

interface VuexStoreConfig {
  v_activeTab: string
  v_activeTemplate: string
  v_showSection: number
}
@Component({})
export default class vuexMixins extends Vue {
  v_vuexStore:VuexStoreConfig = {
    v_activeTab: 'color',
    v_activeTemplate: 'multTableTemplate',
    v_showSection: 0
  }

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
  get v_activeTab() {
    return this.v_vuexStore.v_activeTab
  }
  get v_activeTemplate() {
    return this.v_vuexStore.v_activeTemplate
  }
  get v_showSection() {
    return this.v_vuexStore.v_showSection
  }
}

