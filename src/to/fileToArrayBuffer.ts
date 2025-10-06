/**
 * Read a File/Blob as an ArrayBuffer and return a Uint8Array.
 *
 * @param {File} file File or Blob to read.
 * @returns {Promise<Uint8Array>} Resolves with file bytes.
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
