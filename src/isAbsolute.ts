export function isAbsolute(url: string) {
  return /^\/|^\\|^[a-zA-Z]:[/\\]/.test(url)
}
