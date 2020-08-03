
import Vue from 'vue'
import Router, { Route } from 'vue-router'

// 一般路由
import constantRouters from './modules/constantRouters'
// 业务中心
import businessCenter from './modules/businessCenter/index'
// 报表中心
import reportCenter from './modules/reportCenter/index'
Vue.use(Router)

export const routerDictionaryMap = {
  700001: 'salePlain',
  700002: 'salePlainAdjustment'
}

export interface RouterMetaConfig {
  title: string,
  routerId: string,
  moduleId: string,
  affix?: boolean,
  noCache?: boolean,
  icon?: string,
  hidden?: boolean,
  isNotTranslateTitle?: boolean // 是否不通过$t翻译title
}
export interface RouterConfig extends Partial<Route> {
  path: string,
  component :any,
  redirect?: any,
  hidden?: true,
  name?: string,
  children?: RouterConfig[]
  meta?: Partial<RouterMetaConfig>
}

export const constantRouterMap = constantRouters

// export const asyncRouterMap = { businessCenter, reportCenter }
export const asyncRouterMap = { businessCenter, reportCenter }

export const routerMap = [...businessCenter, ...reportCenter, {
  path: '*',
  redirect: '/404',
  hidden: true
}]

const router = new Router({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: constantRouterMap
  // mode: 'hash'
})
// router.addRoutes(routerMap)
export default router
