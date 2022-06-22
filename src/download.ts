import { uuid } from "./uuid"
export function download(url: string) {
  let a: any = document.createElement('a')
  a.href = url
  a.download = url.substring(url.lastIndexOf('/') + 1, url.length)
  a.click()
  a = null
}
