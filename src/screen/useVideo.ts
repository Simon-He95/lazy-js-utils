import { createElement } from '../event/createElement'
import { useEventListener } from '../event/useEventListener'

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

/**
 * 操作video
 * @param sources {
  src: string
  type: string
}
 * @param videoOptions {
  container: HTMLElement | string
  controls?: boolean
  width?: number
  height?: number
  className?: string
  style?: string
}
 * @returns
 */
export function useVideo(sources: Sources[] = [], videoOptions: VideoOptions) {
  // @description EN: Create a video element with provided sources and controls, attach to container, and provide playback helpers.
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
  useEventListener(document, 'DOMContentLoaded', update)
  useEventListener(
    video,
    'timeupdate',
    () => video.currentTime >= video.duration && playReset(),
  )

  return {
    play() {
      if (video.paused)
        video.play()
      else video.pause()
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
    })
    ;(container as HTMLElement).appendChild(video)
  }
}
