/**
 * 声音分析错误类
 * @description 用于表示声音分析过程中出现的各种错误
 * @description EN: Error class representing problems encountered during voice analysis.
 * @example
 * ```typescript
 * throw new VoiceAnalysisError('录制失败', 'RECORDING_FAILED', { device: 'microphone' })
 * ```
 */
export class VoiceAnalysisError extends Error {
  /**
   * 创建声音分析错误实例
   * @param message - 错误消息
   * @param code - 错误代码，用于程序化处理
   * @param details - 错误详细信息，可选
   */
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: any,
  ) {
    super(message)
    this.name = 'VoiceAnalysisError'
  }
}

/**
 * 录制控制器接口
 * @description 提供录制过程的控制方法
 * @description EN: Controller interface for recording operations (stop, status, progress).
 */
export interface RecordingController {
  /** 停止录制 */
  stop: () => void
  /** 获取当前录制状态 */
  isRecording: () => boolean
  /** 获取录制进度（0-1） */
  getProgress: () => number
  /** 获取录制时长（毫秒） */
  getElapsedTime: () => number
}

/**
 * 分析帧数据接口
 * @description 单个时间点的音频分析数据
 * @description EN: Single time-point audio analysis frame containing frequency and time-domain data.
 */
export interface AnalysisFrame {
  /** 时间戳（毫秒） */
  timestamp: number
  /** 频域数据 */
  frequency: number[]
  /** 时域数据 */
  timeDomain: number[]
  /** 音量（RMS值，可选） */
  volume?: number
  /** 能量（可选） */
  energy?: number
}

/**
 * 谐波信息接口
 * @description 声音的谐波特征
 * @description EN: Harmonic information for a detected harmonic (frequency and amplitude).
 */
export interface Harmonic {
  /** 谐波频率（Hz） */
  frequency: number
  /** 谐波幅度 */
  amplitude: number
}

/**
 * 音色特征接口
 * @description 声音的音色特征参数
 * @description EN: Timbre-related characteristics used to describe voice color.
 */
export interface TimbreCharacteristics {
  /** 明亮度（0-1） */
  brightness: number
  /** 丰富度（0-1） */
  richness: number
  /** 粗糙度（0-1） */
  roughness: number
  /** 温暖度（0-1） */
  warmth: number
}

/**
 * 声音特征接口
 * @description 完整的声音分析结果
 * @description EN: Aggregated voice characteristics including pitch, formants, intensity and timbre.
 */
export interface VoiceCharacteristics {
  /** 基频（Hz） */
  fundamentalFrequency: number
  /** 共振峰频率数组（Hz） */
  formants: number[]
  /** 音量强度 */
  intensity: number
  /** 频谱重心 */
  spectralCentroid: number
  /** 谐波信息 */
  harmonics: Harmonic[]
  /** 声音类型 */
  voiceType: 'male' | 'female' | 'child' | 'unknown'
  /** TTS 建议音调参数 */
  pitch: number
  /** TTS 建议语速参数 */
  rate: number
  /** 音色特征 */
  timbre: TimbreCharacteristics
}

/**
 * TTS 参数接口
 * @description 文本转语音的参数配置
 * @description EN: Parameters suggested for TTS engines (pitch and rate).
 */
export interface TTSParameters {
  /** 音调（0.1-2.0） */
  pitch: number
  /** 语速（0.1-10.0） */
  rate: number
}

/**
 * TTS 建议接口
 * @description 基于声音分析的 TTS 参数建议
 * @description EN: Suggested TTS configuration derived from analysis (voice, pitch, rate, etc.).
 */
export interface TTSSuggestions {
  /** 建议的语音类型 */
  voice: string
  /** 建议的音调 */
  pitch: number
  /** 建议的语速 */
  rate: number
  /** 建议的音量 */
  volume: number
  /** 描述信息 */
  description: string
}

/**
 * 分析结果接口
 * @description 完整的声音分析结果，包含特征和 TTS 建议
 * @description EN: Final analysis output containing voice characteristics and TTS suggestions.
 */
export interface AnalysisResult {
  /** 声音特征 */
  characteristics: VoiceCharacteristics
  /** TTS 参数建议 */
  suggestions: TTSSuggestions
}

/**
 * 音频约束接口
 * @description 音频录制的约束配置
 * @description EN: Media constraints used when requesting microphone access (sampleRate, channelCount, etc.).
 */
