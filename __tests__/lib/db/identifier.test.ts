/**
 * SQL 标识符校验单元测试（lib/db/identifier）
 * 覆盖：合法表/列名放行；SQL 注入载荷（JSON key 攻击面）全部拒绝
 */

import { describe, expect, test } from "bun:test"
import { assertSQLIdentifier, isValidSQLIdentifier } from "@/lib/db/identifier"

describe("isValidSQLIdentifier", () => {
  test.each(["id", "user_id", "created_at", "Name", "col1", "_private"])(
    "合法标识符 %s 应放行",
    (name) => {
      expect(isValidSQLIdentifier(name)).toBe(true)
    }
  )

  test.each([
    // 典型注入载荷：通过 JSON key 拼进 INSERT/UPDATE 列名位置
    'name) VALUES ("pwned")--',
    "id, (SELECT password_hash FROM users)",
    "name); DROP TABLE children;--",
    "a UNION SELECT 1",
    "name--",
    "name/*",
    'name " --',
    // 格式非法
    "",
    "1abc",
    "with space",
    "with-dash",
    "with.dot",
    "列名",
    "tab\tchar",
  ])("非法标识符 %j 应拒绝", (name) => {
    expect(isValidSQLIdentifier(name)).toBe(false)
  })
})

describe("assertSQLIdentifier", () => {
  test("合法标识符不抛错", () => {
    expect(() => assertSQLIdentifier("birth_date")).not.toThrow()
    expect(() => assertSQLIdentifier("children", "table")).not.toThrow()
  })

  test("非法标识符抛错且消息含原文（可观测）", () => {
    expect(() => assertSQLIdentifier("id;--")).toThrow(/非法SQL列名/)
    expect(() => assertSQLIdentifier("users; DROP TABLE x", "table")).toThrow(/非法SQL表名/)
  })
})
