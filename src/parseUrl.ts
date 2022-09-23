import type { ParsedURL } from './types'
const PROTOCOL_REGEX = /^\w+:(\/\/)?/
const PROTOCOL_RELATIVE_REGEX = /^\/\/[^/]+/

export function hasProtocol(inputStr: string, acceptProtocolRelative = false): boolean {
  return PROTOCOL_REGEX.test(inputStr) || (acceptProtocolRelative && PROTOCOL_RELATIVE_REGEX.test(inputStr))
}

export function parseURL(input = '', defaultProto?: string): ParsedURL {
  if (!hasProtocol(input, true))
    return defaultProto ? parseURL(defaultProto + input) : parsePath(input)

  const [protocol = '', auth, hostAndPath = ''] = (input.replace(/\\/g, '/').match(/([^:/]+:)?\/\/([^/@]+@)?(.*)/) || []).splice(1)
  const [host = '', path = ''] = (hostAndPath.match(/([^/?#]*)(.*)?/) || []).splice(1)
  const { pathname, search, hash } = parsePath(path)

  return {
    protocol,
    auth: auth ? auth.substr(0, auth.length - 1) : '',
    host,
    pathname,
    search,
    hash,
  }
}

export function parsePath(input = ''): ParsedURL {
  const [pathname = '', search = '', hash = ''] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1)

  return {
    pathname,
    search,
    hash,
  }
}

