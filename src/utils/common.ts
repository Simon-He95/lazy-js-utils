export const _toString = Object.prototype.toString
export const ESM_STATIC_IMPORT_RE
  = /(?<=\s|^|;)import\s*(["'\s]*(?<imports>[\w*${}\n\r\t, /]+)from\s*)?["']\s*(?<specifier>(?<=")[^"]*[^"\s](?=\s*")|(?<=')[^']*[^'\s](?=\s*'))\s*["'][\s;]*/gm
export const DYNAMIC_IMPORT_RE
  = /import\s*\((?<expression>(?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*)\)/g
export const EXPORT_DECAL_RE
  = /\bexport\s+(?<declaration>(async function|function|let|const|var|class))\s+(?<name>[\w$]+)/g
export const EXPORT_NAMED_RE
  = /\bexport\s+\{(?<exports>[^}]+)\}(\s*from\s*["']\s*(?<specifier>(?<=")[^"]*[^"\s](?=\s*")|(?<=')[^']*[^'\s](?=\s*'))\s*["'][^\n]*)?/g
export const EXPORT_STAR_RE
  = /\bexport\s*(\*)(\s*as\s+(?<name>[\w$]+)\s+)?\s*(\s*from\s*["']\s*(?<specifier>(?<=")[^"]*[^"\s](?=\s*")|(?<=')[^']*[^'\s](?=\s*'))\s*["'][^\n]*)?/g
export const EXPORT_DEFAULT_RE = /\bexport\s+default\s+/g
