import * as echarts from 'echarts'
import type { EChartsOption, XAXisComponentOption, YAXisComponentOption } from 'echarts'
import { isStr } from './isStr'
import { addEventListener } from './addEventListener'

interface SChartsOption extends EChartsOption {
  theme?: string | object
  x: XAXisComponentOption | XAXisComponentOption[]
  y: YAXisComponentOption | YAXisComponentOption[]
  w?: number
  h?: number
}

export function sCharts(container: string | HTMLElement, options: SChartsOption, autoResize: boolean = true): echarts.ECharts {
  const fragment = document.createDocumentFragment()
  const { x, y, xAxis, yAxis, w = 100, h = 100 } = options

  const charts = echarts.init(fragment as unknown as HTMLElement, options.theme || '', {
    width: w,
    height: h,
  })
  for (const key in options) {
    if (key.startsWith('on'))
      charts.on(key.slice(2), options[key] as (...args: any[]) => void)
  }
  options.xAxis = x || xAxis
  options.yAxis = y || yAxis
  charts.setOption(options)
  addEventListener(document, 'DOMContentLoaded', () => {
    if (isStr(container))
      container = document.querySelector(container as string) as HTMLElement || container

    if (isStr(container))
      throw new Error(`${container} container is not found`);
    (container as HTMLElement).appendChild(fragment)
    if (autoResize)
      resize()
  }, false, true)
  if (autoResize)
    addEventListener(window, 'resize', resize, false)
  function resize() {
    const { offsetWidth, offsetHeight } = container as HTMLElement
    charts.resize({
      width: offsetWidth,
      height: offsetHeight,
    })
  }
  return charts
}
