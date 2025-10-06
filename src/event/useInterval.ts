import { isFn } from '../is/isFn'

interface UseIntervalControls {
  isActive: () => boolean
  pause: () => void
  resume: () => void
}

type UseIntervalReturn<T> = T extends Function
  ? ((...args: any[]) => void) & UseIntervalControls
  : undefined

/**
 * A small helper around setInterval which exposes pause/resume controls.
 * If fn is not a function undefined is returned.
 *
 * @param fn - Callback function to run on each interval
 * @param duration - Interval duration in milliseconds
 * @returns Controls object with isActive, pause and resume methods, or undefined
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

  // start
  controls.resume()

  // Create a callable stop function for existing tests that expect to call the return value
  const stopFn = (() => controls.pause()) as unknown as ((
    ...args: any[]
  ) => void) &
  UseIntervalControls
  Object.assign(stopFn, controls)
  return stopFn as any
}
