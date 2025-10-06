/**
 * 判断当前页面是否处于活跃状态
 * @returns
 */
/**
 * 判断当前页面是否处于活动（未被隐藏）状态
 * @description EN: Returns true when the document is currently visible/active
 * (i.e. `document.hidden` is falsy).
 * @returns {boolean}
 */
export function isActive() {
  return !document.hidden
}
