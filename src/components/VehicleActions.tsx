'use client';

import React from 'react';
import { ShoppingCart, MessageCircle, Phone, Check } from 'lucide-react';
import { Vehicle } from '@/lib/db/types';
import { useCart } from '@/context/CartContext';

interface ActionsProps {
  vehicle: Vehicle;
  hotline: string;
  zaloUrl: string;
}

export default function VehicleActions({ vehicle, hotline, zaloUrl }: ActionsProps) {
  const { addToCart, cart } = useCart();
  const isInCart = cart.some(item => item.vehicle.id === vehicle.id);

  // Generate Zalo link with pre-filled message text
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const messageText = encodeURIComponent(
    `Chào Ken Motor, tôi muốn nhận báo giá lăn bánh và tư vấn về dòng xe: ${vehicle.name} (SKU: ${vehicle.sku || 'N/A'}). Đường dẫn xe: ${currentUrl}`
  );
  
  // Custom Zalo URL formatting
  const zaloContactUrl = `${zaloUrl}?text=${messageText}`;

  return (
    <div className="space-y-4">
      {/* 1. Main action grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Add to Cart Selection */}
        <button
          onClick={() => !vehicle.is_sold && addToCart(vehicle)}
          disabled={vehicle.is_sold}
          className={`flex items-center justify-center space-x-2 py-3.5 px-6 rounded-lg font-bevietnam font-extrabold text-sm tracking-wider uppercase transition-all shadow-md disabled:bg-gray-200 disabled:text-gray-400 ${
            isInCart
              ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
              : 'bg-brand-red hover:bg-brand-red/90 text-white disabled:shadow-none'
          }`}
          style={{ minHeight: '44px' }}
        >
          {isInCart ? (
            <>
              <Check className="w-5 h-5" />
              <span>Đã thêm vào giỏ báo giá</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5" />
              <span>Thêm vào giỏ báo giá</span>
            </>
          )}
        </button>

        {/* Send query via Zalo directly */}
        <a
          href={zaloContactUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 px-6 rounded-lg font-bevietnam font-extrabold text-sm tracking-wider uppercase transition-all shadow-md"
          style={{ minHeight: '44px' }}
        >
          <MessageCircle className="w-5 h-5 text-blue-200" />
          <span>Nhắn Zalo Tư Vấn</span>
        </a>

      </div>

      {/* 2. Direct Call Action button */}
      <a
        href={`tel:${hotline}`}
        className="flex items-center justify-center space-x-2 bg-brand-dark hover:bg-brand-red border border-white/10 text-white py-4 px-6 rounded-lg font-bevietnam font-extrabold text-sm tracking-wider uppercase transition-all w-full shadow-md"
        style={{ minHeight: '44px' }}
      >
        <Phone className="w-5 h-5 text-brand-red shrink-0" />
        <span>Gọi điện Hotline: {hotline}</span>
      </a>
    </div>
  );
}
