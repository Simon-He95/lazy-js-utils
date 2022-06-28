import { promises as fs } from 'fs'
import { resolve as pathResolve } from 'path'
export async function exportsCode(relativePath: string): Promise<string> {
  const pkgPath = pathResolve(__dirname, relativePath)
  try {
    const code = await fs.readFile(pkgPath, 'utf8')
    if (code[0] === '{')
      return JSON.parse(code)
    return code
  }
  catch (e) {
    throw new Error(`${pkgPath} not found`)
  }
}
