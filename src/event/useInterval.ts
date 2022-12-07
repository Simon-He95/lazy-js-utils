import { isFn } from '../is/isFn'

type UseIntervalReturn<T> = T extends Function ? (() => void) : undefined

export function useInterval<T>(fn: T, duration: number): UseIntervalReturn<T> {
  if (!isFn(fn))
    return undefined as any
  const timer = setInterval(fn, duration)
  return (() => clearInterval(timer)) as any
}

