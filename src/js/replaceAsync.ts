import { isFn } from '../is'

export async function replaceAsync(
  str: string,
  searchValue: string | RegExp,
  replaceValue:
    | string
    | ((substring: string, ...args: any[]) => string | Promise<string>),
) {
  const matches = str.match(searchValue)
  if (!matches)
    return str

  for (const match of matches) {
    const replacement = isFn(replaceValue)
      ? await replaceValue(match)
      : replaceValue
    str = str.replace(match, replacement)
  }
  return str
}
