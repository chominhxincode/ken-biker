'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Edit3, Trash2, Save, X, Upload, FileText, Globe } from 'lucide-react';
import db from '@/lib/db';
import { uploadImage } from '@/lib/db/upload';
import { Post } from '@/lib/db/types';

export default function AdminBlog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Partial<Post> | null>(null);
  const [tagsInput, setTagsInput] = useState('');

  // File Upload State
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingContentImage, setUploadingContentImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const contentImageInputRef = useRef<HTMLInputElement>(null);
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await db.getPosts();
      setPosts(data);
    } catch (err) {
      console.error('Error fetching blog posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreateNew = () => {
    setSelectedPost({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      content_markdown: '',
      content_html: '',
      content_type: 'markdown',
      image_url: '',
      seo_title: '',
      seo_description: '',
      tags: [],
      is_featured: false,
      is_visible: true
    });
    setTagsInput('');
    setIsModalOpen(true);
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost({
      ...post,
      content_type: post.content_type || 'markdown',
      content_markdown: post.content_markdown || (post.content_type === 'markdown' || !post.content_type ? post.content : ''),
      content_html: post.content_html || (post.content_type === 'html' ? post.content : ''),
      is_featured: post.is_featured ?? false,
      is_visible: post.is_visible ?? true,
      tags: post.tags || []
    });
    setTagsInput(post.tags ? post.tags.join(', ') : '');
    setIsModalOpen(true);
  };

  const handleDeletePost = async (id: string, title: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      return;
    }

    try {
      setActionLoading(true);
      await db.deletePost(id);
      alert('Đã xóa bài viết thành công.');
      loadPosts();
    } catch (err) {
      alert('Lỗi khi xóa bài viết.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const url = await uploadImage(file, 'posts');
      setSelectedPost(prev => prev ? { ...prev, image_url: url } : null);
    } catch (err) {
      alert('Lỗi tải ảnh bài viết lên hệ thống.');
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleContentImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingContentImage(true);
    try {
      const url = await uploadImage(file, 'posts');
      
      const textarea = contentTextareaRef.current;
      const currentType = selectedPost?.content_type || 'markdown';
      const markup = currentType === 'html' ? `<img src="${url}" alt="" />` : `![image](${url})`;
      
      if (!textarea) {
        setSelectedPost(prev => {
          if (!prev) return null;
          const oldVal = currentType === 'html' ? (prev.content_html || '') : (prev.content_markdown || '');
          const newVal = oldVal ? `${oldVal}\n${markup}` : markup;
          return currentType === 'html' 
            ? { ...prev, content_html: newVal }
            : { ...prev, content_markdown: newVal };
        });
      } else {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const oldVal = currentType === 'html' ? (selectedPost?.content_html || '') : (selectedPost?.content_markdown || '');
        const newVal = oldVal.substring(0, start) + markup + oldVal.substring(end);
        
        setSelectedPost(prev => {
          if (!prev) return null;
          return currentType === 'html'
            ? { ...prev, content_html: newVal }
            : { ...prev, content_markdown: newVal };
        });
        
        setTimeout(() => {
          textarea.focus();
          const newCursorPos = start + markup.length;
          textarea.setSelectionRange(newCursorPos, newCursorPos);
        }, 100);
      }
      alert('Đã tải ảnh lên và chèn mã vào bài viết!');
    } catch (err) {
      alert('Lỗi tải ảnh lên.');
    } finally {
      setUploadingContentImage(false);
      if (contentImageInputRef.current) contentImageInputRef.current.value = '';
    }
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPost || !selectedPost.title?.trim()) {
      alert('Vui lòng điền tiêu đề bài viết.');
      return;
    }

    const currentType = selectedPost.content_type || 'markdown';
    const finalContent = currentType === 'html' 
      ? (selectedPost.content_html || '') 
      : (selectedPost.content_markdown || '');

    if (!finalContent.trim()) {
      alert('Vui lòng nhập nội dung bài viết.');
      return;
    }

    setActionLoading(true);
    try {
      const slug = selectedPost.slug || selectedPost.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const postData = {
        ...selectedPost,
        content: finalContent,
        content_markdown: selectedPost.content_markdown || '',
        content_html: selectedPost.content_html || '',
        tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
        slug
      } as Omit<Post, 'id'> & { id?: string };

      await db.savePost(postData);
      alert('Lưu bài viết thành công.');
      setIsModalOpen(false);
      loadPosts();
    } catch (err: any) {
      alert('Lỗi lưu bài viết: ' + (err.message || err));
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
            Quản Lý Bài Viết Blog
          </h1>
          <p className="text-brand-gray text-xs mt-1">
            Đăng bài viết mới, cập nhật tin tức thị trường xe máy, kinh nghiệm bảo dưỡng xe và hướng dẫn chọn xe.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center space-x-2 bg-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-brand-red/90 transition-all cursor-pointer shadow-md shadow-brand-red/10"
          style={{ minHeight: '44px' }}
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Viết bài mới</span>
        </button>
      </div>

      {/* Grid Posts */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách bài viết...</span>
        </div>
      ) : posts.length === 0 ? (
        <div className="py-20 text-center text-brand-gray text-xs bg-white rounded-xl border border-gray-150 shadow-sm">
          Chưa có bài viết blog nào được tạo.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <div key={p.id} className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group">
              <div>
                <div className="w-full aspect-[16/9] bg-brand-light relative border-b border-gray-100 overflow-hidden">
                  {p.image_url ? (
                    <img src={p.image_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FileText className="w-8 h-8" />
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-bevietnam font-extrabold text-sm text-brand-dark leading-snug line-clamp-2 uppercase">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="text-brand-gray text-xs line-clamp-3 leading-relaxed">
                      {p.excerpt}
                    </p>
                  )}
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-gray-100 flex items-center justify-between mt-3 bg-gray-50/50">
                <span className="text-[10px] text-brand-gray font-mono">{p.slug}</span>
                <div className="flex items-center space-x-2.5">
                  <button
                    onClick={() => handleEditPost(p)}
                    className="p-1.5 hover:bg-brand-red/10 text-brand-dark hover:text-brand-red rounded transition-all cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePost(p.id, p.title)}
                    className="p-1.5 hover:bg-rose-50 text-rose-500 rounded transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Modal (Max-Width Large for writing space) */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <FileText className="w-4.5 h-4.5 text-brand-red" />
                  <span>{selectedPost.id ? 'Biên Tập Bài Viết Blog' : 'Đăng Bài Viết Blog Mới'}</span>
                </h2>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSavePost} className="flex-1 overflow-y-auto p-6 space-y-5">
              
              {/* Blog Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  value={selectedPost.title || ''}
                  onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
                  placeholder="Tiêu đề tin tức hoặc hướng dẫn chọn xe..."
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                  required
                />
              </div>

              {/* Slug */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Slug đường dẫn (Để trống tự động tạo)</label>
                <input
                  type="text"
                  value={selectedPost.slug || ''}
                  onChange={(e) => setSelectedPost({ ...selectedPost, slug: e.target.value })}
                  placeholder="huong-dan-chon-xe-tay-ga"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Image Upload Column */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ảnh đại diện bài viết</label>
                  <div className="w-full aspect-[16/9] bg-brand-light border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-2 relative">
                    {selectedPost.image_url ? (
                      <img src={selectedPost.image_url} alt="Post Cover" className="w-full h-full object-cover" />
                    ) : (
                      <FileText className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-grow bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer"
                      style={{ minHeight: '36px' }}
                    >
                      <Upload className="w-3.5 h-3.5 animate-bounce-slow" />
                      <span>Tải ảnh</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const url = prompt('Nhập URL ảnh bài viết:');
                        if (url) setSelectedPost({ ...selectedPost, image_url: url.trim() });
                      }}
                      className="border border-gray-200 hover:border-brand-dark text-brand-dark text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider cursor-pointer"
                      style={{ minHeight: '36px' }}
                    >
                      Dán URL
                    </button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {uploadingImage && (
                    <p className="text-[9px] text-brand-red font-bold animate-pulse">Đang tải ảnh lên...</p>
                  )}
                </div>

                {/* Excerpt */}
                <div className="md:col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Tóm tắt ngắn (Excerpt)</label>
                  <textarea
                    value={selectedPost.excerpt || ''}
                    onChange={(e) => setSelectedPost({ ...selectedPost, excerpt: e.target.value })}
                    placeholder="Mô tả tóm tắt nội dung bài viết hiển thị ở trang tin tức tổng hợp..."
                    rows={4}
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y font-sans"
                  ></textarea>
                </div>
              </div>

              {/* Tags Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Tags (Cách nhau bằng dấu phẩy)</label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Ví dụ: Honda, Vision, Kinh nghiệm mua xe, Bảo dưỡng"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Display & Featured flags */}
              <div className="flex flex-wrap items-center gap-6 bg-brand-light p-4 rounded-xl border border-gray-150">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="post-visible"
                    checked={selectedPost.is_visible !== false}
                    onChange={(e) => setSelectedPost({ ...selectedPost, is_visible: e.target.checked })}
                    className="rounded border-gray-300 text-brand-red focus:ring-brand-red h-4 w-4"
                  />
                  <label htmlFor="post-visible" className="text-xs font-bold text-brand-dark cursor-pointer select-none">
                    Hiển thị bài viết ngoài Client
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="post-featured"
                    checked={selectedPost.is_featured === true}
                    onChange={(e) => setSelectedPost({ ...selectedPost, is_featured: e.target.checked })}
                    className="rounded border-gray-300 text-brand-red focus:ring-brand-red h-4 w-4"
                  />
                  <label htmlFor="post-featured" className="text-xs font-bold text-brand-dark cursor-pointer select-none">
                    Đặt làm bài viết nổi bật (Tin chính)
                  </label>
                </div>
              </div>

              {/* Mode & Uploading content image block */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-gray-150 pb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block mr-2">Chế độ soạn thảo:</span>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(prev => prev ? { ...prev, content_type: 'markdown' } : null)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                      (selectedPost.content_type || 'markdown') === 'markdown'
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPost(prev => prev ? { ...prev, content_type: 'html' } : null)}
                    className={`px-3 py-1.5 rounded text-xs font-bold transition-all uppercase tracking-wider cursor-pointer ${
                      selectedPost.content_type === 'html'
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    HTML Code
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => contentImageInputRef.current?.click()}
                    className="bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                    style={{ minHeight: '36px' }}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Chèn ảnh vào nội dung</span>
                  </button>
                  <input
                    type="file"
                    ref={contentImageInputRef}
                    onChange={handleContentImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  {uploadingContentImage && (
                    <span className="text-[9px] text-brand-red font-bold animate-pulse">Đang tải ảnh...</span>
                  )}
                </div>
              </div>

              {/* Content textarea depending on type selection */}
              {(selectedPost.content_type || 'markdown') === 'markdown' ? (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Nội dung Markdown</label>
                  <textarea
                    ref={contentTextareaRef}
                    value={selectedPost.content_markdown || ''}
                    onChange={(e) => setSelectedPost({ ...selectedPost, content_markdown: e.target.value })}
                    placeholder="Nhập nội dung bài viết bằng mã Markdown..."
                    rows={12}
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark font-mono leading-relaxed resize-y"
                    required
                  ></textarea>
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Nhập HTML trực tiếp</label>
                  <textarea
                    ref={contentTextareaRef}
                    value={selectedPost.content_html || ''}
                    onChange={(e) => setSelectedPost({ ...selectedPost, content_html: e.target.value })}
                    placeholder="Nhập mã HTML trực tiếp..."
                    rows={12}
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-3 text-xs text-brand-dark font-mono leading-relaxed resize-y"
                    required
                  ></textarea>
                </div>
              )}

              {/* SEO Block */}
              <div className="bg-brand-light p-4 rounded-xl border border-gray-150 space-y-3">
                <span className="text-[10px] font-bold text-brand-red uppercase tracking-widest block flex items-center space-x-1.5">
                  <Globe className="w-4 h-4" />
                  <span>Cấu hình SEO Meta</span>
                </span>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-brand-gray uppercase tracking-widest">SEO Meta Title (Để trống tự động lấy tên bài viết)</label>
                    <input
                      type="text"
                      value={selectedPost.seo_title || ''}
                      onChange={(e) => setSelectedPost({ ...selectedPost, seo_title: e.target.value })}
                      placeholder="Tiêu đề bài viết chuẩn Google"
                      className="w-full bg-white border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2 text-xs text-brand-dark"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-brand-gray uppercase tracking-widest">SEO Meta Description</label>
                    <input
                      type="text"
                      value={selectedPost.seo_description || ''}
                      onChange={(e) => setSelectedPost({ ...selectedPost, seo_description: e.target.value })}
                      placeholder="Tóm tắt ngắn bài viết hiển thị trên Google..."
                      className="w-full bg-white border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2 text-xs text-brand-dark"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-150 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-200 text-brand-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                  style={{ minHeight: '40px' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition-all cursor-pointer shadow-md shadow-brand-red/10"
                  style={{ minHeight: '40px' }}
                >
                  <span>{actionLoading ? 'Đang lưu...' : 'Lưu bài viết'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
