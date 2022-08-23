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
