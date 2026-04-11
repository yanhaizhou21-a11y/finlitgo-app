import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import {
  IconRobot, IconSend, IconSparkles, IconWallet, IconChartBar,
  IconPigMoney, IconUser, IconTrash, IconTarget, IconTrendingUp,
  IconLoader2, IconChartPie
} from '@tabler/icons-react';
import { useAuth } from '../../store/AuthContext';
import { supabase } from '../../services/supabase';

// ─── Groq config ─────────────────────────────────────────────────────────────
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_MODEL   = 'llama-3.3-70b-versatile'; // 30 RPM · 14,400 RPD · 6,000 TPM free
const GROQ_URL     = 'https://api.groq.com/openai/v1/chat/completions';
const MAX_TOKENS   = 700;   // keeps each request ≤ ~2,000 tokens total → well under TPM
const MAX_DAILY_LIMIT = 10; // per-user app-level daily cap

// ─── Intent label map ─────────────────────────────────────────────────────────
const INTENT_LABELS = {
  analyze_cashflow: 'Analyze Cash Flow',
  analyze_expenses: 'Analyze Expenses',
  analyze_revenue:  'Analyze Revenue',
  analyze_budget:   'Analyze Budget',
  free_chat:        'Chat',
};

// ─── Quick-action cards ───────────────────────────────────────────────────────
const CATEGORIES = [
  { intent: 'analyze_cashflow', title: 'Analyze Cash Flow',  icon: <IconChartBar size={22} />,  color: 'text-green-400 border-green-500/20 bg-green-500/5',  sub: 'Cashflow kamu sekarang' },
  { intent: 'analyze_expenses', title: 'Analyze Expenses',   icon: <IconChartPie size={22} />,  color: 'text-orange-400 border-orange-500/20 bg-orange-500/5', sub: 'Breakdown pengeluaran' },
  { intent: 'analyze_revenue',  title: 'Analyze Revenue',    icon: <IconTrendingUp size={22} />, color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',   sub: 'Sumber pendapatanmu' },
  { intent: 'analyze_budget',   title: 'Analyze Budget',     icon: <IconWallet size={22} />,    color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',   sub: 'Budget vs aktual 50/30/20' },
  {
    intent: 'free_chat', title: 'Saving Strategy', icon: <IconPigMoney size={22} />,
    color: 'text-violet-400 border-violet-500/20 bg-violet-500/5', sub: 'Strategi menabung',
    customPrompt: 'Berikan strategi menabung dan investasi terbaik berdasarkan data keuangan saya.',
  },
  {
    intent: 'free_chat', title: 'Goal Planning', icon: <IconTarget size={22} />,
    color: 'text-purple-400 border-purple-500/20 bg-purple-500/5', sub: 'Rencana tujuan keuangan',
    customPrompt: 'Bantu saya merencanakan cara mencapai tujuan keuangan lebih cepat berdasarkan data saya.',
  },
];

// ─── Fetch & build LEAN financial context from Supabase ───────────────────────
// Deliberately compact — keeps system prompt ≈ 500-700 tokens (Groq TPM friendly)
async function fetchFinancialContextText(userId) {
  if (!userId) return null;

  const [txRes, goalsRes, pocketsRes] = await Promise.all([
    supabase.from('transactions').select('type,amount,category').eq('user_id', userId),
    supabase.from('goals').select('name,target,current').eq('user_id', userId),
    supabase.from('pockets').select('name,balance').eq('user_id', userId),
  ]);

  const txs     = txRes.data     || [];
  const goals   = goalsRes.data  || [];
  const pockets = pocketsRes.data || [];

  const incomes  = txs.filter(t => t.type === 'income');
  const expenses = txs.filter(t => t.type === 'expense');
  const totalIn  = incomes.reduce((s, t) => s + Number(t.amount), 0);
  const totalEx  = expenses.reduce((s, t) => s + Number(t.amount), 0);
  const balance  = totalIn - totalEx;
  const savingsRate = totalIn > 0 ? Math.round(((totalIn - totalEx) / totalIn) * 100) : 0;

  const byCategory = (arr) => {
    const map = {};
    arr.forEach(t => { map[t.category || 'Lainnya'] = (map[t.category || 'Lainnya'] || 0) + Number(t.amount); });
    return Object.entries(map).sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `${k}: Rp${v.toLocaleString('id-ID')}`).join(', ') || 'none';
  };

  const goalsText = goals.length
    ? goals.map(g => {
        const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0;
        return `${g.name} (${pct}% dari Rp${Number(g.target).toLocaleString('id-ID')})`;
      }).join('; ')
    : 'belum ada';

  const pocketsText = pockets.length
    ? pockets.map(p => `${p.name}: Rp${Number(p.balance).toLocaleString('id-ID')}`).join('; ')
    : 'belum ada';

  return `RINGKASAN KEUANGAN USER:
- Saldo Utama: Rp${balance.toLocaleString('id-ID')}
- Total Pemasukan: Rp${totalIn.toLocaleString('id-ID')}
- Total Pengeluaran: Rp${totalEx.toLocaleString('id-ID')}
- Tingkat Tabungan: ${savingsRate}%
- Total Transaksi: ${txs.length}
SUMBER PEMASUKAN: ${byCategory(incomes)}
RINCIAN PENGELUARAN: ${byCategory(expenses)}
TUJUAN KEUANGAN: ${goalsText}
POCKETS: ${pocketsText}`;
}

// ─── Build system prompt (compact — target ≈ 600 tokens) ─────────────────────
function buildSystemPrompt(financialContext) {
  const data = financialContext || 'Data keuangan belum tersedia.';
  return `Kamu adalah FinLitGo AI, asisten keuangan cerdas yang tertanam di dalam dashboard FinLitGo. Kamu hanya menganalisis data keuangan yang diberikan di bawah ini. Jangan mengarang angka atau data yang tidak ada.

DATA KEUANGAN USER (satu-satunya sumber kebenaran):
${data}

ATURAN WAJIB:
1. Hanya gunakan data di atas. Jika data tidak ada, katakan: "Data untuk [X] tidak tersedia di dashboard kamu saat ini."
2. Jika pesan user mengandung tag [INTENT: analyze_cashflow] → fokus pada arus kas, pemasukan vs pengeluaran, posisi bersih.
3. [INTENT: analyze_expenses] → fokus kategori pengeluaran terbesar, anomali.
4. [INTENT: analyze_revenue] → fokus sumber pemasukan, pertumbuhan, celah.
5. [INTENT: analyze_budget] → evaluasi budget vs aktual pakai aturan 50/30/20.
6. [INTENT: free_chat] → jawab bebas berdasarkan konteks keuangan.
7. Respons: 3–5 poin singkat. Selalu akhiri dengan SATU rekomendasi aksi.
8. Bahasa: ikuti bahasa user (Indonesia atau Inggris). Jangan gunakan tabel kecuali diminta.
9. Jangan ulangi JSON/data mentah ke user. Jangan bilang "sebagai AI...".`;
}

// ─── Markdown → JSX renderer ─────────────────────────────────────────────────
function renderText(text) {
  return text.split('\n').map((line, i) => {
    if (!line.trim()) return <span key={i} className="block mb-1" />;
    const parts = line.split(/(\*\*.*?\*\*)/g);
    return (
      <span key={i} className="block mb-1.5 leading-relaxed">
        {parts.map((part, j) =>
          part.startsWith('**') && part.endsWith('**')
            ? <strong key={j} className="text-white font-semibold">{part.slice(2, -2)}</strong>
            : part
        )}
      </span>
    );
  });
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AIAssistPage() {
  const { user } = useAuth();
  const userId   = user?.id || null;
  const [searchParams] = useSearchParams();

  const chatKey  = `finlitgo_ai_chat_${userId}`;
  const usageKey = `finlitgo_ai_usage_${userId}`;

  const [prompt, setPrompt]       = useState('');
  const [isTyping, setIsTyping]   = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [financialContext, setFinancialContext] = useState(null);
  const [messages, setMessages]   = useState(() => {
    if (!userId) return [];
    try { const s = localStorage.getItem(`finlitgo_ai_chat_${userId}`); return s ? JSON.parse(s) || [] : []; }
    catch { return []; }
  });
  const [usageCount, setUsageCount] = useState(0);

  // Groq needs full message history sent each request
  const chatHistoryRef   = useRef([]); // [{role, content}]
  const chatContainerRef = useRef(null);
  const isAtBottomRef    = useRef(true);
  const autoTriggeredRef = useRef(false);
  const financialCtxRef  = useRef(null); // sync ref for handlers

  // ── Load Supabase financial data ──────────────────────────────────────────
  useEffect(() => {
    if (!userId) return;
    setDataLoading(true);
    fetchFinancialContextText(userId)
      .then(ctx => { setFinancialContext(ctx); financialCtxRef.current = ctx; })
      .catch(err => console.error('AI: data fetch failed', err))
      .finally(() => setDataLoading(false));
  }, [userId]);

  // ── Daily usage limit ─────────────────────────────────────────────────────
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    try {
      const saved = localStorage.getItem(usageKey);
      if (saved) {
        const p = JSON.parse(saved);
        setUsageCount(p.date === today ? p.count : 0);
        if (p.date !== today) localStorage.setItem(usageKey, JSON.stringify({ date: today, count: 0 }));
      } else {
        localStorage.setItem(usageKey, JSON.stringify({ date: today, count: 0 }));
      }
    } catch { /* noop */ }
  }, [usageKey]);

  const incrementUsage = () => {
    const today = new Date().toISOString().split('T')[0];
    const next  = usageCount + 1;
    setUsageCount(next);
    localStorage.setItem(usageKey, JSON.stringify({ date: today, count: next }));
  };

  // ── Persist display messages ──────────────────────────────────────────────
  useEffect(() => {
    if (userId) localStorage.setItem(chatKey, JSON.stringify(messages));
  }, [messages, chatKey, userId]);

  useEffect(() => {
    try {
      const s = localStorage.getItem(chatKey);
      setMessages(s ? JSON.parse(s) || [] : []);
    } catch { setMessages([]); }
    chatHistoryRef.current = [];
  }, [chatKey]);

  // ── Scroll ────────────────────────────────────────────────────────────────
  const scrollToBottom = useCallback((force = false) => {
    const el = chatContainerRef.current;
    if (!el) return;
    if (force || isAtBottomRef.current) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, []);

  const handleScroll = useCallback(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    isAtBottomRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
  }, []);

  useEffect(() => { scrollToBottom(); }, [messages.length, scrollToBottom]);

  // ── Core send via Groq streaming ──────────────────────────────────────────
  const handleSend = useCallback(async (overridePrompt = null, intentTag = null) => {
    const raw = overridePrompt || prompt;
    if (!raw.trim() || isTyping) return;
    if (usageCount >= MAX_DAILY_LIMIT) { alert('Daily limit 10 chat sudah habis. Coba lagi besok.'); return; }
    if (!GROQ_API_KEY) { alert('Groq API key belum dikonfigurasi.'); return; }

    const wireText    = intentTag ? `[INTENT: ${intentTag}] ${raw}` : raw;
    const displayText = intentTag ? (INTENT_LABELS[intentTag] || raw) : raw;

    setPrompt('');
    setIsTyping(true);
    isAtBottomRef.current = true;

    // Add user to display + history
    setMessages(prev => [...prev, { role: 'user', content: displayText }]);
    chatHistoryRef.current.push({ role: 'user', content: wireText });

    // Prepare empty assistant bubble
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    setIsTyping(false);
    requestAnimationFrame(() => scrollToBottom(true));

    try {
      const systemPrompt = buildSystemPrompt(financialCtxRef.current);

      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model:       GROQ_MODEL,
          messages:    [{ role: 'system', content: systemPrompt }, ...chatHistoryRef.current],
          stream:      true,
          temperature: 0.65,
          max_tokens:  MAX_TOKENS,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        const msg = errData?.error?.message || `Groq error ${res.status}`;
        throw new Error(msg);
      }

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText  = '';
      let lastScroll = 0;

      // eslint-disable-next-line no-constant-condition
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder.decode(value).split('\n');
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (data === '[DONE]') break;
          try {
            const token = JSON.parse(data)?.choices?.[0]?.delta?.content || '';
            fullText += token;
            setMessages(prev => {
              const updated = [...prev];
              updated[updated.length - 1] = { ...updated[updated.length - 1], content: fullText };
              return updated;
            });
            const now = Date.now();
            if (now - lastScroll > 100) { lastScroll = now; requestAnimationFrame(() => scrollToBottom()); }
          } catch { /* partial chunk, skip */ }
        }
      }

      // Add assistant response to history
      chatHistoryRef.current.push({ role: 'assistant', content: fullText });
      requestAnimationFrame(() => scrollToBottom(true));
      incrementUsage();

    } catch (err) {
      console.error('Groq error:', err);
      const errMsg = err.message?.includes('rate_limit') || err.message?.includes('429')
        ? 'Request terlalu banyak dalam 1 menit. Tunggu sebentar ya ⏳'
        : 'Maaf, ada gangguan koneksi. Coba lagi sebentar ya 🙏';
      setMessages(prev => {
        const updated = [...prev];
        if (updated.length > 0 && updated[updated.length - 1].content === '') updated.pop();
        return [...updated, { role: 'assistant', content: errMsg }];
      });
      chatHistoryRef.current.pop(); // remove failed user message from history
    } finally {
      setIsTyping(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prompt, isTyping, usageCount, scrollToBottom]);

  // ── URL auto-trigger (from Financial page shortcuts) ──────────────────────
  useEffect(() => {
    const intentParam = searchParams.get('intent');
    if (!intentParam || autoTriggeredRef.current || dataLoading) return;
    if (!financialContext) return;

    autoTriggeredRef.current = true;

    const autoPrompts = {
      analyze_cashflow: 'Analisis posisi kas saya: pemasukan vs pengeluaran, tren, dan rekomendasi.',
      analyze_expenses:  'Analisis pengeluaran saya per kategori, temukan yang terbesar dan berikan saran.',
      analyze_revenue:   'Analisis sumber pendapatan saya dan berikan saran optimasi.',
      analyze_budget:    'Evaluasi budget saya dengan aturan 50/30/20 dan tunjukkan over/under-spending.',
    };

    const p = autoPrompts[intentParam];
    if (p) setTimeout(() => handleSend(p, intentParam), 500);
  }, [searchParams, dataLoading, financialContext, handleSend]);

  const handleClearChat = () => {
    setMessages([]);
    chatHistoryRef.current = [];
    autoTriggeredRef.current = false;
    if (userId) localStorage.removeItem(chatKey);
  };

  const limitReached = usageCount >= MAX_DAILY_LIMIT;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto py-8 px-4">

      {/* Header */}
      <div className="flex justify-between items-center mb-6 px-1">
        <div>
          <h2 className="text-4xl font-bold font-orbitron uppercase tracking-widest text-white">FinLitGo AI</h2>
          <p className="text-zinc-400 mt-1 text-sm">Your personal financial intelligence assistant.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Data sync status */}
          {dataLoading ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-[#1A1A1A] border border-zinc-800 rounded-xl text-xs text-zinc-500">
              <IconLoader2 size={14} className="animate-spin" /><span>Loading data...</span>
            </div>
          ) : financialContext ? (
            <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-xs text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" /><span>Data synced</span>
            </div>
          ) : null}

          {/* Daily counter */}
          <div className="px-4 py-2 bg-[#1A1A1A] border border-zinc-800 rounded-xl text-sm font-mono">
            <span className="text-zinc-400">Limit: </span>
            <span className={limitReached ? 'text-red-400 font-bold' : 'text-violet-400 font-bold'}>
              {usageCount}/{MAX_DAILY_LIMIT}
            </span>
          </div>

          <button onClick={handleClearChat} className="p-2.5 text-zinc-500 hover:text-red-400 hover:bg-zinc-900 rounded-xl transition-colors border border-zinc-800" title="Clear Chat">
            <IconTrash size={18} />
          </button>
        </div>
      </div>

      {/* Empty state — quick-action grid */}
      {messages.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="flex-1 flex flex-col items-center justify-center mb-6 px-2">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-400 flex items-center justify-center mb-5 shadow-[0_0_40px_rgba(124,58,237,0.35)]">
            <IconRobot size={40} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Halo, {user?.user_metadata?.full_name?.split(' ')[0] || 'Learner'} 👋
          </h3>
          <p className="text-zinc-400 text-center max-w-md mb-10 text-sm leading-relaxed">
            Saya bisa menganalisis cashflow, pengeluaran, budgeting, dan membantu merencanakan tujuan keuanganmu — semua berdasarkan data real dari dashboard kamu.
          </p>

          {!userId ? (
            <p className="text-sm text-zinc-500 border border-zinc-800 rounded-xl px-4 py-3">Login dulu untuk pakai AI 🔒</p>
          ) : dataLoading ? (
            <div className="flex items-center gap-2 text-zinc-500 text-sm">
              <IconLoader2 size={16} className="animate-spin" /> Memuat data keuangan...
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-3xl">
              {CATEGORIES.map((cat, i) => (
                <motion.button key={i}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  onClick={() => handleSend(cat.customPrompt || cat.title, cat.intent)}
                  disabled={limitReached}
                  className={`flex flex-col items-start text-left p-5 border rounded-2xl transition-all group hover:-translate-y-0.5 hover:shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${cat.color}`}
                >
                  <div className={`p-3 rounded-xl mb-3 border ${cat.color} group-hover:scale-110 transition-transform`}>
                    {cat.icon}
                  </div>
                  <span className="font-semibold text-sm text-white group-hover:text-violet-300 transition-colors">{cat.title}</span>
                  <span className="text-[11px] text-zinc-500 mt-0.5">{cat.sub}</span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        /* Chat thread */
        <div className="flex-1 bg-[#1A1A1A] border border-zinc-800 rounded-3xl overflow-hidden mb-6 flex flex-col relative">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-900/5 to-transparent pointer-events-none rounded-3xl" />
          <div ref={chatContainerRef} onScroll={handleScroll}
            className="flex-1 overflow-y-auto p-6 space-y-5"
            style={{ scrollBehavior: 'smooth', overscrollBehavior: 'contain' }}>
            <AnimatePresence initial={false}>
              {messages.map((msg, idx) => (
                <motion.div key={idx}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-md ${
                    msg.role === 'user' ? 'bg-zinc-800' : 'bg-gradient-to-br from-violet-600 to-purple-400'}`}>
                    {msg.role === 'user' ? <IconUser size={18} className="text-zinc-400" /> : <IconRobot size={20} className="text-white" />}
                  </div>
                  <div className={`max-w-[78%] rounded-2xl px-5 py-4 text-sm ${
                    msg.role === 'user'
                      ? 'bg-zinc-800 text-white rounded-tr-sm'
                      : 'bg-zinc-900/80 border border-zinc-800/60 text-zinc-300 rounded-tl-sm'}`}>
                    {msg.role === 'user'
                      ? msg.content
                      : msg.content
                        ? renderText(msg.content)
                        : <span className="flex gap-1.5 items-center py-1">
                            {[0, 150, 300].map(d => <span key={d} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                          </span>
                    }
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex gap-3">
                  <div className="shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-purple-400 shadow-md">
                    <IconRobot size={20} className="text-white" />
                  </div>
                  <div className="bg-zinc-900/80 border border-zinc-800/60 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1.5">
                    {[0, 150, 300].map(d => <div key={d} className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}

      {/* Input bar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="w-full bg-[#1A1A1A] border-2 border-zinc-800 focus-within:border-violet-500/40 transition-all rounded-3xl p-2 shadow-2xl shrink-0">
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
          placeholder={
            !userId ? 'Login untuk menggunakan AI...'
            : limitReached ? 'Daily limit 10 sudah habis. Coba lagi besok.'
            : dataLoading ? 'Memuat data keuangan...'
            : 'Tanya tentang keuanganmu... (Enter kirim · Shift+Enter baris baru)'
          }
          disabled={limitReached || !userId || dataLoading}
          rows={2}
          className="w-full bg-transparent text-white placeholder-zinc-600 p-4 pb-2 focus:outline-none resize-none font-sans text-sm leading-relaxed"
        />
        <div className="flex items-center justify-between px-4 pb-3 pt-1">
          <div className="flex items-center gap-2">
            <IconSparkles size={14} className="text-violet-400" />
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-widest">
              Powered by Groq · Llama 3.3 · Data from Supabase
            </span>
          </div>
          <button
            onClick={() => handleSend()}
            disabled={!prompt.trim() || isTyping || limitReached || !userId || dataLoading}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              prompt.trim() && !isTyping && !limitReached && userId && !dataLoading
                ? 'bg-gradient-to-r from-violet-600 to-purple-400 text-white shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:scale-105 cursor-pointer'
                : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}>
            <IconSend size={16} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
