import { createElement } from './createElement'
export function addScript(src: string) {
  try {
    const t = document.getElementsByTagName('script')[0]
    t.parentNode?.insertBefore(createElement('script', {
      type: 'text/javascript',
      src,
      async: '',
    }), t)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
