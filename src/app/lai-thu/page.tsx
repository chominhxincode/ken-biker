import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import db from '@/lib/db';
import TestDriveForm from '@/components/TestDriveForm';

export const metadata: Metadata = {
  title: 'Đăng Ký Lái Thử Xe Máy Miễn Phí | Ken Motor',
  description: 'Đăng ký chạy thử trải nghiệm miễn phí các dòng xe máy mới nhất tại Ken Motor Đồng Tháp. Thủ tục nhanh gọn, xe chạy đầm chắc.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function TestDrivePage() {
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
        <span className="text-brand-dark font-semibold">Đăng ký lái thử</span>
      </div>

      {/* Header Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight leading-none">
          Lái Thử Xe Máy
        </h1>
        <p className="text-brand-gray text-xs lg:text-sm leading-relaxed">
          Đăng ký lái thử hoàn toàn miễn phí tại showroom để cảm nhận trực quan tư thế lái, hệ thống phanh và độ êm ái trước khi mua xe.
        </p>
        <div className="w-16 h-1 bg-brand-red mx-auto"></div>
      </div>

      {/* Test Drive Form */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse border rounded-2xl max-w-2xl mx-auto"></div>}>
        <TestDriveForm vehicles={vehicles} />
      </Suspense>
    </div>
  );
}
