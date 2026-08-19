import { defineConfig } from "@playwright/test"

/**
 * e2e 冒烟配置：跑在生产构建上（先 bun run build，再自动 bun run start）。
 * 运行：bun run test:e2e
 */
export default defineConfig({
  testDir: "./e2e",
  testMatch: "**/*.e2e.ts", // 避开 bun test 的 *.spec.* 匹配
  timeout: 30_000,
  retries: 0,
  workers: 1, // 冒烟串行，避免数据竞争
  use: {
    baseURL: "http://localhost:1228",
    headless: true,
  },
  webServer: {
    command: "bun run start",
    port: 1228,
    reuseExistingServer: true,
    timeout: 60_000,
  },
})
