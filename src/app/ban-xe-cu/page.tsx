import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import SellOldVehicleForm from '@/components/SellOldVehicleForm';

export const metadata: Metadata = {
  title: 'Thu Mua Xe Máy Cũ Giá Cao | Ken Motor',
  description: 'Đăng ký bán xe máy cũ hoặc ký gửi trade-in đổi cũ lấy mới tại Đồng Tháp. Định giá online nhanh chóng, thủ tục rút gốc giấy tờ nhanh gọn.',
};

export default function SellVehiclePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold">Đăng ký bán xe cũ</span>
      </div>

      {/* Header Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight leading-none">
          Bán Xe Máy Cũ
        </h1>
        <p className="text-brand-gray text-xs lg:text-sm leading-relaxed">
          Định giá trực tuyến cực nhanh. Đăng ký bán xe cũ hoặc đổi cũ lấy mới (Trade-in) với chính sách hấp dẫn tại Ken Motor.
        </p>
        <div className="w-16 h-1 bg-brand-red mx-auto"></div>
      </div>

      {/* Sell Form */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse border rounded-2xl max-w-3xl mx-auto"></div>}>
        <SellOldVehicleForm />
      </Suspense>
    </div>
  );
}
