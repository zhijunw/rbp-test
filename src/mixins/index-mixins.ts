import { Vue, Component } from 'vue-property-decorator'
import { TabIndex } from '@/typings'

@Component({})
export default class indexMixins extends Vue {
  m_showTab: boolean = true
  m_activeName: TabIndex = 'list'
  m_moduleName: string

  created() {
    this.m_moduleName = this.$route.meta.moduleId
  }
  m_changeTab(tabName: TabIndex) {
    this.m_activeName = tabName
    // ;(this as any).SET_ACTIVENAME(tabName)
    this.$store.commit(`${this.m_moduleName}/SET_ACTIVENAME`, tabName)
  }
}
