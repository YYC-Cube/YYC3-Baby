import React, { useState } from 'react';
import { PageNavigation } from '../layout/PageNavigation';
import { Button } from '../foundation/Button';
import { Card } from '../foundation/Card';
import { AvatarCustomizer } from '../business/AvatarCustomizer';
import { useUserProfile } from '../../../hooks/useUserProfile';
import { UserInformation } from '../../../services/userProfile/userInformationManager';
import { GlobalAvatar } from '../../../services/avatar/avatarSystem';
import { characterManager } from '../../../services/character';
import { useTheme } from '../../contexts/ThemeContext';

export interface SettingsPageProps {
  userId: string;
  onNavigate?: (page: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ userId, onNavigate }) => {
  const { theme, isDark } = useTheme();
  const isCyber = theme === 'cyberpunk';
  const isAurora = theme === 'aurora';
  const { userInfo, loading, updatePreferences, updateAvatar } = useUserProfile(userId);
  const [showAvatarCustomizer, setShowAvatarCustomizer] = useState(false);
  
  // 获取当前角色配置
  const currentCharacter = characterManager.getCurrentCharacter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">⏳</div>
          <p className={isDark ? 'text-white/60' : 'text-gray-600'}>加载设置中...</p>
        </div>
      </div>
    );
  }

  if (!userInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className={isDark ? 'text-white/60' : 'text-gray-600'}>无法加载用户信息</p>
      </div>
    );
  }

  const handleThemeChange = async (theme: 'light' | 'dark' | 'auto') => {
    try {
      await updatePreferences({ theme });
    } catch (error) {
      console.error('Failed to update theme:', error);
    }
  };

  const handleFontSizeChange = async (fontSize: 'small' | 'medium' | 'large') => {
    try {
      await updatePreferences({ fontSize });
    } catch (error) {
      console.error('Failed to update font size:', error);
    }
  };

  const handleVoiceToggle = async () => {
    try {
      await updatePreferences({ voiceEnabled: !userInfo.preferences.voiceEnabled });
    } catch (error) {
      console.error('Failed to toggle voice:', error);
    }
  };

  const handleAvatarSave = async (avatar: GlobalAvatar) => {
    try {
      await updateAvatar(avatar);
      setShowAvatarCustomizer(false);
    } catch (error) {
      console.error('Failed to save avatar:', error);
    }
  };

  if (showAvatarCustomizer) {
    return (
      <div className="min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <AvatarCustomizer
            userId={userId}
            currentAvatar={userInfo.globalAvatar}
            onSave={handleAvatarSave}
            onCancel={() => setShowAvatarCustomizer(false)}
          />
        </div>
      </div>
    );
  }

  // --- theme helpers ---
  const sectionBg = isDark ? 'bg-white/5 border border-white/10' : 'bg-white shadow-md';
  const sectionTitle = isDark ? 'text-white/90' : 'text-gray-900';
  const sectionSub = isDark ? 'text-white/50' : 'text-gray-500';
  const itemHover = isDark ? 'hover:bg-white/5' : 'hover:bg-gray-50';
  const divider = isDark ? 'border-white/10' : 'border-gray-100';

  return (
    <div className="min-h-screen pb-20">
      {/* 导航栏 */}
      <PageNavigation title="设置与管理" icon="⚙️" />

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* 用户信息卡片 */}
        <div className="mb-6">
          <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <span className="text-3xl">{currentCharacter?.gender === 'male' ? '👦' : '👧'}</span>
                </div>
                <div>
                  <h2 className="text-white mb-1">{userInfo.basicInfo.name || '未登录'}</h2>
                  <p className="text-white/80 text-sm">点击登录来查看详细信息</p>
                </div>
              </div>
              <Button 
                variant="primary" 
                className="bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white"
              >
                登录/注册
              </Button>
            </div>
          </div>
        </div>

        {/* 账户与安全 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-blue-600">👤</span>
            <h3 className={sectionTitle}>账户与安全</h3>
          </div>
          
          <div className={`rounded-2xl overflow-hidden ${sectionBg}`}>
            {/* 修改资料/昵称 */}
            <button className={`w-full flex items-center justify-between p-4 ${itemHover} transition-colors border-b ${divider}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-full flex items-center justify-center`}>
                  <span className="text-blue-600">✏️</span>
                </div>
                <div className="text-left">
                  <p className={`${sectionTitle}`} style={{ fontWeight: 500 }}>修改资料/昵称</p>
                  <p className={`text-sm ${sectionSub}`}>请先登录</p>
                </div>
              </div>
              <span className={isDark ? 'text-white/30' : 'text-gray-400'}>›</span>
            </button>

            {/* 家长锁模式 */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${isDark ? 'bg-green-500/20' : 'bg-green-100'} rounded-full flex items-center justify-center`}>
                  <span className="text-green-600">🔒</span>
                </div>
                <div>
                  <p className={sectionTitle} style={{ fontWeight: 500 }}>家长锁模式</p>
                  <p className={`text-sm ${sectionSub}`}>用于家长解锁或定时解锁</p>
                </div>
              </div>
              <button className="px-4 py-1.5 bg-green-500 text-white rounded-full text-sm font-medium hover:bg-green-600 transition-colors">
                查看
              </button>
            </div>
          </div>
        </div>

        {/* 学习偏好 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-purple-600">📚</span>
            <h3 className={sectionTitle}>学习偏好</h3>
          </div>
          
          <div className={`rounded-2xl overflow-hidden ${sectionBg}`}>
            {/* 护眼模式 */}
            <div className={`flex items-center justify-between p-4 border-b ${divider}`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'} rounded-full flex items-center justify-center`}>
                  <span className="text-purple-600">👁️</span>
                </div>
                <div>
                  <p className={sectionTitle} style={{ fontWeight: 500 }}>护眼模式</p>
                  <p className={`text-sm ${sectionSub}`}>开启后背景将变暗为墨绿色</p>
                </div>
              </div>
              <button
                onClick={() => handleThemeChange(userInfo.preferences.theme === 'dark' ? 'light' : 'dark')}
                className={`w-14 h-8 rounded-full transition-colors ${
                  userInfo.preferences.theme === 'dark'
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                    userInfo.preferences.theme === 'dark'
                      ? 'translate-x-7'
                      : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* 学习进度提醒 */}
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${isDark ? 'bg-pink-500/20' : 'bg-pink-100'} rounded-full flex items-center justify-center`}>
                  <span className="text-pink-600">🔔</span>
                </div>
                <div>
                  <p className={sectionTitle} style={{ fontWeight: 500 }}>学习进度提醒</p>
                  <p className={`text-sm ${sectionSub}`}>每天发送一次进度提醒</p>
                </div>
              </div>
              <button
                className="w-14 h-8 rounded-full bg-gray-300 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-white shadow-md transform transition-transform translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* 家长与帮助 */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-orange-600">🎯</span>
            <h3 className={sectionTitle}>家长与帮助</h3>
          </div>
          
          <div className={`rounded-2xl overflow-hidden ${sectionBg}`}>
            <div className={`grid grid-cols-2 divide-x ${isDark ? 'divide-white/10' : 'divide-gray-100'}`}>
              {/* 常见问题 */}
              <button className={`p-6 ${itemHover} transition-colors text-center`}>
                <div className={`w-12 h-12 ${isDark ? 'bg-green-500/20' : 'bg-green-100'} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">💬</span>
                </div>
                <p className={sectionTitle} style={{ fontWeight: 500 }}>常见问题 (FAQ)</p>
              </button>

              {/* 联系我们 */}
              <button className={`p-6 ${itemHover} transition-colors text-center`}>
                <div className={`w-12 h-12 ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} rounded-full flex items-center justify-center mx-auto mb-3`}>
                  <span className="text-2xl">📞</span>
                </div>
                <p className={sectionTitle} style={{ fontWeight: 500 }}>联系我们</p>
              </button>
            </div>
            
            {/* 获取账号 */}
            <button className={`w-full p-6 border-t ${divider} ${isDark ? 'hover:bg-blue-500/10' : 'hover:bg-blue-50'} transition-colors`}>
              <div className="flex items-center justify-center gap-2">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <p className={`${isCyber ? 'text-cyan-400' : isAurora ? 'text-emerald-400' : 'text-blue-600'}`} style={{ fontWeight: 500 }}>获取账号</p>
              </div>
            </button>
          </div>
        </div>

        {/* 高级设置 - 可折叠 */}
        <details className="mb-6">
          <summary className={`cursor-pointer rounded-2xl p-4 flex items-center justify-between ${sectionBg} ${itemHover} transition-colors`}>
            <div className="flex items-center gap-2">
              <span className={isDark ? 'text-white/60' : 'text-gray-600'}>🔧</span>
              <h3 className={sectionTitle}>高级设置</h3>
            </div>
            <span className={isDark ? 'text-white/30' : 'text-gray-400'}>▼</span>
          </summary>
          
          <div className="mt-4 space-y-4">
            {/* 字体大小 */}
            <Card>
              <h4 className="mb-4 flex items-center gap-2">
                <span>🔤</span>
                <span>字体大小</span>
              </h4>
              <div className="grid grid-cols-3 gap-3">
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleFontSizeChange(size)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      userInfo.preferences.fontSize === size
                        ? (isDark ? 'border-purple-400 bg-purple-500/20' : 'border-purple-500 bg-purple-50')
                        : (isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300')
                    }`}
                  >
                    <p className={`${isDark ? 'text-white/80' : ''}`} style={{ fontWeight: 500 }}>
                      {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
                    </p>
                  </button>
                ))}
              </div>
            </Card>

            {/* 语音设置 */}
            <Card>
              <h4 className="mb-4 flex items-center gap-2">
                <span>🎤</span>
                <span>语音设置</span>
              </h4>
              <div className="flex items-center justify-between">
                <div>
                  <p className={sectionTitle} style={{ fontWeight: 500 }}>启用语音交互</p>
                  <p className={`text-sm ${sectionSub}`}>允许使用语音与AI助手对话</p>
                </div>
                <button
                  onClick={handleVoiceToggle}
                  className={`w-14 h-8 rounded-full transition-colors ${
                    userInfo.preferences.voiceEnabled
                      ? 'bg-purple-500'
                      : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${
                      userInfo.preferences.voiceEnabled
                        ? 'translate-x-7'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </Card>

            {/* 语言设置 */}
            <Card>
              <h4 className="mb-4 flex items-center gap-2">
                <span>🌐</span>
                <span>语言设置</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {(['zh-CN', 'en-US'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => updatePreferences({ language: lang })}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      userInfo.preferences.language === lang
                        ? (isDark ? 'border-purple-400 bg-purple-500/20' : 'border-purple-500 bg-purple-50')
                        : (isDark ? 'border-white/10 hover:border-white/20' : 'border-gray-200 hover:border-gray-300')
                    }`}
                  >
                    <p className={isDark ? 'text-white/80' : ''} style={{ fontWeight: 500 }}>
                      {lang === 'zh-CN' ? '简体中文' : 'English'}
                    </p>
                  </button>
                ))}
              </div>
            </Card>

            {/* 系统管理 */}
            <Card>
                <h4 className="mb-4 flex items-center gap-2">
                    <span>🛠️</span>
                    <span>系统管理</span>
                </h4>
                <Button 
                    variant="outline" 
                    className="w-full justify-between"
                    onClick={() => onNavigate?.('character_system')}
                >
                    <span>角色信息管理</span>
                    <span>→</span>
                </Button>
            </Card>
          </div>
        </details>
      </div>
    </div>
  );
};