/**
 * 判断输入的是中文
 */
export const isNameCn = (s: string) => /^[\u4E00-\u9FA5·]{2,16}$/.test(s)

// console.log(isNameCn('你好11'))
