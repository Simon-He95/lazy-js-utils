export function isProxyDocument(target: unknown): target is Document {
  return toString.call(target) === '[object ProxyDocument]'
}
