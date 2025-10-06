export function eliminateFetchAsync(fn: Function) {
  /**
   * @description EN: Replace window.fetch temporarily to deduplicate/serialize fetch calls inside the provided function, rethrowing a Promise to pause execution until underlying fetches settle.
   */
  const originFetch = window.fetch
  const cache: any = []
  let i = 0
  window.fetch = (...args) => {
    if (cache[i]) {
      if (cache[i].status === 'fulfilled')
        return cache[i].data
      else if (cache[i].status === 'rejected')
        throw cache[i].err
    }
    const type = ((args[1] as any)?.type || 'json') as
      | 'json'
      | 'blob'
      | 'arrayBuffer'
      | 'formData'
      | 'text'

    const result = {
      status: 'pending',
      data: null,
      err: null,
    }
    cache[i++] = result

    // 发生请求
    const pro = originFetch(...args)
      .then(resp => resp[type]())
      .then(
        (resp) => {
          result.status = 'fulfilled'
          result.data = resp
        },
        (err) => {
          result.status = 'rejected'
          result.err = err
        },
      )

    // 报错
    throw pro
  }

  try {
    fn()
  }
  catch (err) {
    if (err instanceof Promise) {
      const retry = () => {
        i = 0
        fn()
      }
      err.then(retry, retry)
    }
  }
}
