export type FallbackType = 'vehicle' | 'blog' | 'banner' | 'logo' | 'avatar';

export function getFallbackUrl(type: FallbackType): string {
  switch (type) {
    case 'vehicle':
      return '/demo/placeholder-vehicle.svg';
    case 'blog':
      return '/demo/placeholder-blog.svg';
    case 'banner':
      return '/demo/placeholder-banner.svg';
    case 'logo':
      return '/demo/placeholder-logo.svg';
    case 'avatar':
      return '/demo/placeholder-logo.svg';
    default:
      return '/demo/placeholder-vehicle.svg';
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
