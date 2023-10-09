import { bounceOut } from './bounceOut'

export function bounceIn(t: number) {
  return 1.0 - bounceOut(1.0 - t)
}
