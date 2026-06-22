'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calculator, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/lib/db/types';

interface QuickInstallmentCalculatorProps {
  vehicles: Vehicle[];
}

export default function QuickInstallmentCalculator({ vehicles }: QuickInstallmentCalculatorProps) {
  const router = useRouter();
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [customPrice, setCustomPrice] = useState<number>(40000000);
  const [prepaymentPercent, setPrepaymentPercent] = useState<number>(30); // 30% downpayment
  const [term, setTerm] = useState<number>(12); // 12 months
  const [interestRate, setInterestRate] = useState<number>(1.39); // 1.39% monthly

  const [prepaymentValue, setPrepaymentValue] = useState<number>(12000000);
  const [loanAmount, setLoanAmount] = useState<number>(28000000);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  // Sync selected vehicle price
  useEffect(() => {
    if (selectedVehicleId) {
      const v = vehicles.find(item => item.id === selectedVehicleId);
      if (v) {
        setCustomPrice(v.promo_price || v.price);
      }
    }
  }, [selectedVehicleId, vehicles]);

  // Recalculate values
  useEffect(() => {
    const calculatedPrepayment = Math.round((customPrice * prepaymentPercent) / 100);
    const calculatedLoan = customPrice - calculatedPrepayment;
    
    // Simple Interest Rate Calculation:
    // Monthly Principal = Loan / Term
    // Monthly Interest = Loan * (Rate / 100)
    // Monthly Payment = Principal + Interest
    const monthlyPrincipal = calculatedLoan / term;
    const monthlyInterest = calculatedLoan * (interestRate / 100);
    const monthlyTotal = monthlyPrincipal + monthlyInterest;

    const calculatedTotal = calculatedPrepayment + (monthlyTotal * term);

    setPrepaymentValue(calculatedPrepayment);
    setLoanAmount(calculatedLoan);
    setMonthlyPayment(Math.round(monthlyTotal));
    setTotalCost(Math.round(calculatedTotal));
  }, [customPrice, prepaymentPercent, term, interestRate]);

  const handleRouteToFull = () => {
    const slug = selectedVehicleId 
      ? vehicles.find(v => v.id === selectedVehicleId)?.slug 
      : '';
    router.push(`/tra-gop?price=${customPrice}&downpayment=${prepaymentPercent}&term=${term}&rate=${interestRate}${slug ? `&slug=${slug}` : ''}`);
  };

  const formatPrice = (val: number) => {
    return val.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="bg-white rounded-xl border border-brand-border p-6 shadow-md max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        
        {/* Inputs Column */}
        <div className="md:col-span-3 space-y-4">
          <div>
            <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Chọn dòng xe showroom</label>
            <select
              value={selectedVehicleId}
              onChange={(e) => setSelectedVehicleId(e.target.value)}
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

          {!selectedVehicleId && (
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Giá trị xe tự chọn</label>
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(Number(e.target.value))}
                className="w-full bg-brand-light border border-brand-border rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                style={{ minHeight: '44px' }}
                min="0"
              />
            </div>
          )}

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider">Số tiền trả trước: {prepaymentPercent}%</label>
              <span className="text-xs font-bold text-brand-red">{formatPrice(prepaymentValue)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              step="5"
              value={prepaymentPercent}
              onChange={(e) => setPrepaymentPercent(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-red"
            />
            <div className="flex justify-between text-[10px] text-brand-gray font-bold pt-1">
              <span>10%</span>
              <span>30%</span>
              <span>50%</span>
              <span>70%</span>
              <span>90%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Kỳ hạn vay</label>
              <select
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full bg-brand-light border border-brand-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                style={{ minHeight: '44px' }}
              >
                <option value="6">6 tháng</option>
                <option value="12">12 tháng</option>
                <option value="18">18 tháng</option>
                <option value="24">24 tháng</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">Lãi suất tháng (%)</label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full bg-brand-light border border-brand-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-brand-red text-brand-dark"
                style={{ minHeight: '44px' }}
              />
            </div>
          </div>
        </div>

        {/* Results Column */}
        <div className="md:col-span-2 bg-brand-dark text-white rounded-xl p-6 flex flex-col justify-between shadow-lg">
          <div>
            <div className="flex items-center space-x-2 text-brand-red mb-4">
              <Calculator className="w-5 h-5" />
              <h3 className="font-bevietnam font-bold text-sm tracking-wider uppercase">Kết quả ước tính</h3>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-2">
                <span className="text-gray-400">Số tiền cần vay:</span>
                <span className="font-bold">{formatPrice(loanAmount)}</span>
              </div>
              
              <div className="flex flex-col border-b border-white/10 pb-3">
                <span className="text-xs text-gray-400 mb-1">Góp mỗi tháng (gốc + lãi):</span>
                <span className="font-bevietnam font-extrabold text-xl lg:text-2xl text-brand-red">
                  {formatPrice(monthlyPayment)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-400">Tổng chi phí xe dự tính:</span>
                <span className="font-bold text-gray-200">{formatPrice(totalCost)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleRouteToFull}
            className="w-full bg-white hover:bg-brand-red hover:text-white text-brand-dark font-bevietnam font-extrabold py-3.5 px-4 rounded-lg text-xs tracking-wider transition-all duration-300 flex items-center justify-center space-x-2 mt-6 uppercase shadow-md shadow-black/30"
            style={{ minHeight: '44px' }}
          >
            <span>Nhận tư vấn trả góp</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
