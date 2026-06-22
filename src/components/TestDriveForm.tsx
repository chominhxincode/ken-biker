'use client';

import React, { useState } from 'react';
import { CalendarRange, Send, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '@/lib/db/types';
import db from '@/lib/db';

interface TestDriveFormProps {
  vehicles: Vehicle[];
}

export default function TestDriveForm({ vehicles }: TestDriveFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [desiredDate, setDesiredDate] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set min date helper to prevent booking past dates
  const getMinDate = () => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !selectedVehicleId || !desiredDate) {
      setError('Vui lòng điền đầy đủ các thông tin bắt buộc (*).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await db.submitTestDriveRequest({
        name: name.trim(),
        phone: phone.trim(),
        vehicle_id: selectedVehicleId,
        desired_date: desiredDate,
        notes: notes.trim() || null
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting test drive request:', err);
      setError('Đã xảy ra lỗi khi đặt lịch hẹn. Vui lòng gọi điện trực tiếp Hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    const chosenBike = vehicles.find(v => v.id === selectedVehicleId)?.name || 'Xe đã chọn';
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <div className="flex justify-center text-emerald-600">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h2 className="font-bevietnam font-extrabold text-2xl text-emerald-950">Đặt lịch hẹn thành công!</h2>
        <p className="text-sm text-emerald-800 leading-relaxed">
          Đại lý Ken Motor đã ghi nhận lịch đăng ký lái thử xe <strong>{chosenBike}</strong> vào ngày <strong>{desiredDate}</strong>.<br />
          Nhân viên tư vấn sẽ liên hệ lại anh/chị <strong>{name}</strong> qua số điện thoại <strong>{phone}</strong> trong vòng 30 phút để xác nhận giờ hẹn cụ thể.
        </p>
        <button
          onClick={() => {
            setIsSuccess(false);
            setName('');
            setPhone('');
            setSelectedVehicleId('');
            setDesiredDate('');
            setNotes('');
          }}
          className="bg-brand-dark hover:bg-brand-red text-white font-bold py-2.5 px-6 rounded text-xs uppercase transition-colors"
          style={{ minHeight: '44px' }}
        >
          Đặt lịch lái thử xe khác
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-border rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm space-y-6 max-w-2xl mx-auto">
      <h2 className="font-bevietnam font-bold text-lg lg:text-xl text-brand-dark border-b border-brand-border pb-3 flex items-center space-x-2">
        <CalendarRange className="w-5.5 h-5.5 text-brand-red" />
        <span>Đăng ký lịch lái thử xe máy</span>
      </h2>

      {error && (
        <div className="bg-red-50 border border-red-200 text-xs text-brand-red font-bold p-3 rounded">
          {error}
        </div>
      )}

      {/* Grid splits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Customer Name */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Họ tên của bạn *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ví dụ: Nguyễn Văn A"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>

        {/* Customer Phone */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Số điện thoại liên hệ *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Ví dụ: 0987654321"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>

        {/* Showroom Motorbike Select list */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Xe muốn lái thử *</label>
          <select
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          >
            <option value="">-- Chọn xe --</option>
            {vehicles.filter(v => !v.is_sold && v.price > 0 && v.category_id !== 'category-7').sort((a,b)=>a.name.localeCompare(b.name)).map(v => (
              <option key={v.id} value={v.id}>
                {v.name} ({v.is_new ? 'Mới' : 'Cũ'})
              </option>
            ))}
          </select>
        </div>

        {/* Desired Date */}
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Ngày mong muốn hẹn *</label>
          <input
            type="date"
            min={getMinDate()}
            value={desiredDate}
            onChange={(e) => setDesiredDate(e.target.value)}
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>

      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Ghi chú (Thời gian hẹn, yêu cầu phụ...)</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ví dụ: Tôi muốn hẹn vào sáng Thứ Bảy lúc 9:00..."
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
        ></textarea>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md shadow-brand-red/10 disabled:bg-gray-400 disabled:cursor-not-allowed"
        style={{ minHeight: '44px' }}
      >
        <span>{isSubmitting ? 'Đang gửi...' : 'Đăng ký đặt lịch ngay'}</span>
      </button>

    </form>
  );
}
