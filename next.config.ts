import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Every photograph ships from /public/images, so Next.js optimises and
    // resizes them on demand (sharp is a dependency) and serves modern
    // formats with a proper srcset.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [64, 96, 128, 160, 256, 384],
    minimumCacheTTL: 2678400,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
