import { getDevice } from '../monitor/getDevice'
import { useEventListener } from '../event/useEventListener'
import type { DragEvent } from '../types'
import { mount } from '../utils/mount'
import { isBrowser } from '../is'

const { os } = getDevice()
const isPhone = os === 'ios' || os === 'android'
/**
 * 拖砖
 * @param { HTMLElement | string } target 元素
 * @param { DragEvent } options {}
 * @param { (e: any) => void } options.dragStart 开始拖拽callback
 * @param { (e: any) => void } options.dragMove 拖拽过程callback
 * @param { (e: any) => void } options.dragEnd 拖拽结束callback
 * @param trigger
 * @returns
 */
export function dragEvent(
  target: HTMLElement | string,
  options: DragEvent = {},
  trigger?: boolean,
) {
  if (!isBrowser) {
    throw new Error('dragEvent must be used in browser')
  }

  const stop: (() => void)[] = []
  let isStopped = false
  mount(target, (target) => {
    let down = false
    if (isPhone) {
      stop.push(
        useEventListener(
          target,
          'touchstart',
          (e) => {
            options.dragStart && options.dragStart(wrapperE(e))
          },
          false,
        ),
      )
      options.dragMove
      && stop.push(
        useEventListener(
          target,
          'touchmove',
          (e) => {
            if (!trigger || down)
              options.dragMove?.(wrapperE(e))
          },
          false,
        ),
      )
      options.dragEnd
      && stop.push(
        useEventListener(
          target,
          'touchend',
          (e) => {
            options.dragEnd?.(wrapperE(e))
            down = false
          },
          false,
        ),
      )
    }
    else {
      stop.push(
        useEventListener(
          target,
          'mousedown',
          (e) => {
            down = true
            options.dragStart && options.dragStart(e)
          },
          false,
        ),
      )
      options.dragMove
      && stop.push(
        useEventListener(
          target,
          'mousemove',
          (e) => {
            if (!trigger || down)
              options.dragMove?.(e)
          },
          false,
        ),
      )
      options.dragEnd
      && stop.push(
        useEventListener(
          target,
          'mouseup',
          (e) => {
            options.dragEnd?.(e)
            down = false
          },
          false,
        ),
      )
    }
    if (isStopped)
      stop.forEach(stop => stop())
    function wrapperE(e: any) {
      const { clientX, clientY, pageX, pageY, screenX, screenY }
        = e?.changedTouches[0]
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
      return (isStopped = true)
    stop.forEach(cb => cb?.())
  }
}
