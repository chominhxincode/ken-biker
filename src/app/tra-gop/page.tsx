import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import db from '@/lib/db';
import InstallmentSimulator from '@/components/InstallmentSimulator';

export const metadata: Metadata = {
  title: 'Dự Toán Mua Xe Máy Trả Góp | Ken Motor',
  description: 'Công cụ tính toán số tiền trả trước, số tiền vay, kỳ hạn góp (6-24 tháng) và ước tính số tiền góp hàng tháng tại Ken Motor Đồng Tháp.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function InstallmentPage() {
  // Fetch vehicles on server
  const [
    vehiclesRes
  ] = await Promise.all([
    db.getVehicles({ limit: 150 }).catch(() => ({ data: [], total: 0 }))
  ]);

  const vehicles = vehiclesRes.data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold">Ước tính trả góp</span>
      </div>

      {/* Header Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight leading-none">
          Dự Toán Trả Góp
        </h1>
        <p className="text-brand-gray text-xs lg:text-sm leading-relaxed">
          Nhập giá trị xe, số tiền trả trước và kỳ hạn thanh toán để ước tính khoản trả góp hàng tháng.
        </p>
        <div className="w-16 h-1 bg-brand-red mx-auto"></div>
      </div>

      {/* Live calculator container */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse border rounded-2xl max-w-4xl mx-auto"></div>}>
        <InstallmentSimulator vehicles={vehicles} />
      </Suspense>
    </div>
  );
}
