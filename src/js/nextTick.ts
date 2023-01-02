export function nextTick(fn: Function) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(fn()), 0)
  })
}
