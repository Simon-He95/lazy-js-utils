const matchMap = {
  '{': '}',
  '[': ']',
  '(': ')',
  '\'': '\'',
  '"': '"',
  '<': '>',
}
export function findMatchEndOffset(matchStr: string, code: string) {
  let offset = 0
  let dep = 0
  if (!code.length)
    return offset
  for (let i = 0; i < code.length; i++) {
    const cur = code[i]
    const next = code[i + 1]
    if (cur === matchStr && dep === 0)
      return offset
    if (cur in matchMap && next) {
      dep++
    }
    else if (dep && Object.values(matchMap).includes(cur)) {
      dep--
    }
    if (cur === matchStr && dep === 0)
      return offset
    offset++
  }
  throw new Error(`Can't find match end offset for ${matchStr} in ${code}`)
}
