'use client';

import React, { useState, useEffect } from 'react';
import { CalendarRange, Phone, Calendar, Eye, Save, Search, ImageIcon, X } from 'lucide-react';
import db from '@/lib/db';
import { SellVehicleRequest } from '@/lib/db/types';

export default function AdminSells() {
  const [sells, setSells] = useState<SellVehicleRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Search/Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail view/Edit
  const [selectedSell, setSelectedSell] = useState<SellVehicleRequest | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [statusVal, setStatusVal] = useState('');
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const data = await db.getSellVehicleRequests();
      setSells(data);
    } catch (err) {
      console.error('Error fetching sell requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenDetail = (sell: SellVehicleRequest) => {
    setSelectedSell(sell);
    setInternalNotes(sell.internal_notes || '');
    setStatusVal(sell.status);
    setActivePhoto(sell.image_urls?.[0] || null);
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSell) return;

    setActionLoading(true);
    try {
      await db.updateSellRequestStatus(selectedSell.id, statusVal, internalNotes);
      alert('Đã cập nhật yêu cầu thu mua.');
      
      setSells(prev => prev.map(s => s.id === selectedSell.id ? { ...s, status: statusVal, internal_notes: internalNotes } : s));
      setSelectedSell(null);
    } catch (err) {
      alert('Lỗi cập nhật yêu cầu.');
    } finally {
      setActionLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">Chờ xử lý</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">Đã liên hệ</span>;
      case 'Consulting':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Đang định giá</span>;
      case 'Closed':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Đã thu mua</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">Đã từ chối</span>;
      default:
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded-full">{status}</span>;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateStr;
    }
  };

  // Filters logic
  const filteredSells = sells.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || 
                          s.phone.includes(search) || 
                          s.brand_name.toLowerCase().includes(search.toLowerCase()) ||
                          s.model_name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || s.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
          Yêu Cầu Định Giá & Thu Mua Xe Cũ
        </h1>
        <p className="text-brand-gray text-xs mt-1">
          Quản lý thông tin xe ký gửi bán lại từ khách hàng, xem hình ảnh xe, liên hệ thương lượng định giá mua xe cũ.
        </p>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-5 rounded-xl border border-gray-150 shadow-sm flex flex-col sm:flex-row gap-4">
        <div className="relative flex-grow">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm theo tên khách hàng, số điện thoại, hãng xe..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs text-brand-dark"
            style={{ minHeight: '40px' }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer min-w-[150px]"
          style={{ minHeight: '40px' }}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="Pending">Chờ xử lý</option>
          <option value="Contacted">Đã liên hệ</option>
          <option value="Consulting">Đang định giá</option>
          <option value="Closed">Đã thu mua</option>
          <option value="Cancelled">Đã từ chối</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
            <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách ký gửi...</span>
          </div>
        ) : filteredSells.length === 0 ? (
          <div className="py-20 text-center text-brand-gray text-xs">
            Chưa có hồ sơ ký gửi thu mua xe cũ nào khớp.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-[10px] font-extrabold uppercase text-brand-gray tracking-wider">
                  <th className="p-4 w-16 text-center">Ảnh xe</th>
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Điện thoại</th>
                  <th className="p-4">Dòng xe cũ ký gửi</th>
                  <th className="p-4 text-center">Năm ĐK</th>
                  <th className="p-4 text-center">Số km đã đi</th>
                  <th className="p-4">Giá mong muốn</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Xem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredSells.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-55 transition-colors">
                    <td className="p-4 text-center">
                      <div className="w-12 h-9 rounded-md overflow-hidden bg-brand-light flex items-center justify-center border border-gray-200 mx-auto">
                        {s.image_urls && s.image_urls.length > 0 ? (
                          <img src={s.image_urls[0]} alt={s.model_name} className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="font-bold text-brand-dark block text-sm">{s.name}</span>
                    </td>
                    <td className="p-4 text-brand-dark font-mono font-bold">
                      <a href={`tel:${s.phone}`} className="hover:underline">{s.phone}</a>
                    </td>
                    <td className="p-4 text-brand-dark">
                      <div className="space-y-0.5">
                        <span className="font-bold block">{s.brand_name} {s.model_name}</span>
                        {s.license_plate && <span className="block text-[9px] bg-brand-light text-brand-gray border border-gray-200 px-1 py-0.5 rounded w-max font-mono font-bold uppercase">{s.license_plate}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-center font-mono">{s.year || 'N/A'}</td>
                    <td className="p-4 text-center font-mono">
                      {s.odometer ? `${s.odometer.toLocaleString('vi-VN')} km` : 'N/A'}
                    </td>
                    <td className="p-4 font-mono font-bold text-brand-red">
                      {s.desired_price ? `${s.desired_price.toLocaleString('vi-VN')} đ` : 'Thương lượng'}
                    </td>
                    <td className="p-4">{getStatusBadge(s.status)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(s)}
                        className="p-2 hover:bg-brand-red/10 text-brand-dark hover:text-brand-red rounded transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedSell && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <CalendarRange className="w-4.5 h-4.5 text-brand-red" />
                  <span>Chi Tiết Hồ Sơ Ký Gửi Xe Cũ</span>
                </h2>
              </div>
              <button
                onClick={() => setSelectedSell(null)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content - Multi Column for images preview */}
            <form onSubmit={handleSaveStatus} className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Column 1: Info and status controls */}
              <div className="space-y-4">
                <div className="bg-brand-light p-4 rounded-xl border border-gray-150 space-y-2.5 text-xs">
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-brand-gray">Họ tên khách gửi:</span>
                    <span className="font-bold text-brand-dark">{selectedSell.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-brand-gray">Số điện thoại:</span>
                    <a href={`tel:${selectedSell.phone}`} className="text-brand-red font-mono font-bold hover:underline">{selectedSell.phone}</a>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-brand-gray">Hãng xe & Tên xe:</span>
                    <span className="font-bold text-brand-dark uppercase">{selectedSell.brand_name} {selectedSell.model_name}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-brand-gray">Biển số kiểm soát:</span>
                    <span className="font-bold text-brand-dark font-mono uppercase">{selectedSell.license_plate || 'Không có'}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                    <span className="text-brand-gray">Năm đăng ký / Số km đã đi:</span>
                    <span className="font-bold text-brand-dark font-mono">ĐK: {selectedSell.year || 'N/A'} | {selectedSell.odometer?.toLocaleString('vi-VN') || '0'} km</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-brand-gray">Giá khách hàng đề xuất:</span>
                    <span className="font-mono font-extrabold text-brand-red text-sm">
                      {selectedSell.desired_price ? `${selectedSell.desired_price.toLocaleString('vi-VN')} đ` : 'Thương lượng'}
                    </span>
                  </div>
                </div>

                {selectedSell.status_description && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Mô tả chi tiết tình trạng xe</span>
                    <p className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 leading-relaxed italic">
                      "{selectedSell.status_description}"
                    </p>
                  </div>
                )}

                {/* Status Update */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Trạng thái định giá</label>
                  <select
                    value={statusVal}
                    onChange={e => setStatusVal(e.target.value)}
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer font-bold"
                    style={{ minHeight: '44px' }}
                  >
                    <option value="Pending">Chờ xử lý (Mới nhận)</option>
                    <option value="Contacted">Đã liên hệ điện thoại</option>
                    <option value="Consulting">Đang định giá xe máy</option>
                    <option value="Closed">Đã thu mua thành công</option>
                    <option value="Cancelled">Đã từ chối thu mua</option>
                  </select>
                </div>

                {/* Internal Notes */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ghi chú kiểm định & định giá</label>
                  <textarea
                    value={internalNotes}
                    onChange={e => setInternalNotes(e.target.value)}
                    placeholder="Nhập ghi chú định giá..."
                    rows={3}
                    className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex justify-end space-x-2.5">
                  <button
                    type="button"
                    onClick={() => setSelectedSell(null)}
                    className="px-4 py-2 border border-gray-200 text-brand-dark font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-gray-50 transition-all cursor-pointer"
                    style={{ minHeight: '40px' }}
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    disabled={actionLoading}
                    className="bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs uppercase tracking-wider px-5 py-2 rounded-lg transition-all cursor-pointer shadow-md shadow-brand-red/10"
                    style={{ minHeight: '40px' }}
                  >
                    <span>{actionLoading ? 'Đang lưu...' : 'Cập nhật'}</span>
                  </button>
                </div>
              </div>

              {/* Column 2: Photo gallery provided by customer */}
              <div className="flex flex-col space-y-4">
                <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Hình ảnh thực tế xe cũ ký gửi</span>
                
                {(!selectedSell.image_urls || selectedSell.image_urls.length === 0) ? (
                  <div className="bg-brand-light rounded-xl border border-gray-150 p-10 flex flex-col items-center justify-center text-center flex-grow text-xs text-brand-gray">
                    <ImageIcon className="w-10 h-10 text-gray-300 mb-2" />
                    <span>Khách hàng không đính kèm hình ảnh nào.</span>
                  </div>
                ) : (
                  <div className="flex-grow flex flex-col justify-between space-y-4 min-h-[300px]">
                    {/* Active view */}
                    <div className="w-full aspect-[4/3] rounded-xl overflow-hidden bg-brand-dark relative border border-gray-200 flex-grow max-h-[350px]">
                      {activePhoto && (
                        <img 
                          src={activePhoto} 
                          alt="Enlarged" 
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>

                    {/* Thumbnail Selector */}
                    <div className="grid grid-cols-4 gap-2">
                      {selectedSell.image_urls.map((photo, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setActivePhoto(photo)}
                          className={`aspect-[4/3] rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            activePhoto === photo ? 'border-brand-red scale-95 shadow' : 'border-gray-200 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={photo} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
