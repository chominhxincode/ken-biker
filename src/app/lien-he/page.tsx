import React, { Suspense } from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowLeft, Phone, MapPin, Mail, MessageCircle } from 'lucide-react';
import db from '@/lib/db';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Liên Hệ Showroom Xe Máy | Ken Motor',
  description: 'Thông tin liên hệ cửa hàng xe máy Ken Motor tại Long Hưng, Đồng Tháp. Hotline hỗ trợ 0787990047, Zalo tư vấn, chỉ đường bản đồ Google Maps.',
};

export const revalidate = 3600; // Cache for 1 hour

export default async function ContactPage() {
  const settings = await db.getSettings().catch(() => ({} as any));

  const address = settings.address || "Long Hưng, Đồng Tháp";
  const hotline = settings.hotline || "0787990047";
  const email = settings.email || "mk.d.kaka@gmail.com";
  const zaloLink = settings.zalo_link || "https://zalo.me/0787990047";
  const mapsIframe = settings.google_maps_iframe || `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.960249764724!2d105.74836697479836!3d10.344933989779357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x310a6568bbffffff%3A0xe543bd105e4ebcf6!2zTG9uZyBIxrBuZywgTOG6pXAgVsOyLCDEkOG7k25nIFRow6FwLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1718873000000!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 space-y-12">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs lg:text-sm text-brand-gray">
        <Link href="/" className="hover:text-brand-red flex items-center space-x-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Trang chủ</span>
        </Link>
        <span>/</span>
        <span className="text-brand-dark font-semibold">Liên hệ</span>
      </div>

      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <h1 className="font-bevietnam font-extrabold text-3xl lg:text-5xl text-brand-dark tracking-tight leading-none">
          Liên Hệ Ken Motor
        </h1>
        <p className="text-brand-gray text-xs lg:text-sm leading-relaxed">
          Gửi tin nhắn hoặc liên hệ trực tiếp qua Hotline/Zalo của showroom để được hỗ trợ tốt nhất.
        </p>
        <div className="w-16 h-1 bg-brand-red mx-auto"></div>
      </div>

      {/* Info Split layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left column: Info cards */}
        <div className="space-y-6">
          <div className="bg-white border border-brand-border rounded-2xl p-6 shadow-sm space-y-6">
            <h3 className="font-bevietnam font-bold text-base lg:text-lg text-brand-dark border-b border-brand-border pb-3">
              Thông tin cửa hàng
            </h3>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider block">Địa chỉ showroom</span>
                  <span className="text-xs lg:text-sm font-semibold text-brand-dark block mt-0.5">{address}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider block">Hotline mua xe & trả góp</span>
                  <a href={`tel:${hotline}`} className="text-xs lg:text-sm font-semibold text-brand-dark hover:text-brand-red transition-colors block mt-0.5">{hotline}</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider block">Tư vấn Zalo</span>
                  <a href={zaloLink} target="_blank" rel="noopener noreferrer" className="text-xs lg:text-sm font-semibold text-brand-dark hover:text-brand-red transition-colors block mt-0.5">Trò chuyện Zalo</a>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-9 h-9 rounded-full bg-brand-red/10 border border-brand-red/20 text-brand-red flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-brand-gray uppercase tracking-wider block">Hòm thư điện tử</span>
                  <a href={`mailto:${email}`} className="text-xs lg:text-sm font-semibold text-brand-dark hover:text-brand-red transition-colors block mt-0.5">{email}</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Form */}
        <div>
          <Suspense fallback={<div className="h-96 bg-white animate-pulse border rounded-2xl"></div>}>
            <ContactForm />
          </Suspense>
        </div>
      </div>

      {/* 4. Google maps iframe */}
      <section className="space-y-4">
        <h3 className="font-bevietnam font-bold text-lg text-brand-dark">Bản đồ vị trí showroom</h3>
        <div 
          className="border border-brand-border rounded-2xl overflow-hidden shadow-sm h-[400px] w-full"
          dangerouslySetInnerHTML={{ __html: mapsIframe }}
        ></div>
      </section>
    </div>
  );
}
