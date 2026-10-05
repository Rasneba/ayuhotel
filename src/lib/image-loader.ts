/**
 * Custom next/image loader.
 *
 * Pexels supports on-the-fly resizing via query params, so we let the CDN do
 * the work and keep the Next.js server out of the image path entirely.
 * Local assets (anything starting with "/") are returned untouched.
 */
export default function imageLoader({
  src,
  width,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  if (src.startsWith("/") || src.startsWith("data:")) return src;

  try {
    const url = new URL(src);
    if (url.hostname.endsWith("pexels.com")) {
      url.search = "";
      url.searchParams.set("auto", "compress");
      url.searchParams.set("cs", "tinysrgb");
      url.searchParams.set("w", String(width));
      return url.toString();
    }
    return src;
  } catch {
    return src;
  }
}
