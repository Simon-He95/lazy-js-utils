/**
 * `Object.prototype.toString` 的安全引用
 * @description EN: Cached reference to `Object.prototype.toString` for reliable type inspection.
 */
export const _toString = Object.prototype.toString

/**
 * 匹配静态 ESM `import` 语句
 * @description EN: Regular expression that captures static ESM import statements, including specifiers and imported bindings.
 */
export const ESM_STATIC_IMPORT_RE
  = /(?<=\s|^|;)import\s*(["'\s]*(?<imports>[\w*${}\n\r\t, /]+)from\s*)?["']\s*(?<specifier>(?<=")[^"]*[^"\s](?=\s*")|(?<=')[^']*[^'\s](?=\s*'))\s*["'][\s;]*/gm

/**
 * 匹配动态 `import()` 调用
 * @description EN: Regular expression that extracts the expression inside dynamic `import()` calls.
 */
export const DYNAMIC_IMPORT_RE
  = /import\s*\((?<expression>(?:[^)(]|\((?:[^)(]|\([^)(]*\))*\))*)\)/g

/**
 * 匹配具名导出的声明语句
 * @description EN: Regular expression that locates `export function|const|class ...` declarations and captures their names.
 */
export const EXPORT_DECAL_RE
  = /\bexport\s+(?<declaration>(async function|function|let|const|var|class))\s+(?<name>[\w$]+)/g

/**
 * 匹配具名导出的花括号语法
 * @description EN: Regular expression that captures `export { ... }` statements, optionally with re-export specifiers.
 */
export const EXPORT_NAMED_RE
  = /\bexport\s+\{(?<exports>[^}]+)\}(\s*from\s*["']\s*(?<specifier>(?<=")[^"]*[^"\s](?=\s*")|(?<=')[^']*[^'\s](?=\s*'))\s*["'][^\n]*)?/g

/**
 * 匹配 `export *` 语句
 * @description EN: Regular expression used to detect star exports, optionally capturing aliased names and source specifiers.
 */
export const EXPORT_STAR_RE
  = /\bexport\s*(\*)(\s*as\s+(?<name>[\w$]+)\s+)?\s*(\s*from\s*["']\s*(?<specifier>(?<=")[^"]*[^"\s](?=\s*")|(?<=')[^']*[^'\s](?=\s*'))\s*["'][^\n]*)?/g

/**
 * 匹配默认导出语句
 * @description EN: Regular expression that identifies `export default` statements.
 */
export const EXPORT_DEFAULT_RE = /\bexport\s+default\s+/g
