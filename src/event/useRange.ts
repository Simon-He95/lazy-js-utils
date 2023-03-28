/**
 * 获取target元素所在位置最后的位置
 * 注意如果外容器有偏移量，需要减去偏移量
 * @param target
 * @returns
 */
export function useRange(target: Node) {
  const range = document.createRange()
  range.setStart(target, 0)
  range.setEnd(target, 0)
  return range.getBoundingClientRect()
}
