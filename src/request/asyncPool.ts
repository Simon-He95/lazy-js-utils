export function asyncPool(limit = 4, tasks: Function[]) {
  const maxLength = tasks.length
  const results: any[] = []
  let count = 0
  let executing = new Array(limit).fill(0)
  executing = executing.map(() => new Promise((resolve, reject) => {
    const run = () => {
      if (count >= maxLength)
        return resolve('done')
      const index = count
      const p: Promise<any> = tasks[count++]()
      p.then((res) => {
        results[index] = res
        run()
      }).catch(reason => reject(reason))
    }
    run()
  }))
  return Promise.all(executing).then(() => results)
}
