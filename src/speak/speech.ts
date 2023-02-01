import { isStr } from '../is/isStr'
import type { Lang } from '../types'
export interface SpeechOptions {
  text: string
  voice?: SpeechSynthesisVoice | null
  rate?: number
  pitch?: number
  volume?: number
  lang?: Lang
}
export interface SpeechResult {
  cancel: () => void
  pause: () => void
  resume: () => void
  speak: (options?: string | SpeechOptions) => void
  isSpeaking: () => boolean
}

let speechInstance: SpeechSynthesisUtterance
const defaultOptions = {
  text: '',
  lang: 'zh-CN',
  volume: 1,
  rate: 1,
  pitch: 0.5,
  voice: null,
}
export function speech(text?: string): SpeechResult
export function speech(options?: SpeechOptions): SpeechResult
export function speech(options?: SpeechOptions | string): SpeechResult {
  const preText = getSpeechInstance(options)
  return {
    cancel: () => speechSynthesis.cancel(),
    pause: () => speechSynthesis.pause(),
    resume: () => speechSynthesis.resume(),
    speak: (options?: string | SpeechOptions) => {
      options = options || preText
      getSpeechInstance(options)
      speechSynthesis.speak(speechInstance)
    },
    isSpeaking: () => speechSynthesis.speaking,
  }
}

function getSpeechInstance(options?: string | SpeechOptions): string {
  speechInstance = Object.assign(
    speechInstance || new SpeechSynthesisUtterance(),
    isStr(options) ? Object.assign(defaultOptions, { text: options }) : options,
  )
  return speechInstance.text
}
