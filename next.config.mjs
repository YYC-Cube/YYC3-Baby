/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  compress: true,
  poweredByHeader: false,
  // 遗留类型债：基线含 ~1900 个 tsc 错误（详见 TYPECHECK_BASELINE.md），
  // 按路线图分阶段清理；构建先保证可产物化，不做类型门禁。
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(self)" },
        ],
      },
      {
        // 开发环境需要 eval/inline；生产收紧脚本来源
        source: "/((?!_next/static).*)",
        headers: process.env.NODE_ENV === "production"
          ? [
              {
                key: "Content-Security-Policy",
                value: [
                  "default-src 'self'",
                  "script-src 'self' 'unsafe-inline'",
                  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                  "font-src 'self' https://fonts.gstatic.com data:",
                  "img-src 'self' data: blob: https:",
                  "media-src 'self' blob: data:",
                  "connect-src 'self' https://api.0379.love https://open.bigmodel.cn",
                  "worker-src 'self' blob:",
                  "frame-ancestors 'self'",
                ].join("; "),
              },
            ]
          : [],
      },
    ]
  },
}

export default nextConfig
