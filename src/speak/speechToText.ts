import { isFn } from '../is'
import type { Lang } from '../types'

/**
 * Speech-to-text options
 * @description EN: Options for the SpeechRecognition instance (continuous recognition, interim results, language).
 */
export interface SpeechToTextOptions {
  continuous: boolean // 每次识别都返回连续结果
  interimResults: boolean // 返回临时结果的设置
  lang: Lang
  maxAlternatives: number
}

const defaultSpeechOptions: SpeechToTextOptions = {
  continuous: true,
  interimResults: false,
  lang: 'zh-CN',
  maxAlternatives: 1,
}
/**
 * 语音转文字
 * @description EN: Wrapper around the Web SpeechRecognition API. Returns controls to toggle recognition or abort.
 * @param options - SpeechToTextOptions or a callback when omitted
 * @param callback - optional callback invoked with recognition results
 * @returns controls { toggle, abort }
 */
export function speechToText(
  options: SpeechToTextOptions | ((result: any) => any) = defaultSpeechOptions,
  callback?: (result: any) => any,
) {
  // 创建一个SpeechRecognition对象
  let isStart = false
  if (isFn(options)) {
    callback = options
    options = defaultSpeechOptions
  }
  const SpeechRecognition
    = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  Object.assign(recognition, options)

  // 正确识别单词或短语时的事件处理程序
  recognition.onresult = (event: any) => callback?.(event.results)

  return {
    toggle: () => {
      if (isStart)
        recognition.stop()
      else recognition.start()
      isStart = !isStart
    },
    abort: () => recognition.abort(),
  }
}
