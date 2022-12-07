import { isStr } from '../is/isStr'

interface SpeechOptions {
  text: string
  voice?: SpeechSynthesisVoice | null
  rate?: number
  pitch?: number
  volume?: number
  lang?: 'zh-CN' | 'en-US' | 'ja-JP' | 'ko-KR' | 'zh-TW' | 'zh-HK' | 'zh-MO' | 'zh-SG'
}
interface SpeechResult {
  cancel: () => void
  pause: () => void
  resume: () => void
  speak: (options: string | SpeechOptions | undefined) => void
}

let speechInstance: SpeechSynthesisUtterance
export function speech(text: string): SpeechResult
export function speech(options: SpeechOptions): SpeechResult
export function speech(options: SpeechOptions | string = { text: '', lang: 'zh-CN', volume: 1, rate: 1, pitch: 1, voice: null }): SpeechResult | undefined {
  const preText = getSpeechInstance(options)
  return {
    cancel: () => speechSynthesis.cancel(),
    pause: () => speechSynthesis.pause(),
    resume: () => speechSynthesis.resume(),
    speak: (options: string | SpeechOptions | undefined) => {
      options = options || preText
      getSpeechInstance(options)
      speechSynthesis.speak(speechInstance)
    },
  }
}

function getSpeechInstance(options: string | SpeechOptions): string {
  speechInstance = Object.assign(speechInstance || new SpeechSynthesisUtterance(), isStr(options) ? { text: options } : options)
  return speechInstance.text
}
