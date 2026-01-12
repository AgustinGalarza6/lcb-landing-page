/**
 * Extrae el ID de un video de YouTube desde diferentes formatos de URL
 * @param url - URL del video de YouTube
 * @returns El ID del video o null si no se encuentra
 */
export function extractYoutubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // Si no coincide con ningún patrón, asumir que ya es un ID
  if (url.length === 11 && !url.includes('/') && !url.includes('?')) {
    return url;
  }

  return null;
}

/**
 * Obtiene la URL de la miniatura de un video de YouTube
 * @param videoId - ID del video
 * @param quality - Calidad de la imagen ('maxres', 'sd', 'hq', 'mq', 'default')
 * @returns URL de la miniatura
 */
export function getYoutubeThumbnail(
  videoId: string,
  quality: 'maxres' | 'sd' | 'hq' | 'mq' | 'default' = 'maxres'
): string {
  const qualityMap = {
    maxres: 'maxresdefault',
    sd: 'sddefault',
    hq: 'hqdefault',
    mq: 'mqdefault',
    default: 'default',
  };

  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
}

/**
 * Genera la URL de embed de YouTube
 * @param videoId - ID del video
 * @param autoplay - Si debe reproducirse automáticamente
 * @returns URL de embed
 */
export function getYoutubeEmbedUrl(
  videoId: string,
  autoplay: boolean = false
): string {
  const params = new URLSearchParams();
  if (autoplay) params.set('autoplay', '1');
  
  const queryString = params.toString();
  return `https://www.youtube.com/embed/${videoId}${queryString ? `?${queryString}` : ''}`;
}
