import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconRobot, IconSend, IconSparkles, IconWorld, IconStethoscope, IconBooks, IconUser, IconTrash } from '@tabler/icons-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../../store/AuthContext';

// FinLitGo SDK Config — model instance dibuat sekali di luar komponen
const GEMINI_API_KEY = "AIzaSyCsdlQ_tIjcepfmuHiB30kkRC1b2Nt4QWQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1024,
  },
});
const MAX_DAILY_LIMIT = 10;

export default function AIAssistPage() {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedMsg = localStorage.getItem('finlitgo_ai_chat_history');
    if (savedMsg) {
      try {
        const parsed = JSON.parse(savedMsg);
        if (parsed.date === today) return parsed.data;
      } catch (_) {}
    }
    return [];
  });
  const [usageCount, setUsageCount] = useState(0);

  // Refs
  const chatContainerRef = useRef(null);   // ref ke div scrollable
  const chatSessionRef = useRef(null);      // persistent Gemini chat session
  const isAtBottomRef = useRef(true);       // track apakah user scroll manual

  // ───────────────────────────────────────────
  // Inisialisasi/reset chat session Gemini sekali
  // ───────────────────────────────────────────
  const buildSystemInstruction = useCallback(() => {
    const userId = user?.uid || 'guest';
    const txs = JSON.parse(localStorage.getItem(`finlitgo_transactions_${userId}`) || '[]');
    const goals = JSON.parse(localStorage.getItem(`finlitgo_goals_${userId}`) || '[]');
    const pockets = JSON.parse(localStorage.getItem(`finlitgo_pockets_${userId}`) || '[]');

    const totalIncome = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const totalExpense = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    const mainBalance = totalIncome - totalExpense;
    const goalsText = goals.length > 0 ? goals.map(g => `${g.name} (Rp${g.current}/${g.target})`).join(', ') : 'none';
    const pocketsText = pockets.length > 0 ? pockets.map(p => `${p.name} Rp${p.balance}`).join(', ') : 'none';

    return `You are FinLitGo AI, a smart financial literacy assistant for Gen Z. Be concise and friendly.\nUser balance: Rp${mainBalance}, expenses: Rp${totalExpense}, pockets: ${pocketsText}, goals: ${goalsText}.`;
  }, [user]);

  const startNewChatSession = useCallback(() => {
    chatSessionRef.current = geminiModel.startChat({
      history: [],
      systemInstruction: buildSystemInstruction(),
    });
  }, [buildSystemInstruction]);

  // Mulai session baru saat komponen mount atau user berubah
  useEffect(() => {
    startNewChatSession();
  }, [startNewChatSession]);

  // ───────────────────────────────────────────
  // Daily limit check
  // ───────────────────────────────────────────
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem('finlitgo_ai_usage');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.date === today) {
          setUsageCount(parsed.count);
        } else {
          localStorage.setItem('finlitgo_ai_usage', JSON.stringify({ date: today, count: 0 }));
          setUsageCount(0);
        }
      } catch (_) {}
    } else {
      localStorage.setItem('finlitgo_ai_usage', JSON.stringify({ date: today, count: 0 }));
    }
  }, []);

  const incrementUsage = () => {
    const today = new Date().toISOString().split('T')[0];
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem('finlitgo_ai_usage', JSON.stringify({ date: today, count: newCount }));
  };

  // Sync messages ke localStorage
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem('finlitgo_ai_chat_history', JSON.stringify({ date: today, data: messages }));
  }, [messages]);

  // ───────────────────────────────────────────
  // Smooth scroll — hanya auto-scroll jika user di bawah
  // ───────────────────────────────────────────
  const scrollToBottom = useCallback((force = false) => {
    const container = chatContainerRef.current;
    if (!container) return;
    if (force || isAtBottomRef.current) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  // Deteksi apakah user scroll ke atas secara manual
  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const threshold = 80; // px dari bawah
    isAtBottomRef.current =
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  }, []);

  // Scroll ke bawah saat pesan baru masuk
  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]); // hanya saat jumlah pesan bertambah, bukan setiap streaming chunk

  // ───────────────────────────────────────────
  // Handler kirim pesan
  // ───────────────────────────────────────────
  const handleSend = async (overridePrompt = null) => {
    const textToSend = overridePrompt || prompt;
    if (!textToSend.trim() || isTyping) return;
    if (usageCount >= MAX_DAILY_LIMIT) {
      alert("You have reached your daily limit of 10 free AI queries.");
      return;
    }

    setPrompt('');
    setIsTyping(true);
    isAtBottomRef.current = true; // force scroll saat kirim

    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);

    // Pastikan session aktif
    if (!chatSessionRef.current) startNewChatSession();

    try {
      // Pre-add pesan assistant kosong untuk streaming
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsTyping(false);

      // Scroll paksa ke bawah setelah pesan user muncul
      requestAnimationFrame(() => scrollToBottom(true));

      const result = await chatSessionRef.current.sendMessageStream(textToSend);

      let fullText = '';
      let lastScrollTime = 0;

      for await (const chunk of result.stream) {
        fullText += chunk.text();
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { ...updated[updated.length - 1], content: fullText };
          return updated;
        });

        // Throttle scroll saat streaming — setiap 120ms agar tidak thrashing
        const now = Date.now();
        if (now - lastScrollTime > 120) {
          lastScrollTime = now;
          requestAnimationFrame(() => scrollToBottom());
        }
      }

      // Final scroll setelah selesai
      requestAnimationFrame(() => scrollToBottom(true));
      incrementUsage();
    } catch (error) {
      console.error("AI Error:", error);
      // Jika session error, buat ulang session
      startNewChatSession();
      setMessages(prev => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].content === '') {
          updated.pop();
        }
        return [...updated, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again." }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    setMessages([]);
    startNewChatSession(); // reset session juga
  };

  // ───────────────────────────────────────────
  // Markdown formatter
  // ───────────────────────────────────────────
  const formatText = (text) => {
    return text.split('\n').map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i} className="block mb-2">
          {parts.map((part, pidx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pidx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </span>
      );
    });
  };

  const categories = [
    { title: 'Global Justice', icon: <IconWorld size={20} />, color: 'bg-blue-500/10 text-blue-500', prompt: 'Tell me about Global Justice' },
    { title: 'Medicine & Health', icon: <IconStethoscope size={20} />, color: 'bg-red-500/10 text-red-500', prompt: 'Tell me about Medicine in personal finance' },
    { title: 'Science & Tech', icon: <IconSparkles size={20} />, color: 'bg-violet-500/10 text-violet-400', prompt: 'How does tech affect the economy?' },
    { title: 'Finance & Econ', icon: <IconBooks size={20} />, color: 'bg-purple-500/10 text-purple-500', prompt: 'What are the best investment strategies?' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6 px-4">
        <div>
          <h2 className="text-4xl font-bold font-orbitron uppercase tracking-widest text-white">FinLitGo AI</h2>
          <p className="text-zinc-400 mt-1">Your personal financial intelligence assistant.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-[#1A1A1A] border border-zinc-800 rounded-xl text-sm font-mono">
            <span className="text-zinc-400">Daily limit: </span>
            <span className={usageCount >= MAX_DAILY_LIMIT ? 'text-red-400 font-bold' : 'text-violet-400 font-bold'}>
              {usageCount} / {MAX_DAILY_LIMIT}
            </span>
          </div>
          <button
            onClick={handleClearChat}
            className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-lg transition-colors"
            title="Clear Chat"
          >
            <IconTrash size={20} />
          </button>
        </div>
      </div>

      {messages.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(124,58,237,0.3)]">
            <IconRobot size={48} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">Hello, {user?.displayName || 'Learner'}</h3>
          <p className="text-zinc-400 text-center max-w-md mb-10">
            Ask me anything about managing money, investing, crypto, or economic trends.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4 w-full">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => handleSend(cat.prompt)}
                className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] border border-zinc-800 hover:border-violet-500/50 hover:bg-zinc-900 rounded-2xl transition-all group"
              >
                <div className={`p-4 rounded-2xl mb-4 ${cat.color} group-hover:scale-110 transition-transform`}>
                  {cat.icon}
                </div>
                <span className="font-bold text-sm text-white group-hover:text-violet-400 transition-colors">{cat.title}</span>
              </button>
            ))}
          </div>
        </motion.div>
      ) : (
        <div className="flex-1 bg-[#1A1A1A] border border-zinc-800 rounded-3xl overflow-hidden mb-6 flex flex-col relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/5 to-transparent pointer-events-none" />

          {/* Chat container — scroll target */}
          <div
            ref={chatContainerRef}
            onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 space-y-6"
            style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    msg.role === 'user' ? 'bg-zinc-800' : 'bg-gradient-to-br from-violet-600 to-purple-400'
                  }`}>
                    {msg.role === 'user' ? <IconUser size={20} className="text-zinc-400" /> : <IconRobot size={24} className="text-white" />}
                  </div>
                  <div className={`max-w-[80%] rounded-2xl p-5 ${
                    msg.role === 'user'
                      ? 'bg-zinc-800 text-white rounded-tr-none'
                      : 'bg-zinc-900/80 border border-zinc-800/50 text-zinc-300 rounded-tl-none leading-relaxed'
                  }`}>
                    {msg.role === 'user' ? msg.content : formatText(msg.content)}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-4 flex-row"
                >
                  <div className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-gradient-to-br from-violet-600 to-purple-400">
                    <IconRobot size={24} className="text-white" />
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800/50 rounded-2xl rounded-tl-none p-5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#1A1A1A] border-2 border-zinc-800 focus-within:border-violet-500/50 transition-all rounded-3xl p-2 shadow-2xl relative shrink-0"
      >
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder={usageCount >= MAX_DAILY_LIMIT ? "Daily limit reached. Try again tomorrow." : "Ask me anything about managing money, crypto, or investments..."}
          disabled={usageCount >= MAX_DAILY_LIMIT}
          className="w-full h-20 bg-transparent text-white placeholder-zinc-500 p-4 pt-4 focus:outline-none resize-none font-sans"
        />
        <div className="absolute left-6 bottom-4 flex items-center gap-2">
          <IconSparkles size={16} className="text-violet-400" />
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Powered by Gemini</span>
        </div>
        <div className="absolute right-4 bottom-4 flex items-center gap-2">
          <button
            onClick={() => handleSend()}
            disabled={!prompt.trim() || isTyping || usageCount >= MAX_DAILY_LIMIT}
            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              prompt.trim() && !isTyping && usageCount < MAX_DAILY_LIMIT
                ? 'bg-gradient-to-r from-violet-600 to-purple-400 text-white cursor-pointer shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            <IconSend size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
