import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus, IconEdit, IconTrash, IconX, IconBrandYoutube, IconQuestionMark, IconCheck } from '@tabler/icons-react';

const STORAGE_KEY = 'finlitgo_classes';

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&"'>]+)/);
  return match ? match[1] : null;
}

function getInitialClasses() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, title: 'Money Management Basics', category: 'Foundation', description: 'Learn the fundamentals of managing your money wisely.', chapters: 12, youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80', quizzes: [
      { question: 'What percentage of income should go to Needs in the 50/30/20 rule?', options: ['20%', '30%', '50%', '10%'], correctAnswer: 2 },
      { question: 'Which is considered a "Want"?', options: ['Rent', 'Groceries', 'Dining Out', 'Electricity'], correctAnswer: 2 }
    ]},
    { id: 2, title: 'Investing for Beginners', category: 'Growth', description: 'Start your investment journey with confidence.', chapters: 8, youtubeUrl: 'https://www.youtube.com/watch?v=PHe0bXAIuk0', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=500&q=80', quizzes: [] },
    { id: 3, title: 'Crypto & Digital Assets', category: 'Advanced', description: 'Understand the world of cryptocurrency and blockchain.', chapters: 10, youtubeUrl: '', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=500&q=80', quizzes: [] },
  ];
}

export default function AdminClassCRUD() {
  const [classes, setClasses] = useState(getInitialClasses);
  const [showModal, setShowModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [editingClassForQuiz, setEditingClassForQuiz] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Form state
  const [form, setForm] = useState({ title: '', category: 'Foundation', description: '', chapters: 1, youtubeUrl: '', image: '' });
  // Quiz form state
  const [quizForm, setQuizForm] = useState({ question: '', options: ['', '', '', ''], correctAnswer: 0 });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
  }, [classes]);

  const openAdd = () => {
    setEditingClass(null);
    setForm({ title: '', category: 'Foundation', description: '', chapters: 1, youtubeUrl: '', image: '' });
    setShowModal(true);
  };

  const openEdit = (cls) => {
    setEditingClass(cls);
    setForm({ title: cls.title, category: cls.category, description: cls.description, chapters: cls.chapters, youtubeUrl: cls.youtubeUrl || '', image: cls.image || '' });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editingClass) {
      setClasses(prev => prev.map(c => c.id === editingClass.id ? { ...c, ...form } : c));
    } else {
      const newClass = { ...form, id: Date.now(), quizzes: [] };
      setClasses(prev => [...prev, newClass]);
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    setClasses(prev => prev.filter(c => c.id !== id));
    setDeleteConfirm(null);
  };

  // Quiz CRUD
  const openQuizManager = (cls) => {
    setEditingClassForQuiz(cls);
    setQuizForm({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
    setShowQuizModal(true);
  };

  const addQuiz = () => {
    if (!quizForm.question.trim() || quizForm.options.some(o => !o.trim())) return;
    setClasses(prev => prev.map(c => {
      if (c.id === editingClassForQuiz.id) {
        return { ...c, quizzes: [...(c.quizzes || []), { ...quizForm, id: Date.now() }] };
      }
      return c;
    }));
    setQuizForm({ question: '', options: ['', '', '', ''], correctAnswer: 0 });
    // refresh the reference
    setEditingClassForQuiz(prev => {
      const updated = classes.find(c => c.id === prev.id);
      return updated ? { ...updated, quizzes: [...(updated.quizzes || []), { ...quizForm, id: Date.now() }] } : prev;
    });
  };

  const deleteQuiz = (classId, quizIdx) => {
    setClasses(prev => prev.map(c => {
      if (c.id === classId) {
        const newQuizzes = [...(c.quizzes || [])];
        newQuizzes.splice(quizIdx, 1);
        return { ...c, quizzes: newQuizzes };
      }
      return c;
    }));
  };

  const ytId = getYouTubeId(form.youtubeUrl);
  const currentClassQuizzes = editingClassForQuiz ? (classes.find(c => c.id === editingClassForQuiz.id)?.quizzes || []) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron">Manage Classes</h2>
          <p className="text-sm text-zinc-500 mt-1">Create, edit, and manage learning modules.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5">
          <IconPlus size={18} /> Add Class
        </button>
      </div>

      {/* Class Table */}
      <div className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">Chapters</th>
                <th className="p-4">YouTube</th>
                <th className="p-4">Quizzes</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {classes.map((cls, i) => (
                <motion.tr 
                  key={cls.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {cls.image && <img src={cls.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-zinc-700" />}
                      <div>
                        <span className="text-white font-medium text-sm">{cls.title}</span>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 max-w-[200px]">{cls.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 font-mono">{cls.category}</span>
                  </td>
                  <td className="p-4 text-zinc-300 font-mono text-sm">{cls.chapters}</td>
                  <td className="p-4">
                    {cls.youtubeUrl ? (
                      <a href={cls.youtubeUrl} target="_blank" rel="noreferrer" className="text-red-400 hover:text-red-300 transition-colors">
                        <IconBrandYoutube size={20} />
                      </a>
                    ) : (
                      <span className="text-zinc-600 text-xs">None</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button onClick={() => openQuizManager(cls)} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors bg-violet-500/10 px-2 py-1 rounded-lg">
                      <IconQuestionMark size={14} /> {(cls.quizzes || []).length} quiz
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(cls)} className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all">
                        <IconEdit size={16} />
                      </button>
                      <button onClick={() => setDeleteConfirm(cls.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <IconTrash size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {classes.length === 0 && (
          <div className="p-12 text-center text-zinc-500">
            <IconBook2 size={48} className="mx-auto mb-4 text-zinc-600" />
            <p>No classes yet. Click "Add Class" to create one.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-white mb-2">Delete Class?</h3>
              <p className="text-sm text-zinc-400 mb-6">This action cannot be undone. All associated quizzes will also be deleted.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors text-sm font-medium">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-400 transition-colors text-sm font-medium">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Class Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">{editingClass ? 'Edit Class' : 'Add New Class'}</h3>
                <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Money Management Basics" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors">
                      <option>Foundation</option>
                      <option>Growth</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Chapters</label>
                    <input type="number" min="1" value={form.chapters} onChange={e => setForm(f => ({...f, chapters: parseInt(e.target.value) || 1}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Description</label>
                  <textarea value={form.description} onChange={e => setForm(f => ({...f, description: e.target.value}))} rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none" placeholder="Brief description of the class..." />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">YouTube URL</label>
                  <input value={form.youtubeUrl} onChange={e => setForm(f => ({...f, youtubeUrl: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="https://www.youtube.com/watch?v=..." />
                  {ytId && (
                    <div className="mt-3 rounded-xl overflow-hidden border border-zinc-700 aspect-video">
                      <iframe 
                        src={`https://www.youtube.com/embed/${ytId}`}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope"
                        allowFullScreen
                        title="YouTube Preview"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Image URL</label>
                  <input value={form.image} onChange={e => setForm(f => ({...f, image: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="https://images.unsplash.com/..." />
                  {form.image && <img src={form.image} alt="Preview" className="mt-3 rounded-xl border border-zinc-700 h-32 w-full object-cover" />}
                </div>

                <button onClick={handleSave} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2">
                  {editingClass ? 'Save Changes' : 'Create Class'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Manager Modal */}
      <AnimatePresence>
        {showQuizModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQuizModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Quiz Manager — {editingClassForQuiz?.title}</h3>
                <button onClick={() => setShowQuizModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button>
              </div>

              {/* Existing Quizzes */}
              <div className="flex flex-col gap-3 mb-6">
                {currentClassQuizzes.length === 0 && <p className="text-sm text-zinc-500 text-center py-4">No quizzes yet for this class.</p>}
                {currentClassQuizzes.map((q, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium mb-2">Q{idx + 1}: {q.question}</p>
                        <div className="grid grid-cols-2 gap-1">
                          {q.options.map((opt, oi) => (
                            <span key={oi} className={`text-xs px-2 py-1 rounded ${oi === q.correctAnswer ? 'bg-green-500/10 text-green-400' : 'text-zinc-500'}`}>
                              {oi === q.correctAnswer && <IconCheck size={10} className="inline mr-1" />}{opt}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button onClick={() => deleteQuiz(editingClassForQuiz.id, idx)} className="text-zinc-500 hover:text-red-400 p-1 ml-2">
                        <IconTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Quiz Form */}
              <div className="border-t border-zinc-800 pt-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-3">Add New Question</h4>
                <div className="flex flex-col gap-3">
                  <input value={quizForm.question} onChange={e => setQuizForm(f => ({...f, question: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="Question text..." />
                  
                  {quizForm.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <button 
                        onClick={() => setQuizForm(f => ({...f, correctAnswer: idx}))} 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${idx === quizForm.correctAnswer ? 'border-green-500 bg-green-500/20' : 'border-zinc-700 hover:border-zinc-500'}`}
                      >
                        {idx === quizForm.correctAnswer && <IconCheck size={12} className="text-green-400" />}
                      </button>
                      <input value={opt} onChange={e => { const newOpts = [...quizForm.options]; newOpts[idx] = e.target.value; setQuizForm(f => ({...f, options: newOpts})); }} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder={`Option ${idx + 1}`} />
                    </div>
                  ))}

                  <button onClick={addQuiz} className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-xs rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all">
                    Add Question
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
