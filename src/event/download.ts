import { createElement } from './createElement'
export function download(href: string, download = '') {
  try {
    createElement('a', {
      href,
      download,
    }).click()
  }
  catch (error: any) {
    throw new Error(error)
  }
}
