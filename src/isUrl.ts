export function isUrl(url: string) {
  return /^http[s]?:\/\/.*/.test(url)
}
