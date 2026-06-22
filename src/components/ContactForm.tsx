'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import db from '@/lib/db';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Vui lòng nhập đầy đủ các trường thông tin bắt buộc (*).');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await db.submitContact({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        message: message.trim()
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError('Đã xảy ra lỗi hệ thống. Vui lòng gọi điện trực tiếp Hotline.');
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
        <h3 className="font-bevietnam font-bold text-lg text-emerald-950">Gửi lời nhắn thành công!</h3>
        <p className="text-sm text-emerald-800 leading-relaxed text-balance">
          Cảm ơn anh/chị <strong>{name}</strong>. Cửa hàng xe máy Ken Motor đã tiếp nhận lời nhắn của bạn và sẽ phản hồi sớm nhất qua điện thoại <strong>{phone}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-brand-border rounded-xl p-4 sm:p-6 shadow-sm space-y-4">
      <h3 className="font-bevietnam font-bold text-base lg:text-lg text-brand-dark border-b border-brand-border pb-3">
        Gửi tin nhắn liên hệ trực tuyến
      </h3>

      {error && (
        <div className="bg-red-50 border border-red-200 text-xs text-brand-red font-bold p-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Họ tên của bạn *</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nguyễn Văn A"
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
          style={{ minHeight: '44px' }}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Số điện thoại *</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0987654321"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Email (Không bắt buộc)</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@gmail.com"
            className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            style={{ minHeight: '44px' }}
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Lời nhắn liên hệ *</label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Nhập nội dung lời nhắn..."
          className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
          required
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md"
        style={{ minHeight: '44px' }}
      >
        <Send className="w-4 h-4" />
        <span>{isSubmitting ? 'Đang gửi...' : 'Gửi tin nhắn liên hệ'}</span>
      </button>
    </form>
  );
}
