'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Save, X, Upload, Star } from 'lucide-react';
import db from '@/lib/db';
import { uploadImage } from '@/lib/db/upload';
import { Brand } from '@/lib/db/types';
import ImageUpload from '@/components/ImageUpload';

export default function AdminBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Partial<Brand> | null>(null);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await db.getBrands();
      setBrands(data);
    } catch (err) {
      console.error('Error fetching brands:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const handleCreateNew = () => {
    setSelectedBrand({
      name: '',
      slug: '',
      logo_url: '',
      seo_title: '',
      seo_description: ''
    });
    setIsModalOpen(true);
  };

  const handleEditBrand = (brand: Brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleDeleteBrand = async (id: string, name: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa hãng "${name}"? Các dòng xe của hãng này có thể bị ảnh hưởng.`)) {
      return;
    }

    try {
      setActionLoading(true);
      await db.deleteBrand(id);
      alert('Đã xóa hãng xe thành công.');
      loadBrands();
    } catch (err) {
      alert('Lỗi khi xóa hãng xe.');
    } finally {
      setActionLoading(false);
    }
  };



  const handleSaveBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedBrand || !selectedBrand.name?.trim()) return;

    setActionLoading(true);
    try {
      const slug = selectedBrand.slug || selectedBrand.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
      const brandData = {
        ...selectedBrand,
        slug
      } as Omit<Brand, 'id'> & { id?: string };

      // Log payload
      console.log("Saving brand payload:", brandData);

      await db.saveBrand(brandData);
      
      // Success alert
      alert('Đã upload và lưu URL ảnh vào database');
      setIsModalOpen(false);
      loadBrands();
    } catch (err: any) {
      alert('Lỗi lưu hãng xe: ' + (err.message || err));
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
            Quản Lý Hãng Xe
          </h1>
          <p className="text-brand-gray text-xs mt-1">
            Thêm mới, sửa đổi logo thương hiệu xe máy và cấu hình các thẻ SEO meta tương ứng.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center space-x-2 bg-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-brand-red/90 transition-all cursor-pointer shadow-md shadow-brand-red/10"
          style={{ minHeight: '44px' }}
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Thêm hãng xe mới</span>
        </button>
      </div>

      {/* Grid Brands */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách hãng...</span>
        </div>
      ) : brands.length === 0 ? (
        <div className="py-20 text-center text-brand-gray text-xs bg-white rounded-xl border border-gray-150 shadow-sm">
          Chưa có thương hiệu xe máy nào được đăng ký.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {brands.map((b) => (
            <div key={b.id} className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm flex flex-col justify-between items-center group relative hover:shadow-md transition-all duration-200">
              <div className="w-20 h-20 flex items-center justify-center bg-brand-light rounded-lg overflow-hidden border border-gray-100 p-2">
                {b.logo_url ? (
                  <img
                    src={b.logo_url}
                    alt={b.name}
                    className="max-w-full max-h-full object-contain"
                  />
                ) : (
                  <span className="text-[10px] text-brand-gray font-bold uppercase tracking-wider">No Logo</span>
                )}
              </div>

              <div className="text-center mt-4">
                <span className="font-bevietnam font-extrabold text-brand-dark block text-xs uppercase tracking-wider">{b.name}</span>
                <span className="text-[9px] text-brand-gray block mt-0.5 font-mono">{b.slug}</span>
              </div>

              {/* Actions Panel */}
              <div className="flex items-center justify-center space-x-2 mt-4 pt-3 border-t border-gray-100 w-full">
                <button
                  onClick={() => handleEditBrand(b)}
                  className="p-1.5 hover:bg-brand-red/10 text-brand-dark hover:text-brand-red rounded transition-all cursor-pointer"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteBrand(b.id, b.name)}
                  className="p-1.5 hover:bg-rose-50 text-rose-500 rounded transition-all cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && selectedBrand && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider">
                  {selectedBrand.id ? 'Sửa thông tin Hãng xe' : 'Thêm Hãng xe mới'}
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
            <form onSubmit={handleSaveBrand} className="p-6 space-y-4">
              
              {/* Brand Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Tên thương hiệu *</label>
                <input
                  type="text"
                  value={selectedBrand.name || ''}
                  onChange={(e) => setSelectedBrand({ ...selectedBrand, name: e.target.value })}
                  placeholder="Ví dụ: Honda, Yamaha"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                  required
                />
              </div>

              {/* Brand Slug */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest">Slug đường dẫn (Để trống tự động tạo)</label>
                <input
                  type="text"
                  value={selectedBrand.slug || ''}
                  onChange={(e) => setSelectedBrand({ ...selectedBrand, slug: e.target.value })}
                  placeholder="honda, yamaha"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Logo Upload */}
              <ImageUpload
                value={selectedBrand.logo_url || ''}
                onChange={(url) => setSelectedBrand(prev => prev ? { ...prev, logo_url: url } : null)}
                folder="brands"
                label="Logo thương hiệu"
              />

              {/* SEO Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest font-bold">SEO Title</label>
                <input
                  type="text"
                  value={selectedBrand.seo_title || ''}
                  onChange={(e) => setSelectedBrand({ ...selectedBrand, seo_title: e.target.value })}
                  placeholder="Tiêu đề SEO của thương hiệu"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* SEO Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest font-bold">SEO Description</label>
                <textarea
                  value={selectedBrand.seo_description || ''}
                  onChange={(e) => setSelectedBrand({ ...selectedBrand, seo_description: e.target.value })}
                  placeholder="Mô tả SEO của thương hiệu..."
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
