/**
 * 将函数转化为URL
 * @description EN: Convert a function to a blob URL so it can be used as a
 * Worker script or loaded dynamically.
 * @param { Function } fn 函数
 * @returns {string} blob URL
 */
export function fnToUrl(fn: Function) {
  const blob = new Blob([`(${fn.toString()})()`], { type: 'text/javascript' })
  return URL.createObjectURL(blob)
}
