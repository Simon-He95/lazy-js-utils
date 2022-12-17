import fsp from 'fs/promises'
import path from 'path'
import process from 'process'
export async function vitePluginCopyHtml(template_url: string) {
  let content = await fsp.readFile(
    path.resolve(process.cwd(), template_url),
    'utf-8',
  )
  return {
    name: 'vite-plugin-copy-html',
    writeBundle(options: any, data: any) {
      const outDir = `${options.dir}/index.html`
      const links: string[] = []
      const scripts: string[] = []
      for (const key in data) {
        if (key.endsWith('.css'))
          links.push(key)
        else if (key.endsWith('.js'))
          scripts.push(key)
      }
      if (links.length) {
        content = content.replace(
          /<\/head>/,
          () => `</head>
      ${links.map(link => `<link rel="stylesheet" href="/${link}">`)}`,
        )
      }
      if (scripts.length) {
        content = content.replace(
          /<\/body>/,
          () => `   ${scripts.map(
            script => `<script src="/${script}" type="module"></script>`,
          )}
  </body>`,
        )
      }
      fsp.writeFile(path.resolve(outDir), content, 'utf-8')
    },
  }
}
