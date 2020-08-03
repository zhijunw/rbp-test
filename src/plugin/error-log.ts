
import Vue from 'vue'
import { isArray, isString } from '@/utils/validate'
import settings from '@/settings'
import store from '@/store'
const { errorLog: needErrorLog } = settings

const checkNeed = () => {
  const env = process.env.NODE_ENV

  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes((env as string))
  }
  return false
}

if (checkNeed()) {
  Vue.config.errorHandler = function(err, vm, info) {
    Vue.nextTick(() => {
      store.dispatch('errorLog/addErrorLog', {
        err,
        vm,
        info,
        url: window.location.href
      })
    })
  }
}
