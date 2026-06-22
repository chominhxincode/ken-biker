'use client';

import React, { useState, useEffect } from 'react';
import { CalendarRange, Phone, Calendar, Eye, Save, Search, Clock, X } from 'lucide-react';
import db from '@/lib/db';
import { TestDriveRequest, Vehicle } from '@/lib/db/types';

export default function AdminTestDrives() {
  const [testDrives, setTestDrives] = useState<TestDriveRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Search/Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail view/Edit
  const [selectedTd, setSelectedTd] = useState<TestDriveRequest | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [statusVal, setStatusVal] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [tdData, vData] = await Promise.all([
        db.getTestDriveRequests(),
        db.getVehicles({ limit: 200 })
      ]);
      setTestDrives(tdData);
      setVehicles(vData.data);
    } catch (err) {
      console.error('Error fetching test drives/vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenDetail = (td: TestDriveRequest) => {
    setSelectedTd(td);
    setInternalNotes(td.internal_notes || '');
    setStatusVal(td.status);
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTd) return;

    setActionLoading(true);
    try {
      await db.updateTestDriveRequestStatus(selectedTd.id, statusVal, internalNotes);
      alert('Đã cập nhật lịch hẹn lái thử.');
      
      setTestDrives(prev => prev.map(td => td.id === selectedTd.id ? { ...td, status: statusVal, internal_notes: internalNotes } : td));
      setSelectedTd(null);
    } catch (err) {
      alert('Lỗi cập nhật yêu cầu.');
    } finally {
      setActionLoading(false);
    }
  };

  const getVehicleName = (id: string | null) => {
    if (!id) return 'Không xác định';
    const v = vehicles.find(item => item.id === id);
    return v ? v.name : `Dòng xe (${id.substring(0, 5)})`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pending':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full">Chờ xử lý</span>;
      case 'Contacted':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">Đã liên hệ</span>;
      case 'Consulting':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-purple-500/10 text-purple-400 border border-purple-500/20 rounded-full">Đang lái thử</span>;
      case 'Closed':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">Đã hoàn thành</span>;
      case 'Cancelled':
        return <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-full">Đã hủy lịch</span>;
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
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const formatDateTime = (dateStr: string) => {
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
  const filteredTDs = testDrives.filter(td => {
    const matchesSearch = td.name.toLowerCase().includes(search.toLowerCase()) || 
                          td.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || td.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
          Lịch Đăng Ký Lái Thử
        </h1>
        <p className="text-brand-gray text-xs mt-1">
          Xem thông tin lịch đặt hẹn thử xe máy của khách hàng, liên hệ xác nhận giờ hẹn lái thử tại showroom.
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
          <option value="Consulting">Đang lái thử</option>
          <option value="Closed">Đã hoàn thành</option>
          <option value="Cancelled">Đã hủy lịch</option>
        </select>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl border border-gray-150 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
            <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách lịch hẹn...</span>
          </div>
        ) : filteredTDs.length === 0 ? (
          <div className="py-20 text-center text-brand-gray text-xs">
            Chưa có lịch hẹn lái thử nào khớp.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-[10px] font-extrabold uppercase text-brand-gray tracking-wider">
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Điện thoại</th>
                  <th className="p-4">Dòng xe lái thử</th>
                  <th className="p-4">Ngày mong muốn</th>
                  <th className="p-4">Ngày gửi lịch</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Xem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredTDs.map((td) => (
                  <tr key={td.id} className="hover:bg-gray-55 transition-colors">
                    <td className="p-4">
                      <span className="font-bold text-brand-dark block text-sm">{td.name}</span>
                    </td>
                    <td className="p-4 text-brand-dark font-mono font-bold">
                      <a href={`tel:${td.phone}`} className="hover:underline">{td.phone}</a>
                    </td>
                    <td className="p-4 text-brand-dark font-bold max-w-xs truncate">
                      {getVehicleName(td.vehicle_id)}
                    </td>
                    <td className="p-4 font-mono font-bold text-brand-red flex items-center space-x-1 mt-1.5 border-0 bg-transparent">
                      <Clock className="w-3.5 h-3.5 text-brand-red" />
                      <span>{formatDate(td.desired_date)}</span>
                    </td>
                    <td className="p-4 font-mono text-brand-gray">
                      {td.created_at ? formatDateTime(td.created_at) : 'N/A'}
                    </td>
                    <td className="p-4">{getStatusBadge(td.status)}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenDetail(td)}
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
      {selectedTd && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <CalendarRange className="w-4.5 h-4.5 text-brand-red" />
                  <span>Chi Tiết Lịch Hẹn Lái Thử</span>
                </h2>
              </div>
              <button
                onClick={() => setSelectedTd(null)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSaveStatus} className="p-6 space-y-5">
              
              {/* Customer detail */}
              <div className="bg-brand-light p-4 rounded-xl border border-gray-150 space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                  <span className="text-brand-gray">Họ và tên:</span>
                  <span className="font-bold text-brand-dark">{selectedTd.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5">
                  <span className="text-brand-gray">Điện thoại liên hệ:</span>
                  <a href={`tel:${selectedTd.phone}`} className="text-brand-red font-mono font-bold hover:underline">{selectedTd.phone}</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-gray">Ngày gửi đăng ký:</span>
                  <span className="font-mono">{selectedTd.created_at ? formatDateTime(selectedTd.created_at) : 'N/A'}</span>
                </div>
              </div>

              {/* Booking specifications */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Lịch lái thử xe</label>
                
                <div className="bg-brand-light p-4 rounded-xl border border-gray-150 text-xs space-y-2.5">
                  <div>
                    <span className="text-brand-gray block text-[10px] uppercase font-bold tracking-wider">Xe máy đăng ký lái thử:</span>
                    <span className="font-bold text-brand-dark">{getVehicleName(selectedTd.vehicle_id)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2.5 border-t border-gray-200">
                    <span className="text-brand-gray">Ngày hẹn chạy thử xe:</span>
                    <span className="font-mono font-bold text-brand-red bg-rose-50 border border-rose-100 rounded px-2.5 py-1">
                      {formatDate(selectedTd.desired_date)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedTd.notes && (
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ghi chú yêu cầu của khách</label>
                  <p className="p-3.5 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 leading-relaxed italic">
                    "{selectedTd.notes}"
                  </p>
                </div>
              )}

              {/* Status Update */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Cập nhật Trạng thái lịch hẹn</label>
                <select
                  value={statusVal}
                  onChange={e => setStatusVal(e.target.value)}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer font-bold"
                  style={{ minHeight: '44px' }}
                >
                  <option value="Pending">Chờ xử lý (Mới nhận)</option>
                  <option value="Contacted">Đã liên hệ cuộc gọi xác nhận</option>
                  <option value="Consulting">Đang lái thử tại cửa hàng</option>
                  <option value="Closed">Đã hoàn thành buổi chạy thử</option>
                  <option value="Cancelled">Đã hủy lịch hẹn</option>
                </select>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ghi chú nội bộ quản trị viên</label>
                <textarea
                  value={internalNotes}
                  onChange={e => setInternalNotes(e.target.value)}
                  placeholder="Nhập ghi chú liên hệ lịch hẹn..."
                  rows={3}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-150 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedTd(null)}
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
