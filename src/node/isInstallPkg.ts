import { jsShell } from './jsShell'

export async function isInstallPkg(pkg: string) {
  const { status } = await jsShell(`if ! command -v ${pkg} &> /dev/null; then
  exit 1
else
  exit 0
fi`)
  return status === 0
}
