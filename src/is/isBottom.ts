/**
 * 判断滚动条到达窗口底部
 * @param distance
 * @returns
 */
export function isBottom(distance = 0): boolean {
  try {
    return (
      document.documentElement.clientHeight + window.scrollY + distance
      >= (document.documentElement.scrollHeight
        || document.documentElement.clientHeight)
    )
  }
  catch (error: any) {
    throw new Error(error)
  }
}
