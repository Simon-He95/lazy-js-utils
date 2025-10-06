/**
 * 分享内容
 * @param options    files?: File[];
    text?: string;
    title?: string;
    url?: string;
 * @returns
 */
export function useShare(options: ShareData = {}) {
  if (!navigator || !navigator.canShare)
    throw new Error('当前环境不支持分享')
  // @description EN: Use the Web Share API to share files/text/url if supported by the user agent.
  if (!options.files || navigator.canShare({ files: options.files }))
    return navigator.share(options)
}
