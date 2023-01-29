/**
 * 判断文件类型
 * @param { string } file 文件路径
 * @param { string } appendix 文件类型
 * @returns
 */
export function isFileType(file: string, appendix: string): boolean {
  const reg = new RegExp(`\\.${appendix}(\\?[^.]+)?$`)
  return reg.test(file)
}

// const isCss = isFileType('./useEventListener.css', 'css') // true
