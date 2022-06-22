export function fileToBase64(file: File) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = function (e) {
      resolve(e?.target?.result)
    }
  })
}
