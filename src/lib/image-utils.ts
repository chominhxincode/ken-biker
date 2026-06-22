export type FallbackType = 'vehicle' | 'blog' | 'banner' | 'logo' | 'avatar';

export function getFallbackUrl(type: FallbackType): string {
  switch (type) {
    case 'vehicle':
      return '/demo/placeholder-vehicle.webp';
    case 'blog':
      return '/demo/placeholder-blog.webp';
    case 'banner':
      return '/demo/placeholder-banner.webp';
    case 'logo':
      return '/demo/placeholder-logo.webp';
    case 'avatar':
      return '/demo/placeholder-logo.webp';
    default:
      return '/demo/placeholder-vehicle.webp';
  }
}

export function safeImageUrl(url: string | null | undefined, type: FallbackType): string {
  if (!url) {
    return getFallbackUrl(type);
  }
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === 'null' || trimmed === 'undefined') {
    return getFallbackUrl(type);
  }
  return trimmed;
}
