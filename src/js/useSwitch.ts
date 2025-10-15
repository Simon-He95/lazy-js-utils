/**
 * 轮询返回数组中的值
 * @description EN: Cycle through the provided options on each call, returning to the first value after reaching the end.
 * @param { any[] } options 需要轮换返回的值列表
 * @returns { () => any }
 */
export function useSwitch(options: any[]) {
  let index = 0
  const max = options.length - 1
  return () => {
    const result = options[index]
    index++
    if (index > max)
      index = 0
    return result
  }
}

// const fn = useSwitch([true, false])
// console.log(fn()) // true
// console.log(fn()) // false
