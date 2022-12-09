export const calNum = {
  add(...args: (number | string)[]): number {
    return args.reduce((total, num) => accAdd(+total, +num)) as number
  },
  sub(...args: (number | string)[]): number {
    return args.reduce((total, num) => accAdd(+total, -num)) as number
  },
  mul(...args: (number | string)[]): number {
    return args.reduce((total, num) => accMul(+total, +num)) as number
  },
  div(...args: (number | string)[]): number {
    return args.reduce((total, num) => accDiv(+total, +num)) as number
  },
}

function accAdd(arg1: number, arg2: number): number {
  let r1, r2
  try {
    r1 = arg1.toString().split('.')[1].length
  }
  catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  }
  catch (e) {
    r2 = 0
  }
  const m = 10 ** Math.max(r1, r2)
  return (arg1 * m + arg2 * m) / m
}

function accMul(arg1: number, arg2: number): number {
  let m = 0
  const s1 = arg1.toString()
  const s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  }
  catch (e) {}
  try {
    m += s2.split('.')[1].length
  }
  catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / 10 ** m
}

function accDiv(arg1: number, arg2: number): number {
  let t1 = 0
  let t2 = 0
  try {
    t1 = arg1.toString().split('.')[1].length
  }
  catch (e) {}
  try {
    t2 = arg2.toString().split('.')[1].length
  }
  catch (e) {}
  const r1 = Number(arg1.toString().replace('.', ''))
  const r2 = Number(arg2.toString().replace('.', ''))
  return (r1 / r2) * 10 ** (t2 - t1)
}
