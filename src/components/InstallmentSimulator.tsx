'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Calculator, CheckCircle2, Send, Info } from 'lucide-react';
import { Vehicle } from '@/lib/db/types';
import db from '@/lib/db';

interface InstallmentProps {
  vehicles: Vehicle[];
}

export default function InstallmentSimulator({ vehicles }: InstallmentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial values from search queries
  const initialSlug = searchParams.get('slug') || '';
  const initialPrice = Number(searchParams.get('price') || 40000000);
  const initialDownpayment = Number(searchParams.get('downpayment') || 30);
  const initialTerm = Number(searchParams.get('term') || 12);
  const initialRate = Number(searchParams.get('rate') || 1.39);

  // States
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [price, setPrice] = useState<number>(initialPrice);
  const [downpaymentPercent, setDownpaymentPercent] = useState<number>(initialDownpayment);
  const [term, setTerm] = useState<number>(initialTerm);
  const [interestRate, setInterestRate] = useState<number>(initialRate);

  // Results
  const [downpaymentValue, setDownpaymentValue] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Lead Form States
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync selected vehicle
  useEffect(() => {
    if (initialSlug) {
      const v = vehicles.find(item => item.slug === initialSlug);
      if (v) {
        setSelectedVehicleId(v.id);
        setPrice(v.promo_price || v.price);
      }
    }
  }, [initialSlug, vehicles]);

  useEffect(() => {
    if (selectedVehicleId) {
      const v = vehicles.find(item => item.id === selectedVehicleId);
      if (v) {
        setPrice(v.promo_price || v.price);
        setNotes(`Tôi muốn mua trả góp xe ${v.name} qua đại lý Ken Motor.`);
      }
    } else {
      setNotes(`Tôi muốn được tư vấn gói vay trả góp trị giá ${price.toLocaleString('vi-VN')}đ.`);
    }
  }, [selectedVehicleId, vehicles]);

  // Recalculate loan schedule
  useEffect(() => {
    const downpaymentVal = Math.round((price * downpaymentPercent) / 100);
    const loan = price - downpaymentVal;
    
    // Formula: monthly payment = loan / term + loan * rate_percent
    const monthlyPrincipal = loan / term;
    const monthlyInterest = loan * (interestRate / 100);
    const monthlyTotal = monthlyPrincipal + monthlyInterest;

    const total = downpaymentVal + (monthlyTotal * term);

    setDownpaymentValue(downpaymentVal);
    setLoanAmount(loan);
    setMonthlyPayment(Math.round(monthlyTotal));
    setTotalCost(Math.round(total));
  }, [price, downpaymentPercent, term, interestRate]);

  const handlePrepaymentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDownpaymentPercent(Number(e.target.value));
  };

  const handleVehicleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedVehicleId(val);
    if (!val) {
      setPrice(40000000);
    }
  };

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      setError('Vui lòng điền Họ tên và Số điện thoại.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await db.submitInstallmentRequest({
        name: name.trim(),
        phone: phone.trim(),
        vehicle_id: selectedVehicleId || null,
        price,
        downpayment: downpaymentValue,
        term_months: term,
        interest_rate: interestRate
      });
      setIsSuccess(true);
    } catch (err) {
      console.error('Error submitting installment lead:', err);
      setError('Đã xảy ra lỗi hệ thống. Vui lòng liên hệ Hotline cửa hàng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatPrice = (val: number) => {
    return val.toLocaleString('vi-VN') + ' đ';
  };

  if (isSuccess) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-8 text-center max-w-2xl mx-auto space-y-4">
        <div className="flex justify-center text-emerald-600">
          <CheckCircle2 className="w-16 h-16" />
        </div>
        <h2 className="font-bevietnam font-extrabold text-2xl text-emerald-950">Gửi hồ sơ đăng ký thành công!</h2>
        <p className="text-sm text-emerald-800 leading-relaxed">
          Kế hoạch trả góp: <strong>{formatPrice(monthlyPayment)}/tháng</strong> trong vòng <strong>{term} tháng</strong>.<br />
          Đại diện tài chính từ showroom <strong>Ken Motor</strong> sẽ liên hệ lại anh/chị <strong>{name}</strong> qua số điện thoại <strong>{phone}</strong> để tư vấn hoàn thiện hồ sơ ngân hàng.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="bg-brand-dark hover:bg-brand-red text-white font-bold py-2.5 px-6 rounded text-xs uppercase transition-colors"
          style={{ minHeight: '44px' }}
        >
          Tính toán khoản vay mới
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* 1. Calculator Config form inputs (Col span 2) */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
          <h2 className="font-bevietnam font-bold text-lg text-brand-dark border-b border-brand-border pb-3 flex items-center space-x-2">
            <Calculator className="w-5.5 h-5.5 text-brand-red" />
            <span>Thiết lập khoản vay trả góp</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Showroom Vehicle Selector */}
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Chọn dòng xe showroom</label>
              <select
                value={selectedVehicleId}
                onChange={handleVehicleChange}
                className="w-full bg-brand-light border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                style={{ minHeight: '44px' }}
              >
                <option value="">-- Nhập giá tùy chỉnh --</option>
                {vehicles.filter(v => !v.is_sold && v.price > 0).sort((a,b)=>a.name.localeCompare(b.name)).map(v => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({formatPrice(v.promo_price || v.price)})
                  </option>
                ))}
              </select>
            </div>

            {/* Custom vehicle price input */}
            {!selectedVehicleId && (
              <div>
                <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Giá xe tự nhập (VNĐ)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  className="w-full bg-brand-light border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
            )}

            {/* Downpayment percent select */}
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Tỷ lệ trả trước (%)</label>
              <select
                value={downpaymentPercent}
                onChange={handlePrepaymentChange}
                className="w-full bg-brand-light border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                style={{ minHeight: '44px' }}
              >
                {[10, 20, 30, 40, 50, 60, 70, 80, 90].map(pct => (
                  <option key={pct} value={pct}>{pct}% giá trị xe</option>
                ))}
              </select>
            </div>

            {/* Terms select */}
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Kỳ hạn vay</label>
              <select
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full bg-brand-light border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                style={{ minHeight: '44px' }}
              >
                {[6, 12, 18, 24].map(t => (
                  <option key={t} value={t}>{t} tháng (góp hàng tháng)</option>
                ))}
              </select>
            </div>

            {/* Monthly interest rate */}
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Lãi suất dự tính (% / tháng)</label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-brand-light border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                style={{ minHeight: '44px' }}
              />
            </div>

          </div>
        </div>

        {/* Loan breakdowns schedule result grid */}
        <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bevietnam font-bold text-base text-brand-dark border-b border-brand-border pb-3">Chi tiết bảng tính dự toán</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs lg:text-sm">
            <div className="flex justify-between items-center p-3.5 bg-brand-light/30 border border-brand-border/40 rounded-lg">
              <span className="text-brand-gray font-semibold">Giá trị xe máy:</span>
              <span className="font-bold text-brand-dark">{formatPrice(price)}</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-brand-light/30 border border-brand-border/40 rounded-lg">
              <span className="text-brand-gray font-semibold">Số tiền trả trước:</span>
              <span className="font-bold text-brand-red">{formatPrice(downpaymentValue)}</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-brand-light/30 border border-brand-border/40 rounded-lg">
              <span className="text-brand-gray font-semibold">Số tiền cần vay nợ:</span>
              <span className="font-bold text-brand-dark">{formatPrice(loanAmount)}</span>
            </div>
            <div className="flex justify-between items-center p-3.5 bg-brand-light/30 border border-brand-border/40 rounded-lg">
              <span className="text-brand-gray font-semibold">Lãi suất vay dự kiến:</span>
              <span className="font-bold text-brand-dark">{interestRate}% / tháng</span>
            </div>
          </div>

          <div className="bg-brand-red/5 border border-brand-red/20 rounded-xl p-5 flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold text-brand-gray uppercase tracking-wider">Số tiền thanh toán mỗi tháng</span>
              <div className="font-bevietnam font-extrabold text-2xl lg:text-3xl text-brand-red">
                {formatPrice(monthlyPayment)}
              </div>
            </div>
            <div className="text-center md:text-right text-xs text-brand-gray space-y-1">
              <div>Kỳ hạn: <strong>{term} tháng</strong></div>
              <div>Tổng chi trả xe: <strong>{formatPrice(totalCost)}</strong></div>
            </div>
          </div>

          {/* Legal Note warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800 flex items-start space-x-2">
            <Info className="w-4.5 h-4.5 text-amber-600 shrink-0 mt-0.5" />
            <p>
              * Đây là công cụ tính toán tham khảo dựa trên phương pháp tính lãi đơn trên dư nợ ban đầu. Mức đóng thực tế có thể thay đổi tùy thuộc vào chính sách tín dụng của từng ngân hàng đối tác tại thời điểm làm hồ sơ.
            </p>
          </div>

        </div>
      </div>

      {/* 2. Lead Form column (Col span 1) */}
      <div className="lg:col-span-1">
        <form onSubmit={handleSubmitLead} className="bg-white border border-brand-border rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sticky top-24">
          <h3 className="font-bevietnam font-bold text-base lg:text-lg text-brand-dark border-b border-brand-border pb-3">Đăng ký tư vấn vay</h3>
          
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
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-1">Nội dung / Ghi chú</label>
            <textarea
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-brand-light border border-brand-border rounded px-3 py-2 text-xs lg:text-sm text-brand-dark focus:outline-none"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-brand-red hover:bg-brand-red/90 text-white font-bevietnam font-extrabold py-3.5 rounded-lg text-xs tracking-wider transition-all uppercase flex items-center justify-center space-x-2 shadow-md shadow-brand-red/10"
            style={{ minHeight: '44px' }}
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Đang gửi...' : 'Gửi hồ sơ đăng ký'}</span>
          </button>
        </form>
      </div>

    </div>
  );
}
