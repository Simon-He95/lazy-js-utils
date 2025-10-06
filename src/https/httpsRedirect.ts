/**
 * http重定向到https
 * @description EN: If the current page is loaded over HTTP, redirect to the HTTPS version of the same URL.
 */
export function httpsRedirect() {
  if (location.protocol !== 'https:')
    location.replace(`https://${location.href.split('//')[1]}`)
}
