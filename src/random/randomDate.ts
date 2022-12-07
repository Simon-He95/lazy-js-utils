export function randomDate(start = '1999/01/1', end?: string) {
  const date = new Date()
  const splitTag = start.includes('/') ? '/' : '-'
  const [endY, endM, endD] = (end || '').split(splitTag)
  const y = +endY || date.getFullYear()
  const m = +endM || date.getMonth() + 1
  const d = +endD || date.getDate()
  const [startY, startM, startD] = start.split('/')
  const startDate = new Date(+startY, +startM, +startD).getTime()
  const endDate = new Date(y, m, d).getTime()
  return new Date(startDate + Math.round(Math.random() * (endDate - startDate)))
}
