export function getTikTokEmbedUrl(url: string): string | null {
  const match = url.match(/video\/(\d+)/);

  if (!match) return null;

  return `https://www.tiktok.com/player/v1/${match[1]}`;
}
