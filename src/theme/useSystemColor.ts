import { useEventListener } from '../event'

type Color = 'light' | 'dark'
export function useSystemColor(callback: (color: Color) => void) {
  const match = matchMedia('(prefers-color-scheme: dark)')
  callback(match.matches ? 'dark' : 'light')
  return useEventListener(match, 'change', () =>
    callback(match.matches ? 'dark' : 'light'),
  )
}
