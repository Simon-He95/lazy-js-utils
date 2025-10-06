/**
 * 判断是否为 IPv4 地址
 * @description EN: Test whether a string is a valid IPv4 address.
 * @param {string} ip Candidate IP string.
 * @returns {boolean}
 */
export function isIPv4(ip: string) {
  return /^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$/.test(
    ip,
  )
}
