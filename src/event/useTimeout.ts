import { isFn } from '../is/isFn'
import type { UseTimeoutReturn } from '../types'

/**
 *
 * @param { Function } fn 函数
 * @param { number } duration 间隔时长
 * @returns 停止
 */
export function useTimeout<T>(fn: T, duration = 0): UseTimeoutReturn<T> {
  if (!isFn(fn))
    return undefined as any
  const timer = setTimeout(fn, duration)
  return (() => clearTimeout(timer)) as any
}
