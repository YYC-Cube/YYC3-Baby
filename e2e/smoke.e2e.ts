/**
 * 最小业务闭环 e2e 冒烟（宗师闭环记录建议）
 * 流程：UI 登录（演示账号）→ 建娃（API，httpOnly Cookie 认证）→ 写成长记录 → 校验租户隔离 → 登出 → 401
 * 说明：children/growth 页面 UI 目前读写 localStorage mock 层（见阶段记录），
 *       数据写入真实服务端经浏览器内 fetch 完成——覆盖 cookie 认证 + 租户隔离 + 外键全链路。
 */
import { expect, test } from "@playwright/test"

const DEMO = { email: "parent@yyc3.com", password: "demo123456" }

test("登录 → 建娃 → 写记录 → 登出 全链路", async ({ page }) => {
  const stamp = Date.now()

  // —— 1. UI 登录（首页 LoginModal 弹窗）——
  await page.goto("/")
  await page.getByRole("button", { name: "登录", exact: true }).first().click()
  await expect(page.getByText("欢迎回来")).toBeVisible()
  await page.getByPlaceholder("请输入邮箱地址").fill(DEMO.email)
  await page.getByPlaceholder("请输入密码").fill(DEMO.password)
  // 表单内提交按钮（type=submit，文案"登录"）
  await page.locator('button[type="submit"]').click()
  // 弹窗关闭 = 登录成功
  await expect(page.getByText("欢迎回来")).toBeHidden({ timeout: 10_000 })

  // —— 2. 建娃（浏览器内 fetch，凭 httpOnly Cookie）——
  const child = await page.evaluate(async (name) => {
    const res = await fetch("/api/children", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, birth_date: "2020-06-01", gender: "female" }),
    })
    return { status: res.status, body: await res.json() }
  }, `e2e娃娃${stamp}`)
  expect(child.status).toBe(201)
  const childId = child.body.data.id as string

  // —— 3. 写成长记录 ——
  const record = await page.evaluate(async (cid) => {
    const res = await fetch("/api/growth-records", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        child_id: cid, type: "milestone",
        title: "e2e 冒烟记录", content: "由 Playwright 写入",
      }),
    })
    return { status: res.status, body: await res.json() }
  }, childId)
  expect(record.status).toBe(201)

  // —— 4. 租户隔离：列表能看到自己的娃，记录可查 ——
  const list = await page.evaluate(async () => {
    const res = await fetch("/api/children")
    return { status: res.status, body: await res.json() }
  })
  expect(list.status).toBe(200)
  const names = (list.body.data as Array<{ name: string }>).map((c) => c.name)
  expect(names).toContain(`e2e娃娃${stamp}`)
  expect(names).not.toContain("小明") // 其他用户的数据不可见

  // —— 5. 记录可按 childId 查询（复核写入真实落库）——
  // 已知边界：children/growth-records 暂无 DELETE 端点，e2e 每次运行会在开发库留下
  // 1 个 "e2e娃娃*" 及其记录（阶段记录已列为开放项）
  const records = await page.evaluate(async (cid) => {
    const res = await fetch(`/api/growth-records?childId=${cid}`)
    return { status: res.status, body: await res.json() }
  }, childId)
  expect(records.status).toBe(200)
  expect((records.body.data as Array<{ title: string }>).some((r) => r.title === "e2e 冒烟记录")).toBe(true)

  // —— 6. 登出（UI 弹窗或 API 清 Cookie）→ 数据访问 401 ——
  await page.evaluate(async () => {
    await fetch("/api/auth/logout", { method: "POST" })
  })
  const after = await page.evaluate(async () => {
    const res = await fetch("/api/children")
    return res.status
  })
  expect(after).toBe(401)
})

test("未登录访问数据 API 一律 401", async ({ request }) => {
  for (const path of ["/api/children", "/api/growth-records", "/api/homework", "/api/agentic", "/api/ai/chat"]) {
    const res = await request.post(path, { data: { message: "x" } })
    expect(res.status(), path).toBe(401)
  }
})
