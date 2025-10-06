import { fileToArrayBuffer } from './fileToArrayBuffer'

/**
 * Convert a File to a Blob (preserves provided MIME type).
 *
 * @param file - File to convert
 * @param type - Optional MIME type for the resulting Blob
 * @returns A Blob built from the file's ArrayBuffer
 */
export async function fileToBlob(file: File, type: string = file.type) {
  const buffer = await fileToArrayBuffer(file)
  const blob = new Blob([buffer], { type })
  return blob
}
