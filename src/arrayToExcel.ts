export function arrayToExcel(data: any[], name: string) {
  const a = document.createElement('a')
  const blob = new Blob([data.map(v => Object.values(v).join('\t')).join('\n')], { type: 'application/vnd.ms-excel' })
  a.href = URL.createObjectURL(blob)
  a.download = name
  a.click()
}
