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