export interface AudioConstraints {
  /** 回声消除，默认 true */
  echoCancellation?: boolean
  /** 噪声抑制，默认 true */
  noiseSuppression?: boolean
  /** 自动增益控制，默认 true */
  autoGainControl?: boolean
  /** 采样率，默认 44100 */
  sampleRate?: number
  /** 采样大小 */
  sampleSize?: number
  /** 声道数，默认 1 */
  channelCount?: number
  /** 延迟，默认 0.01 */
  latency?: number
}

/**
 * 分析选项接口
 * @description 声音分析的配置选项
 * @description EN: Options controlling recording duration, FFT size, callbacks and thresholds.
 */
export interface AnalysisOptions {
  /** 录制时长（毫秒），默认 5000ms */
  duration?: number
  /** FFT 大小，影响频率分辨率，默认 2048 */
  fftSize?: 256 | 512 | 1024 | 2048 | 4096 | 8192 | 16384 | 32768
  /** 音频约束配置 */
  audioConstraints?: AudioConstraints
  /** 峰值检测阈值（0-1），默认 0.3 */
  peakThreshold?: number
  /** 是否启用实时回调，默认 false */
  enableRealtimeCallback?: boolean
  /** 平滑时间常数，默认 0.8 */
  smoothingTimeConstant?: number
  /** 实时分析回调函数 */
  onRealtimeData?: (frame: AnalysisFrame) => void
  /** 进度回调函数 */
  onProgress?: (progress: number) => void
  /** 录制开始回调 */
  onRecordingStart?: () => void
  /** 录制结束回调 */
  onRecordingEnd?: () => void
  /** 录制停止回调 */
  onRecordingStopped?: (reason: 'manual' | 'duration' | 'error') => void
  /** 错误回调 */
  onError?: (error: Error) => void
  /** 音量变化回调 */
  onVolumeChange?: (volume: number) => void
}

/**
 * 声音分析配置接口
 * @description 声音分析算法的配置参数
 * @description EN: Algorithm-level configuration such as fundamental frequency range and formant/harmonic counts.
 */
export interface VoiceAnalysisConfig {
  /** 人声基频检测范围最小值（Hz），默认 80 */
  minFundamentalFreq?: number
  /** 人声基频检测范围最大值（Hz），默认 800 */
  maxFundamentalFreq?: number
  /** 检测的共振峰数量，默认 3 */
  formantCount?: number
  /** 检测的谐波数量，默认 5 */
  harmonicCount?: number
  /** 是否启用声音分类，默认 true */
  enableVoiceClassification?: boolean
  /** 是否生成 TTS 参数建议，默认 true */
  generateTTSParams?: boolean
}

/**
 * 声明全局类型
 * @description EN: Extend Window with webkitAudioContext for older WebKit-based browsers.
 */
declare global {
  interface Window {
    /** WebKit 浏览器的 AudioContext */
    webkitAudioContext?: typeof AudioContext
  }
}

/**
 * 声音分析器类
 * @description 提供实时声音录制、分析和特征提取功能
 * @example
 * ```typescript
 * const analyzer = new VoiceAnalyzer()
 * const { result, controller } = await analyzer.analyzeVoice({
 *   duration: 5000,
 *   onProgress: (progress) => console.log(`进度: ${progress * 100}%`)
/**
 * 声音分析器类
 * @description 提供实时声音录制、分析和特征提取功能
 * @description EN: VoiceAnalyzer manages microphone recording, real-time analysis and feature extraction.
 * @example
 * ```typescript
 * const analyzer = new VoiceAnalyzer()
 * const { result, controller } = await analyzer.analyzeVoice({
 *   duration: 5000,
 *   onProgress: (progress) => console.log(`进度: ${progress * 100}%`)
 * })
 *
 * // 手动停止录制
 */
export class VoiceAnalyzer {
  private audioContext: AudioContext | null = null
  private analyser: AnalyserNode | null = null
  private dataArray: Uint8Array | null = null
  private bufferLength: number | null = null
  private analysisConfig: VoiceAnalysisConfig = {}
  private isRecording: boolean = false
  private abortController: AbortController | null = null
  private currentStream: MediaStream | null = null
  private currentSource: MediaStreamAudioSourceNode | null = null
  private recordingStartTime: number = 0
  private recordingDuration: number = 0

