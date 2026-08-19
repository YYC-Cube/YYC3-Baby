import { NextResponse } from "next/server"
import { guardAIRequest } from "@/lib/api/ai-guard"
import { getVoiceService } from "@/lib/api/voice-services"

// 语音转写上限 25MB（BigModel ASR 限制）
const MAX_AUDIO_BYTES = 25 * 1024 * 1024

export async function POST(request: Request) {
  // BigModel ASR 按时长计费，配额从严
  const guard = await guardAIRequest(request, { name: "speech-to-text", limit: 10 })
  if (guard instanceof NextResponse) return guard

  try {
    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return NextResponse.json({ error: "请求体必须是 multipart/form-data" }, { status: 400 })
    }
    const audio = formData.get("audio")

    if (!(audio instanceof File)) {
      return NextResponse.json({ error: "缺少音频文件（字段名 audio）" }, { status: 400 })
    }
    if (audio.size > MAX_AUDIO_BYTES) {
      return NextResponse.json({ error: "音频过大（上限 25MB）" }, { status: 413 })
    }

    const text = await getVoiceService().uploadAndTranscribe(audio)
    return NextResponse.json({ text })
  } catch (error) {
    console.error("[api] 语音转写失败:", error)
    return NextResponse.json({ error: "语音转写失败，请稍后重试" }, { status: 500 })
  }
}
