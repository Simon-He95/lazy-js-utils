import { addEventListener } from './addEventListener'
export function sendBeacon(url: string | URL, analyticsData?: BodyInit | null): () => void {
  return addEventListener(document, 'visibilitychange', () => (document.visibilityState === 'hidden') && navigator.sendBeacon(url, analyticsData))
}
