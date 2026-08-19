import { NextResponse } from "next/server"
import { guardAIRequest } from "@/lib/api/ai-guard"
import { z } from "zod"

const bodySchema = z.object({ content: z.string().min(1).max(10000) })

export async function POST(request: Request) {
  const guard = await guardAIRequest(request, { name: "analyze-record", limit: 30 })
  if (guard instanceof NextResponse) return guard

  try {
    const parsed = bodySchema.safeParse(await request.json())
    if (!parsed.success) {
      return NextResponse.json({ error: "content 为必填" }, { status: 400 })
    }
    const { content } = parsed.data

    // 实际应调用AI模型，这里使用模拟数据
    const mockResponse = {
      suggestedTitle: content.slice(0, 15) + "...",
      suggestedTags: ["成长", "进步", "值得记录"],
      analysis: "这是一个值得记录的成长瞬间，展现了孩子的进步",
      isMilestone: content.includes("第一次") || content.includes("独立"),
      milestoneType: content.includes("第一次") ? "achievement" : null,
    }

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("[v0] AI分析记录失败:", error)
    return NextResponse.json({ error: "AI分析失败" }, { status: 500 })
  }
}
