import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconPlus, IconEdit, IconTrash, IconX, IconArticle } from '@tabler/icons-react';

const STORAGE_KEY = 'finlitgo_blogs';

function getInitialBlogs() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return JSON.parse(saved);
  return [
    { id: 1, title: 'How to Build an Emergency Fund in 6 Months', excerpt: 'An emergency fund is a financial safety net designed to cover unexpected expenses...', author: 'Admin FinlitGo', date: 'Oct 12', timeToRead: '4 min read', category: 'Foundation', image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6?w=800&q=80', content: 'An emergency fund is a financial safety net designed to cover unexpected expenses such as medical bills, urgent car repairs, or sudden job loss.\n\n### Why is an Emergency Fund Critical?\nLife is unpredictable. Having liquid cash readily available gives you peace of mind.\n\n### Step 1: Set a Realistic Goal\nStart small. Aim for one month of essential expenses.' },
    { id: 2, title: 'Understanding Crypto: A Beginner\'s Guide', excerpt: 'Cryptocurrency has taken the financial world by storm, but what exactly is it?', author: 'Doctor Solking', date: 'Oct 10', timeToRead: '8 min read', category: 'Advanced', image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&q=80', content: 'Cryptocurrency has taken the financial world by storm.\n\n### What is Crypto?\nA digital or virtual currency that uses cryptography for security.\n\n### How to Start?\nBegin with established coins like Bitcoin or Ethereum.' },
    { id: 3, title: 'The 50/30/20 Rule Explained', excerpt: 'Budgeting doesn\'t have to be complicated. Learn how the 50/30/20 rule can simplify your finances.', author: 'Admin FinlitGo', date: 'Oct 05', timeToRead: '5 min read', category: 'Foundation', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', content: 'The 50/30/20 rule is a simple budgeting framework.\n\n### 50% Needs\nEssential expenses like rent, groceries, and utilities.\n\n### 30% Wants\nNon-essentials like dining out and entertainment.\n\n### 20% Savings\nSavings and debt repayment.' },
    { id: 4, title: 'Why You Need to Start Investing Early', excerpt: 'Compound interest is the eighth wonder of the world. Find out why starting early is crucial.', author: 'Snickers', date: 'Sep 28', timeToRead: '6 min read', category: 'Growth', image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80', content: 'Compound interest is powerful.\n\n### The Power of Time\nThe earlier you start, the more your money grows.\n\n### Start Small\nYou don\'t need millions to begin investing.' }
  ];
}

export default function AdminBlogCRUD() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [form, setForm] = useState({ title: '', excerpt: '', author: 'Admin FinlitGo', category: 'Foundation', image: '', content: '', timeToRead: '5 min read' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = () => {
    const data = getInitialBlogs();
    setBlogs(data);
    setLoading(false);
  };

  const openAdd = () => {
    setEditingBlog(null);
    setForm({ title: '', excerpt: '', author: 'Admin FinlitGo', category: 'Foundation', image: '', content: '', timeToRead: '5 min read' });
    setShowModal(true);
  };

  const openEdit = (blog) => {
    setEditingBlog(blog);
    setForm({ 
      title: blog.title, 
      excerpt: blog.excerpt, 
      author: blog.author, 
      category: blog.category, 
      image: blog.thumbnail_url || blog.image || '', 
      content: blog.content || '', 
      timeToRead: blog.time_to_read || blog.timeToRead || '5 min read' 
    });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    
    let updatedBlogs;
    if (editingBlog) {
      updatedBlogs = blogs.map(b => b.id === editingBlog.id ? { ...b, ...form } : b);
    } else {
      updatedBlogs = [{ 
        id: Date.now(), 
        ...form, 
        date: new Date().toLocaleDateString('en-US', {month: 'short', day: '2-digit'}) 
      }, ...blogs];
    }
    
    setBlogs(updatedBlogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter(b => b.id !== id);
    setBlogs(updatedBlogs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
    setDeleteConfirm(null);
  };


  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="text-2xl font-bold font-orbitron">Manage Blog</h2>
          <p className="text-sm text-zinc-500 mt-1">Create, edit, and manage blog posts.</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all hover:-translate-y-0.5">
          <IconPlus size={18} /> Add Post
        </button>
      </div>

      {/* Blog Table */}
      <div className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl overflow-hidden">
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
              {blogs.map((blog, i) => (
                <motion.tr 
                  key={blog.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-zinc-800/50 hover:bg-zinc-900/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {blog.image && <img src={blog.image} alt="" className="w-10 h-10 rounded-lg object-cover border border-zinc-700" />}
                      <div>
                        <span className="text-white font-medium text-sm">{blog.title}</span>
                        <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 max-w-[250px]">{blog.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300 text-sm">{blog.author}</td>
                  <td className="p-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-violet-500/10 text-violet-400 font-mono">{blog.category}</span>
                  </td>
                  <td className="p-4 text-zinc-400 text-sm font-mono">{blog.date}</td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(blog)} className="p-2 text-zinc-400 hover:text-violet-400 hover:bg-violet-500/10 rounded-lg transition-all">
                        <IconEdit size={16} />
                      </button>
                      <button onClick={() => setDeleteConfirm(blog.id)} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <IconTrash size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {blogs.length === 0 && (
          <div className="p-12 text-center text-zinc-500">
            <IconArticle size={48} className="mx-auto mb-4 text-zinc-600" />
            <p>No blog posts yet. Click "Add Post" to create one.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setDeleteConfirm(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} className="bg-[#1E1E1E] border border-zinc-800 rounded-2xl p-6 max-w-sm w-full">
              <h3 className="text-lg font-bold text-white mb-2">Delete Blog Post?</h3>
              <p className="text-sm text-zinc-400 mb-6">This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2.5 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition-colors text-sm font-medium">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2.5 bg-red-500 text-white rounded-xl hover:bg-red-400 transition-colors text-sm font-medium">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Blog Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#1A1A1A] border border-zinc-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-white">{editingBlog ? 'Edit Post' : 'Add New Post'}</h3>
                <button onClick={() => setShowModal(false)} className="text-zinc-400 hover:text-white"><IconX size={20} /></button>
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({...f, title: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="Blog post title..." />
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Excerpt</label>
                  <input value={form.excerpt} onChange={e => setForm(f => ({...f, excerpt: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="Short summary..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Author</label>
                    <input value={form.author} onChange={e => setForm(f => ({...f, author: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" />
                  </div>
                  <div>
                    <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors">
                      <option>Foundation</option>
                      <option>Growth</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Image URL</label>
                  <input value={form.image} onChange={e => setForm(f => ({...f, image: e.target.value}))} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors" placeholder="https://images.unsplash.com/..." />
                  {form.image && <img src={form.image} alt="Preview" className="mt-3 rounded-xl border border-zinc-700 h-32 w-full object-cover" />}
                </div>

                <div>
                  <label className="text-xs text-zinc-400 uppercase tracking-wider mb-1 block">Content (Markdown-like)</label>
                  <textarea value={form.content} onChange={e => setForm(f => ({...f, content: e.target.value}))} rows={8} className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-violet-500 transition-colors resize-none font-mono" placeholder="### Section Title\nParagraph content..." />
                </div>

                <button onClick={handleSave} className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-400 text-white font-bold uppercase tracking-wider text-sm rounded-xl hover:shadow-[0_4px_20px_rgba(124,58,237,0.4)] transition-all mt-2">
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
