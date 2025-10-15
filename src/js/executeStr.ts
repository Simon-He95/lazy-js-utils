/**
 * 执行字符串表达式
 * @description EN: Evaluate the provided string as JavaScript expression and return its value. Use with caution.
 * @param { string } str 需要执行的表达式字符串
 * @returns { any }
 */
export function executeStr(str: string): any {
  return new Function(`return (${str})`)()
}
