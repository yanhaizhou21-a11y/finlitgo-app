import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconCheck, IconChevronLeft, IconChevronRight, IconArrowLeft } from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizEngine from '../../components/Class/QuizEngine';

export default function ClassDetailPage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);

  // Mock content
  const lessonParts = [
    { title: '1. Introduction to Budgeting', content: 'Budgeting is the process of creating a plan to spend your money. This spending plan is called a budget. Creating this spending plan allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do.' },
    { title: '2. The 50/30/20 Rule', content: 'A popular budgeting method is the 50/30/20 rule. It divides your after-tax income into three categories: 50% for needs, 30% for wants, and 20% for savings and debt repayment. Needs cover essential expenses like rent, groceries, and utilities. Wants cover non-essentials like dining out, entertainment, and hobbies.' },
    { title: '3. Tracking Expenses', content: 'The first step to building a budget is tracking your expenses. You can use an app, a spreadsheet, or even a pen and paper. Record every purchase, no matter how small. This will give you a clear picture of where your money is going and reveal areas where you can cut back.' }
  ];

  const quizQuestions = [
    { 
      question: 'What percentage of your income should go to "Needs" in the 50/30/20 rule?', 
      options: ['20%', '30%', '50%', '10%'],
      correctAnswer: 2
    },
    { 
      question: 'Which of the following is considered a "Want"?', 
      options: ['Rent', 'Groceries', 'Dining Out', 'Electricity'],
      correctAnswer: 2
    }
  ];

  const handleComplete = () => {
    // Here we'd typically update backend progress and streaks
    setShowQuiz(false);
  };

  if (showQuiz) {
    return <QuizEngine questions={quizQuestions} onComplete={handleComplete} />;
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto h-[calc(100vh-140px)]">
      {/* Sidebar Overview (Dicoding style) */}
      <div className="lg:w-80 bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 hidden lg:flex flex-col h-full sticky top-0 overflow-y-auto">
        <button onClick={() => navigate('/class')} className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-6 text-sm font-medium">
          <IconArrowLeft size={16} /> Back to Modules
        </button>

        <h3 className="font-bold text-lg text-white font-orbitron mb-4">Money Management Basics</h3>
        
        <div className="flex flex-col gap-2 relative">
          <div className="absolute left-[15px] top-6 bottom-6 w-px bg-zinc-800" />
          
          {[1,2,3,4].map((step, i) => (
            <div key={i} className="flex gap-4 items-start relative bg-zinc-900/50 p-3 rounded-xl border border-transparent hover:border-zinc-700 cursor-pointer group transition-colors">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${i === 2 ? 'bg-[var(--color-accent-green)] text-black shadow-[0_0_10px_rgba(202,255,51,0.3)]' : i < 2 ? 'bg-green-500/20 text-green-500 border border-green-500/30' : 'bg-zinc-800 text-zinc-500'}`}>
                {i < 2 ? <IconCheck size={16} /> : step}
              </div>
              <div className="flex-1 mt-1">
                <h4 className={`text-sm font-medium ${i === 2 ? 'text-white' : i < 2 ? 'text-zinc-300' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                  {i === 2 ? 'Chapter 3: Tracking Expenses' : i === 3 ? 'Quiz: Basics' : `Chapter ${step}: Completed`}
                </h4>
                {i === 2 && <span className="text-xs text-[var(--color-accent-green)] font-mono mt-1 block">Reading...</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Reading Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-[#1A1A1A] border border-zinc-800 rounded-2xl flex flex-col overflow-hidden"
      >
         <div className="flex-1 overflow-y-auto p-8 lg:p-12 relative prose prose-invert prose-green max-w-none">
           <h1 className="text-4xl font-bold font-orbitron text-white mb-2">Chapter 3: Tracking Expenses</h1>
           <p className="text-zinc-400 text-sm font-mono mb-8">Estimated reading time: 5 mins</p>

           <div className="text-zinc-300 leading-loose space-y-6 text-lg">
             <p>{lessonParts[0].content}</p>
             <div className="my-8 bg-zinc-900 border-l-4 border-[var(--color-accent-green)] p-6 rounded-r-xl">
               <p className="text-white italic m-0">"Do not save what is left after spending; instead spend what is left after saving." - Warren Buffett</p>
             </div>
             <p>{lessonParts[1].content}</p>
             <h2 className="text-2xl font-bold font-orbitron text-white mt-8 mb-4">Where does it go?</h2>
             <p>{lessonParts[2].content}</p>
           </div>
         </div>

         {/* Bottom Action Bar */}
         <div className="h-24 border-t border-zinc-800 bg-[#121212] px-8 flex items-center justify-between mt-auto shrink-0">
           <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
              <IconChevronLeft size={20} /> <span className="hidden sm:inline">Previous Chapter</span>
           </button>
           
           <button 
             onClick={() => setShowQuiz(true)}
             className="px-8 py-3 bg-[var(--color-accent-green)] text-black font-bold uppercase tracking-wider text-sm rounded-xl hover:bg-lime-400 transition-all shadow-[0_4px_14px_0_rgba(202,255,51,0.2)] flex items-center gap-2"
           >
             Take Module Quiz <IconChevronRight size={20} />
           </button>
         </div>
      </motion.div>
    </div>
  );
}
