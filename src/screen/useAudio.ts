import { download } from '../event/download'
import { findElement } from '../event/findElement'
import { isStr } from '../is/isStr'

export function useAudio(container: string | HTMLAudioElement) {
  if (!navigator)
    return console.error('Not support navigator')
  let isStart = false
  let mediaRecorder: MediaRecorder
  let audioURL: string
  navigator.mediaDevices.getUserMedia({ audio: true }).then(
    (stream) => {
      const chunks: any[] = []
      const audio = isStr(container)
        ? (findElement(container) as HTMLVideoElement)
        : container
      if (!audio)
        return console.error('audio element not found')
      mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = e => chunks.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' })
        chunks.length = 0
        audioURL = window.URL.createObjectURL(blob)
        audio.src = audioURL
      }
      if (isStart)
        toggleSwitch()
    },
    () => {
      console.error('授权失败！')
    },
  )

  return {
    toggle() {
      if (!mediaRecorder)
        return (isStart = true)
      return toggleSwitch()
    },
    download() {
      download(audioURL)
    },
  }

  function toggleSwitch() {
    if (mediaRecorder.state === 'recording')
      return mediaRecorder.stop()
    return mediaRecorder.start()
  }
}
