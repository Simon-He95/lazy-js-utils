export function formateDate(datetime: Date, fmt: string = 'yyyy-MM-dd') {
  const o: Record<string, any> = {
    'M+': datetime.getMonth() + 1, // 月份
    'd+': datetime.getDate(), // 日
    'h+': datetime.getHours() % 12 === 0 ? 12 : datetime.getHours() % 12, // 小时
    'H+': datetime.getHours(), // 小时
    'm+': datetime.getMinutes(), // 分
    's+': datetime.getSeconds(), // 秒
    'q+': Math.floor((datetime.getMonth() + 3) / 3), // 季度
    'S': datetime.getMilliseconds(), // 毫秒
  }
  const week: Record<string, string> = {
    0: '/u65e5',
    1: '/u4e00',
    2: '/u4e8c',
    3: '/u4e09',
    4: '/u56db',
    5: '/u4e94',
    6: '/u516d',
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (`${datetime.getFullYear()}`).substr(4 - RegExp.$1.length))

  if (/(E+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[datetime.getDay()])

  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)))
  }
  return fmt
}
