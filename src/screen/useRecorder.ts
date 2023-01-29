import { download } from '../event/download'

// 录制功能
export async function useRecorder(fileName = String(new Date().getTime())) {
  const videoStream = await navigator.mediaDevices.getDisplayMedia({
    video: true,
  })
  const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true })
  const tracks: any[] = []
  videoStream.getVideoTracks().forEach(t => tracks.push(t))
  audioStream.getAudioTracks().forEach(t => tracks.push(t))
  const stream = new MediaStream(tracks)
  const recorder = new MediaRecorder(stream)
  const data: BlobPart[] = []
  recorder.ondataavailable = (e) => {
    data.push(e.data)
  }
  recorder.onstop = () => {
    const { stream, mimeType: type } = recorder
    stream.getTracks().forEach(track => track.stop())
    const blob = new Blob(data, { type })
    const url = URL.createObjectURL(blob)
    download(url, `${fileName}.webm`)
  }
  recorder.start()
  return () => recorder.stop()
}
