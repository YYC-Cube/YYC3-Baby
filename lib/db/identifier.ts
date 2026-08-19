/**
 * @fileoverview SQL 标识符校验（纯函数，无外部依赖，可单测）
 * @description 表名/列名无法参数化，只能拼接进 SQL。所有拼接点必须先经过
 *   assertSQLIdentifier，拒绝包含 SQL 元字符（引号/分号/空格/括号等）的输入，
 *   阻断通过 JSON key 注入 SQL 的攻击面。
 */

// 合法标识符：字母或下划线开头，后接字母/数字/下划线（不含中文与任意 Unicode）
const IDENTIFIER_RE = /^[A-Za-z_][A-Za-z0-9_]*$/

export function isValidSQLIdentifier(name: string): boolean {
  return IDENTIFIER_RE.test(name)
}

/** 校验单个标识符，非法时抛错（调用方转为 4xx/5xx 响应） */
export function assertSQLIdentifier(name: string, kind: "table" | "column" = "column"): void {
  if (!isValidSQLIdentifier(name)) {
    throw new Error(`非法SQL${kind === "table" ? "表" : "列"}名: ${JSON.stringify(name)}`)
  }
}
