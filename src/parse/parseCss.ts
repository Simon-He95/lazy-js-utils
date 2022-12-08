export function parseCss(str: string) {
  const getClasses = /[\n\s]*([.#][\w\-_ .#\>\+\&]+){[\n\s]*([ :;\w\-\n]*)+}[\n\s]*/gm
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
