import { jsShell } from "./jsShell";

export function fileCopy(urls: string[], destination: string) {
  return jsShell(`cp -r {${urls.join(',')}} ${destination}`, 'pipe')
}
