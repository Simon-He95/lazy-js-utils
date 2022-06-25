export function addStyle(s: string) {
  try {
    const style = document.createElement('style')
    style.innerHTML = s
    document.head.appendChild(style)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
