import { useEventListener } from '../event'

type Channel = BroadcastChannel & { listeners: Set<number>; id: number }
export function createChannel(name: string) {
  const channel = new BroadcastChannel(name) as Channel
  channel.listeners = new Set()
  channel.id = createStorageId(name)

  const sendMsg = (msg: string, channel: any) =>
    channel.postMessage({
      id: channel.id,
      msg,
    })

  channel.addEventListener('message', (e) => {
    if (e.data.msg === 'open') {
      sendMsg('response', channel)
      channel.listeners.add(e.data.id)
    }
    else if (e.data.msg === 'response') {
      channel.listeners.add(e.data.id)
    }
    else if (e.data.msg === 'close') {
      channel.listeners.delete(e.data.id)
    }
  })

  useEventListener(window, 'beforeunload', () => sendMsg('close', channel))

  sendMsg('open', channel)
  return channel
}

function createStorageId(name: string) {
  const key = `channel-${name}`
  const id = +(localStorage.getItem(key) ?? 0) + 1
  localStorage.setItem(key, id.toString())
  return id
}
