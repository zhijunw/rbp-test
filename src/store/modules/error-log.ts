interface IErrorLog {
  err: string
  vm: any
  info: string
  url: string
}
interface IErrorLogState {
  logs: IErrorLog[]
}
const state: IErrorLogState = {
  logs: []
}

const mutations = {
  ADD_ERROR_LOG: (state: IErrorLogState, log: IErrorLog) => {
    state.logs.push(log)
  },
  CLEAR_ERROR_LOG: (state: IErrorLogState) => {
    state.logs.splice(0)
  }
}

const actions = {
  addErrorLog({ commit }, log: IErrorLog) {
    commit('ADD_ERROR_LOG', log)
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_ERROR_LOG')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
