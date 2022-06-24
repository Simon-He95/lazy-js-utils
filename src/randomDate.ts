export function randomDate(start = '1999/01/1', end?: string) {
  const date = new Date()
  const [endY, endM, endD] = (end || '').split('/')
  const y = +endY || date.getFullYear()
  const m = +endM || date.getMonth() + 1
  const d = +endD || date.getDate()
  const [startY, startM, startD] = start.split('/')
  const startDate = new Date(+startY, +startM, +startD).getTime()
  const endDate = new Date(y, m, d).getTime()
  const timestamp = startDate + Math.round(Math.random() * (endDate - startDate))
  return new Date(timestamp)
}
