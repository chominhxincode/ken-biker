'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Settings, Save, Upload, MapPin, Phone, Mail, Globe } from 'lucide-react';
import db from '@/lib/db';
import { uploadImage } from '@/lib/db/upload';
import { GeneralSettings } from '@/lib/db/types';

export default function AdminSettings() {
  const [settings, setSettings] = useState<GeneralSettings>({
    site_name: 'Ken Motor',
    hotline: '0787990047',
    zalo_link: 'https://zalo.me/0787990047',
    email: 'mk.d.kaka@gmail.com',
    address: 'Long Hưng, Đồng Tháp',
    facebook_link: '',
    tiktok_link: '',
    youtube_link: '',
    google_maps_iframe: '',
    seo_default_title: 'Ken Motor | Cửa Hàng Xe Máy Uy Tín Tại Đồng Tháp',
    seo_default_description: 'Ken Motor chuyên mua bán xe máy mới, xe máy đã qua sử dụng, xe tay ga, xe số, xe côn tay và xe điện. Hỗ trợ tư vấn chọn xe, báo giá nhanh, trả góp linh hoạt và giao xe tận nơi.',
    logo_url: '',
    favicon_url: '',
    hero_title: '',
    hero_subtitle: '',
    hero_cta_text: '',
    hero_cta_link: '',
    hero_image_desktop: '',
    hero_image_mobile: '',
    homepage_section_title: '',
    intro_content: '',
    intro_image: '',
    cta_consult_text: '',
    cta_consult_link: '',
    cta_installment_text: '',
    cta_installment_link: '',
    footer_text: ''
  });

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  // File upload states
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingHeroDesktop, setUploadingHeroDesktop] = useState(false);
  const [uploadingHeroMobile, setUploadingHeroMobile] = useState(false);
  const [uploadingIntroImage, setUploadingIntroImage] = useState(false);
  
  const fileInputLogoRef = useRef<HTMLInputElement>(null);
  const fileInputFaviconRef = useRef<HTMLInputElement>(null);
  const fileInputHeroDesktopRef = useRef<HTMLInputElement>(null);
  const fileInputHeroMobileRef = useRef<HTMLInputElement>(null);
  const fileInputIntroImageRef = useRef<HTMLInputElement>(null);

  const handleHeroDesktopUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHeroDesktop(true);
    try {
      const url = await uploadImage(file, 'settings');
      setSettings(prev => ({ ...prev, hero_image_desktop: url }));
      alert('Tải ảnh desktop thành công. Hãy bấm nút lưu ở dưới cùng để ghi nhận.');
    } catch (err) {
      alert('Lỗi tải ảnh lên.');
    } finally {
      setUploadingHeroDesktop(false);
      if (fileInputHeroDesktopRef.current) fileInputHeroDesktopRef.current.value = '';
    }
  };

  const handleHeroMobileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingHeroMobile(true);
    try {
      const url = await uploadImage(file, 'settings');
      setSettings(prev => ({ ...prev, hero_image_mobile: url }));
      alert('Tải ảnh mobile thành công. Hãy bấm nút lưu ở dưới cùng để ghi nhận.');
    } catch (err) {
      alert('Lỗi tải ảnh lên.');
    } finally {
      setUploadingHeroMobile(false);
      if (fileInputHeroMobileRef.current) fileInputHeroMobileRef.current.value = '';
    }
  };

  const handleIntroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIntroImage(true);
    try {
      const url = await uploadImage(file, 'settings');
      setSettings(prev => ({ ...prev, intro_image: url }));
      alert('Tải ảnh giới thiệu thành công. Hãy bấm nút lưu ở dưới cùng để ghi nhận.');
    } catch (err) {
      alert('Lỗi tải ảnh lên.');
    } finally {
      setUploadingIntroImage(false);
      if (fileInputIntroImageRef.current) fileInputIntroImageRef.current.value = '';
    }
  };

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await db.getSettings();
      if (data && Object.keys(data).length > 0) {
        setSettings(prev => ({
          ...prev,
          ...data
        }));
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      const url = await uploadImage(file, 'settings');
      const updatedSettings = { ...settings, logo_url: url };
      setSettings(updatedSettings);
      await db.saveSettings(updatedSettings);
      alert('Đã lưu logo vào database');
    } catch (err) {
      alert('Lỗi tải logo lên hệ thống.');
    } finally {
      setUploadingLogo(false);
      if (fileInputLogoRef.current) fileInputLogoRef.current.value = '';
    }
  };

  const handleFaviconUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingFavicon(true);
    try {
      const url = await uploadImage(file, 'favicon');
      const updatedSettings = { ...settings, favicon_url: url };
      setSettings(updatedSettings);
      await db.saveSettings(updatedSettings);
      alert('Đã lưu favicon vào database');
    } catch (err) {
      alert('Lỗi tải favicon lên hệ thống.');
    } finally {
      setUploadingFavicon(false);
      if (fileInputFaviconRef.current) fileInputFaviconRef.current.value = '';
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);

    try {
      await db.saveSettings(settings);
      alert('Lưu cấu hình hệ thống website thành công. Vui lòng tải lại trang showroom để áp dụng thay đổi.');
    } catch (err: any) {
      alert('Lỗi lưu cấu hình: ' + (err.message || err));
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-brand-red mb-3"></div>
        <span className="text-[10px] text-brand-gray font-bold uppercase tracking-widest">Đang tải cấu hình website...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="border-b border-gray-200 pb-5">
        <h1 className="font-bevietnam font-extrabold text-2xl tracking-tight text-brand-dark uppercase">
          Cấu Hình Website
        </h1>
        <p className="text-brand-gray text-xs mt-1">
          Cập nhật thông tin cửa hàng, số điện thoại Hotline, liên kết Zalo hỗ trợ khách hàng, mã nhúng vị trí Google Maps và cấu hình SEO trang chủ.
        </p>
      </div>

      <form onSubmit={handleSaveSettings} className="space-y-6 max-w-4xl">
        
        {/* Core settings card */}
        <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-6">
          <h2 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-150 pb-2 flex items-center space-x-1.5">
            <Settings className="w-4 h-4" />
            <span>Thông tin thương hiệu & Logo</span>
          </h2>

          <div className="space-y-4">
            {/* Site Name */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Tên Website hiển thị *</label>
              <input
                type="text"
                value={settings.site_name}
                onChange={e => setSettings({ ...settings, site_name: e.target.value })}
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                style={{ minHeight: '44px' }}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Logo upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ảnh Logo hiển thị (Header/Footer)</label>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-brand-dark border border-white/5 rounded-lg overflow-hidden flex items-center justify-center p-1.5 shrink-0 relative">
                    {settings.logo_url ? (
                      <img src={settings.logo_url} alt="Logo Preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Logo</span>
                    )}
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputLogoRef.current?.click()}
                        className="bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải logo mới</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt('Nhập URL logo của bạn:');
                          if (url) setSettings({ ...settings, logo_url: url.trim() });
                        }}
                        className="border border-gray-200 hover:border-brand-dark text-brand-dark text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        Nhập URL logo
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputLogoRef}
                      onChange={handleLogoUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {uploadingLogo && <span className="text-[9px] text-brand-red font-bold animate-pulse">Đang tải ảnh logo lên...</span>}
                  </div>
                </div>
              </div>

              {/* Favicon upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ảnh Favicon hiển thị (Trình duyệt)</label>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-brand-light border border-gray-250 rounded-lg overflow-hidden flex items-center justify-center p-1.5 shrink-0 relative">
                    {settings.favicon_url ? (
                      <img src={settings.favicon_url} alt="Favicon Preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">Favicon</span>
                    )}
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputFaviconRef.current?.click()}
                        className="bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải favicon mới</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt('Nhập URL favicon của bạn:');
                          if (url) setSettings({ ...settings, favicon_url: url.trim() });
                        }}
                        className="border border-gray-200 hover:border-brand-dark text-brand-dark text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        Nhập URL favicon
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputFaviconRef}
                      onChange={handleFaviconUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {uploadingFavicon && <span className="text-[9px] text-brand-red font-bold animate-pulse">Đang tải ảnh favicon lên...</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact settings card */}
        <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-4">
          <h2 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-150 pb-2 flex items-center space-x-1.5">
            <Phone className="w-4 h-4" />
            <span>Thông tin Liên Hệ Hotline & Mạng xã hội</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Hotline */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Số điện thoại Hotline *</label>
              <input
                type="text"
                value={settings.hotline}
                onChange={e => setSettings({ ...settings, hotline: e.target.value })}
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark font-mono font-bold"
                style={{ minHeight: '44px' }}
                required
              />
            </div>

            {/* Zalo Link */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Đường dẫn Zalo hỗ trợ *</label>
              <input
                type="text"
                value={settings.zalo_link}
                onChange={e => setSettings({ ...settings, zalo_link: e.target.value })}
                placeholder="https://zalo.me/sodt"
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark font-mono"
                style={{ minHeight: '44px' }}
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Hòm thư điện tử Email *</label>
              <input
                type="email"
                value={settings.email}
                onChange={e => setSettings({ ...settings, email: e.target.value })}
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark font-mono"
                style={{ minHeight: '44px' }}
                required
              />
            </div>

            {/* Facebook Link */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Đường dẫn Fanpage Facebook</label>
              <input
                type="text"
                value={settings.facebook_link || ''}
                onChange={e => setSettings({ ...settings, facebook_link: e.target.value })}
                placeholder="https://facebook.com/..."
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                style={{ minHeight: '44px' }}
              />
            </div>

            {/* TikTok Link */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Đường dẫn Kênh TikTok</label>
              <input
                type="text"
                value={settings.tiktok_link || ''}
                onChange={e => setSettings({ ...settings, tiktok_link: e.target.value })}
                placeholder="https://tiktok.com/@..."
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                style={{ minHeight: '44px' }}
              />
            </div>

            {/* YouTube Link */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Đường dẫn Kênh YouTube</label>
              <input
                type="text"
                value={settings.youtube_link || ''}
                onChange={e => setSettings({ ...settings, youtube_link: e.target.value })}
                placeholder="https://youtube.com/c/..."
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                style={{ minHeight: '44px' }}
              />
            </div>

            {/* Address */}
            <div className="space-y-1 md:col-span-3">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Địa chỉ showroom *</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={settings.address}
                  onChange={e => setSettings({ ...settings, address: e.target.value })}
                  placeholder="Địa chỉ chi tiết của showroom cửa hàng"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg pl-9 pr-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                  required
                />
              </div>
            </div>

            {/* Google Maps embed code */}
            <div className="space-y-1 md:col-span-3">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Mã nhúng bản đồ Google Maps (Bắt đầu bằng &lt;iframe...)</label>
              <textarea
                value={settings.google_maps_iframe || ''}
                onChange={e => setSettings({ ...settings, google_maps_iframe: e.target.value })}
                rows={3}
                placeholder="Dán mã nhúng <iframe> nhận được từ Google Maps Share Embed..."
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y font-mono"
              ></textarea>
              <p className="text-[9px] text-brand-gray">{"Truy cập Google Maps -> Chọn Showroom -> Chia sẻ -> Nhúng bản đồ -> Sao chép mã HTML."}</p>
            </div>
          </div>
        </div>

        {/* Homepage Page Builder Card */}
        <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-6">
          <h2 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-150 pb-2 flex items-center space-x-1.5">
            <Settings className="w-4 h-4" />
            <span>Trình dựng Trang Chủ (Homepage Page Builder)</span>
          </h2>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-brand-dark uppercase border-l-2 border-brand-red pl-2">1. Banner Hero trang chủ (Dùng khi không có Slider)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Tiêu đề Hero chính</label>
                <input
                  type="text"
                  value={settings.hero_title || ''}
                  onChange={e => setSettings({ ...settings, hero_title: e.target.value })}
                  placeholder="Ví dụ: SHOWROOM XE MÁY CAO CẤP KEN MOTOR"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Tiêu đề phụ Hero (Subtitle)</label>
                <input
                  type="text"
                  value={settings.hero_subtitle || ''}
                  onChange={e => setSettings({ ...settings, hero_subtitle: e.target.value })}
                  placeholder="Ví dụ: Chuyên mua bán xe máy mới cũ, hỗ trợ trả góp nhanh chóng"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Chữ trên nút CTA</label>
                <input
                  type="text"
                  value={settings.hero_cta_text || ''}
                  onChange={e => setSettings({ ...settings, hero_cta_text: e.target.value })}
                  placeholder="Ví dụ: Xem xe ngay"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Liên kết nút CTA (URL)</label>
                <input
                  type="text"
                  value={settings.hero_cta_link || ''}
                  onChange={e => setSettings({ ...settings, hero_cta_link: e.target.value })}
                  placeholder="Ví dụ: /vehicles"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hero Desktop Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ảnh Hero Desktop (Kích thước PC)</label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-10 bg-brand-light border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0 relative">
                    {settings.hero_image_desktop ? (
                      <img src={settings.hero_image_desktop} alt="Hero PC Preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[8px] text-gray-400">Chưa có ảnh</span>
                    )}
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputHeroDesktopRef.current?.click()}
                        className="bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh PC</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt('Nhập URL ảnh Desktop:');
                          if (url) setSettings({ ...settings, hero_image_desktop: url.trim() });
                        }}
                        className="border border-gray-200 hover:border-brand-dark text-brand-dark text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        Dán URL
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputHeroDesktopRef}
                      onChange={handleHeroDesktopUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {uploadingHeroDesktop && <span className="text-[9px] text-brand-red font-bold animate-pulse">Đang tải...</span>}
                  </div>
                </div>
              </div>

              {/* Hero Mobile Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ảnh Hero Mobile (Kích thước Điện thoại)</label>
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-brand-light border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-1 shrink-0 relative">
                    {settings.hero_image_mobile ? (
                      <img src={settings.hero_image_mobile} alt="Hero Mobile Preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-[8px] text-gray-400">Chưa có ảnh</span>
                    )}
                  </div>
                  <div className="flex-grow space-y-1">
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => fileInputHeroMobileRef.current?.click()}
                        className="bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Tải ảnh Mobile</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt('Nhập URL ảnh Mobile:');
                          if (url) setSettings({ ...settings, hero_image_mobile: url.trim() });
                        }}
                        className="border border-gray-200 hover:border-brand-dark text-brand-dark text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider cursor-pointer"
                        style={{ minHeight: '36px' }}
                      >
                        Dán URL
                      </button>
                    </div>
                    <input
                      type="file"
                      ref={fileInputHeroMobileRef}
                      onChange={handleHeroMobileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    {uploadingHeroMobile && <span className="text-[9px] text-brand-red font-bold animate-pulse">Đang tải...</span>}
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-150 my-4" />

            <h3 className="text-xs font-bold text-brand-dark uppercase border-l-2 border-brand-red pl-2">2. Tiêu đề các mục hiển thị</h3>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Tiêu đề mục xe máy nổi bật</label>
              <input
                type="text"
                value={settings.homepage_section_title || ''}
                onChange={e => setSettings({ ...settings, homepage_section_title: e.target.value })}
                placeholder="Ví dụ: Danh Mục Xe Máy Nổi Bật"
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                style={{ minHeight: '44px' }}
              />
            </div>

            <hr className="border-gray-150 my-4" />

            <h3 className="text-xs font-bold text-brand-dark uppercase border-l-2 border-brand-red pl-2">3. Phần Giới thiệu Showroom (Giới thiệu cửa hàng)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Intro Image Upload */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Ảnh Giới thiệu cửa hàng</label>
                <div className="w-full aspect-[4/3] bg-brand-light border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-1 relative">
                  {settings.intro_image ? (
                    <img src={settings.intro_image} alt="Intro Preview" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[9px] text-gray-400">Chưa có ảnh giới thiệu</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputIntroImageRef.current?.click()}
                    className="flex-grow bg-brand-dark hover:bg-brand-red text-white text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider flex items-center justify-center space-x-1 cursor-pointer"
                    style={{ minHeight: '36px' }}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Tải ảnh</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const url = prompt('Nhập URL ảnh Giới thiệu:');
                      if (url) setSettings({ ...settings, intro_image: url.trim() });
                    }}
                    className="border border-gray-200 hover:border-brand-dark text-brand-dark text-[10px] font-bold px-3 py-2 rounded uppercase tracking-wider cursor-pointer"
                    style={{ minHeight: '36px' }}
                  >
                    Dán URL
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputIntroImageRef}
                  onChange={handleIntroImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                {uploadingIntroImage && <span className="text-[9px] text-brand-red font-bold animate-pulse block text-center">Đang tải...</span>}
              </div>

              {/* Intro Text */}
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Nội dung giới thiệu chi tiết (Hiện trên trang chủ/giới thiệu)</label>
                <textarea
                  value={settings.intro_content || ''}
                  onChange={e => setSettings({ ...settings, intro_content: e.target.value })}
                  rows={6}
                  placeholder="Giới thiệu về lịch sử, triết lý kinh doanh và cam kết dịch vụ của Ken Motor..."
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y leading-relaxed"
                ></textarea>
              </div>
            </div>

            <hr className="border-gray-150 my-4" />

            <h3 className="text-xs font-bold text-brand-dark uppercase border-l-2 border-brand-red pl-2">4. Lời dẫn & Liên kết các nút CTA tư vấn</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Nhãn chữ Nút tư vấn chọn xe máy</label>
                <input
                  type="text"
                  value={settings.cta_consult_text || ''}
                  onChange={e => setSettings({ ...settings, cta_consult_text: e.target.value })}
                  placeholder="Ví dụ: Bắt đầu khảo sát"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Đường dẫn Nút tư vấn chọn xe máy (URL)</label>
                <input
                  type="text"
                  value={settings.cta_consult_link || ''}
                  onChange={e => setSettings({ ...settings, cta_consult_link: e.target.value })}
                  placeholder="Ví dụ: /tu-van-chon-xe"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Nhãn chữ Nút liên hệ trả góp</label>
                <input
                  type="text"
                  value={settings.cta_installment_text || ''}
                  onChange={e => setSettings({ ...settings, cta_installment_text: e.target.value })}
                  placeholder="Ví dụ: Đăng ký trả góp trực tuyến"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Đường dẫn Nút liên hệ trả góp (URL)</label>
                <input
                  type="text"
                  value={settings.cta_installment_link || ''}
                  onChange={e => setSettings({ ...settings, cta_installment_link: e.target.value })}
                  placeholder="Ví dụ: /tra-gop"
                  className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                  style={{ minHeight: '44px' }}
                />
              </div>
            </div>

            <hr className="border-gray-150 my-4" />

            <h3 className="text-xs font-bold text-brand-dark uppercase border-l-2 border-brand-red pl-2">5. Nội dung Chân trang (Footer description)</h3>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">Văn bản mô tả tóm tắt ở Chân trang (Footer Text)</label>
              <textarea
                value={settings.footer_text || ''}
                onChange={e => setSettings({ ...settings, footer_text: e.target.value })}
                rows={3}
                placeholder="Ví dụ: Ken Motor chuyên mua bán xe máy mới và cũ uy tín tại Đồng Tháp. Cam kết chất lượng, bảo hành chu đáo, thủ tục trả góp 15 phút."
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y leading-relaxed"
              ></textarea>
            </div>

          </div>
        </div>

        {/* Global SEO Settings */}
        <div className="bg-white rounded-xl border border-gray-150 p-6 shadow-sm space-y-4">
          <h2 className="font-bevietnam font-extrabold text-xs uppercase tracking-wider text-brand-red border-b border-gray-150 pb-2 flex items-center space-x-1.5">
            <Globe className="w-4 h-4" />
            <span>Cấu hình SEO Mặc định (Trang Chủ)</span>
          </h2>

          <div className="space-y-4">
            {/* SEO Default title */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">SEO Meta Title Trang chủ *</label>
              <input
                type="text"
                value={settings.seo_default_title || ''}
                onChange={e => setSettings({ ...settings, seo_default_title: e.target.value })}
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark"
                style={{ minHeight: '44px' }}
                required
              />
            </div>

            {/* SEO Default description */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-brand-gray uppercase tracking-widest block">SEO Meta Description Trang chủ *</label>
              <textarea
                value={settings.seo_default_description || ''}
                onChange={e => setSettings({ ...settings, seo_default_description: e.target.value })}
                rows={3}
                className="w-full bg-brand-light border border-gray-200 focus:border-brand-red focus:outline-none rounded-lg px-4 py-2.5 text-xs text-brand-dark resize-y"
                required
              ></textarea>
            </div>
          </div>
        </div>

        {/* Form Submit Buttons */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={actionLoading}
            className="flex items-center space-x-2 bg-brand-red hover:bg-brand-red/90 text-white font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-lg cursor-pointer transition-all shadow-md shadow-brand-red/10 disabled:opacity-50"
            style={{ minHeight: '44px' }}
          >
            <Save className="w-4.5 h-4.5" />
            <span>{actionLoading ? 'Đang lưu cấu hình...' : 'Lưu lại toàn bộ cấu hình'}</span>
          </button>
        </div>

      </form>
    </div>
  );
}
