/**
 * 在数组中切换元素：如果存在则移除，否则添加
 * @description EN: Toggle an item inside the provided array. If `index` is given, it overrides searching by value.
 * @param {T[]} arr The array to operate on.
 * @param {T} item The item to toggle.
 * @param {number} [index] Optional index at which to toggle the item instead of searching by value.
 * @returns {T[]} The mutated array after toggling.
 */
export function toggleItem<T>(arr: T[], item: T, index?: number): T[] {
  if (!arr)
    return []

  const idx = index === undefined ? arr.indexOf(item) : index
  if (idx === -1)
    arr.push(item)
  else arr.splice(idx, 1)

  return arr
}
