export function stringify(o: Record<string, string>): string {
  return Object.keys(o).reduce((result, key) => result += `${key}=${encodeURI(o[key])}&`, '')
}
