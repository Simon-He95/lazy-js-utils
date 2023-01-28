/**
 * 退出全屏模式
 * @returns
 */
export function exitFullscreen() {
  try {
    const el: any = (parent as any).documentElement
    const cfs
      = el?.cancelFullScreen
      || el?.webkitCancelFullScreen
      || el?.mozCancelFullScreen
      || el?.exitFullScreen
    if (cfs)
      cfs.call(el)
    else return new Error('切换失败,可尝试Esc退出')
  }
  catch (error: any) {
    throw new Error(error)
  }
}
