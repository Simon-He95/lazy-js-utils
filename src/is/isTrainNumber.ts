/**
 * 判断是否是火车号
 */
/**
 * 判断是否为火车车次（简单校验）
 * @description EN: Heuristic check for train numbers using common prefixes and 1-4 digits.
 * @param {string} s Candidate train number string.
 * @returns {boolean}
 */
export const isTrainNumber = (s: string) => /^[GCDZTSPKXLY1-9]\d{1,4}$/.test(s)
