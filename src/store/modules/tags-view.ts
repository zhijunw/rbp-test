import { Route } from 'vue-router'

// 规定 ITageView 的 key 只能是 Route 的 key 并且新加 title 熟悉
export interface ITagView extends Partial<Route> {
  title?: string
  name?: string
}
export interface ITagsViewState {
  visitedViews: ITagView[]
  cachedViews: (string | undefined)[]
  relationName: string
}
const state: ITagsViewState = {
  visitedViews: [],
  cachedViews: [],
  relationName: '' // 跳转到关联模块的routeName
}

const mutations = {
  // 如果没在访问中则把 当前路由 加入缓存中
  ADD_VISITED_VIEW: (state: ITagsViewState, view: ITagView) => {
    if (state.visitedViews.some((v) => v.path === view.path)) return
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name'
      })
    )
  },
  // 如果没在缓存中则把 当前路由 加入缓存中 这里要和组件的 name 保持一直 不然 kepp-alive 不会生效
  ADD_CACHED_VIEW: (state: ITagsViewState, view: ITagView) => {
    if (state.cachedViews.includes(view.name)) return
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name)
    }
    // if (state.cachedViews.includes(view.path)) return
    // if (!view.meta.noCache) {
    //   state.cachedViews.push(view.path)
    // }
  },
  // 删除该 访问 路由
  DEL_VISITED_VIEW: (state: ITagsViewState, view: ITagView) => {
    // const index = state.visitedViews.findIndex((v) => v.path === view.path)
    const index = state.visitedViews.findIndex((v) => v.meta.moduleId === view.meta.moduleId)
    index > -1 && state.visitedViews.splice(index, 1)
    // for (const [i, v] of state.visitedViews as any).entries()) {
    //   console.log('i, v: ', i, v, view)
    //   if (v.path === view.path) {
    //     state.visitedViews.splice(i, 1)
    //     break
    //   }
    // }
  },
  //   删除 缓存 路由
  DEL_CACHED_VIEW: (state: ITagsViewState, view: ITagView) => {
    // 因为 父模块衍生之后的 子 moduleId 的组件 name 都是设置的父模块的 需要判断一下缓存内还有没有 当前删除路由 的 moduleId
    const hasParent = state.visitedViews.some(
      (viewItem) => viewItem.meta.baseModuleId === view.meta.baseModuleId
    )
    if (hasParent) return
    const index = state.cachedViews.indexOf(view.name)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  // 删除 除了当前路由的其他访问路由 affix => 固定的不能删除的
  DEL_OTHERS_VISITED_VIEWS: (state: ITagsViewState, view: ITagView) => {
    state.visitedViews = state.visitedViews.filter((v) => {
      return v.meta.affix || v.path === view.path
    })
  },
  // 删除 除了当前路由的其他访问路由 affix => 固定的不能删除的

  DEL_OTHERS_CACHED_VIEWS: (state: ITagsViewState, view: ITagView) => {
    const index = state.cachedViews.indexOf(view.name)
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1)
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = []
    }
  },
  //  删除所有路由 除了固定的路由
  DEL_ALL_VISITED_VIEWS: (state: ITagsViewState) => {
    // keep affix tags
    const affixTags = state.visitedViews.filter((tag) => tag.meta.affix)
    state.visitedViews = affixTags
  },
  DEL_ALL_CACHED_VIEWS: (state: ITagsViewState) => {
    state.cachedViews = []
  },

  UPDATE_VISITED_VIEW: (state: ITagsViewState, view: ITagView) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view)
        break
      }
    }
  },
  SET_RELATIONNAME: (state: ITagsViewState, name: string) => {
    state.relationName = name
  }
}

const actions = {
  // 点击路由的时候 同时 添加 访问和缓存
  addView({ dispatch }, view: ITagView) {
    dispatch('addVisitedView', view)
    dispatch('addCachedView', view)
  },
  addVisitedView({ commit }, view: ITagView) {
    commit('ADD_VISITED_VIEW', view)
  },
  addCachedView({ commit }, view: ITagView) {
    commit('ADD_CACHED_VIEW', view)
  },

  delView({ dispatch, state }, view: ITagView) {
    return new Promise((resolve) => {
      dispatch('delVisitedView', view)
      dispatch('delCachedView', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delVisitedView({ commit, state }, view: ITagView) {
    return new Promise((resolve) => {
      commit('DEL_VISITED_VIEW', view)
      resolve([...state.visitedViews])
    })
  },
  delCachedView({ commit, state }, view: ITagView) {
    return new Promise((resolve) => {
      commit('DEL_CACHED_VIEW', view)
      resolve([...state.cachedViews])
    })
  },

  delOthersViews({ dispatch, state }, view: ITagView) {
    return new Promise((resolve) => {
      dispatch('delOthersVisitedViews', view)
      dispatch('delOthersCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delOthersVisitedViews({ commit, state }, view: ITagView) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_VISITED_VIEWS', view)
      resolve([...state.visitedViews])
    })
  },
  delOthersCachedViews({ commit, state }, view: ITagView) {
    return new Promise((resolve) => {
      commit('DEL_OTHERS_CACHED_VIEWS', view)
      resolve([...state.cachedViews])
    })
  },

  delAllViews({ dispatch, state }, view: ITagView) {
    return new Promise((resolve) => {
      dispatch('delAllVisitedViews', view)
      dispatch('delAllCachedViews', view)
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews]
      })
    })
  },
  delAllVisitedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_VISITED_VIEWS')
      resolve([...state.visitedViews])
    })
  },
  delAllCachedViews({ commit, state }) {
    return new Promise((resolve) => {
      commit('DEL_ALL_CACHED_VIEWS')
      resolve([...state.cachedViews])
    })
  },

  updateVisitedView({ commit }, view: ITagView) {
    commit('UPDATE_VISITED_VIEW', view)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
