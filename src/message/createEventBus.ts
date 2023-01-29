import type { EventBus } from '../types'

/**
 * eventbus
 */
export function createEventBus(): EventBus {
  return {
    data: Object.create(null),
    emit(event: string, data: any) {
      (this.data[event] || []).forEach(handler => handler(data))
    },
    on(event, handler) {
      if (!this.data[event])
        this.data[event] = []
      this.data[event].push(handler)
    },
    off(event, handler) {
      const i = (this.data[event] || []).findIndex(h => h === handler)
      if (i > -1)
        this.data[event].splice(i, 1)
      if (this.data[event].length === 0)
        delete this.data[event]
    },
  }
}
