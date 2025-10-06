/**
 * Get the bounding client rect for a caret/cursor position at the start of a node.
 * Useful for positioning popups next to inline nodes. If the container has offsets
 * the caller may need to subtract them.
 *
 * @param target - Node to measure
 * @returns DOMRect representing the range bounding box
 */
export function useRange(target: Node) {
  const range = document.createRange()
  range.setStart(target, 0)
  range.setEnd(target, 0)
  return range.getBoundingClientRect()
}
