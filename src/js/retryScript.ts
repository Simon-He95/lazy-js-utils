/**
 * 该函数的执行需要在最前面去订阅到所有的javascript错误
 * 加载javascript失败，从域名数组中取资源加载
 * @param domains 域名数组
 */
export function retryScript(domains: string[]) {
  const retryInfo: Record<string, { times: number; nextIndex: number }> = {}
  window.addEventListener(
    'error',
    (e) => {
      const tag = e.target as HTMLScriptElement
      if (tag.tagName === 'SCRIPT' && !(e instanceof ErrorEvent)) {
        // 加载script失败，准备重试
        const url = new URL(tag.src)
        if (!retryInfo[url.pathname]) {
          retryInfo[url.pathname] = {
            times: 0,
            nextIndex: 0,
          }
        }
        const info = retryInfo[url.pathname]
        url.host = domains[info.nextIndex]
        const attr = tag.defer ? 'defer' : tag.async ? 'async' : ''
        // 阻塞后续的加载，避免script存在依赖，加载顺序造成问题
        document.write(`<script ${attr} src="${url.toString()}"><\/script>`)
        info.times++
        info.nextIndex = (info.nextIndex + 1) % domains.length
      }
    },
    true,
  )
}
