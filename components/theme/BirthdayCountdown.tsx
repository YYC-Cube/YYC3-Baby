'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Calendar,
  Cake,
  Star,
  Heart,
  Gift,
  Sparkles,
  PartyPopper,
  MessageCircle
} from 'lucide-react'
import { useBirthdayTheme } from './BirthdayThemeProvider'
import BirthdayWishForm from './BirthdayWishForm'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface BirthdayWish {
  name: string
  message: string
  relationship: string
  timestamp: Date
}

export default function BirthdayCountdown() {
  const { theme, isActive } = useBirthdayTheme()
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [isCountdownComplete, setIsCountdownComplete] = useState(false)
  const [showWishForm, setShowWishForm] = useState(false)
  const [wishes, setWishes] = useState<BirthdayWish[]>([])

  // 小语的生日：2025年12月27日
  const birthdayDate = new Date('2025-12-27T00:00:00')

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = birthdayDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsCountdownComplete(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsCountdownComplete(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => { clearInterval(timer); }
  }, [])

  const handleWishSubmit = (wish: BirthdayWish) => {
    setWishes(prev => [...prev, wish])
    console.log('收到生日祝福:', wish)
  }

  const TimeUnit = ({ value, label, icon }: { value: number; label: string; icon: React.ComponentType<React.SVGAttributes<SVGElement>> }) => {
    const Icon = icon
    return (
      <motion.div
        className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-lg min-w-[100px]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05, y: -5 }}
        transition={{ type: "spring", damping: 10 }}
      >
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 rounded-xl flex items-center justify-center mb-2">
            <Icon className="w-8 h-8 text-white" />
          </div>
          {/* 装饰星星 */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1, 0.5, 1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Star className="w-full h-full text-yellow-400 fill-yellow-400" />
          </motion.div>
        </div>

        <motion.div
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600"
          key={value}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          {String(value).padStart(2, '0')}
        </motion.div>
        <div className="text-sm text-gray-600 mt-1">{label}</div>
      </motion.div>
    )
  }

  if (!isActive) return null

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <AnimatePresence>
        {!isCountdownComplete ? (
          <motion.div
            key="countdown"
            className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 rounded-3xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {/* 标题 */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500 mb-2">
                🎂 小语生日倒计时
              </h2>
              <p className="text-gray-600">距离小语1岁生日还有</p>
            </motion.div>

            {/* 倒计时显示 */}
            <div className="flex justify-center gap-4 md:gap-8 mb-8">
              <TimeUnit value={timeLeft.days} label="天" icon={Calendar} />
              <TimeUnit value={timeLeft.hours} label="小时" icon={Clock} />
              <TimeUnit value={timeLeft.minutes} label="分钟" icon={Heart} />
              <TimeUnit value={timeLeft.seconds} label="秒" icon={Sparkles} />
            </div>

            {/* 进度条 */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>准备进度</span>
                <span>{Math.max(0, 100 - (timeLeft.days / 30 * 100)).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-pink-400 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.max(0, 100 - (timeLeft.days / 30 * 100))}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>

            {/* 准备事项 */}
            <div className="bg-white/70 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-purple-600" />
                生日准备清单
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Heart className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <span className="text-gray-700">生日蛋糕订购</span>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Gift className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <span className="text-gray-700">礼物准备</span>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Star className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <span className="text-gray-700">装饰布置</span>
                </div>
                <div className="flex items-center gap-3">
                  <motion.div
                    className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 }}
                  >
                    <Cake className="w-4 h-4 text-green-600" />
                  </motion.div>
                  <span className="text-gray-700">家庭聚会安排</span>
                </div>
              </div>
            </div>

            {/* 鼓励语句 */}
            <motion.div
              className="text-center mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <p className="text-purple-700 font-medium">
                每一秒都是对小语成长的期待，让我们一起为这个特别的日子做好准备！
              </p>
            </motion.div>

            {/* 祝福按钮 */}
            <motion.div
              className="text-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setShowWishForm(true); }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold shadow-lg"
              >
                <MessageCircle className="w-5 h-5" />
                发送生日祝福
              </motion.button>
              {wishes.length > 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  已收到 {wishes.length} 条生日祝福
                </p>
              )}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="birthday"
            className="bg-gradient-to-br from-pink-100 via-purple-100 to-yellow-100 rounded-3xl p-8 shadow-xl text-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
          >
            {/* 庆祝动画 */}
            <div className="relative mb-6">
              <motion.div
                className="w-32 h-32 mx-auto bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Cake className="w-16 h-16 text-white" />
              </motion.div>

              {/* 漂浮的装饰 */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: `rotate(${i * 45}deg) translateY(-80px)`
                  }}
                  animate={{
                    y: [-80, -100, -80],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {i % 2 === 0 ? (
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ) : (
                    <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  )}
                </motion.div>
              ))}
            </div>

            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
              🎉 生日快乐，小语！🎂
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              今天是小语1岁的生日，让我们一起庆祝这个特别的日子！
            </p>

            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              开始庆祝
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 生日祝福表单 */}
      <BirthdayWishForm
        isOpen={showWishForm}
        onClose={() => { setShowWishForm(false); }}
        onSubmit={handleWishSubmit}
      />
    </div>
  )
}