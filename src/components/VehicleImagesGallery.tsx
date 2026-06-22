'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { VehicleImage } from '@/lib/db/types';
import { safeImageUrl, getFallbackUrl } from '@/lib/image-utils';

interface GalleryProps {
  images: VehicleImage[];
  vehicleName: string;
  defaultCoverUrl: string;
}

export default function VehicleImagesGallery({ images, vehicleName, defaultCoverUrl }: GalleryProps) {
  const sortedImages = [...images].sort((a, b) => a.sort_order - b.sort_order);
  
  const initialImage = sortedImages.find(img => img.is_cover)?.image_url || 
                       sortedImages[0]?.image_url || 
                       defaultCoverUrl;

  const [activeUrl, setActiveUrl] = useState(safeImageUrl(initialImage, 'vehicle'));

  useEffect(() => {
    setActiveUrl(safeImageUrl(initialImage, 'vehicle'));
  }, [initialImage]);

  const displayImages = sortedImages.length > 0 
    ? sortedImages 
    : [{ id: 'default', image_url: defaultCoverUrl, sort_order: 0, is_cover: true }];

  return (
    <div className="space-y-4">
      {/* Active Main Hero Image */}
      <div className="relative h-[300px] md:h-[450px] w-full rounded-xl overflow-hidden bg-white border border-brand-border shadow-sm">
        <Image
          src={activeUrl}
          alt={`${vehicleName} Main Photo`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          onError={() => setActiveUrl(getFallbackUrl('vehicle'))}
        />
      </div>

      {/* Thumbnails list */}
      {displayImages.length > 1 && (
        <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-none snap-x">
          {displayImages.map((img) => {
            const activeSrc = safeImageUrl(img.image_url, 'vehicle');
            const isActive = activeSrc === activeUrl;
            return (
              <ThumbnailButton
                key={img.id}
                imgUrl={img.image_url}
                activeUrl={activeUrl}
                isActive={isActive}
                onClick={() => setActiveUrl(img.image_url)}
                vehicleName={vehicleName}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface ThumbnailButtonProps {
  imgUrl: string;
  activeUrl: string;
  isActive: boolean;
  onClick: () => void;
  vehicleName: string;
}

function ThumbnailButton({ imgUrl, activeUrl, isActive, onClick, vehicleName }: ThumbnailButtonProps) {
  const [src, setSrc] = useState(safeImageUrl(imgUrl, 'vehicle'));

  useEffect(() => {
    setSrc(safeImageUrl(imgUrl, 'vehicle'));
  }, [imgUrl]);

  return (
    <button
      onClick={onClick}
      className={`relative w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 shrink-0 transition-all snap-start ${
        isActive ? 'border-brand-red scale-95 shadow-md' : 'border-brand-border opacity-70 hover:opacity-100'
      }`}
      style={{ minWidth: '80px', minHeight: '80px' }}
      aria-label="View thumbnail image"
    >
      <Image
        src={src}
        alt={`${vehicleName} Thumbnail`}
        fill
        className="object-cover"
        sizes="100px"
        loading="lazy"
        onError={() => setSrc(getFallbackUrl('vehicle'))}
      />
    </button>
  );
}
