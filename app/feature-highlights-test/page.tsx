'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight, ArrowLeft, Settings, BookOpen, TrendingUp, Camera, Star, Sparkles, Brain, Zap, Heart, BarChart, Mic, Eye, Radio } from 'lucide-react'
import AIVoiceStoryGenerator from '@/components/ai-xiaoyu/enhanced/AIVoiceStoryGenerator'
import GrowthDataVisualization from '@/components/growth/enhanced/GrowthDataVisualization'
import SmartPhotoAlbumManager from '@/components/growth/enhanced/SmartPhotoAlbumManager'

export default function FeatureHighlightsTest() {
  const [activeFeature, setActiveFeature] = useState<'overview' | 'stories' | 'visualization' | 'album'>('overview')

  const features = [
    {
      id: 'stories',
      title: 'AI语音故事生成',
      description: '基于小语的成长数据定制专属故事，支持多种语调风格和主题选择',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      capabilities: [
        '智能故事创作',
        '年龄适配内容',
        '多种语调风格',
        '语音合成播放',
        '个性化定制'
      ],
      status: 'completed'
    },
    {
      id: 'visualization',
      title: '成长数据可视化',
      description: '全面的成长数据分析，包括生长曲线、能力雷达图、活动统计等',
      icon: TrendingUp,
      color: 'from-green-500 to-blue-500',
      capabilities: [
        '生长曲线追踪',
        '能力发展雷达',
        '活动时间分析',
        '里程碑时间轴',
        '数据导出分享'
      ],
      status: 'completed'
    },
    {
      id: 'album',
      title: '智能相册管理',
      description: 'AI驱动的照片管理，自动标签、情感分析、智能搜索等功能',
      icon: Camera,
      color: 'from-orange-500 to-red-500',
      capabilities: [
        'AI自动标签',
        '情感识别分析',
        '智能搜索过滤',
        '多视图展示',
        '批量操作管理'
      ],
      status: 'completed'
    }
  ]

  const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
    const Icon = feature.icon
    const isActive = activeFeature === feature.id

    return (
      <motion.div
        className={`relative cursor-pointer rounded-2xl p-6 transition-all ${
          isActive
            ? 'bg-gradient-to-br ' + feature.color + ' text-white shadow-2xl scale-105'
            : 'bg-white text-gray-800 shadow-lg hover:shadow-xl hover:scale-102'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -5 }}
        onClick={() => setActiveFeature(feature.id as any)}
      >
        {/* 状态徽章 */}
        {feature.status === 'completed' && (
          <div className={`absolute top-4 right-4 w-6 h-6 ${isActive ? 'bg-white text-green-600' : 'bg-green-100 text-green-600'} rounded-full flex items-center justify-center`}>
            <Star className="w-3 h-3 fill-current" />
          </div>
        )}

        <div className="flex items-center gap-4 mb-4">
          <div className={`w-16 h-16 ${isActive ? 'bg-white bg-opacity-20' : 'bg-gradient-to-br ' + feature.color + ' bg-opacity-10'} rounded-xl flex items-center justify-center`}>
            <Icon className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
            <p className={`text-sm ${isActive ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
              {feature.description}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className={`text-sm font-medium mb-2 ${isActive ? 'text-white' : 'text-gray-700'}`}>
            核心功能
          </div>
          {feature.capabilities.map((capability, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-gradient-to-r ' + feature.color}`} />
              <span className={`text-sm ${isActive ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                {capability}
              </span>
            </div>
          ))}
        </div>

        {isActive && (
          <motion.div
            className="absolute bottom-4 right-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.div>
        )}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* 导航栏 */}
      <motion.nav
        className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span className="font-medium">返回首页</span>
              </Link>
              <div className="h-6 w-px bg-gray-300" />
              <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                Day 8-10 功能亮点测试
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>开发完成</span>
              </div>
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {/* 概览页面 */}
          {activeFeature === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* 标题区域 */}
              <div className="text-center mb-12">
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full mb-6"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Day 8-10 功能亮点打造</span>
                  <Star className="w-5 h-5" />
                </motion.div>

                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-4">
                  🎆 AI驱动的智能功能
                </h1>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  通过AI技术为小语打造个性化、智能化的成长守护体验，
                  让每一个功能都充满科技感和人文关怀
                </p>
              </div>

              {/* 功能卡片网格 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <FeatureCard feature={feature} />
                  </motion.div>
                ))}
              </div>

              {/* 统计数据 */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {[
                  {
                    label: '新增AI功能',
                    value: '3',
                    icon: Brain,
                    color: 'from-purple-500 to-pink-500',
                    description: '智能故事、数据可视化、相册管理'
                  },
                  {
                    label: '处理效率提升',
                    value: '300%',
                    icon: Zap,
                    color: 'from-green-500 to-blue-500',
                    description: 'AI自动化处理，节省大量时间'
                  },
                  {
                    label: '用户体验优化',
                    value: '95%',
                    icon: Heart,
                    color: 'from-red-500 to-orange-500',
                    description: '基于用户反馈持续改进'
                  },
                  {
                    label: '数据可视化维度',
                    value: '10+',
                    icon: BarChart,
                    color: 'from-indigo-500 to-purple-500',
                    description: '全方位展示小语成长数据'
                  }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg p-6 text-center"
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-700 mb-1">{stat.label}</div>
                    <div className="text-xs text-gray-500">{stat.description}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* 技术亮点 */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">🚀 技术亮点</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: '智能语音合成',
                      description: '采用先进的TTS技术，专为儿童优化的语音参数',
                      icon: Mic,
                      tech: ['Web Speech API', '童声优化', '语调控制', '情感表达']
                    },
                    {
                      title: '数据可视化引擎',
                      description: '基于Recharts的交互式图表，支持多种视图切换',
                      icon: BarChart,
                      tech: ['Recharts', 'Framer Motion', '响应式设计', '实时更新']
                    },
                    {
                      title: 'AI图像分析',
                      description: '智能识别照片内容，自动生成标签和情感分析',
                      icon: Eye,
                      tech: ['图像识别', '情感检测', '场景分析', '相似度计算']
                    },
                    {
                      title: '智能推荐算法',
                      description: '基于成长数据的个性化内容推荐系统',
                      icon: Brain,
                      tech: ['机器学习', '用户画像', '内容匹配', '动态调整']
                    },
                    {
                      title: '多媒体处理',
                      description: '支持图片、视频的智能处理和格式转换',
                      icon: Camera,
                      tech: ['格式转换', '压缩优化', '缩略图生成', '批量处理']
                    },
                    {
                      title: '实时数据同步',
                      description: '多设备数据实时同步，确保数据一致性',
                      icon: Radio,
                      tech: ['WebSocket', '数据缓存', '冲突解决', '离线支持']
                    }
                  ].map((tech, index) => (
                    <motion.div
                      key={index}
                      className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                      whileHover={{ y: -5 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                          <tech.icon className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800">{tech.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{tech.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tech.tech.map((item, i) => (
                          <span key={i} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                            {item}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* AI语音故事生成页面 */}
          {activeFeature === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <button
                  onClick={() => setActiveFeature('overview')}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>返回概览</span>
                </button>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">AI语音故事生成</h2>
                    <p className="text-gray-600">智能创作个性化故事，让每个故事都充满爱与想象</p>
                  </div>
                </div>
              </div>

              <AIVoiceStoryGenerator />
            </motion.div>
          )}

          {/* 成长数据可视化页面 */}
          {activeFeature === 'visualization' && (
            <motion.div
              key="visualization"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <button
                  onClick={() => setActiveFeature('overview')}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>返回概览</span>
                </button>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">成长数据可视化</h2>
                    <p className="text-gray-600">全面记录小语的成长轨迹，用数据见证每一个珍贵时刻</p>
                  </div>
                </div>
              </div>

              <GrowthDataVisualization />
            </motion.div>
          )}

          {/* 智能相册管理页面 */}
          {activeFeature === 'album' && (
            <motion.div
              key="album"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <button
                  onClick={() => setActiveFeature('overview')}
                  className="flex items-center gap-2 text-orange-600 hover:text-orange-700 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>返回概览</span>
                </button>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">智能相册管理</h2>
                    <p className="text-gray-600">AI驱动的照片管理，自动分析、智能标签、一键整理</p>
                  </div>
                </div>
              </div>

              <SmartPhotoAlbumManager />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
