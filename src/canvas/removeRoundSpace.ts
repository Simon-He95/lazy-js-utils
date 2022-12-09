export function removeRoundSpace(data: number[][]) {
  let x = 0
  const y: Record<string, number> = {}
  const col = data[0].length
  const row = data.length
  const spliceRows = []
  const spliceCols = []
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (data[i][j] === 0)
        x++
      if (data[i][j] === 0) {
        if (!y[j])
          y[j] = 0
        y[j]++
      }
      if (i === row - 1 && y[j] === row)
        spliceCols.push(j)
      if (j === col - 1 && x === col)
        spliceRows.push(i)
      if (j === col - 1)
        x = 0
    }
  }
  let start = 0
  for (let i = 0; i < spliceRows.length; i++) {
    const cur = spliceRows[i]
    if (cur === start)
      start++
    else break
  }
  let end = spliceRows[spliceRows.length - 1]
  for (let i = spliceRows.length; i > start; i--) {
    const cur = spliceRows[i - 1]
    if (cur === end)
      end--
    else break
  }
  if (end > start)
    data.splice(end, spliceRows[spliceRows.length - 1])
  data.splice(0, start)
  start = 0
  for (let i = 0; i < spliceCols.length; i++) {
    const cur = spliceCols[i]
    if (cur === start)
      start++
    else break
  }
  end = spliceCols[spliceCols.length - 1]
  for (let i = spliceCols.length; i > start; i--) {
    const cur = spliceCols[i - 1]
    if (cur === end)
      end--
    else break
  }
  for (let i = 0; i < data.length; i++) {
    if (end > start)
      data[i].splice(end, spliceCols[spliceCols.length - 1])
    data[i].splice(0, start)
  }
  return data
}
