import { useEventListener } from '../event/useEventListener'

/**
 * 将分析数据发送到 Web 服务
 * @description EN: Convenience wrapper around navigator.sendBeacon triggered on document visibility change (page hide).
 * @param { string } url 接收数据的 URL
 * @param { BodyInit } [analyticsData] ArrayBuffer 、 TypedArray 、 DataView 、 Blob 、字符串文字或对象、包含要发送的数据的 FormData 或 URLSearchParams 对象。
 * @returns a function to remove the event listener (provided by useEventListener)
 */
export function sendBeacon(
  url: string | URL,
  analyticsData?: BodyInit | null,
): () => void {
  return useEventListener(
    document,
    'visibilitychange',
    () =>
      document.visibilityState === 'hidden'
      && navigator.sendBeacon(url, analyticsData),
  )
}
