/**
 * 文件转buffer
 * @param { File } file 文件
 * @returns
 */
export function fileToArrayBuffer(file: File): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = function () {
      const arrayBuffer = new Uint8Array(reader.result as any)
      resolve(arrayBuffer)
    }

    reader.onerror = reject

    reader.readAsArrayBuffer(file)
  })
}
