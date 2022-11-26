const keyReg = /\s+(?!['"])([\w_\-\$\.]+):/gm
const valueReg = /:\s*(?!['"])([\w_\-\$\.]+)/gm
const commaLackReg = /:\s*("[\w_\-\$\.]+")\s*(?!,)"/gm
const commaMoreReg = /:\s*("[\w_\-\$\.]+"\s*,)\s*}/gm
// 将字符串转为JSON.stringify的格式并parse出结果
export function useParse(str: string) {
  return JSON.parse(str.replace(keyReg, (match, key) => match.replace(key, `"${key}"`))
    .replace(valueReg, (match, value) =>
      match.replace(value, `"${value}"`),
    ).replace(commaLackReg, (match, value) =>
      match.replace(value, `${value},`))
    .replace(commaMoreReg, (match, value) =>
      match.replace(',', ''),
    ))
}

// const data = `{
//   name:simon
//   age:14
// }`
// console.log(useParse(data)) // { name: 'simon', age: '14' }
