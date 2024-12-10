/**
 * 读取ReadableStream
 * @param { ReadableStreamDefaultReader<Uint8Array> } reader getReader() 的结果
 * @param { Function } callback 每片读取的回调
 * @returns
 */
export async function useReader(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  callback?: (value?: any) => any,
) {
  let result = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done) {
      console.log('The stream is done.')
      break
    }

    const decoder = new TextDecoder()
    const text = decoder.decode(value)
    result += callback?.(text) || ''
  }
  return result
}
