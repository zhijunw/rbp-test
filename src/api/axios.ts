// import axios from 'axios'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import baseUrl from './baseUrl'
import router from '@/router'
import {
  Message,
  Loading
} from 'element-ui'

import {
  getToken,
  getCookie,
  removeToken,
  setToken
} from '@/utils/auth'
const config = {

  baseURL: baseUrl

  // headers: {
  //   get: {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
  //   },
  //   post: {
  //     'Content-Type': 'application/json;charset=utf-8'
  //   }
  // }
  // timeout: 120 * 1000 // Timeout
}
// eslint-disable-next-line no-unused-vars
const _axios = axios.create(config)

const DELAY = 200
let timer: any, loadingInstance: any
_axios.interceptors.request.use(

  function(config:AxiosRequestConfig) {
    const token = getToken()
    const refreshToken = getCookie('refreshToken')
    config.headers.Lang = getCookie('language') || 'zh_CHS'
    if (token) {
      config.headers['Authorization'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    if (refreshToken) {
      config.headers['RefreshToken'] = refreshToken
    }
    // 模块 ID 参数 全局传入
    const moduleId = (router as any).history.current.meta.routerId
    if (moduleId && config.data) {
      // NetNeedModuleId 接口不需要 moduleId 为 true 则不需要加
      if (config.data.NetNeedModuleId) {
        delete config.data.NetNeedModuleId
      } else {
        Object.assign(config.data, { moduleId: moduleId })
      }
    }

    // 全局请求的 loading，当请求 300 ms 后还没返回，才会出现 loading
    clearTimeout(timer)
    timer = setTimeout(() => {
      loadingInstance = Loading.service({
        background: 'rgba(0,0,0,0.05)'
      })
    }, DELAY)
    return config
  },
  function(error) {
    clearTimeout(timer)
    if (loadingInstance) loadingInstance.close()
    Promise.reject(error)
    // error.data = {}
    // error.data.msg = '服务器异常，请联系管理员！'
    // return Promise.resolve(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function(response: AxiosResponse) {
    clearTimeout(timer)
    if (loadingInstance) loadingInstance.close()
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    if (response.config.responseType === 'blob') {
      return response.data
    }
    const res = response.data
    const FIXCODE = [0, 20001, 30001]
    if (!FIXCODE.includes(res.code)) {
      Message({
        type: 'error',
        message: res.msg || res.errorStack,
        duration: 5000
      })
      return Promise.reject('error')
    } else {
      return res
    }
  },
  function(error) {
    clearTimeout(timer)
    if (loadingInstance) loadingInstance.close()
    Message({
      type: 'error',
      message: error.msg || '请求超时或服务器异常，请检查网络或联系管理员'
    })
    return Promise.reject(error)
  }
)

export default _axios
