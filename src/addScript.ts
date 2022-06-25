export function addScript(src: string) {
  try {
    const s = document.createElement('script')
    s.type = 'text/javascript'
    s.async = true
    s.src = src
    const t = document.getElementsByTagName('script')[0]
    t.parentNode?.insertBefore(s, t)
  }
  catch (error: any) {
    throw new Error(error)
  }
}
