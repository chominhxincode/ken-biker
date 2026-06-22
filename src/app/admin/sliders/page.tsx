'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit3, Trash2, Save, X, Upload, ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';
import db from '@/lib/db';
import { uploadImage } from '@/lib/db/upload';
import { Slider } from '@/lib/db/types';
import ImageUpload from '@/components/ImageUpload';

export default function AdminSliders() {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Modal Control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState<Partial<Slider> | null>(null);

  const loadSliders = async () => {
    try {
      setLoading(true);
      const data = await db.getSliders();
      // Sort chronologically/numerically
      data.sort((a, b) => a.sort_order - b.sort_order);
      setSliders(data);
    } catch (err) {
      console.error('Error fetching sliders:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSliders();
  }, []);

  const handleCreateNew = () => {
    setSelectedSlider({
      title: '',
      subtitle: '',
      image_desktop_url: '',
      image_mobile_url: '',
      cta_link: '',
      cta_text: 'Xem chi tiết',
      sort_order: sliders.length,
      is_visible: true
    });
    setIsModalOpen(true);
  };

  const handleEditSlider = (slider: Slider) => {
    setSelectedSlider(slider);
    setIsModalOpen(true);
  };

  const handleDeleteSlider = async (id: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa Banner slider này?')) {
      return;
    }

    try {
      setActionLoading(true);
      await db.deleteSlider(id);
      alert('Đã xóa slider thành công.');
      loadSliders();
    } catch (err) {
      alert('Lỗi khi xóa slider.');
    } finally {
      setActionLoading(false);
    }
  };



  const moveSliderOrder = async (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === sliders.length - 1) return;

    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const items = [...sliders];
    
    // Swap
    const temp = items[idx];
    items[idx] = items[targetIdx];
    items[targetIdx] = temp;

    setActionLoading(true);
    try {
      // Save all updated positions
      const saves = items.map(async (item, index) => {
        return db.saveSlider({
          ...item,
          sort_order: index
        });
      });
      await Promise.all(saves);
      loadSliders();
    } catch (err) {
      alert('Lỗi cập nhật thứ tự hiển thị.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveSlider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlider || !selectedSlider.image_desktop_url) {
      alert('Vui lòng chọn hoặc nhập ảnh Banner máy tính (Desktop Image URL).');
      return;
    }

    setActionLoading(true);
    try {
      const sliderData = {
        ...selectedSlider,
        sort_order: Number(selectedSlider.sort_order || 0)
      } as Omit<Slider, 'id'> & { id?: string };

      // Log payload
      console.log("Saving slider payload:", sliderData);

      await db.saveSlider(sliderData);
      
      // Success alert
      alert('Đã upload và lưu URL ảnh vào database');
      setIsModalOpen(false);
      loadSliders();
    } catch (err: any) {
      alert('Lỗi lưu slider: ' + (err.message || err));
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
            Quản Lý Banners Slider (Trang Chủ)
          </h1>
          <p className="text-brand-gray text-xs mt-1">
            Cấu hình các slider trình chiếu lớn ở đầu trang chủ, hỗ trợ tải ảnh riêng cho Desktop và Mobile để tối ưu hóa trải nghiệm khách hàng.
          </p>
        </div>
        <button
          onClick={handleCreateNew}
          className="flex items-center space-x-2 bg-brand-red text-white text-xs font-bold px-4 py-2.5 rounded-lg hover:bg-brand-red/90 transition-all cursor-pointer shadow-md shadow-brand-red/10"
          style={{ minHeight: '44px' }}
        >
          <Plus className="w-4.5 h-4.5" />
          <span>Thêm Banner mới</span>
        </button>
      </div>

      {/* Main List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
          <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách banners...</span>
        </div>
      ) : sliders.length === 0 ? (
        <div className="py-20 text-center text-brand-gray text-xs bg-white rounded-xl border border-gray-150 shadow-sm">
          Chưa cấu hình slide banner trang chủ nào.
        </div>
      ) : (
        <div className="space-y-4">
          {sliders.map((s, idx) => (
            <div key={s.id} className="bg-white rounded-xl border border-gray-150 p-5 shadow-sm flex flex-col md:flex-row items-center gap-5 justify-between hover:shadow-md transition-all duration-200">
              {/* Image Preview Container */}
              <div className="w-full md:w-56 aspect-[21/9] rounded-lg overflow-hidden bg-brand-light border border-gray-200 relative shrink-0">
                {s.image_desktop_url ? (
                  <img src={s.image_desktop_url} alt={s.title || 'Slider'} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Text content details */}
              <div className="flex-grow space-y-1.5 text-center md:text-left min-w-0">
                <div className="flex flex-wrap items-center gap-2 justify-center md:justify-start">
                  <span className="text-[10px] bg-brand-red/10 text-brand-red border border-brand-red/15 px-2 py-0.5 rounded font-extrabold uppercase tracking-wider inline-block">
                    Vị trí thứ {idx + 1} (Thứ tự: {s.sort_order})
                  </span>
                  {s.is_visible !== false ? (
                    <span className="text-[10px] bg-emerald-50 text-emerald-600 border border-emerald-250 px-2 py-0.5 rounded font-bold uppercase tracking-wider inline-block">
                      Đang hiển thị
                    </span>
                  ) : (
                    <span className="text-[10px] bg-gray-100 text-gray-500 border border-gray-250 px-2 py-0.5 rounded font-bold uppercase tracking-wider inline-block">
                      Đang ẩn
                    </span>
                  )}
                </div>
                <h3 className="font-bevietnam font-extrabold text-sm text-brand-dark truncate uppercase">
                  {s.title || 'Không có tiêu đề lớn'}
                </h3>
                {s.subtitle && (
                  <p className="text-brand-gray text-xs truncate">
                    {s.subtitle}
                  </p>
                )}
                {s.cta_link && (
                  <div className="text-[10px] text-brand-gray font-mono truncate">
                    Liên kết CTA: <a href={s.cta_link} target="_blank" className="hover:underline text-blue-500 font-bold">{s.cta_link}</a>
                  </div>
                )}
              </div>

              {/* Controls and Actions */}
              <div className="flex items-center space-x-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto justify-center">
                <button
                  onClick={() => moveSliderOrder(idx, 'up')}
                  disabled={idx === 0 || actionLoading}
                  className="p-2 border border-gray-200 hover:border-brand-dark rounded disabled:opacity-30 transition-all cursor-pointer bg-white"
                >
                  <ArrowUp className="w-4 h-4 text-brand-dark" />
                </button>
                <button
                  onClick={() => moveSliderOrder(idx, 'down')}
                  disabled={idx === sliders.length - 1 || actionLoading}
                  className="p-2 border border-gray-200 hover:border-brand-dark rounded disabled:opacity-30 transition-all cursor-pointer bg-white"
                >
                  <ArrowDown className="w-4 h-4 text-brand-dark" />
                </button>

                <div className="h-6 w-px bg-gray-200"></div>

                <button
                  onClick={() => handleEditSlider(s)}
                  className="p-2 hover:bg-brand-red/10 text-brand-dark hover:text-brand-red rounded transition-all cursor-pointer"
                >
                  <Edit3 className="w-4.5 h-4.5" />
                </button>
                <button
                  onClick={() => handleDeleteSlider(s.id)}
                  className="p-2 hover:bg-rose-50 text-rose-500 rounded transition-all cursor-pointer"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CRUD Modal */}
      {isModalOpen && selectedSlider && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <ImageIcon className="w-4.5 h-4.5 text-brand-red" />
                  <span>{selectedSlider.id ? 'Biên Tập Banner Slide' : 'Đăng Ký Banner Slide Mới'}</span>
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
            <form onSubmit={handleSaveSlider} className="p-6 space-y-4">
              
              {/* Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Tiêu đề Banner chính</label>
                <input
                  type="text"
                  value={selectedSlider.title || ''}
                  onChange={(e) => setSelectedSlider({ ...selectedSlider, title: e.target.value })}
                  placeholder="Ví dụ: ĐẠI TIỆC KHUYẾN MẠI KEN MOTOR"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Tiêu đề phụ / Mô tả ngắn</label>
                <input
                  type="text"
                  value={selectedSlider.subtitle || ''}
                  onChange={(e) => setSelectedSlider({ ...selectedSlider, subtitle: e.target.value })}
                  placeholder="Ví dụ: Giảm giá tiền mặt lên đến 5.000.000đ khi đăng ký báo giá"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>

              {/* Desktop Image Upload */}
              <ImageUpload
                value={selectedSlider.image_desktop_url || ''}
                onChange={(url) => setSelectedSlider(prev => prev ? { ...prev, image_desktop_url: url } : null)}
                folder="sliders"
                label="Ảnh hiển thị Máy tính (Desktop Image) *"
              />

              {/* Mobile Image Upload */}
              <ImageUpload
                value={selectedSlider.image_mobile_url || ''}
                onChange={(url) => setSelectedSlider(prev => prev ? { ...prev, image_mobile_url: url } : null)}
                folder="sliders"
                label="Ảnh hiển thị Điện thoại (Mobile Image - Tối ưu dọc)"
              />

              {/* Link & CTA Text */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Nút liên kết CTA URL</label>
                  <input
                    type="text"
                    value={selectedSlider.cta_link || ''}
                    onChange={(e) => setSelectedSlider({ ...selectedSlider, cta_link: e.target.value })}
                    placeholder="/vehicles hoặc link bài viết"
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                    style={{ minHeight: '44px' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Nhãn chữ trên nút</label>
                  <input
                    type="text"
                    value={selectedSlider.cta_text || ''}
                    onChange={(e) => setSelectedSlider({ ...selectedSlider, cta_text: e.target.value })}
                    placeholder="Ví dụ: Đăng ký ngay, Xem thêm"
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                    style={{ minHeight: '44px' }}
                  />
                </div>
              </div>

              {/* Visibility Checkbox */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="slider-visible"
                  checked={selectedSlider.is_visible !== false}
                  onChange={(e) => setSelectedSlider({ ...selectedSlider, is_visible: e.target.checked })}
                  className="rounded border-gray-300 text-brand-red focus:ring-brand-red h-4 w-4"
                />
                <label htmlFor="slider-visible" className="text-xs font-bold text-brand-dark cursor-pointer select-none">
                  Hiển thị Banner này ngoài trang chủ
                </label>
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
                  <span>{actionLoading ? 'Đang lưu...' : 'Lưu Banner'}</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
