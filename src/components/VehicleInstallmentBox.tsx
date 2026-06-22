'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/lib/db/types';

interface InstallmentBoxProps {
  vehicle: Vehicle;
}

export default function VehicleInstallmentBox({ vehicle }: InstallmentBoxProps) {
  const router = useRouter();
  const price = vehicle.promo_price || vehicle.price;
  
  const [prepaymentPercent, setPrepaymentPercent] = useState<number>(30); // 30% prepayment
  const [term, setTerm] = useState<number>(12); // 12 months
  const interestRate = 1.39; // Default rate

  const [prepaymentValue, setPrepaymentValue] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  useEffect(() => {
    const prepayment = Math.round((price * prepaymentPercent) / 100);
    const loan = price - prepayment;
    
    const monthlyPrincipal = loan / term;
    const monthlyInterest = loan * (interestRate / 100);
    const monthlyTotal = monthlyPrincipal + monthlyInterest;

    setPrepaymentValue(prepayment);
    setLoanAmount(loan);
    setMonthlyPayment(Math.round(monthlyTotal));
  }, [price, prepaymentPercent, term]);

  const handleRouteToFull = () => {
    router.push(`/tra-gop?price=${price}&downpayment=${prepaymentPercent}&term=${term}&rate=${interestRate}&slug=${vehicle.slug}`);
  };

  const formatPrice = (val: number) => {
    return val.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="bg-brand-dark text-white rounded-xl p-5 border border-white/10 shadow-lg space-y-4">
      <div className="flex items-center space-x-2 text-brand-red">
        <Calculator className="w-5 h-5" />
        <h3 className="font-bevietnam font-bold text-xs uppercase tracking-wider">Ước tính trả góp nhanh</h3>
      </div>

      <div className="space-y-3">
        {/* Prepayment percent slider */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-gray-400">Trả trước ({prepaymentPercent}%):</span>
            <span className="font-bold text-brand-red">{formatPrice(prepaymentValue)}</span>
          </div>
          <input
            type="range"
            min="10"
            max="90"
            step="10"
            value={prepaymentPercent}
            onChange={(e) => setPrepaymentPercent(Number(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-brand-red"
          />
        </div>

        {/* Term options select */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-gray-400 block mb-1">Kỳ hạn vay</span>
            <select
              value={term}
              onChange={(e) => setTerm(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-white focus:outline-none"
              style={{ minHeight: '44px' }}
            >
              <option value="6" className="text-brand-dark">6 tháng</option>
              <option value="12" className="text-brand-dark">12 tháng</option>
              <option value="18" className="text-brand-dark">18 tháng</option>
              <option value="24" className="text-brand-dark">24 tháng</option>
            </select>
          </div>
          <div>
            <span className="text-gray-400 block mb-1">Lãi suất dự kiến</span>
            <div className="bg-white/5 border border-white/10 rounded px-2.5 py-2.5 font-bold">
              {interestRate}% / tháng
            </div>
          </div>
        </div>

        {/* Monthly payment summary result */}
        <div className="bg-white/5 border border-white/5 p-3 rounded-lg flex justify-between items-center mt-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400">Góp mỗi tháng:</span>
            <span className="font-bevietnam font-extrabold text-base text-brand-red">
              {formatPrice(monthlyPayment)}
            </span>
          </div>
          <span className="text-[10px] text-gray-500 italic">Vay: {formatPrice(loanAmount)}</span>
        </div>
      </div>

      <button
        onClick={handleRouteToFull}
        className="w-full bg-white hover:bg-brand-red hover:text-white text-brand-dark font-bevietnam font-bold py-2.5 rounded text-xs transition-colors flex items-center justify-center space-x-1 uppercase"
        style={{ minHeight: '44px' }}
      >
        <span>Tính toán chi tiết</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
