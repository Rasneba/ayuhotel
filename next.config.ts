import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Images are served straight from the Pexels CDN with width params via a
    // tiny custom loader, so the browser gets responsive srcsets without
    // proxying through the Next.js server.
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 160, 256, 384],
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
