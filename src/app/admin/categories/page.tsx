'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Save, X, Upload, Layers } from 'lucide-react';
import db from '@/lib/db';
import { uploadImage } from '@/lib/db/upload';
import { Category } from '@/lib/db/types';
import ImageUpload from '@/components/ImageUpload';

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Partial<Category> | null>(null);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const data = await db.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleCreateNew = () => {
    setSelectedCategory({
      name: '',
      slug: '',
      image_url: '',
      sort_order: 0,
      seo_title: '',
      seo_description: ''
    });
    setIsModalOpen(true);
  };

  const handleEditCategory = (cat: Category) => {
    setSelectedCategory(cat);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa danh mục dòng xe "${name}"? Thao tác này không thể hoàn tác.`)) {
      return;
    }

    try {
      setActionLoading(true);
      await db.deleteCategory(id);
      alert('Đã xóa phân loại thành công.');
      loadCategories();
    } catch (err) {
      alert('Lỗi khi xóa phân loại dòng xe.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory || !selectedCategory.name?.trim()) return;

    setActionLoading(true);
    try {
      const slug = selectedCategory.slug || selectedCategory.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const catData = {
        ...selectedCategory,
        slug,
        sort_order: Number(selectedCategory.sort_order || 0)
      } as Omit<Category, 'id'> & { id?: string };

      // Log payload
      console.log("Saving category payload:", catData);

      await db.saveCategory(catData);
      
      // Success alert
      alert('Đã upload và lưu URL ảnh vào database');
      setIsModalOpen(false);
      loadCategories();
    } catch (err: any) {
      alert('Lỗi lưu phân loại: ' + (err.message || err));
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
            Quản Lý Phân Loại Dòng Xe
          </h1>
          <p className="text-brand-gray text-xs mt-1">
            Thiết kế danh mục các loại xe máy (như Xe tay ga, Xe số, Côn tay, Xe điện) kèm theo hình ảnh, mô tả SEO và thứ tự sắp xếp hiển thị.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center space-x-2 bg-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-brand-red/90 transition-all cursor-pointer shadow-md shadow-brand-red/10"
          style={{ minHeight: '44px' }}
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Thêm phân loại mới</span>
        </button>
      </div>

      {/* Categories Table View */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách dòng xe...</span>
        </div>
      ) : categories.length === 0 ? (
        <div className="py-20 text-center text-brand-gray text-xs bg-white rounded-xl border border-gray-150 shadow-sm">
          Chưa có phân loại xe máy nào được đăng ký.
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-[10px] font-extrabold uppercase text-brand-gray tracking-wider">
                  <th className="p-4 w-20 text-center">Hình ảnh</th>
                  <th className="p-4">Tên phân loại dòng xe</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4 text-center w-32">Thứ tự hiển thị</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {categories.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-55 transition-colors">
                    <td className="p-4 text-center">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-brand-light flex items-center justify-center border border-gray-200 mx-auto p-1">
                        {c.image_url ? (
                          <img src={c.image_url} alt={c.name} className="max-w-full max-h-full object-contain" />
                        ) : (
                          <Layers className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="p-4 font-bold text-brand-dark text-sm">{c.name}</td>
                    <td className="p-4 font-mono text-brand-gray">{c.slug}</td>
                    <td className="p-4 text-center font-mono font-bold text-brand-dark">{c.sort_order}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditCategory(c)}
                          className="p-2 hover:bg-brand-red/10 text-brand-dark hover:text-brand-red rounded transition-all cursor-pointer"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteCategory(c.id, c.name)}
                          className="p-2 hover:bg-rose-50 text-rose-500 rounded transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && selectedCategory && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider">
                  {selectedCategory.id ? 'Sửa thông tin Phân loại' : 'Thêm Phân loại mới'}
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
            <form onSubmit={handleSaveCategory} className="p-6 space-y-4">
              
              {/* Category Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Tên phân loại dòng xe *</label>
                <input
                  type="text"
                  value={selectedCategory.name || ''}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
                  placeholder="Ví dụ: Xe tay ga, Xe côn tay"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                  required
                />
              </div>

              {/* Category Slug */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Slug (Để trống tự động tạo)</label>
                <input
                  type="text"
                  value={selectedCategory.slug || ''}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, slug: e.target.value })}
                  placeholder="xe-tay-ga, xe-con-tay"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Category Image */}
              <ImageUpload
                value={selectedCategory.image_url || ''}
                onChange={(url) => setSelectedCategory(prev => prev ? { ...prev, image_url: url } : null)}
                folder="categories"
                label="Ảnh đại diện phân loại"
                placeholderIcon={<Layers className="w-6 h-6 text-gray-400" />}
              />

              {/* Sort Order */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest font-bold">Thứ tự hiển thị (Số càng nhỏ xếp trước)</label>
                <input
                  type="number"
                  value={selectedCategory.sort_order || 0}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, sort_order: Number(e.target.value) })}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* SEO Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest font-bold">SEO Title</label>
                <input
                  type="text"
                  value={selectedCategory.seo_title || ''}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, seo_title: e.target.value })}
                  placeholder="Tiêu đề SEO của phân loại dòng xe"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* SEO Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest font-bold">SEO Description</label>
                <textarea
                  value={selectedCategory.seo_description || ''}
                  onChange={(e) => setSelectedCategory({ ...selectedCategory, seo_description: e.target.value })}
                  placeholder="Mô tả SEO của phân loại dòng xe..."
                  rows={2}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y"
                ></textarea>
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
                  <span>{actionLoading ? 'Đang lưu...' : 'Lưu lại'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
