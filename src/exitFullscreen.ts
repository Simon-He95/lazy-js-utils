export function exitFullscreen() {
  const el: any = (parent as any).documentElement
  const cfs = el?.cancelFullScreen || el?.webkitCancelFullScreen || el?.mozCancelFullScreen || el?.exitFullScreen;
  if (cfs)
    cfs.call(el);
  else
    alert("切换失败,可尝试Esc退出")
}
