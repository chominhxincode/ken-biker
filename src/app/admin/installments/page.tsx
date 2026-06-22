'use client';

import React, { useState, useEffect } from 'react';
import { RefreshCw, Phone, Calendar, Eye, Save, Search, X } from 'lucide-react';
import db from '@/lib/db';
import { InstallmentRequest, Vehicle } from '@/lib/db/types';

export default function AdminInstallments() {
  const [installments, setInstallments] = useState<InstallmentRequest[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // Search/Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Detail view/Edit
  const [selectedInst, setSelectedInst] = useState<InstallmentRequest | null>(null);
  const [internalNotes, setInternalNotes] = useState('');
  const [statusVal, setStatusVal] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const [insData, vData] = await Promise.all([
        db.getInstallmentRequests(),
        db.getVehicles({ limit: 200 })
      ]);
      setInstallments(insData);
      setVehicles(vData.data);
    } catch (err) {
      console.error('Error fetching installments/vehicles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenDetail = (inst: InstallmentRequest) => {
    setSelectedInst(inst);
    setInternalNotes(inst.internal_notes || '');
    setStatusVal(inst.status);
  };

  const handleSaveStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedInst) return;

    setActionLoading(true);
    try {
      await db.updateInstallmentRequestStatus(selectedInst.id, statusVal, internalNotes);
      alert('Đã cập nhật hồ sơ trả góp.');
      
      setInstallments(prev => prev.map(ins => ins.id === selectedInst.id ? { ...ins, status: statusVal, internal_notes: internalNotes } : ins));
      setSelectedInst(null);
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

  // Helper to calculate estimated monthly payment
  const calculateMonthly = (price: number, downpayment: number, term: number, rate: number) => {
    const principal = price - downpayment;
    if (principal <= 0) return 0;
    
    // Simplistic interest calculation (divided by term months + monthly interest)
    const monthlyRate = (rate / 100) / 12;
    const monthlyInterest = principal * monthlyRate;
    const monthlyPrincipal = principal / term;
    return Math.round(monthlyPrincipal + monthlyInterest);
  };

  // Filters logic
  const filteredInstallments = installments.filter(ins => {
    const matchesSearch = ins.name.toLowerCase().includes(search.toLowerCase()) || 
                          ins.phone.includes(search);
    const matchesStatus = statusFilter === 'all' || ins.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
          Yêu Cầu Tính Trả Góp
        </h1>
        <p className="text-brand-gray text-xs mt-1">
          Theo dõi các yêu cầu tính toán trả góp từ giả lập, hỗ trợ khách hàng phê duyệt hồ sơ vay trả góp.
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
            <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải danh sách hồ sơ...</span>
          </div>
        ) : filteredInstallments.length === 0 ? (
          <div className="py-20 text-center text-brand-gray text-xs">
            Chưa có hồ sơ tính trả góp nào khớp với bộ lọc.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-150 text-[10px] font-extrabold uppercase text-brand-gray tracking-wider">
                  <th className="p-4">Khách hàng</th>
                  <th className="p-4">Điện thoại</th>
                  <th className="p-4">Dòng xe chọn mua</th>
                  <th className="p-4">Giá trị xe</th>
                  <th className="p-4">Trả trước</th>
                  <th className="p-4 text-center">Thời hạn (Tháng)</th>
                  <th className="p-4 font-mono">Góp mỗi tháng (Ước tính)</th>
                  <th className="p-4">Trạng thái</th>
                  <th className="p-4 text-right">Xem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {filteredInstallments.map((ins) => {
                  const estMonthly = calculateMonthly(ins.price, ins.downpayment, ins.term_months, ins.interest_rate);
                  return (
                    <tr key={ins.id} className="hover:bg-gray-55 transition-colors">
                      <td className="p-4">
                        <span className="font-bold text-brand-dark block text-sm">{ins.name}</span>
                      </td>
                      <td className="p-4 text-brand-dark">
                        <a href={`tel:${ins.phone}`} className="hover:underline font-mono font-bold block">{ins.phone}</a>
                      </td>
                      <td className="p-4 text-brand-dark font-bold max-w-xs truncate">
                        {getVehicleName(ins.vehicle_id)}
                      </td>
                      <td className="p-4 font-mono text-brand-dark">{ins.price.toLocaleString('vi-VN')} đ</td>
                      <td className="p-4 font-mono text-brand-dark">
                        <span className="block">{ins.downpayment.toLocaleString('vi-VN')} đ</span>
                        <span className="block text-[9px] text-brand-gray font-bold">({Math.round((ins.downpayment / ins.price) * 100)}%)</span>
                      </td>
                      <td className="p-4 text-center font-mono font-bold">{ins.term_months}T</td>
                      <td className="p-4 font-mono font-bold text-brand-red">
                        {estMonthly.toLocaleString('vi-VN')} đ/tháng
                      </td>
                      <td className="p-4">{getStatusBadge(ins.status)}</td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenDetail(ins)}
                          className="p-2 hover:bg-brand-red/10 text-brand-dark hover:text-brand-red rounded transition-all cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      {selectedInst && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-gray-150 flex justify-between items-center bg-brand-dark text-white">
              <div>
                <h2 className="font-bevietnam font-extrabold text-sm uppercase tracking-wider flex items-center space-x-2">
                  <RefreshCw className="w-4.5 h-4.5 text-brand-red animate-spin-slow" />
                  <span>Chi Tiết Đăng Ký Trả Góp</span>
                </h2>
              </div>
              <button
                onClick={() => setSelectedInst(null)}
                className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleSaveStatus} className="p-6 space-y-5">
              
              {/* Customer detail */}
              <div className="bg-brand-light p-4 rounded-xl border border-gray-150 space-y-2">
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5 text-xs">
                  <span className="text-brand-gray">Họ và tên khách:</span>
                  <span className="font-bold text-brand-dark">{selectedInst.name}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200/60 pb-1.5 text-xs">
                  <span className="text-brand-gray">Điện thoại liên hệ:</span>
                  <a href={`tel:${selectedInst.phone}`} className="text-brand-red font-mono font-bold hover:underline">{selectedInst.phone}</a>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-brand-gray">Ngày gửi hồ sơ:</span>
                  <span className="font-mono">{selectedInst.created_at ? formatDate(selectedInst.created_at) : 'N/A'}</span>
                </div>
              </div>

              {/* Installment breakdown */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Thông số tính trả góp</label>
                
                <div className="bg-brand-light p-4 rounded-xl border border-gray-150 grid grid-cols-2 gap-3 text-xs">
                  <div className="col-span-2 border-b border-gray-200/60 pb-2">
                    <span className="text-brand-gray block text-[10px] uppercase font-bold tracking-wider">Xe máy lựa chọn:</span>
                    <span className="font-bold text-brand-dark">{getVehicleName(selectedInst.vehicle_id)}</span>
                  </div>
                  
                  <div>
                    <span className="text-brand-gray block">Giá bán xe:</span>
                    <span className="font-mono font-bold text-brand-dark">{selectedInst.price.toLocaleString('vi-VN')} đ</span>
                  </div>

                  <div>
                    <span className="text-brand-gray block">Khoản trả trước:</span>
                    <span className="font-mono font-bold text-brand-dark">
                      {selectedInst.downpayment.toLocaleString('vi-VN')} đ ({Math.round((selectedInst.downpayment / selectedInst.price) * 100)}%)
                    </span>
                  </div>

                  <div>
                    <span className="text-brand-gray block">Kỳ hạn vay:</span>
                    <span className="font-bold text-brand-dark">{selectedInst.term_months} tháng</span>
                  </div>

                  <div>
                    <span className="text-brand-gray block">Lãi suất áp dụng:</span>
                    <span className="font-bold text-brand-dark">{selectedInst.interest_rate}% / năm</span>
                  </div>

                  <div className="col-span-2 border-t border-gray-200/60 pt-2 flex justify-between items-center bg-brand-red/5 p-2.5 rounded-lg border border-brand-red/10 mt-1">
                    <span className="font-bold text-brand-dark">Ước tính góp mỗi tháng:</span>
                    <span className="font-mono font-extrabold text-brand-red text-sm">
                      {calculateMonthly(selectedInst.price, selectedInst.downpayment, selectedInst.term_months, selectedInst.interest_rate).toLocaleString('vi-VN')} đ/tháng
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Cập nhật Trạng thái xử lý</label>
                <select
                  value={statusVal}
                  onChange={e => setStatusVal(e.target.value)}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-3 py-2.5 text-xs text-brand-dark cursor-pointer font-bold"
                  style={{ minHeight: '44px' }}
                >
                  <option value="Pending">Chờ xử lý (Mới nhận)</option>
                  <option value="Contacted">Đã liên hệ cuộc gọi</option>
                  <option value="Consulting">Đang hướng dẫn làm hồ sơ vay</option>
                  <option value="Closed">Thành công (Đã duyệt vay & giao xe)</option>
                  <option value="Cancelled">Đã hủy bỏ</option>
                </select>
              </div>

              {/* Internal Notes */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ghi chú nội bộ</label>
                <textarea
                  value={internalNotes}
                  onChange={e => setInternalNotes(e.target.value)}
                  placeholder="Nhập thông tin ghi chú..."
                  rows={3}
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-150 flex justify-end space-x-2.5">
                <button
                  type="button"
                  onClick={() => setSelectedInst(null)}
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
