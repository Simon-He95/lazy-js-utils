import { createElement } from './createElement'
export function download(url: string) {
  try {
    createElement('a', {
      href: url,
      download: url.substring(url.lastIndexOf('/') + 1, url.length),
    }).click()
  }
  catch (error: any) {
    throw new Error(error)
  }
}
