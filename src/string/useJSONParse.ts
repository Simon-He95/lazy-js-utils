const keyReg = /\s+(?!['"])([\w_\-\$\.]+):/gm
const valueReg = /:\s*'([^']*)'/g
const commaLackReg = /:\s*("[\w_\-\$\.]+")\s*(?!,)"/gm
const commaMoreReg = /:\s*("[\w_\-\$\.]+"\s*,)\s*}/gm
const moreCommaReg = /,(\s*})/gm
/**
 * 将字符串转为JSON.stringify的格式并parse出结果
 * @param { string } str 字符串
 * @returns
 */
export function useJSONParse(str: string) {
  try {
    return JSON.parse(
      str
        .replace(keyReg, (match, key) => match.replace(key, `"${key}"`))
        .replace(valueReg, ': "$1"')
        .replace(commaLackReg, (match, value) =>
          match.replace(value, `${value},`),
        )
        .replace(commaMoreReg, (match) => match.replace(',', ''))
        .replace(moreCommaReg, (_, v) => v),
    )
  } catch (_) {
    return str
      .trim()
      .replace(/\n+/g, '\n')
      .split('\n')
      .reduce((result, item: string) => {
        const [key, val] = item.split(':') as string[]
        result[key.trim()] = val.trim()
        return result
      }, {} as any)
  }
}

// const data = `{
//   "compilerOptions": {
//     "baseUrl": "./",
//     "lib": ["esnext", "DOM"],
//     "paths": {
//         "@/*": ["src/*"],
//         "~/*": ["/"],
//     }
//   },
//   "exclude": ["node_modules", "dist"]
// }
// `
// console.log(useJSONParse(data)) // { name: 'simon', age: '14' }
