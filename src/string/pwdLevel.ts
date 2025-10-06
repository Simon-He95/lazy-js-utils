/**
 * Compute a simple password strength level (0-4) based on presence of
 * lowercase, uppercase, digits and symbols. If the string is shorter than
 * `minimum` the level is 0.
 *
 * @param s - input string or number (coerced to string)
 * @param minimum - minimum length required (default: 6)
 * @returns strength level from 0 (weak) to 4 (strong)
 */
export function pwdLevel(s: string | number, minimum = 6): number {
  let level = 0
  s = `${s}`
  if (s.match(/[a-z]/g))
    level++
  if (s.match(/[A-Z]/g))
    level++
  if (s.match(/\d/g))
    level++
  if (s.match(/[^a-z0-9]/gi))
    level++
  if (s.length < minimum)
    level = 0
  return level
}
