import { getDevice } from './getDevice'
import { addEventListener } from './addEventListener'
import type { DragEvent } from './types'
import { mount } from './mount'

export function dragEvent(target: HTMLElement | string, options: DragEvent = {}, trigger?: boolean) {
  const { os } = getDevice()
  const isPhone = os === 'ios' || os === 'android'
  const stop: (() => void)[] = []
  let isStopped = false
  mount(target, (target) => {
    let down = false
    if (isPhone) {
      stop.push(addEventListener(target, 'touchstart', (e: any) => {
        options.dragStart && options.dragStart(wrapperE(e))
      }, false))
      options.dragMove && stop.push(addEventListener(target, 'touchmove', (e: any) => {
        if (!trigger || down)
          options.dragMove?.(wrapperE(e))
      }, false))
      options.dragEnd && stop.push(addEventListener(target, 'touchend', (e: any) => {
        options.dragEnd?.(wrapperE(e))
        down = false
      }, false))
    }
    else {
      stop.push(addEventListener(target, 'mousedown', (e: any) => {
        down = true
        options.dragStart && options.dragStart(e)
      }, false))
      options.dragMove && stop.push(addEventListener(target, 'mousemove', (e: any) => {
        if (!trigger || down)
          options.dragMove?.(e)
      }, false))
      options.dragEnd && stop.push(addEventListener(target, 'mouseup', (e: any) => {
        options.dragEnd?.(e)
        down = false
      }, false))
    }
    if (isStopped)
      stop.forEach(stop => stop())
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
  return () => {
    if (!stop.length)
      return isStopped = true
    stop.forEach(cb => cb?.())
  }
}
