'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Vehicle } from '@/lib/db/types';
import db from '@/lib/db';

interface LeadFormProps {
  vehicle: Vehicle;
}

export default function VehicleLeadForm({ vehicle }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState(`Tôi cần tư vấn thêm về dòng xe ${vehicle.name} và báo giá lăn bánh trọn gói.`);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const price = vehicle.promo_price || vehicle.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Vui lòng nhập Họ tên và Số điện thoại.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await db.submitQuoteRequest({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        notes: notes.trim(),
        vehicle_ids: [vehicle.id],
        total_price: price
      });
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Error submitting lead:', err);
      setError('Đã có lỗi xảy ra khi gửi yêu cầu. Vui lòng liên hệ Hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-3">
        <div className="flex justify-center text-emerald-600">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h4 className="font-bevietnam font-bold text-lg text-emerald-950">Gửi yêu cầu thành công!</h4>
        <p className="text-sm text-emerald-800 leading-relaxed">
          Cảm ơn anh/chị <strong>{name}</strong>. Cửa hàng xe máy Ken Motor đã nhận được yêu cầu tư vấn của bạn và sẽ liên hệ lại trong thời gian sớm nhất qua số điện thoại <strong>{phone}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-border rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
      <h3 className="font-bevietnam font-bold text-base lg:text-lg text-brand-dark border-b border-brand-border pb-3">
        Đăng ký nhận tư vấn & Báo giá lăn bánh
      </h3>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded p-3 text-xs text-brand-red font-semibold">
          {error}
        </div>
      )}

      {/* Full Name */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Họ và tên *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ví dụ: Nguyễn Văn A"
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none focus:border-brand-red"
          style={{ minHeight: '44px' }}
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Số điện thoại *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Ví dụ: 0787990047"
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none focus:border-brand-red"
          style={{ minHeight: '44px' }}
          required
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Email (Không bắt buộc)</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ví dụ: email@gmail.com"
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none focus:border-brand-red"
          style={{ minHeight: '44px' }}
        />
      </div>

      {/* Message / Notes */}
      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Nội dung yêu cầu</label>
        <textarea
          rows={3}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none focus:border-brand-red"
        ></textarea>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md shadow-brand-red/10 disabled:bg-gray-400 disabled:cursor-not-allowed"
        style={{ minHeight: '44px' }}
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu ngay'}</span>
      </button>

      <p className="text-[10px] text-center text-brand-gray">
        Thông tin của quý khách sẽ được bảo mật tuyệt đối tại hệ thống Ken Motor.
      </p>
    </form>
  );
}
