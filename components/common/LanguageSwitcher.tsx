/**
 * YYC³ AI小语智能成长守护系统 - 语言切换组件
 * 第六阶段：高级特性与生产准备
 */

'use client'

import { localeNames, locales, type Locale } from '@/i18n'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale() as Locale
  const t = useTranslations('language')

  const [isOpen, setIsOpen] = useState(false)

  const switchLanguage = (newLocale: Locale) => {
    if (newLocale === locale) {
      setIsOpen(false)
      return
    }

    // 构建新路径
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
    setIsOpen(false)
  }

  const currentLocaleName = localeNames[locale]

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => { setIsOpen(!isOpen); }}
        className="flex items-center gap-2 px-3 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50 dark:border-gray-700/50"
        title={t('switch')}
      >
        <div className="w-5 h-5 flex items-center justify-center">
          <i className="ri-translate-2 text-adaptive-muted" />
        </div>
        <span className="text-sm font-medium text-adaptive">
          {currentLocaleName}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <i className="ri-arrow-down-s-line text-adaptive-muted" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 w-48 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 z-50"
          >
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-adaptive-muted mb-1">
                {t('current')}
              </div>
              {locales.map((loc) => (
                <motion.button
                  key={loc}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => { switchLanguage(loc); }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${loc === locale
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-adaptive hover:bg-surface-soft'
                    }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base">
                      {loc === 'zh' ? '🇨🇳' : '🇺🇸'}
                    </span>
                    <span>{localeNames[loc]}</span>
                    {loc === locale && (
                      <motion.i
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ri-check-line text-blue-600 ml-auto"
                      />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 点击外部关闭 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => { setIsOpen(false); }}
        />
      )}
    </div>
  )
}
