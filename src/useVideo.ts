import { createElement } from './createElement'
import { addEventListener } from './addEventListener'

interface Sources {
  src: string
  type: string
}
interface VideoOptions {
  container: HTMLElement | string
  controls?: boolean
  width?: number
  height?: number
  className?: string
  style?: string
}
export function useVideo(sources: Sources[] = [], videoOptions: VideoOptions) {
  const video = createElement('video') as HTMLVideoElement
  const { controls = true, width, height, className, style } = videoOptions
  const container = videoOptions.container
  video.controls = controls
  if (width)
    video.width = width!
  if (height)
    video.height = height!
  if (className)
    video.className = className
  if (style)
    video.style.cssText = style
  addEventListener(document, 'DOMContentLoaded', update)
  addEventListener(video, 'timeupdate', () => (video.currentTime >= video.duration) && playReset())

  return {
    play() {
      if (video.paused)
        video.play()
      else
        video.pause()
    },
    playReset,
    playRate(rate = 1) {
      video.playbackRate = +rate
    },
    playTime(timing = 0) {
      video.currentTime += +timing
    },
    playProgress(currentTime = 0) {
      video.currentTime = +currentTime
    },
  }

  function playReset() {
    video.currentTime = 0
  }

  function update() {
    const source = createElement('source')
    sources.forEach(({ src, type }) => {
      const _source = source.cloneNode() as HTMLSourceElement
      _source.setAttribute('src', src)
      _source.setAttribute('type', type)
      video.appendChild(_source)
    });
    (container as HTMLElement).appendChild(video)
  }
}
