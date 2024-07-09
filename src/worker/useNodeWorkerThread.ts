import type { NodeWorkerPayload } from '../types'
import { useProcressNodeWorker } from '../node/useNodeWorker'
import { jsShell } from '../node/jsShell'

useProcressNodeWorker(({ params, ...args }: NodeWorkerPayload) =>
  jsShell(`${params}`, Object.assign({ stdio: 'pipe' }, args)),
)
