export function copy(s: string): boolean {
  try {
    const dom = document.createElement('textarea')
    dom.setAttribute('readonly', 'readonly')
    dom.value = s
    document.body.appendChild(dom)
    dom.select()
    const res = document.execCommand('copy')
    document.body.removeChild(dom)
    return res
  }
  catch (error: any) {
    throw new Error(error)
  }
}
