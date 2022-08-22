import fs from 'fs'
import path from 'path'
export function copyTemplate(url: string) {
  const basename = path.basename(url)
  const content = fs.readFileSync(path.resolve(__dirname, url), 'utf-8')
  let outDir: string
  return {
    name: 'copy-html',
    apply: 'build',
    enforce: 'post',
    config(options: any) {
      outDir = path.resolve(__dirname, `${options.build?.outDir || 'dist'}/${basename}`)
    },
    buildEnd() {
      setTimeout(() => fs.writeFileSync(outDir, content, 'utf-8'))
    },
  }
}

