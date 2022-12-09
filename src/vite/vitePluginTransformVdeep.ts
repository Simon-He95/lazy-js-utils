import fs from 'fs'

export function vitePluginTransformVdeep() {
  return {
    name: 'vite-plugin-transform-Vdeep',
    transform(src: any, id: string) {
      if (id.endsWith('.vue')) {
        const transformData = src.replace(
          /(?:\/deep\/|>>>)([\w.,\n\s-]+){$/gms,
          (e: string, r: string) => `:deep(${r}){`,
        )
        if (transformData !== src) {
          fs.writeFile(id, transformData, (err) => {
            if (err)
              throw err
          })
        }
        return transformData
      }
    },
  }
}
