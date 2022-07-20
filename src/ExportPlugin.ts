export function ExportPlugin(config: string) {
  return {
    name: 'vite-export-plugin',
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
