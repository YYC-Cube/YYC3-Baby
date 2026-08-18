"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navigation from "@/components/Navigation"
import PageHeader from "@/components/headers/PageHeader"

interface Course {
  id: string
  title: string
  description: string
  category: string
  status: "ongoing" | "new" | "normal"
  progress?: number
  duration?: string
  difficulty?: string
  badge?: string
}

const coursesData: Course[] = [
  {
    id: "course-1",
    title: "小学古诗词鉴赏 (上)",
    description: "掌握 50 首必背古诗，理解诗歌意境。",
    category: "语文",
    status: "ongoing",
    progress: 75,
    badge: "进行中",
  },
  {
    id: "course-2",
    title: "趣味科学实验课",
    description: "探索 10 个居家小实验，激发科学兴趣。",
    category: "科学",
    status: "new",
    duration: "共 4 课时",
    badge: "新课上线",
  },
  {
    id: "course-3",
    title: "初级编程思维训练",
    description: "通过简单拖拽，学习编程逻辑和流程控制。",
    category: "素质拓展",
    status: "normal",
    difficulty: "难度：中",
  },
]

const categories = [
  { id: "all", label: "全部课程", icon: "" },
  { id: "语文", label: "语文", icon: "📚" },
  { id: "数学", label: "数学", icon: "📐" },
  { id: "科学", label: "科学", icon: "🌏" },
  { id: "艺术", label: "艺术", icon: "🎨" },
  { id: "素质拓展", label: "素质拓展", icon: "🌟" },
]

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const filteredCourses =
    selectedCategory === "all" ? coursesData : coursesData.filter((c) => c.category === selectedCategory)

  return (
    <div className="h-screen flex flex-col overflow-hidden relative bg-sky-100">
      <PageHeader icon="ri-macbook-fill" title="我的公益课程" showBack>
        <div className="relative w-1/3 max-w-xs hidden md:block">
          <input
            type="text"
            placeholder="搜索你想学的课程..."
            className="w-full py-3 pl-12 pr-4 rounded-full border-2 border-blue-100 focus:border-blue-300 transition shadow-sm outline-none text-slate-600 placeholder:text-slate-400 bg-white"
          />
          <i className="ri-search-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>
      </PageHeader>

      <main className="flex-1 overflow-y-auto w-full">
        <section className="max-w-7xl mx-auto w-full px-8 pb-28 pt-4">
          {/* 分类按钮 */}
          <section className="mb-6 flex overflow-x-auto hide-scrollbar gap-3 pb-2 items-center">
            <h3 className="text-xl font-bold text-slate-700 whitespace-nowrap pr-3">🔍 分类:</h3>

            {categories.map((cat, index) => (
              <motion.button
                key={cat.id}
                className={`font-bold px-5 py-2 rounded-full shadow-md transition-all whitespace-nowrap ${
                  selectedCategory === cat.id ? "bg-blue-400 text-white" : "bg-white text-slate-600 hover:bg-slate-100"
                }`}
                onClick={() => { setSelectedCategory(cat.id); }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {cat.icon} {cat.label}
              </motion.button>
            ))}
          </section>

          {/* 课程列表 */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </section>
        </section>
      </main>

      <Navigation />
    </div>
  )
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const categoryColors: { [key: string]: string } = {
    语文: "bg-white border-green-200",
    科学: "bg-macaron-purple",
    素质拓展: "bg-macaron-yellow",
  }

  return (
    <motion.article
      className={`rounded-3xl p-6 shadow-soft hover:shadow-lg transition-all cursor-pointer flex flex-col gap-4 ${
        categoryColors[course.category] || "bg-white"
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-sm font-bold px-3 py-1 rounded-full ${
            course.status === "ongoing"
              ? "bg-green-100 text-green-700"
              : course.status === "new"
                ? "bg-purple-100 text-purple-700"
                : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {course.badge || course.difficulty}
        </span>
        <i
          className={`${course.status === "ongoing" ? "ri-bookmark-fill text-yellow-500" : "ri-bookmark-line text-slate-300"} text-xl`}
        />
      </div>

      <div>
        <h4 className="text-xl font-bold mb-1">{course.title}</h4>
        <p
          className={`text-sm ${course.category === "科学" || course.category === "素质拓展" ? "text-slate-600" : "text-slate-500"}`}
        >
          {course.description}
        </p>
      </div>

      {course.progress !== undefined && (
        <div>
          <div className="text-sm font-medium mb-1 flex justify-between">
            <span>进度: {course.progress}%</span>
            <span className="text-green-600">已学 6/8 单元</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <motion.div
              className="bg-green-500 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
      )}

      {course.duration && (
        <div className="text-sm font-medium text-slate-600">
          <i className="ri-time-line text-lg mr-1" /> {course.duration}
        </div>
      )}

      <motion.button
        className={`w-full py-2 rounded-full font-bold transition ${
          course.status === "ongoing"
            ? "bg-green-400 text-white hover:bg-green-500"
            : course.status === "new"
              ? "bg-purple-400 text-white hover:bg-purple-500"
              : "bg-warm-orange text-white hover:bg-orange-500"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {course.status === "ongoing" ? "继续学习" : course.status === "new" ? "立即开始" : "查看详情"}
      </motion.button>
    </motion.article>
  )
}
