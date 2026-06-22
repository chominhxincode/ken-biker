'use client';

import React, { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { safeImageUrl, getFallbackUrl, FallbackType } from '@/lib/image-utils';

interface SafeImageProps extends Omit<ImageProps, 'onError' | 'src'> {
  src: string | null | undefined;
  fallbackType: FallbackType;
}

export default function SafeImage({ src, alt, fallbackType, ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<any>(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={safeImageUrl(imgSrc, fallbackType)}
      alt={alt}
      onError={() => {
        setImgSrc(getFallbackUrl(fallbackType));
      }}
    />
  );
}
