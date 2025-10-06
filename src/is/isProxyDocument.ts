/**
 * 判断目标是否为 ProxyDocument（特定实现的代理文档对象）
 * @description EN: Type guard that tests for an object whose [[Class]] is 'ProxyDocument'.
 * @param {unknown} target Candidate value.
 * @returns {target is Document}
 */
export function isProxyDocument(target: unknown): target is Document {
  return toString.call(target) === '[object ProxyDocument]'
}
