import type { JSCookie } from '../types'

/**
 * 快速操作cookie
 */
export const jsCookie: JSCookie = {
  // @description EN: Simple helpers to get/set/delete cookies.
  get(cname: string) {
    try {
      const name = `${cname}=`
      const ca = document.cookie.split(';')
      for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim()
        if (c.indexOf(name) === 0)
          return c.substring(name.length, c.length)
      }
      return ''
    }
    catch (error: any) {
      throw new Error(error)
    }
  },
  set(cname: string, value: string, extdays?: any) {
    try {
      const d = new Date()
      d.setTime(d.getTime() + extdays * 24 * 60 * 60 * 1000)
      const expires = `expires=${d.toUTCString()}`
      document.cookie = `${cname}=${value}; ${expires}`
    }
    catch (error: any) {
      throw new Error(error)
    }
  },
  delete(this: any, name: string) {
    this.set(name, '', -1)
  },
}
