import { uuid } from "./uuid"
export function download(url: string, name = uuid()) {
  const a = document.createElement('a')
  a.href = url
  a.download = url.substring(url.lastIndexOf('/') + 1, url.length)
  a.click()
}
