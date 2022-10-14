import { getDevice } from './getDevice'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'
import type { DragEvent } from './types'
import { findElement } from './findElement'

export function dragEvent(target: HTMLElement | string, options: DragEvent = {}, trigger?: boolean) {
  let isMounted = false
  let hasMounted = false
  const { os } = getDevice()
  const isPhone = os === 'ios' || os === 'android'
  const stop: (() => void)[] = []
  function update() {
    if (hasMounted)
      return
    if (isStr(target))
      target = findElement(target) || target
    if (!isMounted && isStr(target))
      return isMounted = true
    else if (isStr(target))
      throw new Error(`${target} is not a HTMLElement`)
    let down = false
    if (isPhone) {
      stop.push(addEventListener(target as HTMLElement, 'touchstart', (e: any) => {
        options.dragStart && options.dragStart(wrapperE(e))
      }, false))
      options.dragMove && stop.push(addEventListener(target as HTMLElement, 'touchmove', (e: any) => {
        if (!trigger || down)
          options.dragMove?.(wrapperE(e))
      }, false))
      options.dragEnd && stop.push(addEventListener(target as HTMLElement, 'touchend', (e: any) => {
        options.dragEnd?.(wrapperE(e))
        down = false
      }, false))
    }
    else {
      stop.push(addEventListener(target as HTMLElement, 'mousedown', (e: any) => {
        down = true
        options.dragStart && options.dragStart(e)
      }, false))
      options.dragMove && stop.push(addEventListener(target as HTMLElement, 'mousemove', (e: any) => {
        if (!trigger || down)
          options.dragMove?.(e)
      }, false))
      options.dragEnd && stop.push(addEventListener(target as HTMLElement, 'mouseup', (e: any) => {
        options.dragEnd?.(e)
        down = false
      }, false))
    }
    hasMounted = true
    function wrapperE(e: any) {
      const { clientX, clientY, pageX, pageY, screenX, screenY } = e?.changedTouches[0]
      e.clientX = clientX
      e.clientY = clientY
      e.pageX = pageX
      e.pageY = pageY
      e.screenX = screenX
      e.screenY = screenY
      return e
    }
  }
  update()
  addEventListener(document, 'DOMContentLoaded', update)
  return () => {
    stop.forEach(cb => cb?.())
  }
}
