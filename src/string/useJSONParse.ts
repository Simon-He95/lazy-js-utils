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
    str = str
      .trim()
      .replace(/(\/\*[\s\S]*?\*\/|\/\/.*)/g, '')
      .replace(/,\n\s*}/g, '\n }')
    if (str.endsWith(';')) str = str.slice(0, -1)

    if (/^{/.test(str))
      return str
        .slice(1, -1)
        .replace(/\n+/g, '\n')
        .replaceAll('\t', '')
        .replaceAll('\r', '')
        .replace(/\:\s*{([^\}]*)}/g, (_, v) => {
          return _.replace(v, v.replace(/\n/g, ''))
        })
        .split(',\n')
        .reduce((result, item: string) => {
          item = item.trim()
          if (!item) return result
          const items = item.split(':') as string[]
          const [key, val] = [items[0], items.slice(1).join(':')]
          const newVal = val.replace(/\n/g, '').replace(/\s+/g, ' ').trim()
          result[key.trim()] = newVal.endsWith(',')
            ? newVal.slice(0, -1)
            : newVal
          return result
        }, {} as any)
    return str
  }
}

// const data = `[{"age":"14","fn": ()=>"123"}]`

// console.log(useJSONParse(data)) // { name: 'simon', age: '14' }
