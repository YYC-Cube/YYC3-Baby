import React, { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import { LiquidBackground } from './components/system/LiquidBackground';
import { Header } from './components/layout/Header';
import { WelcomeSection } from './components/layout/WelcomeSection';
import { SectionTitle } from './components/layout/SectionTitle';
import { GrowthCard } from './components/business/GrowthCard';
import { CultureCarousel } from './components/business/CultureCarousel';
import { LearningProgress } from './components/business/LearningProgress';
import { RecommendationCard } from './components/business/RecommendationCard';
import { GlobalNavigation } from './components/system/GlobalNavigation';
import { AIFloatWindow } from './components/system/AIFloatWindow';
import { SettingsPage } from './components/pages/SettingsPage';
import { NewHomePage } from './components/pages/NewHomePage';
import { VideoPage } from './components/pages/VideoPage';
import { TaskPage } from './components/pages/TaskPage';
import { CreatePage } from './components/pages/CreatePage';
import { SchedulePage } from './components/pages/SchedulePage';
import { MessageCenterPage } from './components/pages/MessageCenterPage';
import { AudioBookPage } from './components/pages/AudioBookPage';
import { PublicWelfarePage } from './components/pages/PublicWelfarePage';
import { PublicClassPage } from './components/pages/PublicClassPage';
import { GrowthRecordPage } from './components/pages/GrowthRecordPage';
import { GrowthSystemPage } from './components/pages/GrowthSystemPage';
import { BadgesPage } from './components/pages/BadgesPage';
import { CultureDetailPage } from './components/pages/CultureDetailPage';
import { CulturePage } from './components/pages/CulturePage';
import { CharacterSystemPage } from './components/pages/CharacterSystemPage';
import GrowthTreePage from './components/pages/GrowthTreePage';
import GrowthSystemIntegration from './components/integration/GrowthSystemIntegration';
import { characterManager } from '../services/character';
import { motion } from 'motion/react';
import {
  mockUserData,
  mockGrowthData,
  mockCultureItems,
  mockLearningProgress,
  mockRecommendations,
} from '../data/mockData';
import xiaoyuAvatarImage from 'figma:asset/756dfe314fb38126716f95a510053d8b3706a450.png';

const AppContent: React.FC = () => {
  const { currentPage, navigateTo, goBack, navigationData } = useNavigation();

  const selectedCultureId = (navigationData?.cultureId as string) || 'culture-longmen';

  const handleNavigate = (page: string, data?: Record<string, unknown>) => {
    navigateTo(page, data);
  };

  useEffect(() => {
    characterManager.setCurrentChild(null);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Liquid Glass Background */}
      <LiquidBackground particleCount={24} />

      {/* Content Layer */}
      <div className="relative z-10 pb-20">
        {currentPage === 'home' && <NewHomePage onNavigate={handleNavigate} />}

        {currentPage === 'video' && <VideoPage />}
        {currentPage === 'task' && <TaskPage />}
        {currentPage === 'create' && <CreatePage />}
        {currentPage === 'schedule' && <SchedulePage />}

        {currentPage === 'old_home' && (
          <main className="container mx-auto px-4 py-8 max-w-6xl">
            <WelcomeSection userData={mockUserData} />
            <section className="mb-8">
              <SectionTitle title="成长记录" subtitle="记录每一个成长的瞬间" onMore={() => handleNavigate('growth')} />
              <GrowthCard ageStage={mockGrowthData.stage} growthData={mockGrowthData} onViewDetails={() => handleNavigate('growth')} />
            </section>
            <section className="mb-8">
              <SectionTitle title="河洛文化探索" subtitle="探索洛阳千年文化底蕴" onMore={() => handleNavigate('culture')} />
              <CultureCarousel items={mockCultureItems} />
            </section>
            <section className="mb-8">
              <SectionTitle title="学习进度" subtitle="持续学习，不断进步" onMore={() => handleNavigate('learning')} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockLearningProgress.map((progress, index) => (
                  <LearningProgress key={index} {...progress} onContinue={() => console.log(`Continue ${progress.subject}`)} />
                ))}
              </div>
            </section>
            <section className="mb-8">
              <SectionTitle title="为你推荐" subtitle="基于你的年龄和兴趣推荐" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mockRecommendations.map((rec) => (
                  <RecommendationCard key={rec.id} {...rec} onClick={() => console.log(`Clicked ${rec.title}`)} />
                ))}
              </div>
            </section>
          </main>
        )}

        {currentPage === 'growth' && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="container mx-auto px-4 py-8 max-w-6xl"
          >
            <div className="mb-8">
              <h1 className="text-gray-800 mb-2 text-gradient-green" style={{ WebkitTextFillColor: 'unset' }}>成长记录</h1>
              <p className="text-gray-500">记录每一个成长的瞬间，见证进步的力量</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <GrowthCard ageStage={mockGrowthData.stage} growthData={mockGrowthData} />
            </div>
            <div className="mt-8 glass-card glass-card-strong p-6">
              <h3 className="mb-4 text-gray-800">成长维度详情</h3>
              {mockGrowthData.dimensions.map((dimension, index) => (
                <div key={index} className="mb-6 last:mb-0">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-gray-700">{dimension.name}</h4>
                    <span className="text-emerald-600" style={{ fontWeight: 600 }}>{dimension.progress}%</span>
                  </div>
                  <div className="w-full bg-emerald-100/50 rounded-full h-2.5 mb-3">
                    <div className="progress-glow h-2.5" style={{ width: `${dimension.progress}%` }} />
                  </div>
                  <div className="space-y-2">
                    {dimension.items.map((item) => (
                      <div key={item.id} className={`p-3 rounded-xl backdrop-blur-sm ${item.completed ? 'bg-emerald-50/60 border border-emerald-100/50' : 'bg-white/40 border border-white/50'}`}>
                        <div className="flex items-start gap-2">
                          <span className="text-lg">{item.completed ? '✅' : '⭕'}</span>
                          <div className="flex-1">
                            <p className="text-gray-800 text-sm" style={{ fontWeight: 500 }}>{item.title}</p>
                            <p className="text-gray-500 text-xs">{item.description}</p>
                            {item.date && <p className="text-gray-400 text-xs mt-1">完成于 {item.date}</p>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.main>
        )}

        {currentPage === 'culture' && <CulturePage onNavigate={handleNavigate} />}

        {currentPage === 'learning' && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="container mx-auto px-4 py-8 max-w-6xl"
          >
            <div className="mb-8">
              <h1 className="text-gray-800 mb-2">学习中心</h1>
              <p className="text-gray-500">持续学习，不断进步，成就更好的自己</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockLearningProgress.map((progress, index) => (
                <LearningProgress key={index} {...progress} onContinue={() => console.log(`Continue ${progress.subject}`)} />
              ))}
            </div>
          </motion.main>
        )}

        {currentPage === 'profile' && (
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="container mx-auto px-4 py-8 max-w-4xl"
          >
            <div className="glass-card glass-card-strong p-8 mb-6">
              <div className="flex items-center gap-6 mb-6">
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 3 }}
                  className="w-24 h-24 rounded-2xl overflow-hidden border-3 border-emerald-200/50"
                  style={{ boxShadow: '0 8px 30px rgba(16, 185, 129, 0.2)' }}
                >
                  <img src={xiaoyuAvatarImage} alt={mockUserData.name} className="w-full h-full object-cover" />
                </motion.div>
                <div>
                  <h2 className="text-gray-800 mb-2">{mockUserData.name}</h2>
                  <p className="text-emerald-600 mb-1 text-sm">{mockUserData.age}岁 · {mockUserData.growthStage}</p>
                  <p className="text-gray-400 text-xs">加入时间：2025年12月</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { value: '15', label: '学习天数', gradient: 'from-emerald-400 to-green-500' },
                  { value: '8', label: '完成课程', gradient: 'from-teal-400 to-cyan-500' },
                  { value: '4', label: '获得成就', gradient: 'from-green-400 to-emerald-500' },
                  { value: '12', label: '文化探索', gradient: 'from-emerald-500 to-teal-500' },
                ].map((stat) => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="glass-card glass-card-subtle text-center p-4"
                  >
                    <p className={`text-3xl bg-gradient-to-r ${stat.gradient} bg-clip-text`} style={{ WebkitTextFillColor: 'transparent', fontWeight: 700 }}>{stat.value}</p>
                    <p className="text-gray-500 text-xs mt-1">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glass-card glass-card-strong p-6">
              <h3 className="mb-4 text-gray-800">成就徽章</h3>
              <div className="grid grid-cols-4 gap-4">
                {mockGrowthData.achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    whileHover={{ y: -6, scale: 1.05, rotate: 2 }}
                    className="glass-card glass-green-5 flex flex-col items-center p-4 cursor-pointer"
                  >
                    <div
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-3xl mb-2"
                      style={{ boxShadow: '0 6px 20px rgba(245, 158, 11, 0.3)' }}
                    >
                      {achievement.icon}
                    </div>
                    <p className="text-sm text-gray-800 text-center" style={{ fontWeight: 500 }}>{achievement.title}</p>
                    <p className="text-xs text-gray-400">{achievement.earnedDate}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.main>
        )}

        {currentPage === 'settings' && <SettingsPage userId={mockUserData.id} onNavigate={handleNavigate} />}
        {currentPage === 'messages' && <MessageCenterPage />}
        {currentPage === 'audiobook' && <AudioBookPage />}
        {currentPage === 'welfare' && <PublicWelfarePage />}
        {currentPage === 'public_class' && <PublicClassPage />}
        {currentPage === 'growth_record' && <GrowthRecordPage onBack={goBack} />}
        {currentPage === 'growth_system' && <GrowthSystemPage onBack={goBack} />}
        {currentPage === 'badges' && <BadgesPage />}
        {currentPage === 'culture_detail' && <CultureDetailPage cultureId={selectedCultureId} onBack={goBack} />}
        {currentPage === 'character_system' && <CharacterSystemPage />}
        {currentPage === 'growth_tree' && <GrowthTreePage onNavigate={handleNavigate} />}
        {currentPage === 'growth_integration' && <GrowthSystemIntegration />}

        {currentPage !== 'home' && <GlobalNavigation currentPage={currentPage} onNavigate={handleNavigate} />}
      </div>

      <AIFloatWindow />
    </div>
  );
};

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
