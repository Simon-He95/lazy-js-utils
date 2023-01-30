/**
 * 将函数转化为URL
 * @param { Function } fn 函数
 * @returns
 */
export function fnToUrl(fn: Function) {
  const blob = new Blob([`(${fn.toString()})()`], { type: 'text/javascript' })
  return URL.createObjectURL(blob)
}
