export function asyncPool(limit: number = 4, tasks: Function[]) {
  const maxLength = tasks.length
  let results: any[] = [],
    count = 0,
    executing = new Array(limit).fill(0)
  executing = executing.map(() => new Promise((resolve, reject) => {
    const run = () => {
      if (count >= maxLength) {
        resolve('done')
        return
      }
      let index = count
      const p: Promise<any> = tasks[count++]()
      p.then(res => {
        results[index] = res
        run()
      }).catch(reason => reject(reason))
    }
    run()
  }))
  return Promise.all(executing).then(() => results)
}