  /**
   * 初始化音频上下文
   * @param fftSize - FFT 大小，默认 2048
   * @param smoothingTimeConstant - 平滑时间常数，默认 0.8
   * @returns 初始化是否成功
   * @throws {VoiceAnalysisError} 当浏览器不支持 AudioContext 时
   */
  async initializeAudioContext(
    fftSize: number = 2048,
    smoothingTimeConstant: number = 0.8,
  ): Promise<boolean> {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      if (!AudioContextClass) {
        throw new VoiceAnalysisError(
          'AudioContext not supported',
          'AUDIO_CONTEXT_NOT_SUPPORTED',
        )
      }

      this.audioContext = new AudioContextClass()

      // 检查音频上下文状态
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume()
      }

      this.analyser = this.audioContext.createAnalyser()
      this.analyser.fftSize = fftSize
      this.analyser.smoothingTimeConstant = smoothingTimeConstant
      this.bufferLength = this.analyser.frequencyBinCount
      this.dataArray = new Uint8Array(this.bufferLength)

      return true
    }
    catch (error) {
      console.error('音频上下文初始化失败:', error)
      return false
    }
  }

  /**
   * 录制并分析声音
   * @param options - 分析选项配置
   * @returns 包含分析结果 Promise 和控制器的对象
   * @throws {VoiceAnalysisError} 当录制已在进行中或参数无效时
   * @description EN: Start recording from the microphone and perform analysis according to the options. Returns a controller and a Promise for the result.
   * @example
   * ```typescript
   * const { result, controller } = await analyzer.analyzeVoice({
   *   duration: 8000,
   *   onProgress: (progress) => console.log(`${progress * 100}%`),
   *   onVolumeChange: (volume) => updateVolumeIndicator(volume)
   * })
   *
   * // 3秒后停止录制
   * setTimeout(() => controller.stop(), 3000)
   *
   * const characteristics = await result
   * ```
   */
  async analyzeVoice(options: AnalysisOptions = {}): Promise<{
    result: Promise<VoiceCharacteristics | null>
    controller: RecordingController
  }> {
    // 防止重复录制
    if (this.isRecording) {
      throw new VoiceAnalysisError(
        'Recording already in progress',
        'RECORDING_IN_PROGRESS',
      )
    }

    const {
      duration = 5000,
      fftSize = 2048,
      smoothingTimeConstant = 0.8,
      audioConstraints = {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
        sampleRate: 44100,
        channelCount: 1,
        latency: 0.01,
      },
      peakThreshold = 0.3,
      enableRealtimeCallback = false,
      onRealtimeData,
      onProgress,
      onRecordingStart,
      onRecordingEnd,
      onRecordingStopped,
      onError,
      onVolumeChange,
    } = options

    // 参数验证
    if (duration <= 0 || duration > 60000) {
      throw new VoiceAnalysisError(
        'Duration must be between 1ms and 60s',
        'INVALID_DURATION',
      )
    }

    this.recordingDuration = duration
    this.abortController = new AbortController()

    // 创建控制器
    const controller: RecordingController = {
      stop: () => this.stopRecording('manual', onRecordingStopped),
      isRecording: () => this.isRecording,
      getProgress: () => this.getRecordingProgress(),
      getElapsedTime: () => this.getElapsedTime(),
    }

    // 异步执行录制分析
    const resultPromise = this.performRecordingAnalysis({
      duration,
      fftSize,
      smoothingTimeConstant,
      audioConstraints,
      peakThreshold,
      enableRealtimeCallback,
      onRealtimeData,
      onProgress,
      onRecordingStart,
      onRecordingEnd,
      onRecordingStopped,
      onError,
      onVolumeChange,
    })

    return {
      result: resultPromise,
      controller,
    }
  }

  /**
   * 设置分析配置
   * @param config - 分析配置参数
   * @description EN: Merge user-provided configuration into the analyzer's algorithm settings.
   * @example
   * ```typescript
   * analyzer.setAnalysisConfig({
   *   minFundamentalFreq: 70,
   *   maxFundamentalFreq: 900,
   *   formantCount: 4,
   *   harmonicCount: 6
   * })
   * ```
   */
  setAnalysisConfig(config: VoiceAnalysisConfig): void {
    this.analysisConfig = { ...this.analysisConfig, ...config }
  }

  /**
   * 主动停止录制
   * @param reason - 停止原因
   * @param onRecordingStopped - 停止回调函数
   * @description EN: Stop an in-progress recording, abort internal operations and invoke the stopped callback.
   */
  stopRecording(
    reason: 'manual' | 'duration' | 'error' = 'manual',
    onRecordingStopped?: (reason: 'manual' | 'duration' | 'error') => void,
  ): void {
    if (!this.isRecording) {
      console.warn('No recording in progress')
      return
    }

    if (this.abortController && !this.abortController.signal.aborted) {
      this.abortController.abort()
    }

    this.cleanupRecording()
    onRecordingStopped?.(reason)
  }

  /**
   * 获取 TTS 语音建议
   * @param characteristics - 声音特征数据
   * @returns TTS 参数建议，如果输入为空则返回 null
   * @description EN: Convert detected voice characteristics to TTS parameter suggestions (pitch, rate, volume).
   * @example
   * ```typescript
   * const suggestions = analyzer.getTTSSuggestions(characteristics)
   * if (suggestions) {
   *   const utterance = new SpeechSynthesisUtterance("测试文本")
   *   utterance.pitch = suggestions.pitch
   *   utterance.rate = suggestions.rate
   *   speechSynthesis.speak(utterance)
   * }
   * ```
   */
  getTTSSuggestions(
    characteristics: VoiceCharacteristics | null,
  ): TTSSuggestions | null {
    if (!characteristics)
      return null

    return {
      voice: characteristics.voiceType,
      pitch: characteristics.pitch,
      rate: characteristics.rate,
      volume: Math.min(characteristics.intensity / 100, 1.0),
      description: `检测到${characteristics.voiceType}声音，基频${Math.round(
        characteristics.fundamentalFrequency,
      )}Hz`,
    }
  }

  /**
   * 资源清理
   * @description 清理所有音频资源，关闭音频上下文
   */
  dispose(): void {
    this.stopRecording('manual')

    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close().catch(console.error)
    }

    this.audioContext = null
    this.analyser = null
    this.dataArray = null
    this.bufferLength = null
  }

  /**
   * 执行录制和分析
   * @private
   * @param options - 分析选项
   * @returns 声音特征分析结果
   * @description EN: Core implementation that handles getUserMedia, streaming into the analyser and collecting frames.
   */
  private async performRecordingAnalysis(
    options: AnalysisOptions,
  ): Promise<VoiceCharacteristics | null> {
    const {
      duration = 5000,
      fftSize = 2048,
      smoothingTimeConstant = 0.8,
      audioConstraints,
      peakThreshold = 0.3,
      enableRealtimeCallback = false,
      onRealtimeData,
      onProgress,
      onRecordingStart,
      onRecordingEnd,
      onRecordingStopped,
      onError,
      onVolumeChange,
    } = options

    try {
      this.isRecording = true
      this.recordingStartTime = Date.now()

      if (!this.audioContext || this.analyser?.fftSize !== fftSize) {
        await this.initializeAudioContext(fftSize, smoothingTimeConstant)
      }

      onRecordingStart?.()

      // 获取麦克风流
      this.currentStream = await navigator.mediaDevices.getUserMedia({
        audio: audioConstraints,
        video: false,
      })

      // 检查是否被中止
      if (this.abortController?.signal.aborted) {
        this.cleanupRecording()
        onRecordingStopped?.('manual')
        return null
      }

      if (!this.audioContext || !this.analyser) {
        throw new VoiceAnalysisError(
          'Audio context not properly initialized',
          'CONTEXT_ERROR',
        )
      }

      // 连接音频源
      this.currentSource = this.audioContext.createMediaStreamSource(
        this.currentStream,
      )
      this.currentSource.connect(this.analyser)

      // 开始分析
      const analysisData = await this.performAnalysis(
        duration,
        enableRealtimeCallback ? onRealtimeData : undefined,
        onProgress,
        onVolumeChange,
        this.abortController?.signal,
      )

      // 正常结束
      this.cleanupRecording()

      if (this.abortController?.signal.aborted) {
        onRecordingStopped?.('manual')
      }
      else {
        onRecordingEnd?.()
        onRecordingStopped?.('duration')
      }

      if (analysisData.length === 0) {
        throw new VoiceAnalysisError('No audio data captured', 'NO_DATA')
      }

      return this.calculateVoiceCharacteristics(analysisData, { peakThreshold })
    }
    catch (error) {
      this.cleanupRecording()

      const analysisError
        = error instanceof VoiceAnalysisError
          ? error
          : new VoiceAnalysisError(
            'Voice analysis failed',
            'ANALYSIS_FAILED',
            error,
          )

      onError?.(analysisError)
      onRecordingStopped?.('error')
      console.error('声音分析失败:', analysisError)
      return null
    }
  }

  /**
   * 清理录制资源
   * @private
   */
  private cleanupRecording(): void {
    this.isRecording = false

    // 断开音频源连接
    if (this.currentSource) {
      try {
        this.currentSource.disconnect()
      }
      catch (error) {
        console.warn('Failed to disconnect audio source:', error)
      }
      this.currentSource = null
    }

    // 停止媒体流
    if (this.currentStream) {
      this.currentStream.getTracks().forEach((track) => {
        try {
          track.stop()
        }
        catch (error) {
          console.warn('Failed to stop track:', error)
        }
      })
      this.currentStream = null
    }

    this.recordingStartTime = 0
  }

  /**
   * 获取录制进度
   * @private
   * @returns 录制进度（0-1）
   */
  private getRecordingProgress(): number {
    if (!this.isRecording || this.recordingStartTime === 0) {
      return 0
    }

    const elapsed = Date.now() - this.recordingStartTime
    return Math.min(elapsed / this.recordingDuration, 1)
  }

  /**
   * 获取已录制时长
   * @private
   * @returns 已录制时长（毫秒）
   */
  private getElapsedTime(): number {
    if (!this.isRecording || this.recordingStartTime === 0) {
      return 0
    }

    return Date.now() - this.recordingStartTime
  }

  /**
   * 计算 RMS 音量
   * @private
   * @param timeData - 时域数据
   * @returns RMS 音量值
   */
  private calculateRMSVolume(timeData: number[]): number {
    let sum = 0
    for (let i = 0; i < timeData.length; i++) {
      const sample = (timeData[i] - 128) / 128
      sum += sample * sample
    }
    return Math.sqrt(sum / timeData.length)
  }

  /**
   * 计算能量
   * @private
   * @param frequencyData - 频域数据
   * @returns 能量值
   */
  private calculateEnergy(frequencyData: number[]): number {
    return (
      frequencyData.reduce((sum, value) => sum + value * value, 0)
      / frequencyData.length
    )
  }

  /**
   * 执行音频分析
   * @private
   * @param duration - 分析时长
   * @param onRealtimeData - 实时数据回调
   * @param onProgress - 进度回调
   * @param onVolumeChange - 音量变化回调
   * @param abortSignal - 中止信号
   * @returns 分析帧数据数组
   * @description EN: Collect audio frames for the requested duration, invoking callbacks for realtime data and progress.
   */
  private performAnalysis(
    duration: number,
    onRealtimeData?: (frame: AnalysisFrame) => void,
    onProgress?: (progress: number) => void,
    onVolumeChange?: (volume: number) => void,
    abortSignal?: AbortSignal,
  ): Promise<AnalysisFrame[]> {
    return new Promise((resolve, reject) => {
      if (!this.analyser || !this.dataArray || !this.bufferLength) {
        reject(
          new VoiceAnalysisError('Analyser not initialized', 'ANALYSER_ERROR'),
        )
        return
      }

      const analysisData: AnalysisFrame[] = []
      const targetFrameRate = 60
      const frameInterval = 1000 / targetFrameRate
      const maxFrames = Math.ceil(duration / frameInterval)

      const startTime = Date.now()
      let frameCount = 0
      let animationFrameId: number | null = null

      const analyzeFrame = (): void => {
        // 检查中止信号
        if (abortSignal?.aborted) {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId)
          }
          resolve(analysisData)
          return
        }

        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)

        onProgress?.(progress)

        if (elapsed >= duration || frameCount >= maxFrames) {
          resolve(analysisData)
          return
        }

        if (!this.analyser || !this.dataArray || !this.bufferLength) {
          reject(
            new VoiceAnalysisError(
              'Analyser became null during recording',
              'ANALYSER_ERROR',
            ),
          )
          return
        }

        try {
          // 获取频域数据
          this.analyser.getByteFrequencyData(this.dataArray)
          const frequencyData = Array.from(this.dataArray)

          // 获取时域数据
          const timeDataArray = new Uint8Array(this.bufferLength)
          this.analyser.getByteTimeDomainData(timeDataArray)
          const timeData = Array.from(timeDataArray)

          // 计算音量和能量
          const volume = this.calculateRMSVolume(timeData)
          const energy = this.calculateEnergy(frequencyData)

          const frame: AnalysisFrame = {
            timestamp: elapsed,
            frequency: frequencyData,
            timeDomain: timeData,
            volume,
            energy,
          }

          analysisData.push(frame)
          frameCount++

          // 回调
          onRealtimeData?.(frame)
          onVolumeChange?.(volume)

          // 使用 requestAnimationFrame 进行下一帧
          if (typeof requestAnimationFrame !== 'undefined') {
            animationFrameId = requestAnimationFrame(analyzeFrame)
          }
          else {
            setTimeout(analyzeFrame, frameInterval)
          }
        }
        catch (error) {
          reject(
            new VoiceAnalysisError(
              'Frame analysis failed',
              'FRAME_ERROR',
              error,
            ),
          )
        }
      }

      // 开始分析
      analyzeFrame()
    })
  }

  /**
   * 计算声音特征
   * @private
   * @param analysisData - 分析帧数据
   * @param options - 计算选项
   * @returns 声音特征数据
   */
  private calculateVoiceCharacteristics(
    analysisData: AnalysisFrame[],
    options: { peakThreshold?: number } = {},
  ): VoiceCharacteristics | null {
    if (!analysisData.length)
      return null

    const { peakThreshold = 0.3 } = options
    const config = this.analysisConfig

    const characteristics: VoiceCharacteristics = {
      fundamentalFrequency: 0,
      formants: [],
      intensity: 0,
      spectralCentroid: 0,
      harmonics: [],
      voiceType: 'unknown',
      pitch: 1.0,
      rate: 1.0,
      timbre: {
        brightness: 0,
        richness: 0,
        roughness: 0,
        warmth: 0,
      },
    }

    // 计算平均频谱
    const avgSpectrum = this.calculateAverageSpectrum(analysisData)

    // 检测基频
    characteristics.fundamentalFrequency = this.detectFundamentalFrequency(
      avgSpectrum,
      config.minFundamentalFreq || 80,
      config.maxFundamentalFreq || 800,
    )

    // 检测共振峰
    characteristics.formants = this.detectFormants(
      avgSpectrum,
      peakThreshold,
      config.formantCount || 3,
    )

    // 计算音量强度
    characteristics.intensity = this.calculateIntensity(analysisData)

    // 计算频谱重心
    characteristics.spectralCentroid
      = this.calculateSpectralCentroid(avgSpectrum)

    // 检测谐波
    characteristics.harmonics = this.detectHarmonics(
      avgSpectrum,
      characteristics.fundamentalFrequency,
      config.harmonicCount || 5,
    )

    // 分析声音类型
    if (config.enableVoiceClassification !== false) {
      characteristics.voiceType = this.classifyVoiceType(characteristics)
    }

    // 生成TTS参数建议
    if (config.generateTTSParams !== false) {
      const ttsParams = this.generateTTSParameters(characteristics)
      characteristics.pitch = ttsParams.pitch
      characteristics.rate = ttsParams.rate
    }

    // 分析音色特征
    characteristics.timbre = this.analyzeTimbre(avgSpectrum, characteristics)

    return characteristics
  }

  /**
   * 计算平均频谱
   * @private
   * @param analysisData - 分析帧数据
   * @returns 平均频谱数据
   */
  private calculateAverageSpectrum(analysisData: AnalysisFrame[]): number[] {
    const spectrumLength = analysisData[0].frequency.length
    const avgSpectrum = new Array(spectrumLength).fill(0)

    analysisData.forEach((frame) => {
      frame.frequency.forEach((value, index) => {
        avgSpectrum[index] += value
      })
    })

    return avgSpectrum.map(value => value / analysisData.length)
  }

  /**
   * 检测基频（音调）
   * @private
   * @param spectrum - 频谱数据
   * @param minFreq - 最小频率
   * @param maxFreq - 最大频率
   * @returns 基频值（Hz）
   */
  private detectFundamentalFrequency(
    spectrum: number[],
    minFreq: number = 80,
    maxFreq: number = 800,
  ): number {
    const sampleRate = 44100
    const binSize = sampleRate / (spectrum.length * 2)

    const minBin = Math.floor(minFreq / binSize)
    const maxBin = Math.floor(maxFreq / binSize)

    let maxAmplitude = 0
    let fundamentalBin = 0

    for (let i = minBin; i < maxBin && i < spectrum.length; i++) {
      if (spectrum[i] > maxAmplitude) {
        maxAmplitude = spectrum[i]
        fundamentalBin = i
      }
    }

    return fundamentalBin * binSize
  }

  /**
   * 检测共振峰
   * @private
   * @param spectrum - 频谱数据
   * @param threshold - 峰值检测阈值
   * @param count - 共振峰数量
   * @returns 共振峰频率数组
   */
  private detectFormants(
    spectrum: number[],
    threshold: number = 0.3,
    count: number = 3,
  ): number[] {
    const formants: number[] = []
    const sampleRate = 44100
    const binSize = sampleRate / (spectrum.length * 2)

    const peaks = this.findPeaks(spectrum, threshold)

    peaks.slice(0, count).forEach((peakIndex) => {
      formants.push(peakIndex * binSize)
    })

    return formants
  }

  /**
   * 检测谐波
   * @private
   * @param spectrum - 频谱数据
   * @param fundamentalFreq - 基频
   * @param count - 谐波数量
   * @returns 谐波信息数组
   */
  private detectHarmonics(
    spectrum: number[],
    fundamentalFreq: number,
    count: number = 5,
  ): Harmonic[] {
    if (!fundamentalFreq)
      return []

    const harmonics: Harmonic[] = []
    const sampleRate = 44100
    const binSize = sampleRate / (spectrum.length * 2)

    for (let harmonic = 2; harmonic <= count + 1; harmonic++) {
      const harmonicFreq = fundamentalFreq * harmonic
      const harmonicBin = Math.round(harmonicFreq / binSize)

      if (harmonicBin < spectrum.length) {
        harmonics.push({
          frequency: harmonicFreq,
          amplitude: spectrum[harmonicBin],
        })
      }
    }

    return harmonics
  }

  /**
   * 寻找频谱峰值
   * @private
   * @param spectrum - 频谱数据
   * @param threshold - 峰值阈值
   * @returns 峰值索引数组
   */
  private findPeaks(spectrum: number[], threshold: number): number[] {
    const peaks: number[] = []
    const maxValue = Math.max(...spectrum)
    const minThreshold = maxValue * threshold

    for (let i = 1; i < spectrum.length - 1; i++) {
      if (
        spectrum[i] > spectrum[i - 1]
        && spectrum[i] > spectrum[i + 1]
        && spectrum[i] > minThreshold
      ) {
        peaks.push(i)
      }
    }

    return peaks.sort((a, b) => spectrum[b] - spectrum[a])
  }

  /**
   * 计算音量强度
   * @private
   * @param analysisData - 分析帧数据
   * @returns 平均音量强度
   */
  private calculateIntensity(analysisData: AnalysisFrame[]): number {
    let totalIntensity = 0

    analysisData.forEach((frame) => {
      const frameIntensity = frame.frequency.reduce(
        (sum, value) => sum + value,
        0,
      )
      totalIntensity += frameIntensity
    })

    return totalIntensity / analysisData.length
  }

  /**
   * 计算频谱重心
   * @private
   * @param spectrum - 频谱数据
   * @returns 频谱重心值
   */
  private calculateSpectralCentroid(spectrum: number[]): number {
    let weightedSum = 0
    let magnitudeSum = 0

    spectrum.forEach((magnitude, index) => {
      weightedSum += magnitude * index
      magnitudeSum += magnitude
    })

    return magnitudeSum > 0 ? weightedSum / magnitudeSum : 0
  }

  /**
   * 分类声音类型
   * @private
   * @param characteristics - 声音特征
   * @returns 声音类型
   */
  private classifyVoiceType(
    characteristics: VoiceCharacteristics,
  ): 'male' | 'female' | 'child' | 'unknown' {
    const f0 = characteristics.fundamentalFrequency

    if (f0 < 165)
      return 'male'
    else if (f0 < 265)
      return 'female'
    else return 'child'
  }

  /**
   * 生成 TTS 参数建议
   * @private
   * @param characteristics - 声音特征
   * @returns TTS 参数
   */
  private generateTTSParameters(
    characteristics: VoiceCharacteristics,
  ): TTSParameters {
    const f0 = characteristics.fundamentalFrequency

    // 根据基频调整音调参数
    let pitch = 1.0
    if (f0 < 120)
      pitch = 0.8 // 低音
    else if (f0 > 250)
      pitch = 1.3 // 高音

    // 根据频谱特征调整语速
    let rate = 1.0
    if (characteristics.spectralCentroid > 1000)
      rate = 1.1 // 明亮音色稍快
    else if (characteristics.spectralCentroid < 500)
      rate = 0.9 // 沉闷音色稍慢

    return { pitch, rate }
  }

  /**
   * 分析音色特征
   * @private
   * @param spectrum - 频谱数据
   * @param characteristics - 声音特征
   * @returns 音色特征
   */
  private analyzeTimbre(
    spectrum: number[],
    characteristics: VoiceCharacteristics,
  ): TimbreCharacteristics {
    return {
      brightness: characteristics.spectralCentroid / 1000, // 明亮度
      richness: characteristics.harmonics.length / 5, // 丰富度
      roughness: this.calculateRoughness(spectrum), // 粗糙度
      warmth: characteristics.fundamentalFrequency < 200 ? 0.8 : 0.3, // 温暖度
    }
  }

  /**
   * 计算粗糙度
   * @private
   * @param spectrum - 频谱数据
   * @returns 粗糙度值
   */
  private calculateRoughness(spectrum: number[]): number {
    let roughness = 0
    for (let i = 1; i < spectrum.length; i++) {
      roughness += Math.abs(spectrum[i] - spectrum[i - 1])
    }
    return roughness / spectrum.length / 255 // 归一化
  }
}

