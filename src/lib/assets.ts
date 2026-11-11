/**
 * Resolves public assets under Vite's BASE_URL so the build stays
 * base-path aware (GitHub Pages /portfolio/ or any subdirectory host).
 */
export function getAssetUrl(path: string): string {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return `${base}/${cleanPath}`;
}
