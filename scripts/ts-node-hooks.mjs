/**
 * Node 测试子运行器的模块解析钩子
 * 背景：bun test 不支持 node:sqlite，DB 层直测只能在 Node 下跑；
 * Node ESM 要求显式扩展名且不识别 @/ 别名，此钩子补齐两类解析。
 * 用法：node --experimental-strip-types --import ./scripts/ts-node-hooks.mjs --test <files>
 */
import { registerHooks } from "node:module"
import { existsSync, statSync } from "node:fs"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const isFile = (p) => {
  try { return statSync(p).isFile() } catch { return false }
}

/** 相对/别名说明符 → 实际文件 URL（尝试 .ts/.tsx/index.ts 扩展） */
function resolveToFile(spec, fromDir) {
  const base = spec.startsWith("@/")
    ? path.join(ROOT, spec.slice(2))
    : path.resolve(fromDir, spec)
  const candidates = [`${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")]
  if (isFile(base)) candidates.unshift(base)
  return candidates.find(isFile) ?? null
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    const isRelative = specifier.startsWith("./") || specifier.startsWith("../")
    const isAlias = specifier.startsWith("@/")

    if ((isRelative || isAlias) && !specifier.match(/\.(ts|tsx|mjs|cjs|js|json)$/)) {
      const fromDir = context.parentURL
        ? path.dirname(fileURLToPath(context.parentURL))
        : ROOT
      const file = resolveToFile(specifier, fromDir)
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true }
    } else if (isAlias) {
      const file = resolveToFile(specifier, ROOT)
      if (file) return { url: pathToFileURL(file).href, shortCircuit: true }
    }

    return nextResolve(specifier, context)
  },
})
