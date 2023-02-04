/**
 * 判断文件是不是.vue
 * @param { string } src 文件路径
 * @returns
 */
export function isVue(src: string) {
  return src.endsWith('.vue')
}
