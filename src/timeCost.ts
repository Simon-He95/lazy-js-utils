export function timeCost(fn: Function): number {
  const start = new Date().getTime()
  fn()
  const end = new Date().getTime()
  console.log('timeCost:', end - start)
  return end - start
}
