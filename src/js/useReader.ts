/**
/**
/**
 * 读取ReadableStream
 * @description EN: Read data from a ReadableStreamDefaultReader and invoke
 * an optional callback for each chunk. Returns the concatenated string result.
 * @param { ReadableStreamDefaultReader<Uint8Array> } reader getReader() 的结果
 * @param { (value?: any) => any } [callback] 每片读取的回调
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
