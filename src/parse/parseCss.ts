/**
 * 解析css转换为对象
 * @param { string } str
 * @returns
 * @description EN: Parse a block of CSS and return a mapping from selector to declaration string.
 */
export function parseCss(str: string) {
  const getClasses = /\s*([.#][\w\- .#>+&]+)\{\s*([ :;\w\-\n]*)+\}\s*/g
  const moreSpace = /\s{2,}/g
  const classMap: Record<string, string> = {}
  str.replace(getClasses, (match, p1, p2) => {
    classMap[p1.replace(moreSpace, ' ').trim()] = p2.replace(/\n\s*/g, '')
    return match
  })
  return classMap
}

// const str = `
// <style scoped>
// .test > .abc{
//   color: red;
// }
// .test #abc{
//   color: red;
//   background: yellow;
//   font-size:14px;
// }
// .a {
//   background:yellow;
// }
// </style>
// `
// console.log(parseCss(str))
