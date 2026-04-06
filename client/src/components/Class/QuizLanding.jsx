import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  IconArrowLeft,
  IconClock,
  IconQuestionMark,
  IconTrophy,
  IconCheck,
  IconX,
  IconPlayerPlay,
  IconHistory,
  IconPercentage,
} from '@tabler/icons-react';

/**
 * QuizLanding — Dicoding-style quiz description page.
 * Shows: rules, question count, duration, attempt history.
 * Fires onStart() when user clicks "Mulai Quiz".
 * Fires onBack() when user clicks back.
 */
export default function QuizLanding({ quiz, onStart, onBack, attemptHistory = [] }) {
  const isPassed = attemptHistory.some((a) => a.status === 'Lulus');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto px-6 py-12"
    >
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm mb-8"
      >
        <IconArrowLeft size={16} /> Kembali ke Materi
      </button>

      {/* Card */}
      <div className="bg-[#1A1A2E] border border-violet-500/20 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600/20 to-purple-600/20 border-b border-violet-500/20 p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center">
              <IconTrophy size={20} className="text-violet-400" />
            </div>
            <div>
              <p className="text-xs text-violet-300 font-mono uppercase tracking-wider">Quiz</p>
              <h2 className="text-lg font-bold text-white font-orbitron">{quiz.title}</h2>
            </div>
          </div>
        </div>

        {/* Rules */}
        <div className="p-6 border-b border-zinc-800/60">
          <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">Aturan</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">{quiz.description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/60 rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <IconQuestionMark size={18} className="text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Pertanyaan</p>
                <p className="text-white font-bold font-mono">{quiz.questionCount} soal</p>
              </div>
            </div>
            <div className="bg-zinc-900/60 rounded-xl p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center">
                <IconClock size={18} className="text-violet-400" />
              </div>
              <div>
                <p className="text-xs text-zinc-500">Durasi</p>
                <p className="text-white font-bold font-mono">{quiz.duration}</p>
              </div>
            </div>
          </div>

          <p className="text-zinc-500 text-xs mt-4 text-center italic">Semoga berhasil!</p>
        </div>

        {/* Start Button */}
        <div className="p-6 border-b border-zinc-800/60">
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-violet-600 to-purple-500 text-white font-bold text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5 uppercase tracking-wider"
          >
            <IconPlayerPlay size={18} /> Mulai Quiz
          </button>
        </div>

        {/* Attempt History */}
        {attemptHistory.length > 0 && (
          <div className="p-6">
            <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
              <IconHistory size={16} className="text-zinc-400" /> Riwayat
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-zinc-500 border-b border-zinc-800">
                    <th className="pb-3 font-medium">Tanggal</th>
                    <th className="pb-3 font-medium">Persentase</th>
                    <th className="pb-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attemptHistory.map((attempt, idx) => (
                    <tr key={idx} className="border-b border-zinc-800/50 last:border-0">
                      <td className="py-3 text-zinc-300 font-mono text-xs">{attempt.date}</td>
                      <td className="py-3">
                        <span className="text-white font-bold font-mono">{attempt.percentage}%</span>
                      </td>
                      <td className="py-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                            attempt.status === 'Lulus'
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}
                        >
                          {attempt.status === 'Lulus' ? <IconCheck size={10} /> : <IconX size={10} />}
                          {attempt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
