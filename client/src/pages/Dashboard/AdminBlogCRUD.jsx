import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus, IconEdit, IconTrash, IconX, IconArticle } from '@tabler/icons-react';
import { supabase } from "@/services/supabase";

// ─────────────────────────────────────────
// Constants
// ─────────────────────────────────────────
const EMPTY_FORM = {
  title: '',
  excerpt: '',
  author: 'Admin FinlitGo',
  category: 'Foundation',
  image: '',
  content: '',
  timeToRead: '5 min read',
};

const CATEGORIES = ['All', 'Foundation', 'Growth', 'Advanced'];

// ─────────────────────────────────────────
// Validation helpers
// ─────────────────────────────────────────
const isValidUrl = (url) => {
  if (!url.trim()) return true; // optional field
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const validateForm = (form) => {
  if (!form.title.trim()) return 'Title is required.';
  if (form.image && !isValidUrl(form.image)) return 'Image URL is not valid.';
  return null;
};

// ─────────────────────────────────────────
// Date helper
// ─────────────────────────────────────────
const formatDate = (date = new Date()) =>
  date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

// ─────────────────────────────────────────
// Normalise a blog entry (handles field aliases)
// ─────────────────────────────────────────
const normaliseBlog = (blog) => ({
  ...blog,
  image: blog.image || blog.thumbnail_url || '',
  timeToRead: blog.timeToRead || blog.time_to_read || '5 min read',
  date: blog.date || formatDate(new Date(blog.created_at)),
});

// ─────────────────────────────────────────
// Toast component (no extra deps, no UI change)
// ─────────────────────────────────────────
function Toast({ toasts }) {
  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            style={{
              padding: '0.75rem 1.25rem',
              borderRadius: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: '#fff',
              background: t.type === 'success' ? '#7c3aed' : '#ef4444',
              boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
            }}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ─────────────────────────────────────────
// Main component
// ─────────────────────────────────────────
export default function AdminBlogCRUD() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  // Bonus feature state
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [sortOrder, setSortOrder] = useState('latest'); // 'latest' | 'oldest'
  const [toasts, setToasts] = useState([]);

  // ── Toast helper ──
  const pushToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  // ── Load data from Supabase (FIXED: only runs once) ──
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      
      const { data, error, status, statusText } = await supabase
        .from('blogs')
        .select('*');

      console.log("STATUS:", status, statusText);
      console.log("DATA:", data);
      console.log("ERROR CODE:", error?.code);
      console.log("ERROR MESSAGE:", error?.message);
      console.log("ERROR DETAILS:", error?.details);
      console.log("ERROR HINT:", error?.hint);

      if (error) {
        pushToast('Failed to fetch data', 'error');
      } else if (data) {
        const normalisedData = data.map(normaliseBlog);
        setBlogs(normalisedData);
        console.log(`✅ ${data.length} posts loaded successfully`);
      }

      setLoading(false);
    };

    fetchBlogs();
  }, []); // ← Empty dependency array = runs only once when component mounts

  // ── Filtered / searched / sorted list (memoised) ──
  const displayedBlogs = useMemo(() => {
    let result = [...blogs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((b) => b.title.toLowerCase().includes(q));
    }

    if (filterCategory !== 'All') {
      result = result.filter((b) => b.category === filterCategory);
    }

    result.sort((a, b) => {
      if (sortOrder === 'latest') {
        return new Date(b.created_at) - new Date(a.created_at);
      } else {
        return new Date(a.created_at) - new Date(b.created_at);
      }
    });

    return result;
  }, [blogs, search, filterCategory, sortOrder]);

  // ── Modal helpers ──
  const openAdd = useCallback(() => {
    setEditingBlog(null);
    setForm(EMPTY_FORM);
    setShowModal(true);
  }, []);

  const openEdit = useCallback((blog) => {
    const n = normaliseBlog(blog);
    setEditingBlog(n);
    setForm({
      title: n.title,
      excerpt: n.excerpt || '',
      author: n.author,
      category: n.category,
      image: n.image,
      content: n.content || '',
      timeToRead: n.timeToRead,
    });
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setEditingBlog(null);
    setForm(EMPTY_FORM);
  }, []);

  // ── Helper to refresh data ──
  const refreshBlogs = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('*');

    if (error) {
      pushToast('Failed to refresh data', 'error');
    } else if (data) {
      const normalisedData = data.map(normaliseBlog);
      setBlogs(normalisedData);
    }
    setLoading(false);
  }, [pushToast]);

  // ── CREATE operation (FIXED: added missing fields) ──
  const handleCreate = useCallback(async () => {
    const { error } = await supabase
      .from('blogs')
      .insert([{
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        author: form.author,
        image: form.image,
        thumbnail_url: form.image,
        time_to_read: form.timeToRead,
      }]);

    if (error) {
      console.error('Create error:', error);
      pushToast('Failed to create post', 'error');
    } else {
      pushToast('Post created successfully!');
      await refreshBlogs();
      closeModal();
    }
  }, [form, refreshBlogs, pushToast, closeModal]);

  // ── UPDATE operation (FIXED: properly handles all fields) ──
  const handleUpdate = useCallback(async () => {
    const { error } = await supabase
      .from('blogs')
      .update({
        title: form.title,
        excerpt: form.excerpt,
        content: form.content,
        category: form.category,
        author: form.author,
        image: form.image,
        thumbnail_url: form.image,
        time_to_read: form.timeToRead,
      })
      .eq('id', editingBlog.id);

    if (error) {
      console.error('Update error:', error);
      pushToast('Failed to update post', 'error');
    } else {
      pushToast('Post updated successfully!');
      await refreshBlogs();
      closeModal();
    }
  }, [form, editingBlog, refreshBlogs, pushToast, closeModal]);

  // ── Save (Create or Update) ──
  const handleSave = useCallback(() => {
    const error = validateForm(form);
    if (error) {
      pushToast(error, 'error');
      return;
    }

    if (editingBlog) {
      handleUpdate();
    } else {
      handleCreate();
    }
  }, [form, editingBlog, handleUpdate, handleCreate, pushToast]);

  // ── DELETE operation ──
  const handleDelete = useCallback(async () => {
    const { error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', deleteConfirm);

    if (error) {
      console.error('Delete error:', error);
      pushToast('Failed to delete post', 'error');
    } else {
      pushToast('Post deleted successfully!');
      await refreshBlogs();
    }
    setDeleteConfirm(null);
  }, [deleteConfirm, refreshBlogs, pushToast]);

  // ─────────────────────────────────────────
  // JSX — structure and className unchanged
  // ─────────────────────────────────────────
  return (
    <div className="flex flex-col gap-6">
      <Toast toasts={toasts} />

      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron">Manage Blog</h2>
          <p className="text-sm text-zinc-500 mt-1">Create, edit, and manage blog posts.</p>
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5"
        >
          <IconPlus size={18} /> Add Post
        </button>
      </div>

      {/* ── Bonus: Search / Filter / Sort bar ── */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="flex-1 min-w-[180px] bg-[#1E1E1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-[#1E1E1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="bg-[#1E1E1E] border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
        >
          <option value="latest">Latest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      {/* Blog Table */}
      <div className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-zinc-500">
            <p>Loading posts…</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-zinc-800 text-zinc-400 text-xs uppercase tracking-wider">
                  <th className="p-4">Title</th>
                  <th className="p-4">Author</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedBlogs.map((blog, i) => (
                  <motion.tr
                    key={blog.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {blog.image && (
                          <img
                            src={blog.image}
                            alt=""
                            className="w-10 h-10 rounded-lg object-cover border border-zinc-700"
                          />
                        )}
                        <div>
                          <span className="text-white font-medium text-sm">{blog.title}</span>
                          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 max-w-[250px]">{blog.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-300 text-sm">{blog.author}</td>
                    <td className="p-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 font-mono">
                        {blog.category}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-400 text-sm font-mono">{blog.date}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEdit(blog)}
                          className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all"
                        >
                          <IconEdit size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(blog.id)}
                          className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                          <IconTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && displayedBlogs.length === 0 && (
          <div className="p-12 text-center text-zinc-500">
            <IconArticle size={48} className="mx-auto mb-4 text-zinc-600" />
            {blogs.length === 0 ? (
              <p>No blog posts yet. Click "Add Post" to create one.</p>
            ) : (
              <p>No posts match your search or filter.</p>
            )}
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 max-w-sm w-full"
            >
              <h3 className="text-lg font-bold text-white mb-2">Delete Blog Post?</h3>
              <p className="text-sm text-zinc-400 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-400 transition-colors text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add / Edit Blog Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">
                  {editingBlog ? 'Edit Post' : 'Add New Post'}
                </h3>
                <button onClick={closeModal} className="text-zinc-400 hover:text-white">
                  <IconX size={20} />
                </button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">
                    Title *
                  </label>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Blog post title..."
                  />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">
                    Excerpt
                  </label>
                  <input
                    value={form.excerpt}
                    onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Short summary..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">
                      Author
                    </label>
                    <input
                      value={form.author}
                      onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">
                      Category
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                      className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    >
                      <option>Foundation</option>
                      <option>Growth</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">
                    Image URL
                  </label>
                  <input
                    value={form.image}
                    onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {form.image && isValidUrl(form.image) && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="mt-3 rounded-xl border border-zinc-700 h-32 w-full object-cover"
                    />
                  )}
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">
                    Content (Markdown-like)
                  </label>
                  <textarea
                    value={form.content}
                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                    rows={8}
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none font-mono"
                    placeholder="### Section Title&#10;Paragraph content..."
                  />
                </div>

                <button
                  onClick={handleSave}
                  className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2"
                >
                  {editingBlog ? 'Save Changes' : 'Publish Post'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}