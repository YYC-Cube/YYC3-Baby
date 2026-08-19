import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mic, Sparkles, Zap } from 'lucide-react';
import aiFloatButtonImage from 'figma:asset/eefcde44abc5ffeeafd4c29bd11a37e6bb443de7.png';
import xiaoyuAvatarImage from 'figma:asset/756dfe314fb38126716f95a510053d8b3706a450.png';
import { useTheme } from '../../contexts/ThemeContext';

export interface AIFloatWindowProps {
  initialPosition?: { x: number; y: number };
  size?: { width: number; height: number };
  theme?: 'light' | 'dark';
  onInteraction?: (type: string, data?: Record<string, unknown>) => void;
  className?: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const springConfig = { type: 'spring' as const, stiffness: 400, damping: 28 };

export const AIFloatWindow: React.FC<AIFloatWindowProps> = ({
  onInteraction,
  className = '',
}) => {
  const { theme: appTheme, isDark } = useTheme();
  const isCyber = appTheme === 'cyberpunk';
  const isAurora = appTheme === 'aurora';

  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: isCyber
        ? '[SYSTEM] 你好！我是小语AI，你的赛博空间向导 ⚡ 需要什么帮助？'
        : '你好！我是小语，你的AI成长伙伴 🌿 有什么我可以帮你的吗？',
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollClass = isCyber ? 'cyber-scroll' : isAurora ? 'aurora-scroll' : 'glass-scroll';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = (input: string): string => {
    if (input.includes('洛阳') || input.includes('文化')) {
      return '洛阳是十三朝古都，有着非常丰富的历史文化！🏛️ 你想了解龙门石窟、白马寺，还是牡丹花会呢？';
    }
    if (input.includes('学习') || input.includes('作业')) {
      return '学习是一件快乐的事！📚 我们一步一步来，先从今天的任务开始吧。你想先复习语文还是数学呢？';
    }
    if (input.includes('你好') || input.includes('嗨')) {
      return '你好呀！🌱 今天过得怎么样？有什么想和小语聊聊的吗？';
    }
    return `我听到你说的了！"${input}" 这是个很好的想法 🌿 我们可以一起探索更多哦～`;
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
    setIsThinking(true);
    onInteraction?.('send-message', { content: inputText });

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getAIResponse(inputText),
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsThinking(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    onInteraction?.('voice-click', { listening: !isListening });
    if (!isListening) {
      setTimeout(() => {
        setInputText('我想要学习关于洛阳的历史');
        setIsListening(false);
      }, 2000);
    }
  };

  const quickReplies = isCyber
    ? ['STORY_MODE 📖', 'CULTURE_SCAN 🏛️', 'DAILY_OPS ✅', 'GROWTH_DATA 📊']
    : ['讲个故事 📖', '文化探索 🏛️', '今日任务 ✅', '成长记录 📊'];

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={springConfig}
            className="absolute bottom-20 right-0 w-[380px] h-[540px] flex flex-col overflow-hidden"
            style={{
              background: isCyber
                ? 'rgba(10, 10, 30, 0.92)'
                : isAurora
                  ? 'rgba(10, 22, 40, 0.85)'
                  : 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(30px) saturate(200%)',
              WebkitBackdropFilter: 'blur(30px) saturate(200%)',
              borderRadius: isCyber ? '8px' : '24px',
              border: isCyber
                ? '1px solid rgba(0, 240, 255, 0.3)'
                : isAurora
                  ? '1px solid rgba(255, 255, 255, 0.1)'
                  : '1px solid rgba(255, 255, 255, 0.7)',
              boxShadow: isCyber
                ? '0 0 30px rgba(0, 240, 255, 0.15), 0 20px 60px rgba(0,0,0,0.5)'
                : isAurora
                  ? '0 20px 60px rgba(0,0,0,0.3)'
                  : '0 20px 60px rgba(16, 185, 129, 0.15), 0 8px 24px rgba(0,0,0,0.08)',
            }}
          >
            {/* Header */}
            <div
              className="p-4 flex justify-between items-center shrink-0 relative overflow-hidden"
              style={{
                background: isCyber
                  ? 'linear-gradient(135deg, rgba(0,240,255,0.15), rgba(255,0,255,0.1))'
                  : isAurora
                    ? 'linear-gradient(135deg, rgba(0,255,135,0.2), rgba(96,239,255,0.15))'
                    : 'linear-gradient(135deg, #10b981, #059669, #047857)',
                borderRadius: isCyber ? '8px 8px 0 0' : '24px 24px 0 0',
                borderBottom: isCyber ? '1px solid rgba(0,240,255,0.2)' : isAurora ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div className={`absolute inset-0 ${isCyber ? 'cyber-shimmer' : isAurora ? 'aurora-shimmer' : 'shimmer'} pointer-events-none opacity-30`} />
              <div className="flex items-center gap-3 relative z-10">
                <div className={`w-11 h-11 rounded-2xl overflow-hidden shrink-0 ${
                  isCyber ? 'border-2 border-cyan-500/40 shadow-lg shadow-cyan-500/20' : 'border-2 border-white/40 shadow-lg bg-white/10'
                }`}>
                  <img src={xiaoyuAvatarImage} alt="小语" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className={`text-base ${isCyber ? 'text-cyan-300' : 'text-white'}`} style={{ fontWeight: 600, lineHeight: 1.3 }}>
                    {isCyber ? 'XY-AI AGENT' : '小语AI助手'}
                  </h3>
                  <p className={`text-xs ${isCyber ? 'text-cyan-400/60' : 'text-emerald-100'}`}>
                    {isListening ? '正在聆听...' : isThinking ? '思考中...' : (isCyber ? 'ONLINE // READY' : '随时为您服务 🌿')}
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsExpanded(false)}
                className={`w-8 h-8 rounded-xl flex items-center justify-center relative z-10 transition-colors ${
                  isCyber ? 'bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/20' : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                <X size={16} className={isCyber ? 'text-cyan-400' : 'text-white'} />
              </motion.button>
            </div>

            {/* Chat Area */}
            <div className={`flex-1 overflow-y-auto p-4 space-y-3 ${scrollClass}`}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
                >
                  {msg.role === 'assistant' && (
                    <div className={`w-7 h-7 rounded-xl overflow-hidden shrink-0 shadow-sm ${
                      isCyber ? 'border border-cyan-500/30' : 'border border-white/40'
                    }`}>
                      <img src={xiaoyuAvatarImage} alt="小语" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] p-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? `rounded-2xl rounded-tr-lg ${isCyber ? 'text-black' : 'text-white'}`
                        : `rounded-2xl rounded-tl-lg ${isCyber ? 'text-cyan-100' : isDark ? 'text-white/85' : 'text-gray-700'}`
                    }`}
                    style={
                      msg.role === 'user'
                        ? {
                            background: isCyber
                              ? 'linear-gradient(135deg, #00f0ff, #00c0cc)'
                              : 'linear-gradient(135deg, #10b981, #059669)',
                            boxShadow: isCyber
                              ? '0 0 15px rgba(0,240,255,0.3)'
                              : '0 4px 15px rgba(16, 185, 129, 0.25)',
                          }
                        : {
                            background: isCyber
                              ? 'rgba(0, 240, 255, 0.08)'
                              : isAurora
                                ? 'rgba(255,255,255,0.08)'
                                : 'rgba(255, 255, 255, 0.7)',
                            backdropFilter: 'blur(10px)',
                            border: isCyber
                              ? '1px solid rgba(0,240,255,0.15)'
                              : isAurora
                                ? '1px solid rgba(255,255,255,0.1)'
                                : '1px solid rgba(255, 255, 255, 0.6)',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                          }
                    }
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isThinking && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex items-end gap-2"
                >
                  <div className="w-7 h-7 rounded-xl overflow-hidden shrink-0">
                    <img src={xiaoyuAvatarImage} alt="小语" className="w-full h-full object-cover" />
                  </div>
                  <div
                    className="p-3 rounded-2xl rounded-tl-lg"
                    style={{
                      background: isCyber ? 'rgba(0,240,255,0.08)' : isAurora ? 'rgba(255,255,255,0.08)' : 'rgba(255, 255, 255, 0.7)',
                      backdropFilter: 'blur(10px)',
                      border: isCyber ? '1px solid rgba(0,240,255,0.15)' : isAurora ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className={`w-2 h-2 rounded-full ${isCyber ? 'bg-cyan-400' : 'bg-emerald-400'}`}
                          animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 shrink-0">
              <div className={`flex gap-2 overflow-x-auto ${scrollClass} pb-1`}>
                {quickReplies.map((reply) => (
                  <motion.button
                    key={reply}
                    whileHover={{ scale: 1.05, y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const cleanReply = reply.replace(/\s*[📖🏛️✅📊]/g, '').trim();
                      setInputText(cleanReply);
                      setTimeout(() => {
                        const newMsg: ChatMessage = {
                          id: Date.now().toString(),
                          role: 'user',
                          content: cleanReply,
                          timestamp: Date.now(),
                        };
                        setMessages((prev) => [...prev, newMsg]);
                        setIsThinking(true);
                        setTimeout(() => {
                          const aiResponse: ChatMessage = {
                            id: (Date.now() + 1).toString(),
                            role: 'assistant',
                            content: getAIResponse(reply),
                            timestamp: Date.now(),
                          };
                          setMessages((prev) => [...prev, aiResponse]);
                          setIsThinking(false);
                        }, 800);
                        setInputText('');
                      }, 100);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-colors backdrop-blur-sm border ${
                      isCyber
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20'
                        : isAurora
                          ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/15 hover:bg-emerald-500/20'
                          : 'bg-emerald-50/80 text-emerald-600 border-emerald-100/60 hover:bg-emerald-100/80'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {reply}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 shrink-0" style={{
              borderTop: isCyber
                ? '1px solid rgba(0,240,255,0.15)'
                : isAurora
                  ? '1px solid rgba(255,255,255,0.08)'
                  : '1px solid rgba(255,255,255,0.5)'
            }}>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleListening}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0 ${
                    isListening
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : isCyber
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20'
                        : isDark
                          ? 'bg-white/8 text-white/60 border border-white/10 hover:bg-white/12'
                          : 'bg-white/50 text-gray-500 border border-white/60 hover:bg-white/70'
                  }`}
                  style={{ backdropFilter: 'blur(10px)' }}
                >
                  <Mic size={18} className={isListening ? 'animate-pulse' : ''} />
                </motion.button>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder={isCyber ? 'INPUT COMMAND...' : '输入消息...'}
                  className={`${isCyber ? 'cyber-input' : isAurora ? 'aurora-input' : 'glass-input'} flex-1 px-4 py-2.5 text-sm outline-none`}
                />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 disabled:opacity-40 ${
                    isCyber ? 'cyber-btn cyber-btn-primary' : isAurora ? 'aurora-btn' : 'glass-btn'
                  }`}
                >
                  <Send size={16} className={`relative z-10 ${isCyber ? 'text-cyan-300' : 'text-white'}`} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${isCyber ? 'cyber-ai-pulse-btn' : isAurora ? 'aurora-ai-pulse-btn' : 'ai-pulse-btn'} w-[68px] h-[68px] rounded-2xl flex items-center justify-center relative z-50 overflow-hidden p-0`}
        style={{
          background: isCyber
            ? 'linear-gradient(135deg, rgba(0,240,255,0.2), rgba(255,0,255,0.15))'
            : 'linear-gradient(135deg, #10b981, #059669)',
          boxShadow: isCyber
            ? '0 0 25px rgba(0,240,255,0.4), inset 0 0 15px rgba(0,240,255,0.1)'
            : '0 8px 30px rgba(16, 185, 129, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)',
          border: isCyber ? '2px solid rgba(0,240,255,0.5)' : '2px solid rgba(255,255,255,0.5)',
          borderRadius: isCyber ? '8px' : '16px',
        }}
      >
        <img
          src={aiFloatButtonImage}
          alt="小语AI"
          className={`w-full h-full object-cover ${isCyber ? 'rounded-md' : 'rounded-xl'}`}
        />
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`absolute -top-1 -right-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isCyber
              ? 'bg-cyan-500 border-cyan-300/50'
              : 'bg-emerald-400 border-white'
          }`}
        >
          {isCyber ? <Zap size={10} className="text-black" /> : <Sparkles size={10} className="text-white" />}
        </motion.span>
      </motion.button>
    </div>
  );
};
