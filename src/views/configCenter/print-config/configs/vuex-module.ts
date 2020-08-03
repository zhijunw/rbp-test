import { Vue, Component } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

@Component({})
export default class vuexMixins extends Vue {
  get m_moduleId() {
    return this.$route.meta.moduleId
  }
  get v_activeTab() {
    return this.$store.state[this.$route.meta.moduleId].v_activeTab
  }
  get v_activeTemplate() {
    return this.$store.state[this.$route.meta.moduleId].v_activeTemplate
  }
  get v_showSection() {
    return this.$store.state[this.$route.meta.moduleId].v_showSection
  }
  get v_refresh() {
    return this.$store.state[this.$route.meta.moduleId].v_refresh
  }
}
