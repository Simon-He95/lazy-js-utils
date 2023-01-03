import { isFn } from '../is/isFn'
type UseTimeoutReturn<T> = T extends Function ? () => void : undefined

export function useTimeout<T>(fn: T, duration = 0): UseTimeoutReturn<T> {
  if (!isFn(fn))
    return undefined as any
  const timer = setTimeout(fn, duration)
  return (() => clearTimeout(timer)) as any
}
