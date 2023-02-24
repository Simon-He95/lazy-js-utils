import { useAnimationFrame } from '../perf'
import { mount } from '../utils'
import type { MaybeElement } from './../types'

interface FrequencyOptions {
  audio: MaybeElement
  fftSize?: number
}

export function useFrequency(
  options: FrequencyOptions,
  callback: (
    dataArray: Uint8Array,
    audioCtx: AudioContext,
    analyser: AnalyserNode,
  ) => void,
) {
  const { audio, fftSize = 512 } = options
  mount(audio, (el) => {
    let isInit = false
    el.onplay = function () {
      if (isInit)
        return
      isInit = true
      // init
      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaElementSource(el as HTMLAudioElement)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = fftSize
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      source.connect(analyser)
      analyser.connect(audioCtx.destination)

      useAnimationFrame(() => {
        analyser.getByteFrequencyData(dataArray)
        callback?.(dataArray, audioCtx, analyser)
      })
    }
  })
}
