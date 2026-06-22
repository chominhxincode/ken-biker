'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, MessageCircle, Eye, ShieldCheck, Fuel } from 'lucide-react';
import { Vehicle, Brand } from '@/lib/db/types';
import { useCart } from '@/context/CartContext';
import { safeImageUrl, getFallbackUrl } from '@/lib/image-utils';

interface VehicleCardProps {
  vehicle: Vehicle;
  brandName?: string;
  zaloLink: string;
}

export default function VehicleCard({ vehicle, brandName, zaloLink }: VehicleCardProps) {
  const { addToCart, cart } = useCart();
  const [imgSrc, setImgSrc] = React.useState(safeImageUrl(vehicle.og_image, 'vehicle'));

  React.useEffect(() => {
    setImgSrc(safeImageUrl(vehicle.og_image, 'vehicle'));
  }, [vehicle.og_image]);
  
  const displayPrice = vehicle.promo_price || vehicle.price;
  const hasDiscount = !!vehicle.promo_price;
  const discountPercent = hasDiscount 
    ? Math.round(((vehicle.price - vehicle.promo_price!) / vehicle.price) * 100)
    : 0;

  const isInCart = cart.some(item => item.vehicle.id === vehicle.id);

  // Format price helper
  const formatPrice = (value: number) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  return (
    <div className="group bg-white rounded-xl border border-brand-border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative">
      
      {/* Sold Out Overlay */}
      {vehicle.is_sold && (
        <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center pointer-events-none">
          <span className="bg-brand-red text-white font-bevietnam font-extrabold px-6 py-2 rounded-md rotate-[-12deg] text-lg border-2 border-white shadow-lg tracking-wider">
            ĐÃ BÁN
          </span>
        </div>
      )}

      {/* Badges container */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
        {/* Condition tag */}
        <span className={`text-[10px] font-extrabold tracking-wider px-2.5 py-1 rounded text-white shadow-sm uppercase ${
          vehicle.is_new ? 'bg-emerald-600' : 'bg-amber-600'
        }`}>
          {vehicle.is_new ? 'Xe mới' : `Xe cũ (${vehicle.odometer.toLocaleString('vi-VN')} km)`}
        </span>

        {/* Promo tag */}
        {hasDiscount && !vehicle.is_sold && (
          <span className="bg-brand-red text-white text-[10px] font-extrabold px-2.5 py-1 rounded shadow-sm">
            GIẢM {discountPercent}%
          </span>
        )}

        {/* Hot badge */}
        {vehicle.is_featured && !vehicle.is_sold && (
          <span className="bg-black text-white text-[10px] font-extrabold px-2.5 py-1 rounded border border-white/20 shadow-sm uppercase">
            Bán chạy
          </span>
        )}
      </div>

      {/* Product Image Gallery Wrapper */}
      <Link href={`/vehicles/${vehicle.slug}`} className="relative h-48 lg:h-52 w-full bg-gray-50 overflow-hidden block">
        <Image
          src={imgSrc}
          alt={vehicle.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
          onError={() => setImgSrc(getFallbackUrl('vehicle'))}
        />
      </Link>

      {/* Product content details */}
      <div className="p-4 flex flex-col flex-1">
        {/* Brand name */}
        <span className="text-[10px] font-bold text-brand-gray uppercase tracking-widest mb-1 block">
          {brandName || 'Hãng Xe'}
        </span>

        {/* Vehicle Name */}
        <Link href={`/vehicles/${vehicle.slug}`} className="hover:text-brand-red transition-colors mb-2 block">
          <h3 className="font-bevietnam font-bold text-sm lg:text-base text-brand-dark line-clamp-2 h-10 lg:h-12 leading-tight">
            {vehicle.name}
          </h3>
        </Link>

        {/* Specs quick indicators */}
        <div className="grid grid-cols-2 gap-2 text-xs text-brand-gray py-2 border-t border-b border-brand-border/60 mb-3">
          <span className="flex items-center space-x-1">
            <Fuel className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span className="truncate">{vehicle.fuel_consumption || 'N/A'}</span>
          </span>
          <span className="flex items-center space-x-1">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-red shrink-0" />
            <span className="truncate">{vehicle.warranty || 'N/A'}</span>
          </span>
        </div>

        {/* Price display container */}
        <div className="mt-auto mb-4">
          {hasDiscount ? (
            <div className="flex flex-col">
              <span className="text-xs text-brand-gray line-through leading-tight">
                {formatPrice(vehicle.price)}
              </span>
              <span className="text-base lg:text-lg font-bevietnam font-extrabold text-brand-red leading-tight">
                {formatPrice(vehicle.promo_price!)}
              </span>
            </div>
          ) : (
            <span className="text-base lg:text-lg font-bevietnam font-extrabold text-brand-dark">
              {vehicle.price > 0 ? formatPrice(vehicle.price) : 'Liên hệ báo giá'}
            </span>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-5 gap-1.5 pt-2 border-t border-brand-border/40">
          {/* Detail Link */}
          <Link
            href={`/vehicles/${vehicle.slug}`}
            className="col-span-1 bg-brand-light text-brand-dark hover:bg-brand-dark hover:text-white rounded-md flex items-center justify-center p-2.5 transition-all shadow-sm"
            title="Xem chi tiết"
          >
            <Eye className="w-4.5 h-4.5" />
          </Link>

          {/* Add to Cart Quote */}
          <button
            onClick={() => !vehicle.is_sold && addToCart(vehicle)}
            disabled={vehicle.is_sold}
            className={`col-span-2 flex items-center justify-center space-x-1 rounded-md py-2.5 px-1 font-bold text-xs transition-all shadow-sm ${
              isInCart
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-brand-dark text-white hover:bg-brand-red hover:text-white disabled:bg-gray-200 disabled:text-gray-400'
            }`}
            title="Thêm giỏ báo giá"
          >
            <ShoppingCart className="w-4 h-4 shrink-0" />
            <span>{isInCart ? 'Đã thêm' : 'Nhận báo giá'}</span>
          </button>

          {/* Chat Zalo */}
          <a
            href={zaloLink}
            target="_blank"
            rel="noopener noreferrer"
            className="col-span-2 flex items-center justify-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2.5 px-1 font-bold text-xs transition-all shadow-sm"
            title="Chat Zalo"
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Chat Zalo</span>
          </a>
        </div>
      </div>
    </div>
  );
}
