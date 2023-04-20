import type { NodeWorkerPayload } from '../types'
import { useProcressNodeWorker } from './useNodeWorker'
import { jsShell } from './jsShell'

useProcressNodeWorker(
  ({ params, stdio = 'pipe', errorExit, isLog }: NodeWorkerPayload) =>
    jsShell(`${params}`, stdio, errorExit, isLog),
)
