import { createElement } from './createElement'
/**
 *
 * @param { string } href 链接
 * @param { string } download 名字
 */
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
