'use client';

import React from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { GeneralSettings } from '@/lib/db/types';

interface StickyBottomBarProps {
  settings: GeneralSettings;
}

export default function StickyBottomBar({ settings }: StickyBottomBarProps) {
  const { totalItems } = useCart();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-brand-dark/95 backdrop-blur-md border-t border-white/10 shadow-2xl pb-safe">
      <div className="grid grid-cols-3 divide-x divide-white/10 h-16 items-center text-center">
        
        {/* Call Hotline */}
        <a 
          href={`tel:${settings.hotline}`}
          className="flex flex-col items-center justify-center h-full text-white hover:text-brand-red active:bg-white/5 transition-all"
          style={{ minHeight: '44px' }}
        >
          <Phone className="w-5.5 h-5.5 mb-1" />
          <span className="text-[10px] font-bold tracking-wider">GỌI NGAY</span>
        </a>

        {/* Zalo Chat */}
        <a 
          href={settings.zalo_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full text-white hover:text-blue-500 active:bg-white/5 transition-all"
          style={{ minHeight: '44px' }}
        >
          <MessageCircle className="w-5.5 h-5.5 mb-1 text-blue-400" />
          <span className="text-[10px] font-bold tracking-wider">CHAT ZALO</span>
        </a>

        {/* Quote Selection Cart */}
        <Link 
          href="/cart"
          className="flex flex-col items-center justify-center h-full text-white hover:text-brand-red active:bg-white/5 transition-all relative"
          style={{ minHeight: '44px' }}
        >
          <div className="relative mb-1">
            <ShoppingCart className="w-5.5 h-5.5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-brand-red text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-brand-dark animate-pulse">
                {totalItems}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold tracking-wider">GIỎ BÁO GIÁ</span>
        </Link>

      </div>
    </div>
  );
}
