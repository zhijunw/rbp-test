
import Cookies from 'js-cookie'
import variables from '@/styles/variables.scss'

// export enum DeviceType {
//   Mobile,
//   Desktop,
// }
export interface IAppState {
  device: string
  sidebar: {
    opened: boolean
    withoutAnimation: boolean
  }
  language: string
  size: string
}
const state: IAppState = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  language: Cookies.get('language') || 'zh',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: (state: IAppState) => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
      // variables.sideBarWidth = '180px'
    } else {
      Cookies.set('sidebarStatus', 0)
      // variables.sideBarWidth = '30px'
    }
  },
  CLOSE_SIDEBAR: (state: IAppState, withoutAnimation: boolean) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state: IAppState, device: string) => {
    state.device = device
  },
  SET_LANGUAGE: (state: IAppState, language: string) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_SIZE: (state: IAppState, size: string) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device: string) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language: string) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size: string) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
