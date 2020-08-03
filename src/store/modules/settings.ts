import defaultSettings from '@/settings'

const { showSettings, showTagsView, fixedHeader, showSidebarLogo } = defaultSettings

export interface ISettingsState {
  // theme: string
  fixedHeader: boolean
  showSettings: boolean
  showTagsView: boolean
  showSidebarLogo: boolean
}

const state: ISettingsState = {
  // theme: variables.theme,
  showSettings: showSettings,
  showTagsView: showTagsView,
  fixedHeader: fixedHeader,
  showSidebarLogo: showSidebarLogo
}

const mutations = {
  CHANGE_SETTING: (state: ISettingsState, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data: any) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
