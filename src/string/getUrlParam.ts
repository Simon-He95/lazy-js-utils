/**
 * 获取url中的参数
 * @param { string } s url地址
 * @returns
 */
export function getUrlParam(s?: string): Record<string, string> | undefined {
  s = (s || window.location.search).split('?')[1]
  if (!s)
    return
  return s.split('&').reduce((pre, cur) => {
    const [key, value] = cur.split('=')
    pre[key] = value
    return pre
  }, {} as Record<string, string>)
}
