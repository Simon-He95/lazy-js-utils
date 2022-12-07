export function curry(f: Function) {
  const g = (...args: any[]) => {
    if (args.length >= f.length)
      return f(...args)

    return (...more: any[]) => {
      return g(...args, ...more)
    }
  }
  return g
}
