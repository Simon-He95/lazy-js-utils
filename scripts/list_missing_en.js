const fs = require('node:fs')
const path = require('node:path')

function walk(dir) {
  return fs.readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f)
    return fs.statSync(p).isDirectory() ? walk(p) : p
  })
}

const files = walk('src').filter(f => f.endsWith('.ts'))
let tot = 0
let en = 0
const miss = []
for (const f of files) {
  tot++
  const c = fs.readFileSync(f, 'utf8')
  if (/@description EN/.test(c))
    en++
  else if (/[\u4E00-\u9FFF]/.test(c))
    miss.push(f)
}
console.log(
  JSON.stringify(
    { total: tot, withEN: en, missingCount: miss.length },
    null,
    2,
  ),
)
miss.forEach(m => console.log(m))
