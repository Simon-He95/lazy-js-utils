/**
 * 获取当前周的周一日期
 * @returns
 */
export function getFirstDay() {
  const today = new Date()
  const day = today.getDay() // 获取今天是周几
  const diff = day === 0 ? 6 : day - 1 // 计算与周一相差天数
  const monday = new Date(today) // 克隆一次日期对象
  monday.setDate(monday.getDate() - diff) // 设置为周一日期
  return monday.toISOString().match(/(^[0-9]+-[0-9]+-[0-9]+)/)![1]
}
