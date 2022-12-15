// 将多个空格统一处理

export function spaceFormat(str: string, replacer = ' ') {
  return str.replace(/\s+/g, replacer)
}
