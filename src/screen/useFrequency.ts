import { useRaf } from '../perf'
import { mount } from '../utils'
import type { MaybeElement } from './../types'

interface FrequencyOptions {
  audio: MaybeElement
  fftSize?: number
}

/**
 * 处理audio获取频域数组
 * @param { FrequencyOptions } options { audio: 目标元素, fftSize: 分析细粒度 2^n 默认 512 }
 * @param { ( dataArray: Uint8Array, audioCtx: AudioContext, analyser: AnalyserNode ) => void } callback 回调
 */

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

      useRaf(() => {
        analyser.getByteFrequencyData(dataArray)
        callback?.(dataArray, audioCtx, analyser)
      })
    }
  })
}
