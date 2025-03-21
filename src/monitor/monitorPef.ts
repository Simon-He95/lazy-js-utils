import { isFn } from '../is/isFn'

/**
 * 检测性能指标
 * @returns {Record<string, number> | null} 返回性能指标对象，如果不支持则返回null
 */
export function monitorPef(): Record<string, number> | null {
  // 首先检查Performance API是否可用
  if (typeof performance === 'undefined') {
    console.warn('当前环境不支持Performance API')
    return null
  }

  // 检查getEntriesByType方法是否存在
  if (!isFn(performance.getEntriesByType)) {
    console.warn('当前环境不支持performance.getEntriesByType方法')
    return null
  }

  const timingObj: Record<string, number> = {}

  try {
    const navigationEntries = performance.getEntriesByType('navigation')

    // 检查是否有Navigation条目
    if (!navigationEntries || navigationEntries.length === 0) {
      console.warn('无法获取导航性能数据')
      return null
    }

    const time = navigationEntries[0] as PerformanceNavigationTiming

    // 验证获取的对象是否符合PerformanceNavigationTiming接口
    if (!('domComplete' in time)) {
      console.warn('获取的性能条目不是标准的PerformanceNavigationTiming对象')
      return null
    }

    if (time.domComplete === 0) {
      setTimeout(() => {
        monitorPef()
      }, 200)
      return null
    }

    timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart) / 1000
    timingObj['重定向次数'] = time.redirectCount
    timingObj['首屏时间'] = time.domInteractive - time.fetchStart
    timingObj['上一页卸载时间'] = time.unloadEventEnd - time.unloadEventStart
    timingObj['浏览器读取缓存时间'] = time.domainLookupStart - time.fetchStart
    timingObj['DNS解析时间']
      = (time.domainLookupEnd - time.domainLookupStart) / 1000
    timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart) / 1000
    timingObj['HTTP请求响应完成时间']
      = (time.responseEnd - time.requestStart) / 1000
    timingObj['DOM开始加载前所花费时间']
      = (time.responseEnd - time.fetchStart) / 1000
    timingObj['DOM加载完成时间']
      = (time.domComplete - time.domInteractive) / 1000
    timingObj['脚本加载时间']
      = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000
    timingObj['onload事件时间']
      = (time.loadEventEnd - time.loadEventStart) / 1000
    timingObj['页面完全加载时间'] = (time.loadEventEnd - time.fetchStart) / 1000

    console.table(timingObj)
    return timingObj
  }
  catch (e) {
    console.warn('监控性能指标时发生错误:', e)

    // 尝试使用旧版API作为降级方案
    if (performance.timing) {
      console.log('使用旧版performance.timing API')
      console.log(performance.timing)
      return timingObj
    }

    return null
  }
}
