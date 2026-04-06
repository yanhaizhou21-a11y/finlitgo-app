import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  IconArrowLeft, IconChevronDown, IconChevronRight, IconChevronLeft,
  IconCheck, IconMenu2, IconX, IconBookmark, IconClock, IconTrophy,
  IconStar, IconPlayerPlay, IconLock, IconLoader2,
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import { recordStudyActivity } from '../../utils/streak';
import { CLASS_META, CLASS_LEVELS } from '../../data/classContent';
import { useAuth } from '../../store/AuthContext';
import QuizEngine from '../../components/Class/QuizEngine';
import QuizLanding from '../../components/Class/QuizLanding';

// ── Helpers (keys include userId for per-user isolation) ──
const progressKey = (userId, id) => `finlitgo_progress_${userId}_class_${id}`;
const quizHistKey = (userId, id) => `finlitgo_quiz_history_${userId}_class_${id}`;
const levelUnlockKey = (userId, id) => `finlitgo_level_unlocks_${userId}_class_${id}`;

function loadSet(key) { try { return new Set(JSON.parse(localStorage.getItem(key) || '[]')); } catch { return new Set(); } }
function saveSet(key, s) { localStorage.setItem(key, JSON.stringify([...s])); }
function loadJSON(key, fallback) { try { const r = localStorage.getItem(key); return r ? JSON.parse(r) : fallback; } catch { return fallback; } }
function saveJSON(key, v) { localStorage.setItem(key, JSON.stringify(v)); }

// ── Confetti ──
function ConfettiParticle({ delay }) {
  const colors = ['#a78bfa','#c084fc','#34d399','#fbbf24','#f472b6','#60a5fa'];
  const c = colors[Math.floor(Math.random()*colors.length)];
  const l = Math.random()*100, s = 6+Math.random()*8, d = 2+Math.random()*2;
  return (
    <motion.div
      initial={{ y:-20, x:0, opacity:1, rotate:0 }}
      animate={{ y:[0,400,800], x:[0,(Math.random()-0.5)*200], opacity:[1,1,0], rotate:[0,360*(Math.random()>0.5?1:-1)] }}
      transition={{ duration:d, delay, ease:'easeOut' }}
      style={{ position:'absolute', top:0, left:`${l}%`, width:s, height:s, backgroundColor:c, borderRadius: Math.random()>0.5?'50%':'2px' }}
    />
  );
}

