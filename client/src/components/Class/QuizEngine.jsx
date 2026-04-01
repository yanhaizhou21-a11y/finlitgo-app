import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconCheck, IconTarget } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { recordStudyActivity } from '../../utils/streak';

export default function QuizEngine({ questions, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle', 'correct', 'incorrect'
  const navigate = useNavigate();

  const currentQ = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleSelect = (idx) => {
    if (status !== 'idle') return;
    setSelectedOption(idx);
  };

  const checkAnswer = () => {
    if (selectedOption === null) return;
    
    if (selectedOption === currentQ.correctAnswer) {
      setStatus('correct');
      recordStudyActivity(); // Track streak — 1 per day
    } else {
      setStatus('incorrect');
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(curr => curr + 1);
      setSelectedOption(null);
      setStatus('idle');
    } else {
      onComplete();
      navigate('/class');
    }
  };

  return (
    <div className="fixed inset-0 bg-[#121212] z-50 flex flex-col font-inter">
      {/* Top Bar: Close & Progress */}
      <div className="h-20 px-6 flex items-center gap-6 max-w-4xl mx-auto w-full">
        <button 
          onClick={() => navigate('/class')}
          className="text-zinc-500 hover:text-white transition-colors"
        >
          <IconX size={28} />
        </button>
        <div className="flex-1 h-4 bg-zinc-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-violet-600 to-purple-400 rounded-full"
            initial={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 max-w-2xl mx-auto w-full relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full flex flex-col items-center"
          >
            <h2 className="text-3xl font-bold font-orbitron mb-10 text-center leading-tight">
              {currentQ.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = status === 'correct' && isSelected;
                const isWrong = status === 'incorrect' && isSelected;
                const showCorrect = status === 'incorrect' && idx === currentQ.correctAnswer;
                
                let cardStyle = "bg-[#1A1A1A] border-zinc-700 hover:bg-zinc-800";
                
                if (isSelected && status === 'idle') {
                  cardStyle = "bg-violet-500/10 border-violet-500 text-violet-400";
                } else if (isCorrect || showCorrect) {
                  cardStyle = "bg-green-500/20 border-green-500 text-green-400";
                } else if (isWrong) {
                  cardStyle = "bg-red-500/20 border-red-500 text-red-400";
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: status === 'idle' ? 1.02 : 1 }}
                    whileTap={{ scale: status === 'idle' ? 0.98 : 1 }}
                    onClick={() => handleSelect(idx)}
                    disabled={status !== 'idle'}
                    className={`border-2 rounded-2xl p-6 text-lg font-medium text-center transition-all duration-200 cursor-pointer ${cardStyle} min-h-[100px] flex items-center justify-center`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Action Bar */}
      <div className={`h-32 border-t flex items-center justify-center px-6 w-full ${
        status === 'idle' ? 'bg-[#121212] border-zinc-800' :
        status === 'correct' ? 'bg-green-500/10 border-green-500/50' :
        'bg-red-500/10 border-red-500/50'
      } transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
          <div className="flex-1">
            {status === 'correct' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-green-500 font-bold text-2xl font-orbitron">
                <div className="bg-green-500 text-black rounded-full p-2"><IconCheck size={24} /></div> Brilliant!
              </motion.div>
            )}
            {status === 'incorrect' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 text-red-500 font-bold text-2xl font-orbitron">
                <div className="bg-red-500 text-black rounded-full p-2"><IconX size={24} /></div> Not quite right.
              </motion.div>
            )}
          </div>
          
          <button 
            onClick={status === 'idle' ? checkAnswer : handleNext}
            disabled={selectedOption === null}
            className={`w-40 h-14 rounded-2xl font-bold uppercase tracking-widest text-lg transition-all ${
              selectedOption === null 
                ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' 
                : status === 'idle'                   ? 'bg-gradient-to-r from-violet-600 to-purple-400 text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.3)]'
                  : status === 'correct'
                    ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                    : 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
            }`}
          >
            {status === 'idle' ? 'Check' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
