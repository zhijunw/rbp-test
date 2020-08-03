import { mapState, mapMutations, mapActions } from 'vuex'
import commonModule from './modules/common-module'

export default function(moduleName: string, customVux = { state: [], mutations: [], actions: [] }) {
  const commonVuex: any = {}
  Object.keys(commonModule).forEach(key => {
    if (key === 'state') {
      commonVuex[key] = Object.keys(commonModule[key]())
    } else {
      commonVuex[key] = Object.keys(commonModule[key])
    }
  })

  const states = [...commonVuex.state, ...customVux.state]

  const mutation = [...commonVuex.mutations, ...customVux.mutations]

  const actions = [...commonVuex.actions]

  return {
    computed: {
      ...mapState(moduleName, states)
    },
    methods: {
      ...mapMutations(moduleName, mutation),
      ...mapActions(moduleName, actions)
    }
  }
}
