import { isFn } from '../is/isFn'

type UseIntervalReturn<T> = T extends Function ? () => void : undefined

/**
 *
 * @param { Function } fn 函数
 * @param { number } duration 间隔时间
 * @returns 停止
 */
export function useInterval<T>(fn: T, duration: number): UseIntervalReturn<T> {
  if (!isFn(fn))
    return undefined as any
  const timer = setInterval(fn, duration)
  return (() => clearInterval(timer)) as any
}
