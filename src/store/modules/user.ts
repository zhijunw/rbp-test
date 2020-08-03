
import { login, getInfo, logout } from '@/api/user'
import { getToken, setToken, setCookie, getCookie, removeToken, removeCookie } from '@/utils/auth'
// import { resetRouter } from '@/router'
import { _axios } from '@/api/apiConfig'

interface IUserState {
  token: string,
  name: string,
  avatar: string
  moduleIds: string[],
  socketInfo: any[]
}
const state: IUserState = {
  token: getToken(),
  name: '',
  moduleIds: [],
  socketInfo: [],
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
}

const mutations = {
  SET_TOKEN: (state: IUserState, token: string) => {
    state.token = token
  },
  SET_NAME: (state: IUserState, name: string) => {
    state.name = name
  },
  SET_AVATAR: (state: IUserState, avatar: string) => {
    state.avatar = avatar
  },
  SET_MODULEIDS(state: IUserState, moduleIds: string[]) {
    state.moduleIds = moduleIds
  },
  PUSH_SOCKET_INFO(state:IUserState, socketInfo: any) {
    const index = state.socketInfo.findIndex((item) => item.id === socketInfo.id)
    if (index > -1) {
      state.socketInfo.splice(index, 1, socketInfo)
    } else {
      state.socketInfo.push(socketInfo)
    }
  },
  DELETE_SOCKET_INFO(state:IUserState, socketInfo: any) {
    const index = state.socketInfo.findIndex((item) => item.id === socketInfo.id)
    index > -1 && state.socketInfo.splice(index, 1)
  },
  DELETE_SOCKET_INFO_ALL(state:IUserState, socketInfo:any) {
    state.socketInfo = socketInfo
  }
}

const actions = {
  login({ commit }: any, userInfo: any) {
    const { userNo, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userNo, password }).then((response: any) => {
        const { data: { token, userName, userNo, userId, refreshToken }} = response
        commit('SET_TOKEN', token)
        setCookie('refreshToken', refreshToken)
        setCookie('userName', userName)
        setCookie('userId', userId)
        setCookie('userNo', userNo)
        commit('SET_NAME', userName)
        setToken(token)
        resolve()
      }).catch((error: any) => {
        reject(error)
      })
    })
  },

  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo()
        .then(response => {
          const { data } = response

          if (!data) {
            reject('验证失败，请重新登录.')
          }

          const { moduleTreeStructureDtos: menulist, userSaveDto: { user }} = data

          const menuIds = menulist.map((item: any) => {
            return item.moduleId + ''
          })

          commit('SET_NAME', user.name)

          // commit('SET_MODULEIDS', menuIds)
          commit('SET_MODULEIDS', ['6001', '6002', '2000'])

          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },
  // user logout
  logout({ commit, state }) {
    const refreshToken = getCookie('refreshToken')
    return new Promise((resolve, reject) => {
      _axios({ url: '/auth/logout', method: 'delete', params: { refreshToken }}).then(() => {
        commit('SET_TOKEN', '')
        removeToken()
        removeCookie('refreshToken')
        removeCookie('userName')
        removeCookie('userId')
        removeCookie('userNo')
        resolve()
      }).catch((error: any) => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

