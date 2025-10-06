// const keyReg = /\s+(?!['"])([\w_\-\$\.]+):/gm
// const valueReg = /:\s*'([^']*)'/g
// const commaLackReg = /:\s*("[\w_\-\$\.]+")\s*(?!,)"/gm
// const commaMoreReg = /:\s*("[\w_\-\$\.]+"\s*,)\s*}/gm
// const moreCommaReg = /,(\s*})/gm
/**
 * Parse a JavaScript object-like string into a value using Function.
 * This allows parsing strings that are not strictly JSON (for example,
 * containing functions or unquoted property names). Use with caution as
 * it executes the input string as code.
 *
 * Example: useJSONParse("{ name: 'simon', age: 14 }") => { name: 'simon', age: 14 }
 *
 * @param str - string containing a JS expression representing a value
 * @returns the parsed value
 */
export function useJSONParse(str: string) {
  // Convert the string into the represented value by evaluating it.
  // NOTE: using Function to evaluate arbitrary strings is potentially unsafe
  // and should only be used for trusted input.
  let obj = new Function(`return (${str})`)()

  // If the evaluated result is a string that starts with "re", try to
  // evaluate it again as a RegExp expression (used by some callers).
  if (typeof obj === 'string' && obj.startsWith('re'))
    obj = new Function(`return ${obj.slice(2)}`)()
  return obj
}

// const data = `[{"age":"14","fn": ()=>"123"}]`

// console.log(useJSONParse(data)) // { name: 'simon', age: '14' }
