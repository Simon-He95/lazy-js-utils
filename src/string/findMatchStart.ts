const matchMap = {
  '}': '{',
  ']': '[',
  ')': '(',
}

/**
 * Find the offset from the end of `code` to the matching opening
 * bracket for a given closing bracket character. This is useful when
 * parsing snippets to find where a matching start bracket appears.
 *
 * @param matchStr - the closing bracket character to match (e.g. ')', '}', ']')
 * @param code - the code string to search (search starts from the end)
 * @returns offset from the end of the input to the matching opening bracket
 * @throws if no matching opening bracket is found
 */
export function findMatchStartOffset(matchStr: string, code: string) {
  let offset = 0
  let dep = 0
  if (!code.length)
    return offset
  for (let i = code.length - 1; i > 0; i--) {
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
  throw new Error(`Can't find match start offset for ${matchStr} in ${code}`)
}
