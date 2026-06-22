'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageCircle, ChevronRight, Video, Sparkles } from 'lucide-react';
import { GeneralSettings } from '@/lib/db/types';

interface FooterProps {
  settings: GeneralSettings;
}

export default function Footer({ settings }: FooterProps) {
  const currentYear = new Date().getFullYear();
  const [logoSrc, setLogoSrc] = React.useState(settings?.logo_url || '/logo.png');

  React.useEffect(() => {
    setLogoSrc(settings?.logo_url || '/logo.png');
  }, [settings?.logo_url]);

  return (
    <footer className="bg-brand-dark text-gray-400 pt-16 pb-20 lg:pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

        {/* Brand Information Column */}
        <div className="space-y-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center justify-start">
              <Image
                src={logoSrc}
                alt="Ken Motor Logo"
                width={150}
                height={50}
                onError={() => setLogoSrc('/logo.png')}
                className="h-10 w-auto object-contain bg-white rounded px-2 py-1"
              />
            </Link>
          </div>
          <p className="text-sm leading-relaxed">
            Ken Motor chuyên mua bán xe máy mới và cũ uy tín tại Đồng Tháp. Cam kết chất lượng, bảo hành chu đáo, thủ tục trả góp 15 phút.
          </p>
          <div className="flex space-x-3 pt-2">
            {settings.facebook_link && (
              <a
                href={settings.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-red hover:text-white flex items-center justify-center transition-all"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current text-gray-400 hover:text-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
            )}
            {settings.tiktok_link && (
              <a
                href={settings.tiktok_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-red hover:text-white flex items-center justify-center transition-all"
                aria-label="TikTok"
              >
                <Sparkles className="w-4 h-4" />
              </a>
            )}
            {settings.youtube_link && (
              <a
                href={settings.youtube_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/5 hover:bg-brand-red hover:text-white flex items-center justify-center transition-all"
                aria-label="YouTube"
              >
                <Video className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="space-y-4">
          <h3 className="font-bevietnam font-bold text-white text-sm tracking-wider uppercase">Dịch vụ & Tiện ích</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/tu-van-chon-xe" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Tư vấn chọn xe thông minh</span>
              </Link>
            </li>
            <li>
              <Link href="/so-sanh" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>So sánh xe máy</span>
              </Link>
            </li>
            <li>
              <Link href="/tra-gop" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Dự toán trả góp</span>
              </Link>
            </li>
            <li>
              <Link href="/lai-thu" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Đăng ký lái thử miễn phí</span>
              </Link>
            </li>
            <li>
              <Link href="/ban-xe-cu" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Ký gửi & Bán xe máy cũ</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Product Categories Column */}
        <div className="space-y-4">
          <h3 className="font-bevietnam font-bold text-white text-sm tracking-wider uppercase">Danh mục xe máy</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/vehicles?category=xe-tay-ga" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Xe tay ga cao cấp</span>
              </Link>
            </li>
            <li>
              <Link href="/vehicles?category=xe-so" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Xe số tiết kiệm xăng</span>
              </Link>
            </li>
            <li>
              <Link href="/vehicles?category=xe-con-tay" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Xe côn tay thể thao</span>
              </Link>
            </li>
            <li>
              <Link href="/vehicles?category=xe-dien" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Xe máy điện thông minh</span>
              </Link>
            </li>
            <li>
              <Link href="/vehicles?category=xe-cu-tuyen-chon" className="hover:text-white flex items-center transition-colors">
                <ChevronRight className="w-3.5 h-3.5 mr-1 text-brand-red" />
                <span>Xe máy cũ tuyển chọn</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="space-y-4">
          <h3 className="font-bevietnam font-bold text-white text-sm tracking-wider uppercase">Thông tin liên hệ</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </li>
            <li className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-brand-red shrink-0" />
              <a href={`tel:${settings.hotline}`} className="hover:text-white transition-colors">{settings.hotline}</a>
            </li>
            <li className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
              <a href={settings.zalo_link} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Zalo Chat tư vấn</a>
            </li>
            <li className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-brand-red shrink-0" />
              <a href={`mailto:${settings.email}`} className="hover:text-white transition-colors truncate">{settings.email}</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs space-y-4 md:space-y-0 text-gray-500">
        <div>
          © {currentYear} Ken Motor Showroom. Mọi quyền được bảo lưu.
        </div>
        <div className="flex space-x-4">
          <Link href="/admin" className="hover:text-white transition-colors">CMS Dashboard</Link>
          <Link href="/vehicles" className="hover:text-white transition-colors">Sản Phẩm</Link>
          <Link href="/blog" className="hover:text-white transition-colors">Tin Tức</Link>
        </div>
      </div>
    </footer>
  );
}
