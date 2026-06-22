'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { GeneralSettings } from '@/lib/db/types';
import SearchBar from './SearchBar';

interface HeaderProps {
  settings: GeneralSettings;
}

export default function Header({ settings }: HeaderProps) {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [logoSrc, setLogoSrc] = useState(settings?.logo_url || '/logo.png');

  useEffect(() => {
    setLogoSrc(settings?.logo_url || '/logo.png');
  }, [settings?.logo_url]);

  // Check if current path matches link
  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const desktopLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Mua xe', href: '/vehicles' },
    { name: 'Tư vấn', href: '/tu-van-chon-xe' },
    { name: 'So sánh', href: '/so-sanh' },
    { name: 'Trả góp', href: '/tra-gop' },
    { name: 'Bán xe cũ', href: '/ban-xe-cu' },
    { name: 'Tin tức', href: '/blog' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  const drawerLinks = [
    { name: 'Trang chủ', href: '/' },
    { name: 'Mua xe', href: '/vehicles' },
    { name: 'Tư vấn chọn xe', href: '/tu-van-chon-xe' },
    { name: 'So sánh', href: '/so-sanh' },
    { name: 'Trả góp', href: '/tra-gop' },
    { name: 'Đăng ký lái thử', href: '/lai-thu' },
    { name: 'Bán xe cũ', href: '/ban-xe-cu' },
    { name: 'Tin tức', href: '/blog' },
    { name: 'Liên hệ', href: '/lien-he' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-brand-dark/95 backdrop-blur-md text-white border-b border-white/10 shadow-lg">
        {/* Main Header Wrapper - Bounded to max-width 1440px and centered */}
        <div className="max-w-[1440px] mx-auto px-4 lg:px-6 w-full">
          
          {/* MOBILE HEADER LAYOUT (Two rows) */}
          <div className="lg:hidden flex flex-col w-full py-2">
            {/* Row 1: Hamburger (left) | Logo (center) | Cart (right) */}
            <div className="flex items-center justify-between h-14 w-full relative">
              <button 
                onClick={() => setIsDrawerOpen(true)}
                className="w-11 h-11 flex items-center justify-center text-gray-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Open menu"
                id="mobile-menu-toggle"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <Menu className="w-6 h-6" />
              </button>

              <div className="absolute left-1/2 -translate-x-1/2 z-10">
                <Link href="/" className="flex items-center justify-center">
                  <Image 
                    src={logoSrc} 
                    alt="Ken Motor" 
                    width={110} 
                    height={35}
                    onError={() => setLogoSrc('/logo.png')}
                    className="h-8 w-auto object-contain"
                    priority
                  />
                </Link>
              </div>

              <Link 
                href="/cart"
                className="w-11 h-11 flex items-center justify-center relative bg-white/5 hover:bg-brand-red hover:text-white text-gray-300 rounded-full transition-all duration-300 cursor-pointer"
                aria-label="Giỏ hàng báo giá"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>

            {/* Row 2: Search Bar Full Width */}
            <div className="w-full pt-1.5 pb-1">
              <SearchBar placeholder="Tìm xe..." compact={true} />
            </div>
          </div>

          {/* DESKTOP HEADER LAYOUT (Single row) */}
          <div className="hidden lg:flex items-center justify-between h-20 w-full gap-3 xl:gap-4 flex-nowrap">
            
            {/* 1. Logo (max-width: 130px - 150px) */}
            <div className="shrink-0 flex items-center w-[125px] xl:w-[145px]">
              <Link href="/" className="flex items-center justify-center">
                <Image 
                  src={logoSrc} 
                  alt="Ken Motor" 
                  width={140} 
                  height={45}
                  onError={() => setLogoSrc('/logo.png')}
                  className="h-10 xl:h-11 w-auto max-w-[125px] xl:max-w-[145px] object-contain"
                  priority
                />
              </Link>
            </div>

            {/* 2. Search Bar (width: 220px to 320px) */}
            <div className="w-full max-w-[220px] xl:max-w-[320px] shrink-0">
              <SearchBar placeholder="Tìm xe, hãng xe, dòng xe..." compact={true} />
            </div>

            {/* 3. Navigation Links */}
            <nav className="flex items-center gap-1.5 xl:gap-2.5 flex-nowrap text-[12.5px] xl:text-[13px] tracking-tight py-1">
              {desktopLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-1.5 py-1.5 xl:px-2.5 xl:py-2 font-semibold rounded-md transition-all duration-200 whitespace-nowrap ${
                    isActive(link.href)
                      ? 'text-brand-red bg-white/5 font-bold border-b-2 border-brand-red rounded-b-none'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* 4. Action buttons (Cart + Call) */}
            <div className="flex items-center space-x-2 xl:space-x-3 shrink-0">
              {/* Quote Cart Button */}
              <Link 
                href="/cart"
                className="w-11 h-11 flex items-center justify-center relative bg-white/5 hover:bg-brand-red hover:text-white text-gray-300 rounded-full transition-all duration-300 shadow-md cursor-pointer"
                aria-label="Giỏ hàng báo giá"
                style={{ minWidth: '44px', minHeight: '44px' }}
              >
                <ShoppingCart className="w-5 h-5 lg:w-5.5 lg:h-5.5" />
                {totalItems > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-brand-dark animate-pulse">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Hotline Quick Call */}
              <a 
                href={`tel:${settings.hotline}`}
                className="flex items-center space-x-1.5 bg-brand-red hover:bg-brand-red/90 text-white font-bold py-1.5 px-2.5 lg:px-3 rounded-md transition-all duration-300 text-xs xl:text-sm shadow-md whitespace-nowrap shrink-0"
                style={{ minHeight: '44px' }}
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Gọi: {settings.hotline}</span>
                <span className="inline xl:hidden">{settings.hotline}</span>
              </a>
            </div>

          </div>

        </div>
      </header>

      {/* Drawer / Mobile Sidebar Navigation Drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
        isDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop overlay */}
        <div 
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isDrawerOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setIsDrawerOpen(false)}
        ></div>
        
        {/* Drawer Menu Panel */}
        <div className={`fixed top-0 bottom-0 left-0 w-80 max-w-[85vw] bg-brand-dark text-white flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Header of Drawer */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/40">
            <div className="flex items-center">
              <Image 
                src={logoSrc} 
                alt="Ken Motor" 
                width={120} 
                height={40}
                onError={() => setLogoSrc('/logo.png')}
                className="h-10 w-auto object-contain"
              />
            </div>
            <button 
              onClick={() => setIsDrawerOpen(false)}
              className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
              aria-label="Close menu"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Links scrollable list */}
          <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
            {drawerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsDrawerOpen(false)}
                className={`flex items-center px-4 py-3 text-base font-semibold rounded-md transition-all ${
                  isActive(link.href)
                    ? 'bg-brand-red text-white'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Footer of Drawer */}
          <div className="p-4 border-t border-white/10 bg-black/40 space-y-3">
            <div className="flex flex-col space-y-2 text-sm text-gray-400">
              <span>Hotline: {settings.hotline}</span>
              <span>Zalo: {settings.hotline}</span>
              <span className="text-xs truncate">Email: {settings.email}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a 
                href={`tel:${settings.hotline}`}
                className="flex items-center justify-center space-x-1 bg-brand-red hover:bg-brand-red/90 text-white font-bold py-2.5 px-2 rounded text-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Gọi ngay</span>
              </a>
              <a 
                href={settings.zalo_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-2 rounded text-xs transition-colors"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Chat Zalo</span>
              </a>
            </div>
            <Link 
              href="/admin" 
              onClick={() => setIsDrawerOpen(false)}
              className="block text-center text-xs text-gray-400 hover:text-white transition-colors pt-2 border-t border-white/5"
            >
              CMS Admin Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
