import { getDevice } from './getDevice'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'
import type { DragEvent } from './types'

export function dragEvent(target: string | HTMLElement, options: DragEvent = {}) {
  addEventListener(document, 'DOMContentLoaded', () => {
    if (isStr(target))
      target = document.querySelector(target as string) as HTMLElement || target
    if (isStr(target))
      throw new Error(`${target} is not a HTMLElement`)
    const { os } = getDevice()
    const isPhone = os === 'ios' || os === 'android'
    let down = false
    if (isPhone) {
      addEventListener(target, 'touchstart', (e: any) => {
        options.dragStart && options.dragStart(wrapperE(e))
      }, false)
      options.dragMove && addEventListener(target, 'touchmove', (e: any) => {
        options.dragMove?.(wrapperE(e))
      }, false)
      options.dragEnd && addEventListener(target, 'touchend', (e: any) => {
        options.dragEnd?.(wrapperE(e))
        down = false
      }, false)
    }
    else {
      addEventListener(target, 'mousedown', (e: any) => {
        down = true
        options.dragStart && options.dragStart(e)
      }, false)
      options.dragMove && addEventListener(target, 'mousemove', (e: any) => {
        if (down)
          options.dragMove?.(e)
      }, false)
      options.dragEnd && addEventListener(target, 'mouseup', (e: any) => {
        options.dragEnd?.(e)
        down = false
      }, false)
    }
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
  })
}
