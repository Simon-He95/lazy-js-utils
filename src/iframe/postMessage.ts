export function postMessage(
  el: HTMLIFrameElement,
  data: any,
  targetOrigin: string,
  transfer?: Transferable[],
) {
  return el.contentWindow!.postMessage(data, targetOrigin, transfer)
}
