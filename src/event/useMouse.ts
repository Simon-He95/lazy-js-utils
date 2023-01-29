import { useEventListener } from './useEventListener'

/**
 * 检测鼠标移动
 * @param { Function } callback 坚挺鼠标移动回调
 * @param { number } delay 间隔多久触发
 * @returns 停止
 */
export function useMouse(
  callback: (e: MouseEvent) => void,
  delay = 0,
): () => void {
  let timeStart = Date.now()
  return useEventListener(window, 'mousemove', (e) => {
    if (Date.now() - timeStart >= delay) {
      timeStart = Date.now()
      callback(e)
    }
  })
}
