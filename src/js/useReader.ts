/**
 * 读取 ReadableStream
 * @description EN: Read from a `ReadableStreamDefaultReader`, optionally process each chunk, and return the concatenated string.
 * @param { ReadableStreamDefaultReader<Uint8Array> } reader `stream.getReader()` 的返回值
 * @param { (value?: string) => any } [callback] 对每个文本块进行处理的回调
 * @returns { Promise<string> }
 */
export async function useReader(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  callback?: (value?: any) => any,
): Promise<string> {
  let result = ''
  while (true) {
    const { done, value } = await reader.read()
    if (done)
      break

    const decoder = new TextDecoder()
    const text = decoder.decode(value)
    result += (callback ? callback(text) : text) || ''
  }
  return result
}
