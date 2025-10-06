/**
 * 判断是否为中文姓名（含·）
 * @description EN: Test whether a string is a Chinese personal name (2-16 CJK chars or middle dot).
 * @param {string} s Candidate name string.
 * @returns {boolean}
 */
export const isNameCn = (s: string) => /^[\u4E00-\u9FA5·]{2,16}$/.test(s)

// console.log(isNameCn('你好11'))
