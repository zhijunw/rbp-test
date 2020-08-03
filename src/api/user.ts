import request from './axios'

export function login(data: any) {
  return request({
    url: '/auth/accessToken',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/system/module/menu',
    method: 'get'
    // params: { token }
  })
}
export function getRouters() {
  return request({
    url: '/system/menu/items',
    method: 'get'
  })
}
export function logout(refreshToken) {
  return request({
    url: '/auth/logout',
    method: 'post',
    params: { refreshToken }
  })
}
