export function parse(str: string) {
  return str.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=')
    pre[key] = value
    return pre
  }, {} as Record<string, string>)
}
