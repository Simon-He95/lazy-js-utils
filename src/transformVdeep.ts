import fs from 'fs'

export function transformVdeep() {
  return {
    name: 'vite-transform-Vdeep',
    transform(src: any, id: string) {
      if (id.endsWith('.vue')) {
        const transformData = src.replace(/(?:\/deep\/|>>>)([\w.,\n\s-]+){$/gms, (e: string, r: string) => `:deep(${r}){`)
        fs.writeFile(id, transformData, (err) => {
          if (err)
            console.log(err)
        })
        return transformData
      }
    },
  }
}
