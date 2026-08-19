/**
 * @file 应用布局文件
 * @description 定义应用的全局布局结构和元数据配置
 * @module app/layout
 * @author YYC
 * @version 1.0.0
 * @created 2024-12-07
 * @updated 2024-12-07
 */
import ClientWrapper from "@/components/ClientWrapper"
import DndProvider from "@/components/DndProvider"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import ReduxProvider from "@/components/ReduxProvider"
import { ThemeBackgroundLayer } from "@/components/theme-system/ThemeBackgroundLayer"
import { ThemeSystemProvider } from "@/components/theme-system/ThemeProvider"
import { AuthProvider } from "@/hooks/useAuth"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import type React from "react"
// import { DatabaseInitializer } from "@/components/DatabaseInitializer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export const metadata: Metadata = {
  title: {
    default: "YYC³ AI小语 - 智能成长守护系统",
    template: "%s | YYC³ AI小语",
  },
  description: "0-22岁全周期AI智能成长守护平台 | 五大AI角色陪伴 | 科学育儿指导 | 公益学习·温暖成长",
  keywords: ["AI教育", "成长守护", "智能助手", "育儿指导", "儿童成长", "在线学习"],
  authors: [{ name: "YYC³团队" }],
  creator: "YYC³",
  publisher: "YYC³",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  generator: "v0.app",
  metadataBase: new URL("https://yyc3.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "YYC³ AI小语 - 智能成长守护系统",
    description: "0-22岁全周期AI智能成长守护平台",
    url: "https://yyc3.app",
    siteName: "YYC³ AI小语",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YYC³ AI小语 - 智能成长守护系统",
    description: "0-22岁全周期AI智能成长守护平台",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: "/yyc3-pwa-icon.png",
  },
  manifest: "/manifest.json",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FEF3F2" },
    { media: "(prefers-color-scheme: dark)", color: "#1F2937" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet" />
      </head>
      <body className={`${inter.className} antialiased selection:bg-orange-200 selection:text-orange-900`}>
        <ErrorBoundary>
          <ThemeSystemProvider>
            <DndProvider>
              <ReduxProvider>
                <AuthProvider>
                  <ThemeBackgroundLayer />
                  {children}
                  <ClientWrapper />
                </AuthProvider>
              </ReduxProvider>
            </DndProvider>
          </ThemeSystemProvider>
        </ErrorBoundary>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
