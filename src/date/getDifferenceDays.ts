import type { TimeUnit } from '../types'

export function getDifferenceDays(
  date1: Date | string,
  date2: Date | string = new Date(),
  unit: TimeUnit = 'days',
): number {
  const diffInMilliseconds
    = parseDate(date2).getTime() - parseDate(date1).getTime()

  switch (unit) {
    case 'days':
      return diffInMilliseconds / (1000 * 60 * 60 * 24)
    case 'hours':
      return diffInMilliseconds / (1000 * 60 * 60)
    case 'minutes':
      return diffInMilliseconds / (1000 * 60)
    case 'seconds':
      return diffInMilliseconds / 1000
    default:
      throw new Error('Invalid time unit')
  }
}

function parseDate(date: Date | string): Date {
  if (typeof date === 'string') {
    // Replace '/' with '-' to standardize the date format
    date = date.replace(/\//g, '-')
    return new Date(date)
  }
  return date
}
