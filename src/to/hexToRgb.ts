export function hexToRgb(hex: string, opacity?: number) {
  const l = 7 - hex.length

  if (l > 0) hex = hex + hex.slice(-1).repeat(l)
  if (l < 0) throw new Error('hex length > 7')

  const result = `${Number.parseInt(`0x${hex.slice(1, 3)}`)},${Number.parseInt(
    `0x${hex.slice(3, 5)}`,
  )},${Number.parseInt(`0x${hex.slice(5, 7)}`)}`
  return opacity ? `rgba(${result},${opacity})` : `rgb(${result})`
}

// console.log(hexToRgb('#ffffff')) // rgb(255,255,255)
