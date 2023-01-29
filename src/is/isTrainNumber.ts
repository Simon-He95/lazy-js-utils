/**
 * 判断是否是火车号
 */
export const isTrainNumber = (s: string) => /^[GCDZTSPKXLY1-9]\d{1,4}$/.test(s)
