import type { NodeWorkerPayload } from '../types'
import { useProcressNodeWorker } from '../node/useNodeWorker'
import { jsShell } from '../node/jsShell'

useProcressNodeWorker(
  ({ params, stdio = 'pipe', errorExit, isLog }: NodeWorkerPayload) =>
    jsShell(`${params}`, { stdio, errorExit, isLog }),
)
