import { useEventListener } from '../event/useEventListener'
export function sendBeacon(url: string | URL, analyticsData?: BodyInit | null): () => void {
  return useEventListener(document, 'visibilitychange', () => (document.visibilityState === 'hidden') && navigator.sendBeacon(url, analyticsData))
}
