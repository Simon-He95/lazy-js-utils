export function isFileType(file: string, appendix: string): boolean {
  const reg = new RegExp(`\\.${appendix}(\\?[^.]+)?$`)
  return reg.test(file)
}

// const isCss = isFileType('./addEventListener.css', 'css') // tree