// ── Main Component ──
export default function ClassDetailPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user?.uid || 'guest';
  const classMeta = CLASS_META[moduleId] || CLASS_META[1];
  const levels = CLASS_LEVELS[moduleId] || CLASS_LEVELS[1];

  // State
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openLevels, setOpenLevels] = useState({ 'level-1': true });
  const [activeItemId, setActiveItemId] = useState(null);
  const [completed, setCompleted] = useState(() => loadSet(progressKey(userId, moduleId)));
  const [unlockedLevels, setUnlockedLevels] = useState(() => loadSet(levelUnlockKey(userId, moduleId)));
  const [quizHistory, setQuizHistory] = useState(() => loadJSON(quizHistKey(userId, moduleId), {}));
  const [readingProgress, setReadingProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  // Quiz flow states
  const [quizLandingData, setQuizLandingData] = useState(null); // { quiz, levelId, type }
  const [activeQuiz, setActiveQuiz] = useState(null); // { questions, levelId, type, quizId }

  const contentRef = useRef(null);

  // Ensure level-1 always unlocked
  useEffect(() => {
    if (!unlockedLevels.has('level-1')) {
      const next = new Set(unlockedLevels);
      next.add('level-1');
      setUnlockedLevels(next);
      saveSet(levelUnlockKey(userId, moduleId), next);
    }
  }, [moduleId, userId]);

  // Set initial active item
  useEffect(() => {
    if (!activeItemId) {
      const firstLesson = levels[0]?.items?.find(i => i.type === 'lesson');
      if (firstLesson) setActiveItemId(firstLesson.id);
    }
  }, [levels]);

  // Reload on moduleId/user change
  useEffect(() => {
    setCompleted(loadSet(progressKey(userId, moduleId)));
    setUnlockedLevels(loadSet(levelUnlockKey(userId, moduleId)));
    setQuizHistory(loadJSON(quizHistKey(userId, moduleId), {}));
    setActiveItemId(null);
    setOpenLevels({ 'level-1': true });
    setQuizLandingData(null);
    setActiveQuiz(null);
  }, [moduleId, userId]);

  useEffect(() => { recordStudyActivity(); }, []);

  // Scroll progress
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const h = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setReadingProgress(scrollHeight <= clientHeight ? 100 : Math.round((scrollTop/(scrollHeight-clientHeight))*100));
    };
    el.addEventListener('scroll', h);
    return () => el.removeEventListener('scroll', h);
  }, [activeItemId]);

  // ── Derived ──
  const isLevelUnlocked = (lvlId) => unlockedLevels.has(lvlId);
  const getLevelIndex = (lvlId) => levels.findIndex(l => l.id === lvlId);

  // Flatten all lesson items for current level navigation
  const currentLevel = levels.find(l => l.items.some(it => it.id === activeItemId));
  const currentLevelItems = currentLevel?.items || [];
  const activeItem = currentLevelItems.find(it => it.id === activeItemId);
  const activeItemIndex = currentLevelItems.findIndex(it => it.id === activeItemId);

  // Check if an item is accessible (previous items in same level must be completed)
  const isItemAccessible = (levelId, itemId) => {
    if (!isLevelUnlocked(levelId)) return false;
    const level = levels.find(l => l.id === levelId);
    if (!level) return false;
    const idx = level.items.findIndex(i => i.id === itemId);
    if (idx === 0) return true;
    // All previous items must be completed
    for (let i = 0; i < idx; i++) {
      if (!completed.has(level.items[i].id)) return false;
    }
    return true;
  };

  // Get level completion status
  const getLevelStatus = (level) => {
    if (!isLevelUnlocked(level.id)) return 'locked';
    const allItems = level.items;
    const allDone = allItems.every(i => completed.has(i.id));
    const finalDone = quizHistory[level.finalQuiz.id]?.some(a => a.status === 'Lulus');
    if (allDone && finalDone) return 'complete';
    if (allItems.some(i => completed.has(i.id))) return 'in-progress';
    return 'not-started';
  };

  // Count completed items across all levels
  const totalItems = levels.reduce((sum, l) => sum + l.items.length, 0);
  const completedCount = levels.reduce((sum, l) => sum + l.items.filter(i => completed.has(i.id)).length, 0);
  const progressPercent = Math.round((completedCount / totalItems) * 100);

  // ── Actions ──
  const markComplete = (itemId) => {
    const next = new Set(completed);
    next.add(itemId);
    setCompleted(next);
    saveSet(progressKey(userId, moduleId), next);
  };

  const selectItem = (item, levelId) => {
    if (!isItemAccessible(levelId, item.id)) return;
    if (item.type === 'in-lesson-quiz') {
      // Show quiz landing for in-lesson quiz
      setQuizLandingData({
        quiz: { title: item.title, description: 'Quick check! Jawab pertanyaan ini untuk melanjutkan ke materi berikutnya.', questionCount: item.questions.length, duration: '1 menit' },
        questions: item.questions,
        levelId, type: 'in-lesson', quizId: item.id,
      });
      setActiveItemId(item.id);
    } else {
      setQuizLandingData(null);
      setActiveQuiz(null);
      setActiveItemId(item.id);
    }
  };

  const openFinalQuizLanding = (level) => {
    // Check all items in level are completed
    const allDone = level.items.every(i => completed.has(i.id));
    if (!allDone) return;
    setQuizLandingData({
      quiz: level.finalQuiz,
      questions: level.finalQuiz.questions,
      levelId: level.id, type: 'final', quizId: level.finalQuiz.id,
    });
    setActiveItemId(null);
  };

  const startQuiz = () => {
    if (!quizLandingData) return;
    setActiveQuiz({
      questions: quizLandingData.questions,
      levelId: quizLandingData.levelId,
      type: quizLandingData.type,
      quizId: quizLandingData.quizId,
    });
    setQuizLandingData(null);
  };

  const handleQuizComplete = (score, total) => {
    if (!activeQuiz) return;
    const pct = Math.round((score / total) * 100);
    const passed = pct >= 60;
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

    // Save history
    const hist = { ...quizHistory };
    if (!hist[activeQuiz.quizId]) hist[activeQuiz.quizId] = [];
    hist[activeQuiz.quizId].push({ date: dateStr, percentage: pct, status: passed ? 'Lulus' : 'Gagal' });
    setQuizHistory(hist);
    saveJSON(quizHistKey(userId, moduleId), hist);

    if (passed) {
      markComplete(activeQuiz.quizId);

      if (activeQuiz.type === 'final') {
        const lvlIdx = getLevelIndex(activeQuiz.levelId);
        if (lvlIdx < levels.length - 1) {
          // Unlock next level
          const nextLvl = levels[lvlIdx + 1];
          const next = new Set(unlockedLevels);
          next.add(nextLvl.id);
          setUnlockedLevels(next);
          saveSet(levelUnlockKey(userId, moduleId), next);
          setOpenLevels(prev => ({ ...prev, [nextLvl.id]: true }));
          // Auto-navigate to first item of next level
          const firstItem = nextLvl.items[0];
          if (firstItem) {
            setActiveQuiz(null);
            setQuizLandingData(null);
            setActiveItemId(firstItem.id);
            return;
          }
        }
        // If last level final quiz passed
        if (lvlIdx === levels.length - 1) {
          setShowCelebration(true);
        }
      }
    }

    setActiveQuiz(null);
  };

  // Navigate within level
  const goNext = () => {
    if (activeItemIndex < currentLevelItems.length - 1) {
      markComplete(activeItemId);
      const next = currentLevelItems[activeItemIndex + 1];
      selectItem(next, currentLevel.id);
    } else {
      // Last item in level → mark complete
      markComplete(activeItemId);
    }
  };

  const goPrev = () => {
    if (activeItemIndex > 0) {
      const prev = currentLevelItems[activeItemIndex - 1];
      selectItem(prev, currentLevel.id);
    }
  };

  // ── Quiz Full-screen ──
  if (activeQuiz) {
    return <QuizEngine questions={activeQuiz.questions} onComplete={handleQuizComplete} />;
  }

  return (
    <div className="flex min-h-[calc(100vh-80px)] bg-[#0a0a0a] text-white relative">

      {/* Reading Progress */}
      <div className="fixed top-[80px] left-0 right-0 z-50 h-1 bg-transparent">
        <motion.div className="h-full bg-gradient-to-r from-violet-600 via-purple-400 to-fuchsia-400" style={{ width:`${readingProgress}%` }} transition={{ duration:0.1 }} />
      </div>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div key="backdrop" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden" />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ── */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside key="sidebar"
            initial={{ width:0, opacity:0 }} animate={{ width:340, opacity:1 }} exit={{ width:0, opacity:0 }}
            transition={{ type:'spring', stiffness:300, damping:30 }}
            className="shrink-0 overflow-hidden border-r border-zinc-800 bg-[#111111] flex flex-col fixed lg:relative z-40 h-[calc(100vh-80px)]" style={{ overflowY:'auto' }}
          >
            <div className="w-[340px] flex flex-col h-full min-h-0">
              {/* Sidebar Header */}
              <div className="p-5 border-b border-zinc-800">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={() => navigate('/class')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm">
                    <IconArrowLeft size={16} /> Kembali
                  </button>
                  <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-lg hover:bg-zinc-800 text-zinc-400">
                    <IconX size={18} />
                  </button>
                </div>
                <h2 className="text-sm font-bold text-white font-orbitron leading-snug mb-1">{classMeta.title}</h2>
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3].map(s => <IconStar key={s} size={12} className={s<=classMeta.difficulty?'text-yellow-400 fill-yellow-400':'text-zinc-600'} />)}
                  <span className="text-xs text-zinc-500 ml-1">{classMeta.category}</span>
                </div>

                {/* Overall Progress */}
                <div className="bg-[#1a1a2e] border border-violet-500/30 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2"><IconTrophy size={16} className="text-yellow-400" /><span className="text-xs text-zinc-400">Progress Keseluruhan</span></div>
                    <span className="text-xs font-bold font-mono text-violet-300">{completedCount}/{totalItems}</span>
                  </div>
                  <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                    <motion.div className="h-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-full" initial={{ width:0 }} animate={{ width:`${progressPercent}%` }} transition={{ duration:0.6 }} />
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">{progressPercent}% selesai</p>
                </div>
              </div>

              {/* Level Accordions */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {levels.map((level, li) => {
                  const isOpen = !!openLevels[level.id];
                  const unlocked = isLevelUnlocked(level.id);
                  const status = getLevelStatus(level);
                  const allItemsDone = level.items.every(i => completed.has(i.id));
                  const finalPassed = quizHistory[level.finalQuiz.id]?.some(a => a.status === 'Lulus');

                  return (
                    <div key={level.id} className={`rounded-xl overflow-hidden border ${unlocked ? 'border-zinc-800/80' : 'border-zinc-800/40 opacity-60'}`}>
                      {/* Level Header */}
                      <button
                        onClick={() => unlocked && setOpenLevels(prev => ({ ...prev, [level.id]: !prev[level.id] }))}
                        className={`w-full flex items-center justify-between px-4 py-3.5 text-left transition-colors ${unlocked ? 'bg-zinc-900 hover:bg-zinc-800/80 cursor-pointer' : 'bg-zinc-900/50 cursor-not-allowed'}`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                            status === 'complete' ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : status === 'locked' ? 'bg-zinc-800/50 text-zinc-600 border border-zinc-700/50'
                            : status === 'in-progress' ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                            : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                          }`}>
                            {status === 'complete' ? <IconCheck size={14} /> : status === 'locked' ? <IconLock size={14} /> : li + 1}
                          </div>
                          <div className="min-w-0">
                            <span className="text-sm font-semibold text-white leading-tight block truncate">{level.title}</span>
                            <span className="text-[10px] text-zinc-500">{level.items.length} materi · {level.finalQuiz.questionCount} soal quiz</span>
                          </div>
                        </div>
                        {unlocked && (
                          <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration:0.2 }}>
                            <IconChevronDown size={16} className="text-zinc-500" />
                          </motion.div>
                        )}
                      </button>

                      {/* Items */}
                      <AnimatePresence initial={false}>
                        {isOpen && unlocked && (
                          <motion.div key="items" initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:0.25 }} className="overflow-hidden">
                            {level.items.map((item) => {
                              const isActive = activeItemId === item.id;
                              const isDone = completed.has(item.id);
                              const accessible = isItemAccessible(level.id, item.id);
                              const isQuiz = item.type === 'in-lesson-quiz';

                              return (
                                <button key={item.id}
                                  onClick={() => accessible && selectItem(item, level.id)}
                                  className={`w-full flex items-center gap-3 px-4 py-3 text-left border-t border-zinc-800/60 transition-all ${
                                    !accessible ? 'opacity-40 cursor-not-allowed'
                                    : isActive ? 'bg-violet-600/20 border-l-2 border-l-violet-500'
                                    : 'hover:bg-zinc-800/50 cursor-pointer'
                                  }`}
                                >
                                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                    isDone ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                    : !accessible ? 'bg-zinc-800/50 text-zinc-700 border border-zinc-700/50'
                                    : isActive ? 'bg-violet-500/30 border border-violet-500/50'
                                    : 'bg-zinc-800 border border-zinc-700'
                                  }`}>
                                    {isDone ? <IconCheck size={11} /> : !accessible ? <IconLock size={9} /> : isActive ? <div className="w-2 h-2 rounded-full bg-violet-400" /> : null}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className={`text-xs font-medium truncate ${isActive ? 'text-violet-300' : isDone ? 'text-zinc-300' : !accessible ? 'text-zinc-600' : 'text-zinc-400'}`}>
                                      {item.title}
                                    </p>
                                    {item.duration && <p className="text-[10px] text-zinc-600 mt-0.5 flex items-center gap-1"><IconClock size={10} /> {item.duration}</p>}
                                    {isQuiz && <p className="text-[10px] text-violet-500 mt-0.5">{item.questions.length} soal</p>}
                                  </div>
                                </button>
                              );
                            })}

                            {/* Final Quiz Button */}
                            <button
                              onClick={() => allItemsDone && openFinalQuizLanding(level)}
                              className={`w-full flex items-center gap-3 px-4 py-3.5 text-left border-t border-zinc-800/60 transition-all ${
                                allItemsDone ? 'hover:bg-violet-600/10 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                              } ${finalPassed ? 'bg-green-500/5' : 'bg-gradient-to-r from-violet-900/10 to-purple-900/10'}`}
                            >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                finalPassed ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                              }`}>
                                {finalPassed ? <IconCheck size={11} /> : <IconPlayerPlay size={11} />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className={`text-xs font-semibold truncate ${finalPassed ? 'text-green-300' : 'text-violet-300'}`}>
                                  {level.finalQuiz.title}
                                </p>
                                <p className="text-[10px] text-zinc-500">{level.finalQuiz.questionCount} soal · {level.finalQuiz.duration}</p>
                              </div>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 px-6 border-b border-zinc-800 bg-[#0f0f0f] flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(v => !v)} className="p-2 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
            {sidebarOpen ? <IconX size={18} /> : <IconMenu2 size={18} />}
          </button>
          <div className="h-4 w-px bg-zinc-700" />
          <span className="text-xs text-zinc-500 font-mono">{classMeta.category} · {classMeta.title}</span>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto" ref={contentRef}>
          {/* Quiz Landing View */}
          {quizLandingData ? (
            <QuizLanding
              quiz={quizLandingData.quiz}
              onStart={startQuiz}
              onBack={() => { setQuizLandingData(null); }}
              attemptHistory={quizHistory[quizLandingData.quizId] || []}
            />
          ) : activeItem?.type === 'video' ? (
            /* Video View */
            <AnimatePresence mode="wait">
              <motion.div key={activeItemId}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
                transition={{ duration:0.3 }} className="max-w-3xl mx-auto px-6 py-12"
              >
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-6">
                  <IconBookmark size={12} className="text-violet-400" />
                  <span>{currentLevel?.title}</span>
                  <IconChevronRight size={12} />
                  <span className="text-violet-300">{activeItem.title}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-3 leading-tight">{activeItem.title}</h1>
                <p className="text-zinc-500 text-sm font-mono mb-8 flex items-center gap-2"><IconClock size={14} /> Durasi: {activeItem.duration}</p>

                {/* YouTube Embed */}
                <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-700 mb-8 shadow-2xl">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${activeItem.videoId}?rel=0`}
                    title={activeItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p className="text-zinc-300 text-base leading-relaxed mb-6">{activeItem.description}</p>

                {/* Transcript */}
                {activeItem.transcript && activeItem.transcript.length > 0 && (
                  <details className="mb-8 group">
                    <summary className="cursor-pointer flex items-center gap-2 text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors py-2 select-none">
                      <IconChevronRight size={14} className="transition-transform group-open:rotate-90" />
                      Transkrip Video
                    </summary>
                    <div className="mt-3 space-y-0 bg-zinc-900/80 border border-zinc-700/50 rounded-xl overflow-hidden max-h-[400px] overflow-y-auto">
                      {activeItem.transcript.map((entry, i) => (
                        <div key={i} className={`flex gap-3 px-4 py-3 ${i % 2 === 0 ? 'bg-zinc-900/50' : 'bg-zinc-800/30'}`}>
                          <span className="text-violet-400 font-mono text-xs shrink-0 pt-0.5 min-w-[40px]">{entry.time}</span>
                          <p className="text-zinc-300 text-sm leading-relaxed">{entry.text}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                )}

                {completed.has(activeItemId) ? (
                  <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                    className="flex items-center gap-3 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                    <IconCheck size={18} className="text-green-400 shrink-0" />
                    <span className="text-sm text-green-300 font-medium">Video ini sudah kamu tonton!</span>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => { markComplete(activeItemId); navigateNext(); }}
                    className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-500 hover:from-violet-500 hover:to-purple-400 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  >
                    <IconCheck size={16} /> Tandai Sudah Ditonton & Lanjut
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          ) : activeItem?.type === 'lesson' ? (
            /* Lesson View */
            <AnimatePresence mode="wait">
              <motion.div key={activeItemId}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-10 }}
                transition={{ duration:0.3 }} className="max-w-3xl mx-auto px-6 py-12"
              >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono mb-6">
                  <IconBookmark size={12} className="text-violet-400" />
                  <span>{currentLevel?.title}</span>
                  <IconChevronRight size={12} />
                  <span className="text-violet-300">{activeItem.title}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold font-orbitron text-white mb-3 leading-tight">{activeItem.content.heading}</h1>
                <p className="text-zinc-500 text-sm font-mono mb-10 flex items-center gap-2"><IconClock size={14} /> Estimasi baca: {activeItem.duration}</p>

                <div className="space-y-6 text-zinc-300 text-base leading-relaxed">
                  {activeItem.content.body.map((para, i) => (
                    <motion.p key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1+i*0.08 }}>{para}</motion.p>
                  ))}
                </div>

                <div className="my-10 bg-zinc-900 border-l-4 border-violet-500 p-6 rounded-r-xl">
                  <p className="text-white italic text-base">{activeItem.content.quote}</p>
                </div>

                {completed.has(activeItemId) && (
                  <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
                    className="flex items-center gap-3 mt-6 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3">
                    <IconCheck size={18} className="text-green-400 shrink-0" />
                    <span className="text-sm text-green-300 font-medium">Materi ini sudah kamu selesaikan!</span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          ) : (
            /* Empty / default state */
            <div className="flex items-center justify-center h-full text-zinc-600">
              <div className="text-center">
                <IconBookmark size={48} className="mx-auto mb-4 text-zinc-700" />
                <p className="text-lg">Pilih materi dari sidebar untuk mulai belajar</p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        {activeItem?.type === 'lesson' && !quizLandingData && (
          <div className="h-20 border-t border-zinc-800 bg-[#0f0f0f] px-6 flex items-center justify-between shrink-0">
            <button onClick={goPrev} disabled={activeItemIndex <= 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${activeItemIndex > 0 ? 'text-zinc-300 hover:text-white hover:bg-zinc-800' : 'text-zinc-700 cursor-not-allowed'}`}>
              <IconChevronLeft size={18} /><span className="hidden sm:inline">Sebelumnya</span>
            </button>
            <span className="text-xs text-zinc-500 font-mono hidden sm:block">{activeItemIndex+1}/{currentLevelItems.length} materi</span>
            {activeItemIndex < currentLevelItems.length - 1 ? (
              <button onClick={goNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5">
                <span>Selanjutnya</span><IconChevronRight size={18} />
              </button>
            ) : (
              <button onClick={goNext}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-bold text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-0.5">
                <IconCheck size={18} /><span>Selesai</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
            onClick={() => setShowCelebration(false)}>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length:50 }).map((_, i) => <ConfettiParticle key={i} delay={i*0.05} />)}
            </div>
            <motion.div initial={{ scale:0.5, opacity:0, y:50 }} animate={{ scale:1, opacity:1, y:0 }} exit={{ scale:0.8, opacity:0 }}
              transition={{ type:'spring', stiffness:200, damping:20 }} onClick={e => e.stopPropagation()}
              className="relative bg-gradient-to-br from-[#1A1A2E] via-[#2D1B69] to-[#1A1A2E] border border-violet-500/30 rounded-3xl p-10 text-center max-w-md mx-4 shadow-[0_0_80px_rgba(124,58,237,0.3)]">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.4)]">
                <IconTrophy size={40} className="text-white" />
              </div>
              <h2 className="text-3xl font-bold font-orbitron text-white mb-3">Selamat!</h2>
              <p className="text-zinc-300 mb-2">Kamu telah menyelesaikan kelas</p>
              <p className="text-violet-300 font-bold text-lg mb-6">{classMeta.title}</p>
              <div className="flex items-center justify-center gap-1 mb-8">
                {[1,2,3].map(s => <motion.div key={s} initial={{ scale:0, rotate:-180 }} animate={{ scale:1, rotate:0 }} transition={{ delay:0.3+s*0.15, type:'spring' }}>
                  <IconStar size={28} className="text-yellow-400 fill-yellow-400" />
                </motion.div>)}
              </div>
              <button onClick={() => { setShowCelebration(false); navigate('/class'); }}
                className="w-full px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all">
                Kembali ke Daftar Kelas
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
