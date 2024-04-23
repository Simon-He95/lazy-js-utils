// const keyReg = /\s+(?!['"])([\w_\-\$\.]+):/gm
// const valueReg = /:\s*'([^']*)'/g
// const commaLackReg = /:\s*("[\w_\-\$\.]+")\s*(?!,)"/gm
// const commaMoreReg = /:\s*("[\w_\-\$\.]+"\s*,)\s*}/gm
// const moreCommaReg = /,(\s*})/gm
/**
 * 将字符串转为JSON.stringify的格式并parse出结果
 * @param { string } str 字符串
 * @returns { any }
 */
export function useJSONParse(str: string) {
  // 将字符串转换为对象
  let obj = new Function(`return (${str})`)()

  // 如果对象是正则表达式字符串，则将其转换为正则表达式对象
  if (typeof obj === 'string' && obj.startsWith('re'))
    obj = new Function(`return ${obj.slice(2)}`)()
  return obj
}

// const data = `[{"age":"14","fn": ()=>"123"}]`

// console.log(useJSONParse(data)) // { name: 'simon', age: '14' }
