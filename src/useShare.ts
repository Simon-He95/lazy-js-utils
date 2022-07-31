export function useShare(options: ShareData = {}) {
  if (!navigator || !navigator.canShare)
    throw new Error('当前环境不支持分享')
  if (!options.files || navigator.canShare({ files: options.files }))
    return navigator.share(options)
}
