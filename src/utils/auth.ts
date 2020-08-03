import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string | number) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCookie(name: string) {
  return Cookies.get(name)
}

export function setCookie(name: string, cookie: any) {
  return Cookies.set(name, cookie)
}
export function removeCookie(name: string) {
  return Cookies.remove(name)
}
