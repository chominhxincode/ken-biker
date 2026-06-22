import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import db from '@/lib/db';
import CartPageContent from '@/components/CartPageContent';

export const metadata: Metadata = {
  title: 'Giỏ Hàng Nhận Báo Giá Lăn Bánh | Ken Motor',
  description: 'Xem danh sách xe máy bạn đã chọn, chỉnh sửa số lượng, gửi yêu cầu báo giá lăn bánh trọn gói hoặc gửi trực tiếp qua Zalo tại Ken Motor.',
};

export const revalidate = 0; // Dynamic cart state requires real-time settings check

export default async function CartPage() {
  // Fetch store configuration on server
  const settings = await db.getSettings().catch(() => ({} as any));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Về trang chủ</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold">Giỏ báo giá của bạn</span>
      </div>

      {/* Header title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight leading-none">
          Giỏ Báo Giá
        </h1>
        <p className="text-brand-gray text-xs lg:text-sm leading-relaxed">
          Quản lý các dòng xe bạn đang quan tâm. Gửi yêu cầu nhận báo giá lăn bánh trọn gói nhanh chóng.
        </p>
        <div className="w-16 h-1 bg-brand-red mx-auto"></div>
      </div>

      {/* Cart manager container */}
      <Suspense fallback={<div className="h-96 bg-white animate-pulse border rounded-2xl max-w-4xl mx-auto"></div>}>
        <CartPageContent settings={settings} />
      </Suspense>
    </div>
  );
}
