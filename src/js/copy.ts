import { createElement } from '../event/createElement'
export function copy(s: string): boolean {
  try {
    const textarea = createElement(
      'textarea',
      {
        readonly: 'readonly',
      },
      s,
    )
    document.body.appendChild(textarea)
    textarea.select()
    const res = document.execCommand('copy')
    document.body.removeChild(textarea)
    return res
  }
  catch (error: any) {
    throw new Error(error)
  }
}
