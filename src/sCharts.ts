import * as echarts from 'echarts'
import { isStr } from './isStr'

export function sCharts(container: string | HTMLElement, options: Record<string, any>) {
  if (isStr(container)) {
    container = document.querySelector(container as string) as HTMLElement
  }
  if (!container)
    console.error('container is not found')
  const charts = echarts.init(container as HTMLElement, options.theme || '', {
    width: 500,
    height: 500
  })
  const { resize, dispose } = charts
  for (const key in options) {
    if (key.startsWith('on'))
      charts.on(key.slice(2), options[key])
  }
  options.xAxis = options.x || {}
  options.yAxis = options.y || {}
  charts.setOption(options)

  return {
    resize,
    dispose
  }
}
