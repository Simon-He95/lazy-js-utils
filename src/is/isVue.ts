/**
 * 判断文件是不是.vue
 * @param { string } src 文件路径
 * @returns
 */
/**
 * 判断文件路径是否是 Vue 单文件组件（.vue）
 * @description EN: Simple check for filenames ending with '.vue'.
 * @param {string} src Path or filename.
 * @returns {boolean}
 */
export function isVue(src: string) {
  return src.endsWith('.vue')
}
