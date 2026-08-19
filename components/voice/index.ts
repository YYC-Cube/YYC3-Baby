/**
 * @file index.ts
 * @description 语音组件统一导出（P0-3 融合）
 */

export { VoiceRecognition, default as VoiceRecognitionDefault } from "./VoiceRecognition"
export { VoiceSynthesis, default as VoiceSynthesisDefault } from "./VoiceSynthesis"
export {
  VoiceInteractionManager,
  default as VoiceInteractionManagerDefault,
  type VoiceInteractionOptions,
  type VoiceInteractionState,
} from "./VoiceInteractionManager"
