import { deleteCookie, getCookie, setCookie } from 'cookies-next'

export const cookieStorageEventTarget = new EventTarget()

export const setAccessTokenToCookie = (access_token: string) => {
  setCookie('__token', access_token)
}

export const clearCookie = () => {
  deleteCookie('__token')

  const clearCookieEvent = new Event('clearCookie')
  cookieStorageEventTarget.dispatchEvent(clearCookieEvent)
}

export const getAccessTokenFromCookie = () => getCookie('__token') || ''
