import React, { useState } from 'react';
import { PageNavigation } from '../layout/PageNavigation';
import { Book, Users, Clock, Star, Play, Heart, Award, ChevronRight, Filter, Search } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface Course {
  id: string;
  title: string;
  category: string;
  categoryIcon: string;
  categoryColor: string;
  categoryBg: string;
  instructor: string;
  instructorAvatar: string;
  students: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  rating: number;
  isFree: boolean;
  isNew: boolean;
  isPopular: boolean;
  description: string;
  tags: string[];
  progress?: number;
  thumbnail: string;
  gradientFrom: string;
  gradientTo: string;
}

interface CategoryFilter {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
}

export const PublicClassPage: React.FC = () => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  const [activeTab, setActiveTab] = useState<'all' | 'enrolled' | 'favorites'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const [categories, setCategories] = useState<CategoryFilter[]>([
    { id: 'all', label: '全部课程', icon: '🌟', isActive: true },
    { id: 'chinese', label: '语文', icon: '📖', isActive: false },
    { id: 'math', label: '数学', icon: '🔢', isActive: false },
    { id: 'science', label: '科学', icon: '🔬', isActive: false },
    { id: 'art', label: '艺术', icon: '🎨', isActive: false },
    { id: 'quality', label: '素质拓展', icon: '⭐', isActive: false },
  ]);

  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: '快乐绘画启蒙：用色彩表达情感',
      category: '艺术创作',
      categoryIcon: '🎨',
      categoryColor: 'text-purple-600',
      categoryBg: 'bg-purple-100',
      instructor: '李老师',
      instructorAvatar: '👩‍🎨',
      students: 2580,
      duration: '6周',
      level: 'beginner',
      rating: 4.9,
      isFree: true,
      isNew: true,
      isPopular: true,
      description: '通过有趣的绘画游戏，帮助孩子学会用色彩表达内心情感，培养艺术创造力和审美能力。',
      tags: ['色彩', '创意', '情感表达'],
      thumbnail: '🎨',
      gradientFrom: 'from-purple-100',
      gradientTo: 'to-pink-100',
    },
    {
      id: '2',
      title: '小小环保家：保护我们的地球',
      category: '自然环保',
      categoryIcon: '🌱',
      categoryColor: 'text-green-600',
      categoryBg: 'bg-green-100',
      instructor: '王老师',
      instructorAvatar: '🧑‍🏫',
      students: 3200,
      duration: '4周',
      level: 'beginner',
      rating: 5.0,
      isFree: true,
      isNew: false,
      isPopular: true,
      description: '学习环保知识，了解垃圾分类、节约用水、保护动物等实用技能，成为地球小卫士。',
      tags: ['环保', '自然', '公益'],
      progress: 60,
      thumbnail: '🌍',
      gradientFrom: 'from-green-100',
      gradientTo: 'to-emerald-100',
    },
    {
      id: '3',
      title: '趣味编程入门：和机器人做朋友',
      category: '编程思维',
      categoryIcon: '💻',
      categoryColor: 'text-blue-600',
      categoryBg: 'bg-blue-100',
      instructor: '张老师',
      instructorAvatar: '👨‍💻',
      students: 1850,
      duration: '8周',
      level: 'beginner',
      rating: 4.8,
      isFree: false,
      isNew: true,
      isPopular: false,
      description: '通过图形化编程工具，让孩子轻松学习编程思维，培养逻辑能力和问题解决能力。',
      tags: ['编程', '逻辑', '创新'],
      thumbnail: '🤖',
      gradientFrom: 'from-blue-100',
      gradientTo: 'to-cyan-100',
    },
    {
      id: '4',
      title: '经典诗词诵读：感受中华文化之美',
      category: '传统文化',
      categoryIcon: '🏮',
      categoryColor: 'text-red-600',
      categoryBg: 'bg-red-100',
      instructor: '陈老师',
      instructorAvatar: '👴',
      students: 4100,
      duration: '12周',
      level: 'intermediate',
      rating: 4.9,
      isFree: true,
      isNew: false,
      isPopular: true,
      description: '诵读经典诗词，学习传统文化，感受诗词韵律之美，提升文学素养和文化自信。',
      tags: ['诗词', '文化', '国学'],
      progress: 30,
      thumbnail: '📜',
      gradientFrom: 'from-red-100',
      gradientTo: 'to-orange-100',
    },
    {
      id: '5',
      title: '音乐启蒙：让节奏点亮童年',
      category: '音乐舞蹈',
      categoryIcon: '🎵',
      categoryColor: 'text-pink-600',
      categoryBg: 'bg-pink-100',
      instructor: '刘老师',
      instructorAvatar: '👩‍🎤',
      students: 2900,
      duration: '6周',
      level: 'beginner',
      rating: 4.7,
      isFree: true,
      isNew: false,
      isPopular: false,
      description: '通过音乐游戏和节奏训练，培养孩子的音乐感知力、节奏感和表现力。',
      tags: ['音乐', '节奏', '表演'],
      thumbnail: '🎹',
      gradientFrom: 'from-pink-100',
      gradientTo: 'to-rose-100',
    },
    {
      id: '6',
      title: '科学实验室：探索奇妙的科学世界',
      category: '科学探索',
      categoryIcon: '🔬',
      categoryColor: 'text-orange-600',
      categoryBg: 'bg-orange-100',
      instructor: '周老师',
      instructorAvatar: '🧑‍🔬',
      students: 3500,
      duration: '10周',
      level: 'intermediate',
      rating: 4.9,
      isFree: false,
      isNew: true,
      isPopular: true,
      description: '通过有趣的科学实验，激发孩子的好奇心，培养观察能力和科学思维。',
      tags: ['实验', '探索', '科学'],
      thumbnail: '🧪',
      gradientFrom: 'from-orange-100',
      gradientTo: 'to-yellow-100',
    },
  ]);

  const handleCategoryClick = (categoryId: string) => {
    setCategories((prev) =>
      prev.map((cat) => ({
        ...cat,
        isActive: cat.id === categoryId,
      }))
    );
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case 'beginner':
        return '入门';
      case 'intermediate':
        return '进阶';
      case 'advanced':
        return '高级';
      default:
        return '入门';
    }
  };

  const getLevelColor = (level: string) => {
    if (isDark) {
      switch (level) {
        case 'beginner': return isCyber ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-300';
        case 'intermediate': return isCyber ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/20 text-blue-300';
        case 'advanced': return isCyber ? 'bg-purple-500/20 text-purple-400' : 'bg-purple-500/20 text-purple-300';
        default: return isCyber ? 'bg-green-500/20 text-green-400' : 'bg-green-500/20 text-green-300';
      }
    }
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-green-100 text-green-700';
    }
  };

  const enrolledCourses = courses.filter((c) => c.progress !== undefined);
  const allCourses = courses;

  return (
    <div className="min-h-screen pb-20">
      {/* 导航栏 */}
      <PageNavigation title="精品网课" icon="📚" />

      {/* Search Bar */}
      <div className={`${isCyber ? 'cyber-header' : isAurora ? 'aurora-header' : 'glass-header'} sticky top-[64px] z-10`}>
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${isDark ? 'text-white/40' : 'text-gray-400'}`} />
              <input
                type="text"
                placeholder="搜索课程..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-none outline-none transition-shadow ${
                  isDark
                    ? 'bg-white/8 text-white/90 placeholder:text-white/30 focus:ring-2 focus:ring-cyan-400/30'
                    : 'bg-gray-50 focus:ring-2 focus:ring-purple-300'
                }`}
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-xl transition-colors flex items-center gap-1 ${
                isCyber ? 'text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20' : isAurora ? 'text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20' : 'text-purple-600 bg-purple-50 hover:bg-purple-100'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden sm:inline">筛选</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${isCyber ? 'cyber-header' : isAurora ? 'aurora-header' : 'glass-header'} sticky top-[128px] z-10`}>
        <div className="container mx-auto px-4">
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                activeTab === 'all'
                  ? isCyber ? 'border-cyan-400 text-cyan-400' : isAurora ? 'border-emerald-400 text-emerald-400' : 'border-purple-500 text-purple-600'
                  : isDark ? 'border-transparent text-white/50' : 'border-transparent text-gray-500'
              }`}
            >
              <Book className="w-4 h-4" />
              <span>全部课程 ({allCourses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('enrolled')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                activeTab === 'enrolled'
                  ? isCyber ? 'border-blue-400 text-blue-400' : isAurora ? 'border-teal-400 text-teal-400' : 'border-blue-500 text-blue-600'
                  : isDark ? 'border-transparent text-white/50' : 'border-transparent text-gray-500'
              }`}
            >
              <Play className="w-4 h-4" />
              <span>我的学习 ({enrolledCourses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all ${
                activeTab === 'favorites'
                  ? isCyber ? 'border-pink-400 text-pink-400' : isAurora ? 'border-rose-400 text-rose-400' : 'border-pink-500 text-pink-600'
                  : isDark ? 'border-transparent text-white/50' : 'border-transparent text-gray-500'
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>收藏</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      {showFilters && (
        <div className={`${isCyber ? 'cyber-header' : isAurora ? 'aurora-header' : 'glass-header'} sticky top-[188px] z-10 ${isDark ? 'border-t border-white/5' : 'border-t border-gray-100'}`}>
          <div className="container mx-auto px-4 py-3">
            <div className="flex gap-2 overflow-x-auto no-scrollbar">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                    category.isActive
                      ? isCyber
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                        : isAurora
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : isDark
                        ? 'bg-white/8 text-white/70 hover:bg-white/12'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span className="text-base">{category.icon}</span>
                  <span className="text-sm">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {/* All Courses Tab */}
        {activeTab === 'all' && (
          <div className="space-y-6">
            {/* Featured Course */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⭐</span>
                <h3 className={isDark ? 'text-white/90' : 'text-gray-900'}>热门推荐</h3>
              </div>

              <div className={`rounded-2xl p-6 text-white relative overflow-hidden shadow-xl ${
                isCyber
                  ? 'bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700'
                  : isAurora
                    ? 'bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600'
                    : 'bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400'
              }`}>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-4xl">{courses[0].thumbnail}</span>
                    <div className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs flex items-center gap-1">
                      <span>{courses[0].categoryIcon}</span>
                      <span>{courses[0].category}</span>
                    </div>
                    {courses[0].isFree && (
                      <div className="px-3 py-1 bg-green-500 rounded-full text-xs font-medium">
                        免费
                      </div>
                    )}
                  </div>
                  <h2 className="mb-2">{courses[0].title}</h2>
                  <p className="text-white/90 text-sm mb-4">
                    {courses[0].description}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Users className="w-4 h-4" />
                      <span>{courses[0].students.toLocaleString()} 人学习</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{courses[0].duration}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <Star className="w-4 h-4" fill="currentColor" />
                      <span>{courses[0].rating}</span>
                    </div>
                  </div>

                  <button className="px-6 py-2.5 bg-white text-purple-600 rounded-xl hover:shadow-lg transition-all flex items-center gap-2 font-medium">
                    <Play className="w-4 h-4" fill="currentColor" />
                    <span>立即学习</span>
                  </button>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute right-4 top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute left-1/2 bottom-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* Course Grid */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">📚</span>
                <h3 className={isDark ? 'text-white/90' : 'text-gray-900'}>精选课程</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.slice(1).map((course) => (
                  <div
                    key={course.id}
                    className={`${isCyber ? 'cyber-card' : isAurora ? 'aurora-card' : 'glass-card'} p-5 cursor-pointer`}
                  >
                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-md flex-shrink-0 ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                        {course.thumbnail}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h4 className={`flex-1 line-clamp-2 ${isDark ? 'text-white/90' : 'text-gray-900'}`}>{course.title}</h4>
                        </div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${isDark ? 'bg-white/10 text-white/60' : course.categoryBg + ' ' + course.categoryColor}`}>
                            <span>{course.categoryIcon}</span>
                            <span>{course.category}</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(course.level)}`}>
                            {getLevelLabel(course.level)}
                          </span>
                          {course.isFree && (
                            <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-xs">
                              免费
                            </span>
                          )}
                          {course.isNew && (
                            <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
                              新课
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className={`text-sm mb-3 line-clamp-2 leading-relaxed ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                      {course.description}
                    </p>

                    {/* Tags */}
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {course.tags.map((tag, index) => (
                        <span key={index} className={`px-2 py-1 rounded-lg text-xs ${isDark ? 'bg-white/8 text-white/60' : 'bg-white/60 text-gray-700'}`}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="flex flex-wrap gap-3 mb-3">
                      <div className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className={`flex items-center gap-1.5 text-sm ${isDark ? 'text-yellow-400' : 'text-gray-700'}`}>
                        <Star className="w-4 h-4" fill="currentColor" />
                        <span>{course.rating}</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className={`flex items-center gap-2 mb-4 text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>
                      <span className="text-lg">{course.instructorAvatar}</span>
                      <span>{course.instructor} 老师</span>
                    </div>

                    {/* Action Button */}
                    <button className={`w-full text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                      isCyber
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                        : isAurora
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                          : 'bg-gradient-to-r from-purple-500 to-pink-500'
                    }`}>
                      <Play className="w-4 h-4" fill="currentColor" />
                      <span>开始学习</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <div className="text-5xl mb-3">📖</div>
              <p className={`text-sm mb-4 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>更多精彩课程即将上线</p>
              <button className={`px-6 py-2.5 rounded-xl transition-all ${
                isCyber ? 'bg-cyan-500/15 text-cyan-400 hover:bg-cyan-500/25' : isAurora ? 'bg-emerald-500/15 text-emerald-400 hover:bg-emerald-500/25' : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
              }`}>
                查看更多课程
              </button>
            </div>
          </div>
        )}

        {/* My Learning Tab */}
        {activeTab === 'enrolled' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">📚</span>
              <h3 className={isDark ? 'text-white/90' : 'text-gray-900'}>我的学习</h3>
            </div>

            {enrolledCourses.map((course) => (
              <div
                key={course.id}
                className={`${isCyber ? 'cyber-card' : isAurora ? 'aurora-card' : 'glass-card'} p-5`}
              >
                {/* Header */}
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl shadow-md flex-shrink-0 ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                    {course.thumbnail}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`mb-2 ${isDark ? 'text-white/90' : 'text-gray-900'}`}>{course.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs flex items-center gap-1 ${isDark ? 'bg-white/10 text-white/60' : course.categoryBg + ' ' + course.categoryColor}`}>
                        <span>{course.categoryIcon}</span>
                        <span>{course.category}</span>
                      </span>
                      <span className={`text-sm ${isDark ? 'text-white/50' : 'text-gray-600'}`}>{course.instructor} 老师</span>
                    </div>
                  </div>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className={`text-sm ${isDark ? 'text-white/60' : 'text-gray-700'}`}>学习进度</span>
                    <span className={`text-sm ${isCyber ? 'text-cyan-400' : isAurora ? 'text-emerald-400' : 'text-purple-600'}`} style={{ fontWeight: 500 }}>{course.progress}%</span>
                  </div>
                  <div className={`w-full rounded-full h-2 ${isDark ? 'bg-white/10' : 'bg-white/60'}`}>
                    <div
                      className={`h-2 rounded-full transition-all ${
                        isCyber ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : isAurora ? 'bg-gradient-to-r from-emerald-400 to-teal-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <button className={`w-full text-white py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                  isCyber
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                    : isAurora
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500'
                }`}>
                  <Play className="w-4 h-4" fill="currentColor" />
                  <span>继续学习</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}

            {enrolledCourses.length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📚</div>
                <p className={`mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>还没有开始学习课程</p>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-2.5 text-white rounded-xl hover:shadow-lg transition-all ${
                    isCyber ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : isAurora ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-purple-500 to-pink-500'
                  }`}
                >
                  去选课
                </button>
              </div>
            )}
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">❤️</div>
            <p className={`mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>还没有收藏课程</p>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-2.5 text-white rounded-xl hover:shadow-lg transition-all ${
                isCyber ? 'bg-gradient-to-r from-pink-500 to-red-500' : isAurora ? 'bg-gradient-to-r from-rose-500 to-pink-500' : 'bg-gradient-to-r from-pink-500 to-red-500'
              }`}
            >
              去发现课程
            </button>
          </div>
        )}
      </div>

      {/* Floating Stats */}
      <div className="fixed bottom-20 right-4 space-y-2">
        <div className={`px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm text-white ${
          isCyber ? 'bg-gradient-to-br from-cyan-500 to-blue-600' : isAurora ? 'bg-gradient-to-br from-emerald-500 to-teal-500' : 'bg-gradient-to-br from-purple-500 to-pink-500'
        }`}>
          <Award className="w-4 h-4" />
          <span>学习积分: 1250</span>
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};