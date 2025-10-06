import fsp from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

/**
 * 将模版html内容拷贝到最终结果
 * @param { string } template_url html url
 * @returns Plugin
 * @description EN: Vite plugin factory that injects built CSS and JS asset links into a template HTML file and writes it to the build output.
 */
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
