import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus, IconEdit, IconTrash, IconX, IconBrandYoutube, IconQuestionMark, IconCheck, IconBook2, IconListDetails, IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { fetchClasses, createClass, updateClass, deleteClass, createChapter, updateChapter, deleteChapter, createQuiz, updateQuiz, deleteQuiz } from '../../services/classService';

function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&"'>]+)/);
  return match ? match[1] : null;
}

function sortByOrderIndex(a, b) {
  return (a?.order_index ?? 0) - (b?.order_index ?? 0);
}

export default function AdminClassCRUD() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const [showClassModal, setShowClassModal] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const [showChaptersModal, setShowChaptersModal] = useState(false);
  const [chaptersForClass, setChaptersForClass] = useState(null);
  const [editingChapter, setEditingChapter] = useState(null);

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizzesForClass, setQuizzesForClass] = useState(null);
  const [editingQuiz, setEditingQuiz] = useState(null);

  const [classForm, setClassForm] = useState({ title: '', category: 'Foundation', description: '', thumbnail_url: '', youtube_url: '' });
  const [chapterForm, setChapterForm] = useState({ title: '', has_video: false, youtube_url: '', bold_header: '', body_text: '', caption: '' });
  const [quizForm, setQuizForm] = useState({ question: '', options: ['', '', '', ''], correct_answer: 0 });

  const ytId = useMemo(() => getYouTubeId(classForm.youtube_url), [classForm.youtube_url]);

  const reload = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchClasses();
      setClasses(data || []);
    } catch (e) {
      setError(e?.message || 'Failed to load classes');
      setClasses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { reload(); }, []);

  const openAdd = () => { setEditingClass(null); setClassForm({ title: '', category: 'Foundation', description: '', thumbnail_url: '', youtube_url: '' }); setShowClassModal(true); };

  const openEdit = (cls) => { setEditingClass(cls); setClassForm({ title: cls.title || '', category: cls.category || 'Foundation', description: cls.description || '', thumbnail_url: cls.thumbnail_url || '', youtube_url: cls.youtube_url || '' }); setShowClassModal(true); };

  const handleSave = async () => {
    if (!classForm.title.trim()) return;
    setBusy(true);
    try {
      if (editingClass?.id) await updateClass(editingClass.id, classForm);
      else await createClass(classForm);
      setShowClassModal(false);
      await reload();
    } catch (e) { setError(e?.message || 'Failed to save class'); }
    finally { setBusy(false); }
  };

  const handleDelete = async (id) => { setBusy(true); try { await deleteClass(id); setDeleteConfirm(null); await reload(); } catch (e) { setError(e?.message || 'Failed to delete class'); } finally { setBusy(false); } };

  const openChapters = (cls) => { setChaptersForClass(cls); setEditingChapter(null); setChapterForm({ title: '', has_video: false, youtube_url: '', bold_header: '', body_text: '', caption: '' }); setShowChaptersModal(true); };
  const openEditChapter = (ch) => { setEditingChapter(ch); setChapterForm({ title: ch.title || '', has_video: !!ch.has_video, youtube_url: ch.youtube_url || '', bold_header: ch.bold_header || '', body_text: ch.body_text || '', caption: ch.caption || '' }); };
  const saveChapter = async () => {
    if (!chaptersForClass?.id || !chapterForm.title.trim()) return;
    setBusy(true);
    try {
      if (editingChapter?.id) await updateChapter(editingChapter.id, { ...chapterForm, order_index: editingChapter.order_index ?? 0 });
      else {
        const nextOrder = (chaptersForClass.class_chapters || []).reduce((m, c) => Math.max(m, c.order_index ?? 0), -1) + 1;
        await createChapter({ class_id: chaptersForClass.id, order_index: nextOrder, ...chapterForm });
      }
      const latest = await fetchClasses();
      setClasses(latest);
      setChaptersForClass(latest.find(c => c.id === chaptersForClass.id) || chaptersForClass);
      setEditingChapter(null);
      setChapterForm({ title: '', has_video: false, youtube_url: '', bold_header: '', body_text: '', caption: '' });
    } catch (e) { setError(e?.message || 'Failed to save chapter'); }
    finally { setBusy(false); }
  };
  const removeChapter = async (id) => { setBusy(true); try { await deleteChapter(id); const latest = await fetchClasses(); setClasses(latest); setChaptersForClass(latest.find(c => c.id === chaptersForClass.id) || chaptersForClass); } catch (e) { setError(e?.message || 'Failed to delete chapter'); } finally { setBusy(false); } };
  const moveChapter = async (chapter, direction) => {
    const list = [...(chaptersForClass?.class_chapters || [])].sort(sortByOrderIndex);
    const idx = list.findIndex(c => c.id === chapter.id);
    const target = direction === 'up' ? idx - 1 : idx + 1;
    if (idx < 0 || target < 0 || target >= list.length) return;
    const a = list[idx], b = list[target];
    setBusy(true);
    try {
      await updateChapter(a.id, { ...a, order_index: b.order_index ?? 0 });
      await updateChapter(b.id, { ...b, order_index: a.order_index ?? 0 });
      const latest = await fetchClasses();
      setClasses(latest);
      setChaptersForClass(latest.find(c => c.id === chaptersForClass.id) || chaptersForClass);
    } catch (e) { setError(e?.message || 'Failed to reorder chapters'); }
    finally { setBusy(false); }
  };

  const openQuizManager = (cls) => { setQuizzesForClass(cls); setEditingQuiz(null); setQuizForm({ question: '', options: ['', '', '', ''], correct_answer: 0 }); setShowQuizModal(true); };
  const openEditQuiz = (q) => { setEditingQuiz(q); setQuizForm({ question: q.question || '', options: Array.isArray(q.options) ? [...q.options, '', '', '', ''].slice(0, 4) : ['', '', '', ''], correct_answer: q.correct_answer ?? 0 }); };
  const addQuiz = async () => {
    if (!quizzesForClass?.id || !quizForm.question.trim()) return;
    const options = quizForm.options.map(o => String(o || '').trim()).filter(Boolean);
    if (options.length < 2) return;
    setBusy(true);
    try {
      if (editingQuiz?.id) await updateQuiz(editingQuiz.id, { question: quizForm.question, options, correct_answer: Math.min(quizForm.correct_answer, options.length - 1) });
      else {
        const nextOrder = (quizzesForClass.class_quizzes || []).reduce((m, c) => Math.max(m, c.order_index ?? 0), -1) + 1;
        await createQuiz({ class_id: quizzesForClass.id, order_index: nextOrder, question: quizForm.question, options, correct_answer: Math.min(quizForm.correct_answer, options.length - 1) });
      }
      const latest = await fetchClasses();
      setClasses(latest);
      setQuizzesForClass(latest.find(c => c.id === quizzesForClass.id) || quizzesForClass);
      setEditingQuiz(null);
      setQuizForm({ question: '', options: ['', '', '', ''], correct_answer: 0 });
    } catch (e) { setError(e?.message || 'Failed to save quiz'); }
    finally { setBusy(false); }
  };
  const removeQuiz = async (id) => { setBusy(true); try { await deleteQuiz(id); const latest = await fetchClasses(); setClasses(latest); setQuizzesForClass(latest.find(c => c.id === quizzesForClass.id) || quizzesForClass); } catch (e) { setError(e?.message || 'Failed to delete quiz'); } finally { setBusy(false); } };

  const rows = useMemo(() => (classes || []).map(c => ({ ...c, chaptersCount: (c.class_chapters || []).length, quizCount: (c.class_quizzes || []).length })), [classes]);
  const classTitleInvalid = !classForm.title.trim();
  const chapterTitleInvalid = !chapterForm.title.trim();
  const quizQuestionInvalid = !quizForm.question.trim();
  const filledQuizOptions = quizForm.options.map(o => String(o || '').trim()).filter(Boolean).length;
  const quizOptionsInvalid = filledQuizOptions < 2;


  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron">Manage Classes</h2>
          <p className="text-sm text-zinc-500 mt-1">Create, edit, and manage learning modules.</p>
          {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
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
              {rows.map((cls, i) => (
                <motion.tr 
                  key={cls.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {cls.thumbnail_url && <img src={cls.thumbnail_url} alt="" className="w-10 h-10 rounded-lg object-cover border border-zinc-700" />}
                      <div>
                        <span className="text-white font-medium text-sm">{cls.title}</span>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 max-w-[200px]">{cls.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 font-mono">{cls.category}</span>
                  </td>
                  <td className="p-4 text-zinc-300 font-mono text-sm">{cls.chaptersCount}</td>
                  <td className="p-4">
                    {cls.youtube_url ? (
                      <a href={cls.youtube_url} target="_blank" rel="noreferrer" className="text-red-400 hover:text-red-300 transition-colors">
                        <IconBrandYoutube size={20} />
                      </a>
                    ) : (
                      <span className="text-zinc-600 text-xs">None</span>
                    )}
                  </td>
                  <td className="p-4">
                    <button onClick={() => openQuizManager(cls)} className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300 transition-colors bg-violet-500/10 px-2 py-1 rounded-lg">
                      <IconQuestionMark size={14} /> {cls.quizCount} quiz
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openChapters(cls)} className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all" title="Manage Chapters">
                        <IconListDetails size={16} />
                      </button>
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
        {loading && (
          <div className="p-12 text-center text-zinc-500">
            <p className="text-sm">Loading classes...</p>
          </div>
        )}
        {!loading && classes.length === 0 && (
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
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-400 transition-colors text-sm font-medium disabled:opacity-50" disabled={busy}>Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Class Modal */}
      <AnimatePresence>
        {showClassModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowClassModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">{editingClass ? 'Edit Class' : 'Add New Class'}</h3>
                <button onClick={() => setShowClassModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Title *</label>
                  <input value={classForm.title} onChange={e => setClassForm(f => ({...f, title: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="e.g. Money Management Basics" />
                  {classTitleInvalid && <p className="text-[11px] text-red-400 mt-1">Title is required.</p>}
                </div>

                <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Category</label>
                    <select value={classForm.category} onChange={e => setClassForm(f => ({...f, category: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors">
                      <option>Foundation</option>
                      <option>Growth</option>
                      <option>Advanced</option>
                    </select>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Description</label>
                  <textarea value={classForm.description} onChange={e => setClassForm(f => ({...f, description: e.target.value}))} rows={3} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none" placeholder="Brief description of the class..." />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">YouTube URL</label>
                  <input value={classForm.youtube_url} onChange={e => setClassForm(f => ({...f, youtube_url: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="https://www.youtube.com/watch?v=..." />
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
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Thumbnail URL</label>
                  <input value={classForm.thumbnail_url} onChange={e => setClassForm(f => ({...f, thumbnail_url: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="https://images.unsplash.com/..." />
                  {classForm.thumbnail_url && <img src={classForm.thumbnail_url} alt="Preview" className="mt-3 rounded-xl border border-zinc-700 h-32 w-full object-cover" />}
                </div>

                <button onClick={handleSave} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2 disabled:opacity-50" disabled={busy || classTitleInvalid}>
                  {editingClass ? 'Save Changes' : 'Create Class'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapters Modal */}
      <AnimatePresence>
        {showChaptersModal && chaptersForClass && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowChaptersModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6"><h3 className="text-lg font-bold text-white">Chapters — {chaptersForClass.title}</h3><button onClick={() => setShowChaptersModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
                  <h4 className="text-sm font-semibold text-white mb-3">Existing Chapters</h4>
                  <div className="flex flex-col gap-2">
                    {[...(chaptersForClass.class_chapters || [])].sort(sortByOrderIndex).map((ch, idx) => (
                      <div key={ch.id} className="border border-zinc-800 rounded-xl p-3 bg-[#111111]">
                        <div className="flex items-start justify-between gap-3">
                          <div><p className="text-xs text-zinc-500 font-mono mb-1">#{idx + 1}</p><p className="text-sm font-medium text-white">{ch.title}</p></div>
                          <div className="flex items-center gap-1">
                            <button onClick={() => moveChapter(ch, 'up')} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"><IconChevronUp size={16} /></button>
                            <button onClick={() => moveChapter(ch, 'down')} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg"><IconChevronDown size={16} /></button>
                            <button onClick={() => openEditChapter(ch)} className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg"><IconEdit size={16} /></button>
                            <button onClick={() => removeChapter(ch.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"><IconTrash size={16} /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {(chaptersForClass.class_chapters || []).length === 0 && (
                      <p className="text-sm text-zinc-500 text-center py-6">No chapters yet.</p>
                    )}
                  </div>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3">
                  <h4 className="text-sm font-semibold text-white">{editingChapter ? 'Edit Chapter' : 'Add Chapter'}</h4>
                  <input value={chapterForm.title} onChange={e => setChapterForm(f => ({ ...f, title: e.target.value }))} className="w-full bg-[#0f0f0f] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="Title" />
                  {chapterTitleInvalid && <p className="text-[11px] text-red-400 -mt-1">Chapter title is required.</p>}
                  <input value={chapterForm.bold_header} onChange={e => setChapterForm(f => ({ ...f, bold_header: e.target.value }))} className="w-full bg-[#0f0f0f] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="Bold header" />
                  <textarea rows={5} value={chapterForm.body_text} onChange={e => setChapterForm(f => ({ ...f, body_text: e.target.value }))} className="w-full bg-[#0f0f0f] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm resize-none" placeholder="Body text" />
                  <input value={chapterForm.caption} onChange={e => setChapterForm(f => ({ ...f, caption: e.target.value }))} className="w-full bg-[#0f0f0f] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="Caption" />
                  <div className="flex items-center justify-between p-3 bg-[#0f0f0f] border border-zinc-800 rounded-xl">
                    <span className="text-sm text-white">Has video</span>
                    <button type="button" onClick={() => setChapterForm(f => ({ ...f, has_video: !f.has_video }))} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${chapterForm.has_video ? 'bg-violet-600' : 'bg-zinc-700'}`}><span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${chapterForm.has_video ? 'translate-x-6' : 'translate-x-1'}`} /></button>
                  </div>
                  {chapterForm.has_video && <input value={chapterForm.youtube_url} onChange={e => setChapterForm(f => ({ ...f, youtube_url: e.target.value }))} className="w-full bg-[#0f0f0f] border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm" placeholder="YouTube URL" />}
                  <button onClick={saveChapter} disabled={busy || chapterTitleInvalid} className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white rounded-xl text-sm font-bold disabled:opacity-50">{editingChapter ? 'Save Chapter' : 'Add Chapter'}</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Manager Modal */}
      <AnimatePresence>
        {showQuizModal && quizzesForClass && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowQuizModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">Quiz Manager — {quizzesForClass?.title}</h3>
                <button onClick={() => setShowQuizModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button>
              </div>

              {/* Existing Quizzes */}
              <div className="flex flex-col gap-3 mb-6">
                {(quizzesForClass.class_quizzes || []).length === 0 && <p className="text-sm text-zinc-500 text-center py-4">No quizzes yet for this class.</p>}
                {[...(quizzesForClass.class_quizzes || [])].sort(sortByOrderIndex).map((q, idx) => (
                  <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-sm text-white font-medium mb-2">Q{idx + 1}: {q.question}</p>
                        <div className="grid grid-cols-2 gap-1">
                          {(Array.isArray(q.options) ? q.options : []).map((opt, oi) => (
                            <span key={oi} className={`text-xs px-2 py-1 rounded ${oi === q.correct_answer ? 'bg-green-500/10 text-green-400' : 'text-zinc-500'}`}>
                              {oi === q.correct_answer && <IconCheck size={10} className="inline mr-1" />}{opt}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button onClick={() => openEditQuiz(q)} className="text-zinc-500 hover:text-violet-400 p-1 ml-2"><IconEdit size={14} /></button>
                        <button onClick={() => removeQuiz(q.id)} className="text-zinc-500 hover:text-red-400 p-1 ml-2">
                        <IconTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Quiz Form */}
              <div className="border-t border-zinc-800 pt-4">
                <h4 className="text-sm font-medium text-zinc-300 mb-3">Add New Question</h4>
                <div className="flex flex-col gap-3">
                  <input value={quizForm.question} onChange={e => setQuizForm(f => ({...f, question: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="Question text..." />
                  {quizQuestionInvalid && <p className="text-[11px] text-red-400 -mt-1">Question text is required.</p>}
                  
                  {quizForm.options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <button 
                        onClick={() => setQuizForm(f => ({...f, correct_answer: idx}))} 
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${idx === quizForm.correct_answer ? 'border-green-500 bg-green-500/20' : 'border-zinc-700 hover:border-zinc-500'}`}
                      >
                        {idx === quizForm.correct_answer && <IconCheck size={12} className="text-green-400" />}
                      </button>
                      <input value={opt} onChange={e => { const newOpts = [...quizForm.options]; newOpts[idx] = e.target.value; setQuizForm(f => ({...f, options: newOpts})); }} className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder={`Option ${idx + 1}`} />
                    </div>
                  ))}
                  {quizOptionsInvalid && <p className="text-[11px] text-red-400">Fill at least 2 answer options.</p>}

                  <button onClick={addQuiz} disabled={busy || quizQuestionInvalid || quizOptionsInvalid} className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-xs rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all disabled:opacity-50">
                    {editingQuiz ? 'Save Question' : 'Add Question'}
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
