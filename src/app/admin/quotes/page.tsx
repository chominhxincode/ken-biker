'use client';

import React, { useState, useEffect } from 'react';
import { ClipboardList, Phone, Mail, Calendar, Eye, Save, Search, CheckCircle, X } from 'lucide-react';
import db from '@/lib/db';
import { QuoteRequest, Vehicle } from '@/lib/db/types';

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Search/Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail view/Edit
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [statusVal, setStatusVal] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [qData, vData] = await Promise.all([
        db.getQuoteRequests(),
        db.getVehicles({ limit: 200 }) // Load enough to match IDs
      ]);
      setQuotes(qData);
      setVehicles(vData.data);
    } catch (err) {
      console.error('Error fetching quotes/vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenDetail = (quote: QuoteRequest) => {
    setSelectedQuote(quote);
    setInternalNotes(quote.internal_notes || '');
    setStatusVal(quote.status);
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedQuote) return;

    setActionLoading(true);
    try {
      await db.updateQuoteRequestStatus(selectedQuote.id, statusVal, internalNotes);
      alert('Đã cập nhật yêu cầu báo giá.');
      
      // Update state local
      setQuotes(prev => prev.map(q => q.id === selectedQuote.id ? { ...q, status: statusVal, internal_notes: internalNotes } : q));
      setSelectedQuote(null);
    } catch (err) {
      alert('Lỗi cập nhật yêu cầu.');
    } finally {
      setActionLoading(false);
    }
  };

  const getVehicleNames = (ids: string[]) => {
    if (!ids || ids.length === 0) return 'Không xác định';
    return ids.map(id => {
      const v = vehicles.find(item => item.id === id);
      return v ? v.name : `Dòng xe (${id.substring(0, 5)})`;
    }).join(', ');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">Chờ xử lý</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">Đã liên hệ</span>;
      case 'Consulting':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Đang tư vấn</span>;
      case 'Closed':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Thành công</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">Đã hủy</span>;
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
  const filteredQuotes = quotes.filter(q => {
    const matchesSearch = q.name.toLowerCase().includes(search.toLowerCase()) || 
                          q.phone.includes(search) || 
                          (q.email && q.email.toLowerCase().includes(search.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
          Yêu Cầu Báo Giá
        </h1>
        <p className="text-brand-gray text-xs mt-1">
          Xem thông tin báo giá xe máy của khách hàng, cập nhật tiến độ liên hệ và viết ghi chú tư vấn.
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
            placeholder="Tìm theo tên khách hàng, số điện thoại..."
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
          <option value="Consulting">Đang tư vấn</option>
          <option value="Closed">Thành công</option>
          <option value="Cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
            <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách báo giá...</span>
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="py-20 text-center text-brand-gray text-xs">
            Chưa có yêu cầu báo giá nào phù hợp với bộ lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-[10px] font-extrabold uppercase text-brand-gray tracking-wider">
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Liên hệ</th>
                  <th className="p-4">Xe máy yêu cầu</th>
                  <th className="p-4">Tổng tiền tạm tính</th>
                  <th className="p-4">Ngày gửi</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Xem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredQuotes.map((q) => (
                  <tr key={q.id} className="hover:bg-gray-55 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-brand-dark block text-sm">{q.name}</span>
                    </td>
                    <td className="p-4 text-brand-dark">
                      <div className="space-y-0.5">
                        <a href={`tel:${q.phone}`} className="hover:underline font-mono font-bold block">{q.phone}</a>
                        {q.email && <span className="block text-[10px] text-brand-gray truncate">{q.email}</span>}
                      </div>
                    </td>
                    <td className="p-4 text-brand-dark font-bold max-w-xs truncate">
                      {getVehicleNames(q.vehicle_ids)}
                    </td>
                    <td className="p-4 font-mono font-bold text-brand-red">
                      {q.total_price > 0 ? `${q.total_price.toLocaleString('vi-VN')} đ` : 'Liên hệ báo giá'}
                    </td>
                    <td className="p-4 font-mono text-brand-gray">
                      {q.created_at ? formatDate(q.created_at) : 'N/A'}
                    </td>
                    <td className="p-4">{getStatusBadge(q.status)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(q)}
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

      {/* Details Side-Drawer / Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <ClipboardList className="w-4.5 h-4.5 text-brand-red" />
                  <span>Chi Tiết Yêu Cầu Báo Giá</span>
                </h2>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Form */}
            <form onSubmit={handleSaveStatus} className="p-6 space-y-5">
              
              {/* Customer summary */}
              <div className="bg-brand-light p-4 rounded-xl border border-gray-150 space-y-2">
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5 text-xs">
                  <span className="text-brand-gray">Họ và tên:</span>
                  <span className="font-bold text-brand-dark">{selectedQuote.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5 text-xs">
                  <span className="text-brand-gray">Số điện thoại:</span>
                  <div className="flex items-center space-x-1 font-mono font-bold">
                    <Phone className="w-3.5 h-3.5 text-brand-gray" />
                    <a href={`tel:${selectedQuote.phone}`} className="text-brand-red hover:underline">{selectedQuote.phone}</a>
                  </div>
                </div>
                {selectedQuote.email && (
                  <div className="flex justify-between border-b border-gray-200/60 pb-1.5 text-xs">
                    <span className="text-brand-gray">Email:</span>
                    <span className="font-mono">{selectedQuote.email}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-brand-gray">Thời gian gửi:</span>
                  <span className="font-mono">{selectedQuote.created_at ? formatDate(selectedQuote.created_at) : 'N/A'}</span>
                </div>
              </div>

              {/* Vehicles detail */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Sản phẩm yêu cầu</label>
                <div className="bg-brand-light p-4 rounded-xl border border-gray-150 space-y-2.5">
                  <p className="text-xs font-bold text-brand-dark leading-relaxed">
                    {getVehicleNames(selectedQuote.vehicle_ids)}
                  </p>
                  <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-xs">
                    <span className="text-brand-gray">Tổng giá trị tạm tính:</span>
                    <span className="font-mono font-extrabold text-brand-red text-sm">
                      {selectedQuote.total_price > 0 ? `${selectedQuote.total_price.toLocaleString('vi-VN')} đ` : 'Liên hệ báo giá'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Customer message notes */}
              {selectedQuote.notes && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ý kiến / Lời nhắn khách hàng</label>
                  <p className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs italic text-gray-600 leading-relaxed">
                    "{selectedQuote.notes}"
                  </p>
                </div>
              )}

              {/* Status Update */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Cập nhật Trạng thái</label>
                <select
                  value={statusVal}
                  onChange={e => setStatusVal(e.target.value)}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer font-bold"
                  style={{ minHeight: '44px' }}
                >
                  <option value="Pending">Chờ xử lý (Mới nhận)</option>
                  <option value="Contacted">Đã liên hệ điện thoại</option>
                  <option value="Consulting">Đang tư vấn / Gửi báo giá chi tiết</option>
                  <option value="Closed">Thành công / Đã chốt mua xe</option>
                  <option value="Cancelled">Đã hủy bỏ</option>
                </select>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ghi chú nội bộ (Chỉ quản trị nhìn thấy)</label>
                <textarea
                  value={internalNotes}
                  onChange={e => setInternalNotes(e.target.value)}
                  placeholder="Nhập thông tin ghi chú liên hệ như: Gọi lại sau 5 giờ chiều, đang cân nhắc mẫu màu đen..."
                  rows={3}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y"
                ></textarea>
              </div>

              {/* Buttons */}
              <div className="pt-4 border-t border-gray-150 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedQuote(null)}
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

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
