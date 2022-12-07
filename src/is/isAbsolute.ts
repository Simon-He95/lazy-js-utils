export function isAbsolute(url: string): boolean {
  return /^\/|^\\|^[a-zA-Z]:[/\\]/.test(url)
}

