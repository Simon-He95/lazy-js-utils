import { isFn } from '../is/isFn'

interface UseIntervalControls {
  isActive: () => boolean
  pause: () => void
  resume: () => void
}

type UseIntervalReturn<T> = T extends Function ? UseIntervalControls : undefined

/**
 * 可暂停和恢复的 setInterval
 * @param { Function } fn 函数
 * @param { number } duration 间隔时间
 * @returns {{ isActive: () => boolean; pause: () => void; resume: () => void } | undefined }
 */
export function useInterval<T>(fn: T, duration: number): UseIntervalReturn<T> {
  if (!isFn(fn))
    return undefined as any

  let timer: number | null = null
  let _isActive = false

  const controls: UseIntervalControls = {
    isActive: () => _isActive,
    pause: () => {
      if (timer) {
        clearInterval(timer)
        timer = null
        _isActive = false
      }
    },
    resume: () => {
      if (timer)
        return
      timer = setInterval(fn as Function, duration)
      _isActive = true
    },
  }

  controls.resume()

  return controls as any
}
