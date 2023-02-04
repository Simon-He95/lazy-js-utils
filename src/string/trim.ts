import type { TrimType } from '../types'

/**
 * 删除空格
 * @param { string } s 字符串
 * @param { TrimType } type 所有 ｜ 前置 ｜ 前后 ｜ 后置 'all' | 'pre' | 'around' | 'post'
 * @returns
 */
export function trim(s: string, type: TrimType = 'around'): string {
  if (type === 'pre')
    return s.replace(/(^\s*)/g, '')
  if (type === 'post')
    return s.replace(/(\s*$)/g, '')
  if (type === 'all')
    return s.replace(/\s+/g, '')
  if (type === 'around')
    return s.replace(/(^\s*)|(\s*$)/g, '')
  return s
}
