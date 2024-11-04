import { useRaf } from '../perf'

/**
 * 贝塞尔曲线变化数字
 * @param from 起始数字
 * @param to 结束数字
 * @param duration 动画时长
 * @param onProgress 回调
 */
export function useNumberAnimation(
  from: number,
  to: number,
  duration: number,
  onProgress: (newValue: number) => void = () => {},
) {
  const dis = to - from
  const start = Date.now()
  let value = from
  onProgress(value)
  const timeInterval = 50
  const stop = useRaf(
    () => {
      const now = Date.now()
      const time = now - start
      const t = time / duration
      const bezierCurveValue = calculateBezierCurveValue(t)
      const currentIncrement = Math.round(dis * bezierCurveValue)
      if (time >= duration) {
        value = to
        onProgress(value)
        return stop()
      }
      value = from + currentIncrement
      onProgress(value)
    },
    {
      delta: timeInterval,
    },
  )
}

function calculateBezierCurveValue(t: number) {
  const controlPoints = [
    { x: 0, y: 0 },
    { x: 0.4, y: 0.8 },
    { x: 0.6, y: 1 },
    { x: 1, y: 1 },
  ] // bezier curve control points
  let y = 0
  const n = controlPoints.length - 1
  for (let i = 0; i <= n; i++) {
    const binomialCoefficient = calculateBinomialCoefficient(n, i)
    const tPower = t ** i * (1 - t) ** (n - i)
    y += binomialCoefficient * controlPoints[i].y * tPower
  }
  return y
}

function calculateBinomialCoefficient(n: number, k: number) {
  let coefficient = 1
  for (let i = 1; i <= k; i++) coefficient *= (n - i + 1) / i

  return coefficient
}
