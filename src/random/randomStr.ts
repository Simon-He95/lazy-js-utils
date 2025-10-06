const urlAlphabet
  = 'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'
/**
 * 随机字符串
 * @description EN: Generate a random string of given length from a character
 * set. Useful for IDs and non-cryptographic tokens.
 * @param { number } size 长度 默认 16
 * @param { string } dict Character set to draw from (default alphabet above).
 * @returns {string}
 */
export function randomStr(size = 16, dict = urlAlphabet): string {
  let id = ''
  let i = size
  const len = dict.length
  while (i--) id += dict[(Math.random() * len) | 0]
  return id
}
