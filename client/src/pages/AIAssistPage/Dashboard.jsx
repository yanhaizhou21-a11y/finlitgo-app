import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconRobot, IconSend, IconSparkles, IconWallet, IconChartBar, IconPigMoney, IconUser, IconTrash, IconTarget } from '@tabler/icons-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { useAuth } from '../../store/AuthContext';

// FinLitGo SDK Config — model instance created once outside component
const GEMINI_API_KEY = "AIzaSyCsdlQ_tIjcepfmuHiB30kkRC1b2Nt4QWQ";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const geminiModel = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  },
});
const MAX_DAILY_LIMIT = 10;

export default function AIAssistPage() {
  const { user } = useAuth();
  const userId = user?.id || 'guest';

  // Per-user keys
  const chatKey = `finlitgo_ai_chat_${userId}`;
  const usageKey = `finlitgo_ai_usage_${userId}`;

  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => {
    const savedMsg = localStorage.getItem(chatKey);
    if (savedMsg) {
      try {
        const parsed = JSON.parse(savedMsg);
        return Array.isArray(parsed) ? parsed : (parsed.data || []);
      } catch (_) {}
    }
    return [];
  });
  const [usageCount, setUsageCount] = useState(0);

  // Refs
  const chatContainerRef = useRef(null);
  const chatSessionRef = useRef(null);
  const isAtBottomRef = useRef(true);

  // ───────────────────────────────────────────
  // Build rich system instruction with user's cashflow data
  // ───────────────────────────────────────────
  const buildSystemInstruction = useCallback(() => {
    const txs = JSON.parse(localStorage.getItem(`finlitgo_transactions_${userId}`) || '[]');
    const goals = JSON.parse(localStorage.getItem(`finlitgo_goals_${userId}`) || '[]');
    const pockets = JSON.parse(localStorage.getItem(`finlitgo_pockets_${userId}`) || '[]');

    const incomes = txs.filter(t => t.type === 'income');
    const expenses = txs.filter(t => t.type === 'expense');
    const totalIncome = incomes.reduce((s, t) => s + t.amount, 0);
    const totalExpense = expenses.reduce((s, t) => s + t.amount, 0);
    const mainBalance = totalIncome - totalExpense;

    // Category breakdown
    const expenseByCategory = {};
    expenses.forEach(t => {
      const cat = t.category || 'Lainnya';
      expenseByCategory[cat] = (expenseByCategory[cat] || 0) + t.amount;
    });
    const categoryBreakdown = Object.entries(expenseByCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => `${cat}: Rp${amt.toLocaleString('id-ID')}`)
      .join(', ') || 'none';

    const incomeByCategory = {};
    incomes.forEach(t => {
      const cat = t.category || 'Lainnya';
      incomeByCategory[cat] = (incomeByCategory[cat] || 0) + t.amount;
    });
    const incomeBreakdown = Object.entries(incomeByCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([cat, amt]) => `${cat}: Rp${amt.toLocaleString('id-ID')}`)
      .join(', ') || 'none';

    const goalsText = goals.length > 0
      ? goals.map(g => `${g.name} (Rp${g.current.toLocaleString('id-ID')}/${g.target.toLocaleString('id-ID')} — ${Math.round((g.current / g.target) * 100)}%)`).join('; ')
      : 'belum ada goals';
    const pocketsText = pockets.length > 0
      ? pockets.map(p => `${p.name}: Rp${p.balance.toLocaleString('id-ID')}`).join('; ')
      : 'belum ada pockets';

    const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;

    return `You are FinLitGo AI, a smart and friendly Indonesian financial literacy assistant for Gen Z users. You give concise, actionable, and encouraging financial advice in a casual tone.

CRITICAL: Always respond in the SAME LANGUAGE the user uses. If they write in Indonesian, respond in Indonesian. If English, respond in English.

USER'S FINANCIAL DATA:
- Main Balance: Rp${mainBalance.toLocaleString('id-ID')}
- Total Income: Rp${totalIncome.toLocaleString('id-ID')} (${incomeBreakdown})
- Total Expenses: Rp${totalExpense.toLocaleString('id-ID')} (${categoryBreakdown})
- Savings Rate: ${savingsRate}%
- Pockets: ${pocketsText}
- Financial Goals: ${goalsText}
- Total Transactions: ${txs.length}

GUIDELINES:
- When analyzing cashflow, point out spending patterns, suggest improvements
- For budgeting advice, reference the 50/30/20 rule adapted to their situation
- If savings rate < 20%, gently encourage more saving
- If they have goals, suggest strategies to reach them faster
- Be concise — keep responses under 300 words unless they ask for detail
- Use **bold** for key numbers and important tips
- Use emojis sparingly to keep it friendly 💰`;
  }, [userId]);

  const startNewChatSession = useCallback(() => {
    chatSessionRef.current = geminiModel.startChat({
      history: [],
      systemInstruction: buildSystemInstruction(),
    });
  }, [buildSystemInstruction]);

  // Start new session on mount or user change
  useEffect(() => {
    startNewChatSession();
  }, [startNewChatSession]);

  // ───────────────────────────────────────────
  // Daily limit check (per-user)
  // ───────────────────────────────────────────
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const savedData = localStorage.getItem(usageKey);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        if (parsed.date === today) {
          setUsageCount(parsed.count);
        } else {
          localStorage.setItem(usageKey, JSON.stringify({ date: today, count: 0 }));
          setUsageCount(0);
        }
      } catch (_) {}
    } else {
      localStorage.setItem(usageKey, JSON.stringify({ date: today, count: 0 }));
    }
  }, [usageKey]);

  const incrementUsage = () => {
    const today = new Date().toISOString().split('T')[0];
    const newCount = usageCount + 1;
    setUsageCount(newCount);
    localStorage.setItem(usageKey, JSON.stringify({ date: today, count: newCount }));
  };

  // Sync messages to per-user localStorage
  useEffect(() => {
    localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages, chatKey]);

  // Reload messages when user changes
  useEffect(() => {
    const savedMsg = localStorage.getItem(chatKey);
    if (savedMsg) {
      try {
        const parsed = JSON.parse(savedMsg);
        setMessages(Array.isArray(parsed) ? parsed : []);
      } catch (_) {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
  }, [chatKey]);

  // ───────────────────────────────────────────
  // Smooth scroll
  // ───────────────────────────────────────────
  const scrollToBottom = useCallback((force = false) => {
    const container = chatContainerRef.current;
    if (!container) return;
    if (force || isAtBottomRef.current) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;
    const threshold = 80;
    isAtBottomRef.current =
      container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, scrollToBottom]);

  // ───────────────────────────────────────────
  // Send message handler
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
    isAtBottomRef.current = true;

    setMessages(prev => [...prev, { role: 'user', content: textToSend }]);

    // Ensure session is active
    if (!chatSessionRef.current) startNewChatSession();

    try {
      // Pre-add empty assistant message for streaming
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
      setIsTyping(false);

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

        const now = Date.now();
        if (now - lastScrollTime > 120) {
          lastScrollTime = now;
          requestAnimationFrame(() => scrollToBottom());
        }
      }

      requestAnimationFrame(() => scrollToBottom(true));
      incrementUsage();
    } catch (error) {
      console.error("AI Error:", error);
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
    localStorage.removeItem(chatKey);
    startNewChatSession();
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

  // Finance-relevant quick action categories
  const categories = [
    { title: 'Analyze Cashflow', icon: <IconChartBar size={20} />, color: 'bg-green-500/10 text-green-500', prompt: 'Analyze my current cashflow. Look at my income vs spending breakdown, identify my biggest expense categories, and give me actionable tips to improve my financial health.' },
    { title: 'Budgeting Tips', icon: <IconWallet size={20} />, color: 'bg-blue-500/10 text-blue-500', prompt: 'Based on my current financial data, help me create a practical monthly budget using the 50/30/20 rule. Give me specific suggestions for my situation.' },
    { title: 'Saving Strategy', icon: <IconPigMoney size={20} />, color: 'bg-violet-500/10 text-violet-400', prompt: 'Suggest the best saving and investing strategies for my current financial situation. Consider my income, expenses, goals, and pockets.' },
    { title: 'Goal Planning', icon: <IconTarget size={20} />, color: 'bg-purple-500/10 text-purple-500', prompt: 'Help me plan how to reach my financial goals faster. Calculate how long it will take at my current savings rate and suggest ways to accelerate.' }
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
          <h3 className="text-2xl font-bold text-white mb-2">Hello, {user?.user_metadata?.full_name || 'Learner'}</h3>
          <p className="text-zinc-400 text-center max-w-md mb-10">
            I can analyze your cashflow, give budgeting tips, and help you plan your financial goals. Try one of the quick actions below!
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
          placeholder={usageCount >= MAX_DAILY_LIMIT ? "Daily limit reached. Try again tomorrow." : "Ask me anything about your finances, budgeting, or investments..."}
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
