import { constantRouterMap, asyncRouterMap } from '@/router'
// import { RouterConfig, RouterMetaConfig } from '@/router/index'
import Layout from '@/views/layout/index.vue'

import { Route } from 'vue-router'
import { getRouters } from '@/api/user'
import { Tools } from '@/utils/tools'
import { nest, deepCopy } from '@/utils'
const path = require('path')
export const loadView = (view) => { // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}
// // 过滤没有权限的路由
// function handleAuthRouters(nodes: any[], roleModuleIds: string[]) {
//   return nodes.reduce((prev, next) => {
//     // 验证当前路由 是否有权限
//     const isAuth = roleModuleIds.includes(next.meta.routerId)
//     if (isAuth) {
//       prev.push(next)
//     } else if (next.children) {
//       next.children = handleAuthRouters(next.children, roleModuleIds)
//       next.children && next.children.length && prev.push(next)
//     }

//     return prev
//   }, [])
// }
const flattenRouters = Tools.withChildrenFlattenNoParent([...asyncRouterMap.businessCenter, ...asyncRouterMap.reportCenter])

function filterAsyncRouter(routers: any[]) {
  // 先过滤文件夹 拿到模块数据  moduleId 为空则是文件夹
  const realRouter = routers.filter((item) => item.moduleId)
  // 和本地路由文件匹配 组装得到 标准的路由数据
  const newRouter = realRouter.map((item) => {
    const realRouterObj = flattenRouters.find((k: any) => k.meta.routerId === (item.baseModuleId || item.moduleId))
    return {
      path: item.moduleId,
      // name: `router-${item.baseModuleId || item.moduleId}`,
      name: `router-${item.moduleId}`,
      id: item.id,
      parentId: item.parentId,
      component: realRouterObj && realRouterObj.component,
      meta: {
        title: item.name,
        isNotTranslateTitle: true,
        routerId: item.moduleId,
        baseModuleId: item.baseModuleId,
        // moduleId: item.baseModuleId ? `${item.baseModuleId}-${item.moduleId}` : item.moduleId
        moduleId: item.moduleId
      }
    }
  })
  const fileRouter = routers.filter((item) => !item.moduleId)
  const newFileRouter = fileRouter.map((item) => {
    return {
      path: `/${item.id.toString()}`,
      component: item.depth === 1 ? Layout : loadView('sale-center/worktop/index.vue'),
      id: item.id,
      parentId: item.parentId,
      meta: {
        title: item.name,
        isNotTranslateTitle: true,
        icon: item.icon,
        noCache: true
      }
    }
  })
  return [...newFileRouter, ...newRouter]
}
// 二级以上的菜单降级成二级菜单 主要是解决多级菜单造成的 keep-alive 缓存失效  侧边栏展示还是用三级菜单数据 这里的数据通过 addRouters 注入
const formatRouter = (routes, basePath = '/', list: any = [], parent) => {
  routes.map(item => {
    item.path = path.resolve(basePath, item.path)
    const meta = item.meta || {}
    if (!meta.parent && parent) {
      meta.parent = parent.path
      item.meta = meta
    }
    if (item.redirect) item.redirect = path.resolve(basePath, item.redirect)
    if (item.children && item.children.length > 0) {
      const arr = formatRouter(item.children, item.path, list, item)
      delete item.children
      list.concat(arr)
    }
    list.push(item)
  })
  return list
}

// 菜单降级
export const getFlatRoutes = (routes) => {
  return routes.map((child) => {
    if (child.children && child.children.length > 0) {
      child.children = formatRouter(child.children, child.path, [], child)
    }
    return child
  })
}

export interface IPermissionState {
  routers: Partial<Route>[],
  addRouters: Partial<Route>[],
  roleOperationPermission: string[],
  rolePagePermission: string[]
}

const state: IPermissionState = {
  routers: [],
  addRouters: [],
  roleOperationPermission: [], // 用户操作权限,
  rolePagePermission: [] // 用户页面权限,
}

const mutations = {
  SET_ROLE_OPERATIONPERMISSION(state: IPermissionState, roleOperationPermission: string[]) {
    state.roleOperationPermission = roleOperationPermission
  },

  SET_ROLE_PAGEPERMISSION(state: IPermissionState, rolePagePermission: string[]) {
    state.rolePagePermission = rolePagePermission
  },

  SET_ADDROUTES: (state: IPermissionState, addRouters: Partial<Route>[]) => {
    state.addRouters = addRouters
  },

  SET_ROUTERS: (state: IPermissionState, routers: Partial<Route>[]) => {
    state.routers = routers
  }
}

const actions = {
  // GenerateRoutes({ commit, state, rootState }, activeIndex: string) {
  //   return new Promise(resolve => {
  //     const accessedRoutes = [...asyncRouterMap.businessCenter, ...asyncRouterMap.reportCenter]
  //     commit('SET_ADDROUTES', accessedRoutes)
  //     const routers = constantRouterMap.concat(accessedRoutes)
  //     commit('SET_ROUTERS', routers)
  //     resolve(accessedRoutes)
  //   })
  // }
  GenerateRoutes({ commit, state, rootState }) {
    return new Promise(resolve => {
      getRouters().then(res => {
        const filter = filterAsyncRouter(res.data)
        const accessedRoutes = nest(filter, 0, 'parentId', false)
        // console.log('accessedRoutes', accessedRoutes)
        const flatRoutes = getFlatRoutes(deepCopy(accessedRoutes, 'component'))
        console.log('flatRoutes', flatRoutes)
        commit('SET_ADDROUTES', accessedRoutes)
        const routers = constantRouterMap.concat(accessedRoutes)
        commit('SET_ROUTERS', routers)
        // resolve(accessedRoutes)
        resolve(flatRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
