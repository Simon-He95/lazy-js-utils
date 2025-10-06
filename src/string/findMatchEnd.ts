const matchMap = {
  '{': '}',
  '[': ']',
  '(': ')',
}

/**
 * Find the offset from the start of `code` to the matching closing
 * bracket for a given opening bracket character. Useful when scanning
 * forward in code to find where a structure ends.
 *
 * @param matchStr - the opening bracket character to match (e.g. '{', '(', '[')
 * @param code - the code string to search (search starts from the beginning)
 * @returns offset from the start of the input to the matching closing bracket
 * @throws if no matching closing bracket is found
 */
export function findMatchEndOffset(matchStr: string, code: string) {
  let offset = 0
  let dep = 0
  if (!code.length)
    return offset
  for (let i = 0; i < code.length; i++) {
    const cur = code[i]
    if (cur === matchStr && dep === 0)
      return offset
    if (cur in matchMap) {
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
