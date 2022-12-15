import type { NodeWorkerPayload } from '../types'
import { useProcressNodeWorker } from './useNodeWorker'
import { jsShell } from './jsShell'

useProcressNodeWorker(async ({ params, stdio = 'pipe' }: NodeWorkerPayload) =>
  jsShell(`${params}`, stdio),
)
