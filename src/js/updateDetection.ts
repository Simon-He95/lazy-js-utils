/**
 * 用户停留在老页面但是已经有新的版本
 */

import { isEqual } from '../is'
import { useRaf } from '../perf'

const SCRIPTSRC = /<script .*src=["']([\w?=./@]+)["']><\/script>/g
let lastSrcs: string[]
/**
 * 检测首页中script src是否存在更新
 * @param { number } s 检测时间间隔 默认 2000
 * @param callback 如果页面检测出有更新则会被调用
 * @returns
 */
export function updateDetection(s = 2000, callback: () => void) {
  return useRaf(async () => {
    const willUpdate = await needsUpdate()
    if (willUpdate) {
      console.log('页面有更新')
      // reload
      callback?.()
    }
  }, s)
}

async function getNewScripts() {
  const html = await fetch(`/?_timestamp=${Date.now()}`).then(resp =>
    resp.text(),
  )
  const result: string[] = []
  let match
  while ((match = SCRIPTSRC.exec(html)) && !result.includes(match[1]))
    result.push(match[1])
  return result
}

async function needsUpdate() {
  const newScriptsSrcs = await getNewScripts()
  if (!lastSrcs) {
    lastSrcs = newScriptsSrcs
    return false
  }
  if (isEqual(lastSrcs, newScriptsSrcs))
    return false
  lastSrcs = newScriptsSrcs
  return true
}
