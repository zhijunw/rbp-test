import axios from './axios'

type Method =
  | 'post'
  | 'POST'
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'put'
  | 'PUT'
  | 'fetch'
  | 'FETCH'
import { Message, Loading } from 'element-ui'
import { Dictionary } from '@/typings'
import baseUrl from './baseUrl'
export interface AxiosConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  fileName?: string
}
export function _axios({ url, method = 'post', data, params }: AxiosConfig) {
  return axios({
    url,
    method,
    data,
    params
  })
}
export function _downaxios({ url, method = 'post', data, params, fileName }: AxiosConfig) {
  return new Promise(async(resolve, reject) => {
    const res = await axios({
      url,
      method,
      data,
      params,
      responseType: 'blob'
    })
    const content = res.data
    const blob = new Blob([content])

    if (!fileName) {
      reject(Message.error('必须有带后缀名的文件名'))
      return
    }
    if (navigator.msSaveBlob) {
      // IE10+下载
      navigator.msSaveBlob(blob, fileName)
    } else if ('download' in document.createElement('a')) {
      // 非IE下载
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    } else {
      const iframe = document.createElement('iframe')
      iframe.src = URL.createObjectURL(blob)
      document.body.appendChild(iframe)
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000 * 3)
    }
    resolve(true)
  })
}
export function _downUrl({ url, method = 'post', data, params, fileName }: AxiosConfig) {
  return new Promise(async(resolve, reject) => {
    const res: any = await axios({
      url,
      method,
      data,
      params
    })
    const content = res.data
    if (res.code !== 0) return
    if (!fileName) {
      reject(Message.error('必须有带后缀名的文件名'))
      return
    }
    download(fileName, content)
    resolve(true)
  })
}
export function download(fileName: string, content: string, cancelBaseUrl?:boolean) {
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = cancelBaseUrl ? content : `${baseUrl}${content}`
    document.body.appendChild(elink)
    elink.click()
    URL.revokeObjectURL(elink.href) // 释放URL 对象
    document.body.removeChild(elink)
  } else {
    const iframe = document.createElement('iframe')
    iframe.src = `${baseUrl}${content}`
    document.body.appendChild(iframe)
    setTimeout(() => {
      document.body.removeChild(iframe)
    }, 1000 * 3)
  }
}
// export function _downaxios({ url, method = 'post', data, params }: AxiosConfig) {
//   return axios({
//     url,
//     method,
//     data,
//     params,
//     responseType: 'blob'
//   })
// }
// 处理get请求
const get = ({ url, method = 'get', params }: AxiosConfig) => axios({ url, method, params })
// 处理delete请求，为了防止和关键词delete冲突，方法名定义为deletes
const deletes = ({ url, params }: AxiosConfig) => axios.delete(url, params)
// 处理post请求
const post = ({ url, method = 'post', data, params }: AxiosConfig) =>
  axios({ url, method, data, params })
// 处理put请求
// const put = ({ url, data, params }: AxiosConfig) => axios.put(url, data, params)
const put = ({ url, method = 'put', data, params }: AxiosConfig) => axios({ url, method, data, params })

export default {
  get,
  deletes,
  post,
  put
}
