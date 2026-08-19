/**
 * @fileoverview Bun测试预加载文件 - 设置JSDOM环境
 * @description 在所有测试运行前设置JSDOM环境和必要的全局变量
 * @author YYC³
 * @version 1.0.0
 * @created 2025-01-19
 * @modified 2025-01-19
 * @copyright Copyright (c) 2025 YYC³
 * @license MIT
 */

/// <reference types="bun-types" />

import '@testing-library/jest-dom';
import { mock } from 'bun:test';
import { JSDOM } from 'jsdom';
(process.env as Record<string, string | undefined>).NODE_ENV = 'test'

// 设置 jsdom 环境
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost:3000',
  pretendToBeVisual: true,
  resources: 'usable',
})

// 将 jsdom 的全局对象设置为全局
const jsdomWindow = dom.window as unknown as Window & typeof globalThis
global.window = jsdomWindow
global.document = jsdomWindow.document
global.navigator = jsdomWindow.navigator
global.HTMLElement = jsdomWindow.HTMLElement
global.Element = jsdomWindow.Element
global.Node = jsdomWindow.Node
global.NodeList = jsdomWindow.NodeList
global.HTMLCollection = jsdomWindow.HTMLCollection
global.localStorage = jsdomWindow.localStorage
global.sessionStorage = jsdomWindow.sessionStorage
global.URL = jsdomWindow.URL
global.URLSearchParams = jsdomWindow.URLSearchParams
global.Blob = jsdomWindow.Blob
global.FileReader = jsdomWindow.FileReader
global.FormData = jsdomWindow.FormData
global.MouseEvent = jsdomWindow.MouseEvent
global.KeyboardEvent = jsdomWindow.KeyboardEvent
global.TouchEvent = jsdomWindow.TouchEvent
global.Event = jsdomWindow.Event
global.EventTarget = jsdomWindow.EventTarget

// fetch 家族：Bun / Node ≥ 18 均内置原生实现，显式声明以覆盖 jsdom 窗口作用域
global.fetch = fetch
global.Request = Request
global.Response = Response
global.Headers = Headers

// Mock AbortController and AbortSignal for JSDOM compatibility
global.AbortController = class AbortController {
  signal = {
    aborted: false,
    addEventListener: () => { },
    removeEventListener: () => { },
    dispatchEvent: () => { },
  }

  abort() {
    this.signal.aborted = true
  }
} as unknown as typeof AbortController

global.AbortSignal = class AbortSignal {
  static abort() {
    return {
      aborted: true,
      addEventListener: () => { },
      removeEventListener: () => { },
      dispatchEvent: () => { },
    }
  }

  aborted = false
  addEventListener() { }
  removeEventListener() { }
  dispatchEvent() { }
} as unknown as typeof AbortSignal

// 导入Bun的mock功能
void mock.module('next/navigation', () => ({
  useRouter: () => ({
    push: () => { },
    replace: () => { },
    prefetch: () => { },
    back: () => { },
    forward: () => { },
    refresh: () => { },
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}))

// Mock Next.js app router context
void mock.module('next/dist/client/components/app-router-context', () => ({
  AppRouterContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  LayoutRouterContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  TemplateContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  GlobalLayoutRouterContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  CacheRoutesContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  PathnameContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
  ParamsContext: {
    Provider: ({ children }: { children: React.ReactNode }) => children,
  },
}))

// Mock Next.js image
void mock.module('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => ({ type: 'img', props }),
}))

// Mock framer-motion
void mock.module('framer-motion', () => import('./__mocks__/framer-motion'))

// Mock motion-dom
void mock.module('motion-dom', () => import('./__mocks__/motion-dom'))

// Mock next-intl
void mock.module('next-intl', () => ({
  useLocale: () => 'zh',
  useTranslations: (namespace: string) => {
    // 简单的翻译函数模拟
    const translations: Record<string, Record<string, string>> = {
      language: {
        switch: '切换语言',
        current: '当前语言',
      },
    }

    return (key: string) => {
      return translations[namespace]?.[key] || key
    }
  },
}))

// Mock use-intl
void mock.module('use-intl', () => ({
  useTranslations: (namespace: string) => {
    // 简单的翻译函数模拟
    const translations: Record<string, Record<string, string>> = {
      language: {
        switch: '切换语言',
        current: '当前语言',
      },
    }

    return (key: string) => {
      return translations[namespace]?.[key] || key
    }
  },
  useFormatter: () => ({
    // 简单的格式化函数模拟
    dateTime: (date: Date) => date.toLocaleString(),
    number: (num: number) => num.toString(),
    relativeTime: (value: number, unit: string) => `${value} ${unit} ago`,
    list: (items: string[]) => items.join(', '),
  }),
}))

console.log('JSDOM environment setup complete')
