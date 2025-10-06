import { createElement } from '../event/createElement'

/**
 * 获取电脑粘贴板的内容
 * @description EN: Copy the provided string to the system clipboard using a temporary textarea and execCommand.
 * @param { string } s 内容
 * @returns
 */
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
