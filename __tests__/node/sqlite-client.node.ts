/**
 * sqlite-client 直测（Node 子运行器：bun 不支持 node:sqlite）
 * 运行：bun run test:node
 * 覆盖：CRUD 往返 / SQL 标识符拒绝 / 外键约束 / updated_at 迁移 / 种子数据与演示密码
 */
import assert from "node:assert/strict"
import { test } from "node:test"

import { SQLiteDatabase } from "@/lib/db/sqlite-client"
import bcrypt from "bcryptjs"

function freshDb(): SQLiteDatabase {
  return new SQLiteDatabase(":memory:")
}

/** 外键约束开启：children.user_id 必须指向真实用户；create 的 id 由内部生成，须回传使用 */
async function seedUser(db: SQLiteDatabase): Promise<string> {
  const user = await db.create("users", { email: `u${Date.now()}@t.cn`, name: "测试用户", role: "parent" })
  return user.id
}

test("CRUD 往返：create → findMany/findOne → update → delete", async () => {
  const db = freshDb()
  const uid = await seedUser(db)
  const created = await db.create("children", {
    user_id: uid, name: "小测", birth_date: "2020-01-01", gender: "female",
  })
  assert.ok(created.id)

  const list = await db.findMany("children", { user_id: uid })
  assert.equal(list.length, 1)
  assert.equal(list[0]!.name, "小测")

  const one = await db.findOne("children", created.id)
  assert.equal(one?.name, "小测")

  const updated = await db.update("children", created.id, { name: "小测改" })
  assert.equal(updated?.name, "小测改")

  assert.equal(await db.count("children"), 1)
  assert.equal(await db.delete("children", created.id), true)
  assert.equal(await db.count("children"), 0)
})

test("SQL 注入防护：恶意列名被标识符校验拒绝", async () => {
  const db = freshDb()
  const uid = await seedUser(db)
  // create 会重抛校验错误
  await assert.rejects(
    db.create("children", {
      'name) VALUES ("pwned")--': "x", user_id: uid, name: "a", birth_date: "2020-01-01", gender: "female",
    } as never),
    /非法SQL列名/,
  )
  // update 吞错返回 null 且不产生副作用
  const result = await db.update("children", "any", { 'id = 1; DROP TABLE children;--': 1 } as never)
  assert.equal(result, null)
  // 表仍存在且可继续工作
  await db.create("children", { user_id: uid, name: "ok", birth_date: "2020-01-01", gender: "female" })
  assert.equal(await db.count("children"), 1)
})

test("非法表名被拒绝（查询类吞错返回空，不执行注入）", async () => {
  const db = freshDb()
  await seedUser(db)
  // findMany/count 吞错返回空/0（既有契约），断言不产生副作用且 users 表完好
  assert.equal((await db.findMany("users; DROP TABLE users")).length, 0)
  assert.equal(await db.count("users; DROP TABLE users"), 0)
  assert.equal(await db.count("users"), 1, "users 表未被破坏")
})

test("外键约束：growth_records 引用不存在 child_id → 抛错", async () => {
  const db = freshDb()
  await assert.rejects(
    db.create("growth_records", {
      child_id: "ghost-child", type: "milestone", title: "t", content: "c",
      recorded_at: new Date().toISOString(),
    }),
    (err: unknown) => String(err).toLowerCase().includes("foreign key"),
  )
})

test("updated_at 迁移：growth_records/homework_tasks 更新成功（历史缺列已补齐）", async () => {
  const db = freshDb()
  const uid = await seedUser(db)
  const child = await db.create("children", { user_id: uid, name: "a", birth_date: "2020-01-01", gender: "female" })
  const record = await db.create("growth_records", {
    child_id: child.id, type: "milestone", title: "t", content: "c", recorded_at: new Date().toISOString(),
  })
  const updated = await db.update("growth_records", record.id, { title: "t2" })
  assert.equal(updated?.title, "t2")

  const hw = await db.create("homework_tasks", {
    child_id: child.id, subject: "数学", title: "作业", status: "pending", priority: "normal",
  })
  const hwUpdated = await db.update("homework_tasks", hw.id, { status: "completed" })
  assert.equal(hwUpdated?.status, "completed")
})

test("种子数据：演示账号带 bcrypt 密码", async () => {
  const db = freshDb()
  await db.seedMockData()
  const users = await db.findMany<{ email: string; password_hash: string }>("users", { email: "parent@yyc3.com" })
  assert.equal(users.length, 1)
  assert.ok(users[0]!.password_hash, "种子用户必须有密码哈希")
  assert.equal(await bcrypt.compare("demo123456", users[0]!.password_hash), true)
  assert.equal(await bcrypt.compare("wrong-password", users[0]!.password_hash), false)
  // 二次种子幂等：不重复灌入
  await db.seedMockData()
  assert.equal(await db.count("users"), 1)
})

test("生产环境守卫：演示账号不得种入", async () => {
  const db = freshDb()
  const prev = process.env.NODE_ENV
  process.env.NODE_ENV = "production"
  try {
    await db.seedMockData()
    assert.equal(await db.count("users"), 0, "生产环境不应种入任何数据")
  } finally {
    process.env.NODE_ENV = prev
  }
  // 恢复非生产后可正常种子
  await db.seedMockData()
  assert.equal(await db.count("users"), 1)
})
