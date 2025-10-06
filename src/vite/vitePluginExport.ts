/**
 * 将一些vite不能处理的文件导出
 * @param { string } config 后缀文件
 * @returns vitePlugin
 */
/**
 * @description EN: Simple Vite plugin that converts a matched file into a default export of its content string.
 */
export function vitePluginExport(config: string) {
  return {
    name: 'vite-plugin-export',
    transform(src: any, id: string) {
      if (id.endsWith(config)) {
        return {
          code: `export default ${JSON.stringify(src)}`,
          map: null,
        }
      }
    },
  }
}
