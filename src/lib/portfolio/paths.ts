/**
 * Asset path helpers that respect Next.js `basePath` for static exports.
 *
 * Use these for any hardcoded asset reference (`<a href="/file.pdf">`,
 * `<img src="/image.png">`, etc.). Next.js automatically prefixes `<Link>`
 * and metadata API URLs, but plain HTML tags need manual prefixing.
 *
 * Reads `process.env.NEXT_PUBLIC_BASE_PATH` (set at build time) — falls back
 * to empty string for user pages.
 */

export const BASE_PATH: string = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Prepend basePath to a root-relative URL.
 * "/file.pdf"  → "/portfolio/file.pdf"
 * "file.pdf"   → "portfolio/file.pdf" (treated as relative)
 * "https://..."  → returned unchanged
 */
export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path)) return path; // already absolute URL
  if (!BASE_PATH) return path;
  if (path.startsWith("/")) return `${BASE_PATH}${path}`;
  return `${BASE_PATH}/${path}`;
}
