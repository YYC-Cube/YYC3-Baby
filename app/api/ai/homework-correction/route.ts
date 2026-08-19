import { NextResponse } from "next/server"
import { guardAIRequest } from "@/lib/api/ai-guard"
import { z } from "zod"

const bodySchema = z.object({ image: z.string() })
import { getHomeworkCorrectionService } from "@/lib/api/homework-correction"

// 请求体限制：base64 图片可能较大，超过 10MB 的作业照片直接拒绝
const MAX_IMAGE_BYTES = 10 * 1024 * 1024

export async function POST(request: Request) {
  // BigModel 视觉模型按次计费，配额从严
  const guard = await guardAIRequest(request, { name: "homework-correction", limit: 10 })
  if (guard instanceof NextResponse) return guard

  try {
    const parsed = bodySchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "缺少图片数据" }, { status: 400 })
    }
    const { image } = parsed.data

    if (typeof image !== "string" || !image.startsWith("data:image/")) {
      return NextResponse.json({ error: "缺少有效的图片数据（data:image/* base64）" }, { status: 400 })
    }

    // data URL 中 base64 部分约为原始大小的 4/3
    const base64Bytes = Math.floor((image.length - image.indexOf(",") - 1) * 0.75)
    if (base64Bytes > MAX_IMAGE_BYTES) {
      return NextResponse.json({ error: "图片过大，请压缩后重试（上限 10MB）" }, { status: 413 })
    }

    const service = getHomeworkCorrectionService()
    const correctionResult = await service.fullCorrectionFlow(image)

    return NextResponse.json(correctionResult)
  } catch (error) {
    console.error("[api] 作业批改失败:", error)
    return NextResponse.json({ error: "作业批改失败，请稍后重试" }, { status: 500 })
  }
}
