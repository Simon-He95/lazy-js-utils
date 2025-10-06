import { createElement } from './createElement'

/**
 * Trigger a download by creating a temporary anchor and clicking it.
 *
 * @param href - URL to download
 * @param download - suggested filename
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
