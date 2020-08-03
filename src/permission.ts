import router from './router'
import store from './store'
import VueRouter from 'vue-router'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import { Route } from 'vue-router'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to:Route, from:Route, next: any) => {
  NProgress.start()
  const hasToken = getToken()
  const permission_routers = store.state.permission.routers

  window.document.title = 'RBP系统'

  // console.log('permission_routers', permission_routers)
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      console.log('permission_routers.length', permission_routers.length)
      if (permission_routers.length) {
        next()
      } else {
        try {
          // await store.dispatch('user/getInfo')
          // await store.dispatch('permission/GenerateRoutes', 'businessCenter')
          // next({ ...to, replace: true })
          store.dispatch('permission/GenerateRoutes').then(accessRoutes => {
            router.addRoutes(accessRoutes) // 动态添加可访问路由表
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        } catch (error) {
          console.log('error', error)
          await store.dispatch('user/resetToken')
          Message.error(error.toString() || 'Has Error')
          // this._message({ message: error.toString(), type: 'error'})
          next({ path: '/' })
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
