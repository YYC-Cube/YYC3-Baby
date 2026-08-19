import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import xiaoyuHomeImage from 'figma:asset/4a906e3a628c931914b1098cb25edfc99fd533d8.png';
import { characterManager } from '../../../services/character';
import { useTheme } from '../../contexts/ThemeContext';
import { Leaf, Sparkles, BookOpen, Palette, Calendar, MessageSquare, Heart, Mic, Film, Award, TreePine, BarChart3, GraduationCap, ChevronRight, CheckCircle2, Zap, Monitor, Cpu } from 'lucide-react';

export interface NewHomePageProps {
  onNavigate: (page: string) => void;
}

const springConfig = { type: 'spring' as const, stiffness: 300, damping: 24 };

const TypewriterText: React.FC<{ text: string; className?: string; cursorClass?: string }> = ({ text, className, cursorClass }) => {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <span className={className}>
      {displayed}
      {!done && <span className={cursorClass || 'typing-cursor'} />}
    </span>
  );
};

export const NewHomePage: React.FC<NewHomePageProps> = ({ onNavigate }) => {
  const currentCharacter = characterManager.getCurrentCharacter();
  const characterName = currentCharacter?.name || '小语';
  const { theme, cycleTheme, isDark } = useTheme();

  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';

  // Theme tokens
  const cardClass = isCyber ? 'cyber-card' : isAurora ? 'aurora-card' : 'glass-card';
  const cardSubtle = isCyber ? 'cyber-card cyber-card-subtle' : isAurora ? 'aurora-card aurora-card-subtle' : 'glass-card glass-card-subtle';
  const headerClass = isCyber ? 'cyber-header' : isAurora ? 'aurora-header' : 'glass-header';
  const btnClass = isCyber ? 'cyber-btn cyber-btn-primary' : isAurora ? 'aurora-btn' : 'glass-btn';
  const textPrimary = isDark ? 'text-white/90' : 'text-gray-800';
  const textSecondary = isDark ? 'text-white/60' : 'text-gray-500';
  const textMuted = isDark ? 'text-white/40' : 'text-gray-400';
  const accentColor = isCyber ? 'text-cyan-400' : isAurora ? 'text-emerald-300' : 'text-emerald-600';
  const shimmerClass = isCyber ? 'cyber-shimmer' : isAurora ? 'aurora-shimmer' : 'shimmer';
  const floatLogoClass = isCyber ? 'cyber-float-logo' : isAurora ? 'aurora-float-logo' : 'float-logo';
  const glowBorderClass = isCyber ? 'cyber-glow-border' : isAurora ? 'aurora-glow-border' : 'glow-border';
  const cursorClass = isCyber ? 'cyber-typing-cursor' : isAurora ? 'aurora-typing-cursor' : 'typing-cursor';
  const scrollClass = isCyber ? 'cyber-scroll' : isAurora ? 'aurora-scroll' : 'glass-scroll';

  const quickFeatures = [
    { id: 'video', icon: <Film size={22} />, label: '视频工坊', color: isCyber ? 'from-cyan-500 to-blue-600' : 'from-emerald-400 to-teal-500', delay: 0 },
    { id: 'audiobook', icon: <BookOpen size={22} />, label: '有声绘本', color: isCyber ? 'from-purple-500 to-pink-600' : 'from-green-400 to-emerald-500', delay: 0.05 },
    { id: 'public_class', icon: <GraduationCap size={22} />, label: '公益课堂', color: isCyber ? 'from-blue-500 to-indigo-600' : 'from-teal-400 to-cyan-500', delay: 0.1 },
    { id: 'welfare', icon: <Heart size={22} />, label: '公益活动', color: isCyber ? 'from-pink-500 to-red-600' : 'from-emerald-500 to-green-600', delay: 0.15 },
    { id: 'messages', icon: <MessageSquare size={22} />, label: '消息中心', color: isCyber ? 'from-yellow-500 to-orange-600' : 'from-green-500 to-teal-500', delay: 0.2 },
  ];

  const quickFeatures2 = [
    { id: 'create', icon: <Palette size={22} />, label: '创意制作', color: isCyber ? 'from-fuchsia-500 to-purple-600' : 'from-teal-500 to-emerald-600', delay: 0.25 },
    { id: 'schedule', icon: <Calendar size={22} />, label: '智能课表', color: isCyber ? 'from-green-400 to-teal-500' : 'from-green-400 to-lime-500', delay: 0.3 },
    { id: 'growth_record', icon: <BarChart3 size={22} />, label: '成长记录', color: isCyber ? 'from-cyan-400 to-sky-500' : 'from-emerald-400 to-green-500', delay: 0.35 },
    { id: 'growth_system', icon: <TreePine size={22} />, label: '沫语成长守护', color: isCyber ? 'from-blue-500 to-cyan-500' : 'from-green-600 to-emerald-700', delay: 0.4, featured: true },
    { id: 'badges', icon: <Award size={22} />, label: '勋章殿堂', color: isCyber ? 'from-yellow-400 to-amber-500' : 'from-amber-400 to-yellow-500', delay: 0.45, featured: true },
  ];

  const themeLabel = isCyber ? 'CYBER' : isAurora ? 'AURORA' : 'GLASS';
  const themeIcon = isCyber ? <Cpu size={14} /> : isAurora ? <Sparkles size={14} /> : <Leaf size={14} />;

  return (
    <div className="relative min-h-screen pb-8">
      {/* Header */}
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ...springConfig, delay: 0.1 }}
        className={`${headerClass} sticky top-0 z-40 px-4 py-3`}
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <motion.div
              className={floatLogoClass}
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                isCyber
                  ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30'
                  : 'bg-gradient-to-br from-emerald-400 to-green-600 shadow-emerald-500/20'
              }`}>
                {isCyber ? <Zap size={20} className="text-white" /> : <Leaf size={20} className="text-white" />}
              </div>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-lg ${textPrimary}`} style={{ fontWeight: 600 }}>23°C</span>
                <span className={`text-xs px-2 py-0.5 rounded-full backdrop-blur-sm ${
                  isCyber ? 'text-cyan-300 bg-cyan-500/15 border border-cyan-500/20' : isDark ? 'text-emerald-300 bg-emerald-500/15' : 'text-emerald-600 bg-emerald-50/80'
                }`}>适宜室外</span>
              </div>
              <div className={`text-xs ${textMuted}`}>3月7日 星期六</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={cycleTheme}
              className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all ${
                isCyber
                  ? 'bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/25'
                  : isDark
                    ? 'bg-white/10 border border-white/15 text-white/70 hover:bg-white/15'
                    : 'bg-white/40 border border-white/50 text-gray-600 hover:bg-white/60'
              }`}
            >
              {themeIcon}
              <span style={{ fontWeight: 500 }}>{themeLabel}</span>
            </motion.button>

            {[
              { label: '消息', icon: '📬', page: 'messages' },
              { label: '公益', icon: '❤️', page: 'welfare' },
              { label: '绘本', icon: '📚', page: 'audiobook' },
              { label: '公课', icon: '📖', page: 'public_class' },
            ].map((item) => (
              <motion.button
                key={item.page}
                whileHover={{ scale: 1.05, y: -1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.page)}
                className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1 transition-all ${
                  isCyber
                    ? 'bg-white/5 backdrop-blur-md border border-cyan-500/15 text-cyan-300/80 hover:bg-cyan-500/10 hover:border-cyan-500/30'
                    : isDark
                      ? 'bg-white/8 backdrop-blur-md border border-white/10 text-white/70 hover:bg-white/12'
                      : 'bg-white/40 backdrop-blur-md border border-white/50 text-gray-600 hover:bg-white/60 hover:shadow-md'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </motion.button>
            ))}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`${btnClass} px-4 py-1.5 text-xs rounded-xl ${isCyber ? '' : 'text-white'}`}
            >
              {isCyber ? 'LOGIN' : '登录'}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left - Character Card */}
          <motion.div
            className="lg:col-span-1"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ ...springConfig, delay: 0.2 }}
          >
            <div className={`${cardClass} ${isCyber ? 'cyber-gradient-cyan' : isAurora ? 'aurora-gradient-1' : 'glass-green-3'} p-0 overflow-hidden`}>
              {/* Character Image */}
              <div className="relative p-6 pb-2">
                <div className="absolute inset-0 overflow-hidden rounded-t-[8px]">
                  <div className={`absolute top-4 left-6 w-16 h-16 rounded-full blur-xl animate-pulse ${
                    isCyber ? 'bg-cyan-500/15' : 'bg-emerald-300/20'
                  }`} />
                  <div className={`absolute bottom-8 right-8 w-12 h-12 rounded-full blur-xl animate-pulse ${
                    isCyber ? 'bg-purple-500/15' : 'bg-green-300/20'
                  }`} style={{ animationDelay: '1s' }} />
                  <div className={`absolute top-1/3 right-6 w-8 h-8 rounded-full blur-lg animate-pulse ${
                    isCyber ? 'bg-blue-500/10' : 'bg-teal-300/15'
                  }`} style={{ animationDelay: '2s' }} />
                </div>
                <motion.div
                  className="relative z-10"
                  whileHover={{ scale: 1.03 }}
                  transition={springConfig}
                >
                  <img
                    src={xiaoyuHomeImage}
                    alt={characterName}
                    className="w-full max-w-[240px] mx-auto drop-shadow-2xl"
                  />
                </motion.div>
                <div className="relative z-10 text-center mt-2">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ ...springConfig, delay: 0.5 }}
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm shadow-sm ${
                      isCyber
                        ? 'bg-cyan-500/15 backdrop-blur-md border border-cyan-500/25 text-cyan-300'
                        : isDark
                          ? 'bg-white/10 backdrop-blur-md border border-white/15 text-white/80'
                          : 'bg-white/60 backdrop-blur-md border border-white/50 text-emerald-700'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {isCyber ? <Cpu size={14} className="text-cyan-400" /> : <Sparkles size={14} className={isDark ? 'text-emerald-400' : 'text-emerald-500'} />}
                    {characterName} · AI成长伙伴
                  </motion.span>
                </div>
              </div>

              {/* Greeting */}
              <div className="px-5 pb-3">
                <div className={`${cardSubtle} p-4 text-center`}>
                  <p className={`${isDark ? 'text-white/75' : 'text-gray-700'} text-sm`}>
                    <TypewriterText
                      text={isCyber ? `[SYSTEM] Hi, 云云！准备好进入数字世界了吗？⚡` : `Hi, 云云！今天也一起加油吧！🌿`}
                      cursorClass={cursorClass}
                    />
                  </p>
                </div>
              </div>

              {/* Bottom Banner */}
              <div className="mx-5 mb-5">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`text-white rounded-2xl p-5 relative overflow-hidden cursor-pointer ${
                    isCyber ? 'rounded-lg' : ''
                  }`}
                  style={{
                    background: isCyber
                      ? 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(255,0,255,0.15))'
                      : 'linear-gradient(135deg, #10b981, #059669)',
                    boxShadow: isCyber
                      ? '0 0 20px rgba(0,240,255,0.2), inset 0 0 20px rgba(0,240,255,0.05)'
                      : '0 8px 30px rgba(16, 185, 129, 0.3)',
                    border: isCyber ? '1px solid rgba(0,240,255,0.3)' : 'none',
                  }}
                >
                  <div className={`absolute inset-0 ${shimmerClass} pointer-events-none`} />
                  <h3 className={`relative z-10 ${isCyber ? 'text-cyan-300' : 'text-white'}`} style={{ fontWeight: 600 }}>
                    {isCyber ? <Monitor size={18} className="inline mr-2 opacity-80" /> : <Leaf size={18} className="inline mr-2 opacity-80" />}
                    {isCyber ? '赛博学习终端' : '快乐学习助手'}
                  </h3>
                  <p className={`text-sm relative z-10 mt-1 ${isCyber ? 'text-cyan-200/70' : 'text-emerald-100'}`}>
                    {isCyber ? 'NEURAL LINK ACTIVE' : '万卷江开在云端'}
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right - Features */}
          <div className="lg:col-span-2 space-y-5">

            {/* Classroom Banner */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...springConfig, delay: 0.25 }}
            >
              <div className={`${cardClass} ${isCyber ? 'cyber-gradient-cyan' : isAurora ? 'aurora-gradient-1' : 'glass-green-1'} p-5`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shadow-md ${
                      isCyber
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/25'
                        : 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-emerald-500/20'
                    }`}>
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className={`${isCyber ? 'text-cyan-300' : isDark ? 'text-white/90' : 'text-emerald-800'}`} style={{ fontWeight: 600 }}>
                        {isCyber ? 'CLASSROOM' : '教室引领'}
                      </h3>
                      <p className={`text-xs ${isCyber ? 'text-cyan-400/60' : isDark ? 'text-emerald-300/60' : 'text-emerald-600/70'}`}>
                        {isCyber ? 'Enter virtual learning space' : '进入专属学习空间'}
                      </p>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ x: 4 }}
                    className={`flex items-center gap-1 text-sm ${
                      isCyber ? 'text-cyan-400 hover:text-cyan-300' : isDark ? 'text-emerald-400' : 'text-emerald-600 hover:text-emerald-700'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {isCyber ? 'ENTER' : '去教室'} <ChevronRight size={16} />
                  </motion.button>
                </div>
              </div>
            </motion.div>

            {/* Today's Plan */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...springConfig, delay: 0.3 }}
            >
              <div className={`${cardClass} p-5`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-400 flex items-center justify-center shadow-md ${isCyber ? 'cyber-icon-hover-spin' : isAurora ? 'aurora-icon-hover-spin' : 'icon-hover-spin'}`}>
                    📋
                  </div>
                  <h3 className={textPrimary} style={{ fontWeight: 600 }}>{isCyber ? 'DAILY MISSION' : '今日计划'}</h3>
                </div>
                <div className={`${cardSubtle} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 size={20} className={isCyber ? 'text-cyan-400' : 'text-emerald-500'} />
                      <span className={`${isDark ? 'text-white/80' : 'text-gray-700'} text-sm`}>背诵古诗《静夜思》</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${accentColor}`} style={{ fontWeight: 500 }}>✓</span>
                      <span className={`text-xs ${textMuted}`}>完成 10/36 日计划</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Homework Center */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...springConfig, delay: 0.35 }}
            >
              <div className={`${cardClass} ${isCyber ? 'cyber-gradient-magenta' : isAurora ? 'aurora-gradient-5' : 'glass-green-5'} p-5`}>
                <h3 className={textPrimary} style={{ fontWeight: 600 }}>{isCyber ? 'TASK CENTER' : '作业中心'}</h3>
                <p className={`${textSecondary} text-sm mb-4`}>
                  {isCyber ? 'AGENT 云云, maintain progress!' : '云云，保持学习，你能做到!'}
                </p>
                <div className="flex gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
                    isCyber
                      ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/20'
                      : isDark
                        ? 'bg-emerald-500/15 text-emerald-300'
                        : 'bg-emerald-100/80 text-emerald-700'
                  }`} style={{ fontWeight: 500 }}>语文</span>
                  <span className={`px-3 py-1 rounded-full text-xs backdrop-blur-sm ${
                    isCyber
                      ? 'bg-purple-500/15 text-purple-300 border border-purple-500/20'
                      : isDark
                        ? 'bg-green-500/15 text-green-300'
                        : 'bg-green-100/80 text-green-700'
                  }`} style={{ fontWeight: 500 }}>数学</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate('task')}
                  className={`${btnClass} w-full py-3 text-sm ${isCyber ? 'rounded-lg' : 'rounded-2xl'} ${isCyber ? '' : 'text-white'}`}
                  style={{ fontWeight: 500 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isCyber ? 'START MISSION' : '开始作业'} <ChevronRight size={16} />
                  </span>
                </motion.button>
              </div>
            </motion.div>

            {/* Quick Features Grid - Row 1 */}
            <div className="grid grid-cols-5 gap-3">
              {quickFeatures.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...springConfig, delay: 0.4 + feature.delay }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(feature.id)}
                  className={`${cardClass} text-center cursor-pointer p-4`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className={`w-11 h-11 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md text-white`}
                    style={isCyber ? { boxShadow: '0 0 12px rgba(0,240,255,0.2)' } : undefined}
                  >
                    {feature.icon}
                  </motion.div>
                  <p className={`text-xs ${textSecondary}`} style={{ fontWeight: 500 }}>{feature.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Quick Features Grid - Row 2 */}
            <div className="grid grid-cols-5 gap-3">
              {quickFeatures2.map((feature) => (
                <motion.div
                  key={feature.id}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ ...springConfig, delay: 0.4 + feature.delay }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onNavigate(feature.id)}
                  className={`${cardClass} text-center cursor-pointer p-4 ${feature.featured ? glowBorderClass : ''}`}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className={`w-11 h-11 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-2 shadow-md text-white`}
                    style={isCyber ? { boxShadow: '0 0 12px rgba(0,240,255,0.2)' } : undefined}
                  >
                    {feature.icon}
                  </motion.div>
                  <p className={`text-xs ${
                    feature.featured
                      ? (isCyber ? 'text-cyber-gradient' : isAurora ? 'text-aurora-gradient' : 'text-gradient-green')
                      : textSecondary
                  }`} style={{ fontWeight: 500 }}>
                    {feature.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