/**
 * 分析用户声音的便捷函数
 * @description 提供简单易用的声音分析接口
 * @param options - 分析选项配置
 * @returns 包含分析结果 Promise 和控制器的对象
 * @throws {VoiceAnalysisError} 当录制失败或参数无效时
 * @example
 * ```typescript
 * // 基本使用
 * const { result, controller } = await analyzeUserVoice()
 *
 * // 自定义配置
 * const { result, controller } = await analyzeUserVoice({
 *   duration: 8000,
 *   onProgress: (progress) => {
 *     console.log(`录制进度: ${Math.round(progress * 100)}%`)
 *   },
 *   onVolumeChange: (volume) => {
 *     updateVolumeIndicator(volume)
 *   }
 * })
 *
 * // 手动停止
 * setTimeout(() => controller.stop(), 5000)
 *
 * // 获取结果
 * const analysis = await result
 * if (analysis) {
 *   console.log('声音特征:', analysis.characteristics)
 *   console.log('TTS建议:', analysis.suggestions)
 * }
 * ```
 */
export async function analyzeUserVoice(options: AnalysisOptions = {}): Promise<{
  result: Promise<AnalysisResult | null>
  controller: RecordingController
}> {
  const analyzer = new VoiceAnalyzer()

  // 设置分析配置
  analyzer.setAnalysisConfig({
    minFundamentalFreq: 70,
    maxFundamentalFreq: 900,
    formantCount: 4,
    harmonicCount: 6,
    enableVoiceClassification: true,
    generateTTSParams: true,
  })

  const defaultOptions: AnalysisOptions = {
    duration: 5000,
    fftSize: 2048,
    peakThreshold: 0.3,
    enableRealtimeCallback: false,
    onProgress: (progress) => {
      console.log(`录制进度: ${Math.round(progress * 100)}%`)
    },
    onRecordingStart: () => {
      console.log('开始录制声音，请说话...')
    },
    onRecordingEnd: () => {
      console.log('录制完成，正在分析...')
    },
    onRecordingStopped: (reason) => {
      console.log(`录制停止，原因: ${reason}`)
    },
    onError: (error) => {
      console.error('录制出错:', error.message)
    },
    ...options,
  }

  const { result, controller } = await analyzer.analyzeVoice(defaultOptions)

  // 包装结果处理
  const wrappedResult = result.then((characteristics) => {
    if (characteristics) {
      console.log('声音分析结果:', characteristics)

      const suggestions = analyzer.getTTSSuggestions(characteristics)
      if (suggestions) {
        console.log('TTS参数建议:', suggestions)
        return { characteristics, suggestions }
      }
    }
    return null
  })

  return {
    result: wrappedResult,
    controller,
  }
}
