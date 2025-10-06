/**
 * Forward a postMessage to an iframe's contentWindow.
 *
 * @param {HTMLIFrameElement} el Target iframe element.
 * @param {any} data Data to postMessage.
 * @param {string} targetOrigin Target origin string (e.g. '*').
 * @param {Transferable[]} [transfer] Optional transfer list.
 * @returns {void}
 */
export function postMessage(
  el: HTMLIFrameElement,
  data: any,
  targetOrigin: string,
  transfer?: Transferable[],
) {
  return el.contentWindow!.postMessage(data, targetOrigin, transfer)
}
