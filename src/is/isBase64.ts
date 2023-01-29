/**
 * 判断是否是base64格式
 * @param { string } base64
 * @returns
 */
export function isBase64(base64: string) {
  return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*/i.test(
    base64,
  )
}
