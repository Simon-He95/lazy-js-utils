export function monitorPef() {
  const timingObj: Record<string, number> = {}
  try {
    const time = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (time.domComplete === 0) {
      setTimeout(() => {
        monitorPef()
      }, 200)
      return
    }
    timingObj['重定向时间'] = (time.redirectEnd - time.redirectStart) / 1000
    timingObj['重定向次数'] = time.redirectCount
    timingObj['首屏时间'] = time.domInteractive - time.fetchStart
    timingObj['上一页卸载时间'] = time.unloadEventEnd - time.unloadEventStart
    timingObj['浏览器读取缓存时间'] = time.domainLookupStart - time.fetchStart
    timingObj['DNS解析时间'] = (time.domainLookupEnd - time.domainLookupStart) / 1000
    timingObj['TCP完成握手时间'] = (time.connectEnd - time.connectStart) / 1000
    timingObj['HTTP请求响应完成时间'] = (time.responseEnd - time.requestStart) / 1000
    timingObj['DOM开始加载前所花费时间'] = (time.responseEnd - time.fetchStart) / 1000
    timingObj['DOM加载完成时间'] = (time.domComplete - time.domInteractive) / 1000
    timingObj['脚本加载时间'] = (time.domContentLoadedEventEnd - time.domContentLoadedEventStart) / 1000
    timingObj['onload事件时间'] = (time.loadEventEnd - time.loadEventStart) / 1000
    timingObj['页面完全加载时间'] = (time.loadEventEnd - time.fetchStart) / 1000
    console.table(timingObj)
  }
  catch (e) {
    console.log(timingObj)
    console.log(performance.timing)
  }
}

