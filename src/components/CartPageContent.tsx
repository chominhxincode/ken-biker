'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SafeImage from '@/components/SafeImage';
import { ShoppingCart, Trash2, Plus, Minus, Send, MessageCircle, Phone, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { GeneralSettings } from '@/lib/db/types';
import db from '@/lib/db';

interface CartContentProps {
  settings: GeneralSettings;
}

export default function CartPageContent({ settings }: CartContentProps) {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  
  // Checkout Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formatPrice = (val: number) => {
    return val.toLocaleString('vi-VN') + ' đ';
  };

  // Generate Zalo pre-filled message summarizing the cart items
  const generateZaloLink = () => {
    let summaryText = 'Chào Ken Motor, tôi muốn nhận tư vấn báo giá lăn bánh cho các dòng xe sau:\n';
    
    cart.forEach((item, idx) => {
      const price = item.vehicle.promo_price || item.vehicle.price;
      summaryText += `${idx + 1}. ${item.vehicle.name} (SL: ${item.quantity} x ${formatPrice(price)})\n`;
    });

    summaryText += `\nTổng tiền dự kiến: ${formatPrice(totalPrice)}`;
    
    const zaloUrl = settings.zalo_link || "https://zalo.me/0787990047";
    return `${zaloUrl}?text=${encodeURIComponent(summaryText)}`;
  };

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Vui lòng điền Họ tên và Số điện thoại.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await db.submitQuoteRequest({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || null,
        notes: notes.trim() || null,
        vehicle_ids: cart.map(item => item.vehicle.id),
        total_price: totalPrice
      });
      setIsSuccess(true);
      clearCart(); // Wipe cart upon successful request
    } catch (err) {
      console.error('Error submitting quote request:', err);
      setError('Lỗi hệ thống khi gửi yêu cầu. Quý khách vui lòng liên hệ Hotline.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <div className="flex justify-center text-emerald-600">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h2 className="font-bevietnam font-extrabold text-2xl text-emerald-950">Gửi yêu cầu báo giá thành công!</h2>
        <p className="text-sm text-emerald-800 leading-relaxed text-balance">
          Cảm ơn anh/chị <strong>{name}</strong>. Cửa hàng xe máy <strong>Ken Motor</strong> đã nhận được danh sách xe máy bạn quan tâm. Chúng tôi sẽ liên hệ lại qua điện thoại <strong>{phone}</strong> trong vòng 15-30 phút để báo giá chi tiết từng dòng xe.
        </p>
        <Link
          href="/vehicles"
          className="bg-brand-dark hover:bg-brand-red text-white font-bold py-2.5 px-6 rounded text-xs uppercase transition-colors inline-block"
          style={{ minHeight: '44px' }}
        >
          Tiếp tục tham quan showroom
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="bg-white border border-brand-border rounded-xl p-16 text-center max-w-2xl mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center text-brand-gray mx-auto">
          <ShoppingCart className="w-8 h-8" />
        </div>
        <h2 className="font-bevietnam font-bold text-lg text-brand-dark">Giỏ báo giá trống</h2>
        <p className="text-sm text-brand-gray">
          Bạn chưa thêm chiếc xe máy nào vào giỏ hàng báo giá. Vui lòng chọn xe từ showroom.
        </p>
        <Link
          href="/vehicles"
          className="bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-bold py-3 px-6 rounded transition-all inline-block uppercase text-xs tracking-wider"
          style={{ minHeight: '44px' }}
        >
          Khám phá xe máy ngay
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* 1. Vehicles lists (Col span 2) */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white border border-brand-border rounded-2xl overflow-hidden shadow-sm">
          <div className="p-4 bg-brand-light/30 border-b border-brand-border flex justify-between items-center">
            <h2 className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark">Danh sách xe chọn báo giá</h2>
            <button
              onClick={clearCart}
              className="text-xs text-brand-red hover:underline font-semibold"
            >
              Xóa tất cả
            </button>
          </div>

          <div className="divide-y divide-brand-border/60">
            {cart.map((item) => {
              const displayPrice = item.vehicle.promo_price || item.vehicle.price;
              return (
                <div key={item.vehicle.id} className="p-4 flex items-center gap-4">
                  {/* Photo */}
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-brand-border">
                    <SafeImage
                      src={item.vehicle.og_image}
                      alt={item.vehicle.name}
                      fill
                      fallbackType="vehicle"
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>

                  {/* Name and Price */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/vehicles/${item.vehicle.slug}`} className="font-bevietnam font-bold text-xs lg:text-sm text-brand-dark hover:text-brand-red transition-colors line-clamp-1">
                      {item.vehicle.name}
                    </Link>
                    <span className="text-xs text-brand-red font-extrabold mt-0.5 block">
                      {displayPrice > 0 ? formatPrice(displayPrice) : 'Liên hệ'}
                    </span>
                  </div>

                  {/* Quantity adjustments */}
                  <div className="flex items-center border border-brand-border rounded-lg bg-brand-light/35">
                    <button
                      onClick={() => updateQuantity(item.vehicle.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-brand-border/40 text-brand-gray hover:text-brand-dark rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                      style={{ minHeight: '32px', minWidth: '32px' }}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-brand-dark text-center min-w-[24px]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.vehicle.id, item.quantity + 1)}
                      className="p-1.5 hover:bg-brand-border/40 text-brand-gray hover:text-brand-dark rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                      style={{ minHeight: '32px', minWidth: '32px' }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.vehicle.id)}
                    className="p-2 text-brand-gray hover:text-brand-red hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove item"
                    style={{ minHeight: '40px', minWidth: '40px' }}
                  >
                    <Trash2 className="w-4.5 h-4.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Subtotal */}
          <div className="p-4 bg-brand-light/20 border-t border-brand-border flex justify-between items-center text-sm lg:text-base">
            <span className="text-brand-gray font-semibold">Tạm tính ({totalItems} sản phẩm):</span>
            <span className="font-bevietnam font-extrabold text-brand-red">{formatPrice(totalPrice)}</span>
          </div>

        </div>

        {/* Zalo and call direct triggers */}
        <div className="bg-brand-dark text-white rounded-2xl p-5 border border-white/10 shadow-lg space-y-4">
          <div className="flex items-center space-x-2 text-brand-red">
            <MessageCircle className="w-5.5 h-5.5" />
            <h3 className="font-bevietnam font-bold text-xs uppercase tracking-wider">Gửi nhanh qua mạng xã hội</h3>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed">
            Bạn có thể gửi trực tiếp danh sách giỏ hàng này tới Zalo chăm sóc khách hàng của Ken Motor để nhận báo giá lăn bánh lập tức mà không cần điền form.
          </p>
          <div className="grid grid-cols-1 gap-2.5">
            <a
              href={generateZaloLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bevietnam font-extrabold py-3.5 px-4 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md"
              style={{ minHeight: '44px' }}
            >
              <MessageCircle className="w-4 h-4 text-blue-200" />
              <span>Gửi báo giá qua Zalo</span>
            </a>
            <a
              href={`tel:${settings.hotline}`}
              className="bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 px-4 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md"
              style={{ minHeight: '44px' }}
            >
              <Phone className="w-4 h-4" />
              <span>Gọi hotline ngay</span>
            </a>
          </div>
        </div>

      </div>

      {/* 2. Lead request checkout form (Col span 1) */}
      <div className="lg:col-span-1">
        <form onSubmit={handleCheckoutSubmit} className="bg-white border border-brand-border rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sticky top-24">
          <h3 className="font-bevietnam font-bold text-base lg:text-lg text-brand-dark border-b border-brand-border pb-3">
            Đăng ký nhận báo giá
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-xs text-brand-red font-bold p-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Họ tên *</label>
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

          <div>
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Ghi chú yêu cầu</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ví dụ: Tôi muốn nhận báo giá lăn bánh tại Lấp Vò, Đồng Tháp..."
              className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md shadow-brand-red/10 disabled:bg-gray-400"
            style={{ minHeight: '44px' }}
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu nhận giá'}</span>
          </button>
        </form>
      </div>

    </div>
  );
}
