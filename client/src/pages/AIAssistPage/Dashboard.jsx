import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IconRobot, IconSend, IconSparkles, IconWorld, IconStethoscope, IconBooks } from '@tabler/icons-react';

export default function AIAssistPage() {
  const [prompt, setPrompt] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const categories = [
    { title: 'Global Justice', icon: <IconWorld size={20} />, color: 'bg-blue-500/10 text-blue-500' },
    { title: 'Medicine & Health', icon: <IconStethoscope size={20} />, color: 'bg-red-500/10 text-red-500' },
    { title: 'Science & Technology', icon: <IconSparkles size={20} />, color: 'bg-[var(--color-accent-green)]/10 text-[var(--color-accent-green)]' },
    { title: 'Finance & Economics', icon: <IconBooks size={20} />, color: 'bg-purple-500/10 text-purple-500' }
  ];

  const handleSend = () => {
    if (!prompt.trim()) return;
    setIsTyping(true);
    setPrompt('');
    
    // Simulate API call
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-5xl mx-auto">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center text-center mt-10 mb-12"
      >
        <h2 className="text-4xl font-bold font-orbitron uppercase tracking-widest text-white mb-2">HELLO, DOCTOR SOLKING</h2>
        <p className="text-zinc-400">Let's make your financial research easier with FinLitGo AI.</p>
      </motion.div>

      {/* Main Input Area */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="w-full bg-[#1e1e1e] border-2 border-zinc-800 focus-within:border-[var(--color-accent-green)] transition-all rounded-3xl p-2 shadow-2xl relative mb-12"
      >
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask me anything about managing money, crypto, or investments..."
          className="w-full h-32 bg-transparent text-white placeholder-zinc-500 p-4 focus:outline-none resize-none"
        />
        <div className="absolute left-6 bottom-4 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
            <IconRobot size={18} />
          </div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">FinLitGo Model v1.2</span>
        </div>
        <div className="absolute right-4 bottom-4 flex items-center gap-2">
          <span className="text-xs text-zinc-500 px-2">0/4000</span>
          <button 
            onClick={handleSend}
            disabled={!prompt.trim() || isTyping}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
               prompt.trim() && !isTyping ? 'bg-[var(--color-accent-green)] text-black cursor-pointer shadow-[0_0_15px_rgba(202,255,51,0.3)] hover:scale-105' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
            }`}
          >
            {isTyping ? <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" /> : <IconSend size={20} />}
          </button>
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4"
      >
        {categories.map((cat, i) => (
          <button 
            key={i}
            onClick={() => setPrompt(`Tell me more about ${cat.title} in the context of personal finance...`)}
            className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] border border-zinc-800 hover:border-[var(--color-accent-green)]/50 hover:bg-zinc-900 rounded-2xl transition-all group"
          >
            <div className={`p-4 rounded-2xl mb-4 ${cat.color} group-hover:scale-110 transition-transform`}>
              {cat.icon}
            </div>
            <span className="font-bold text-sm text-white group-hover:text-[var(--color-accent-green)] transition-colors">{cat.title}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
}
