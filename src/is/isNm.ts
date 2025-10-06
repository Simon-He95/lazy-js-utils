/**
 * 判断是否是nodemodule依赖
 */
/**
 * 判断是否为 node module 风格的导入路径（不以 './'、'../' 或 '/' 开头）
 * @description EN: Heuristic to detect bare module specifiers (e.g. 'vue', 'lodash').
 * @param {string} src Import path string.
 * @returns {boolean}
 */
export function isNm(src: string) {
  return /^[^./\s]/.test(src)
}
