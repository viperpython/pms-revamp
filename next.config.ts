
const nextConfig = {
  images: {
    // Use modern formats — AVIF is ~50% smaller than WebP, WebP is ~30% smaller than JPEG
    formats: ['image/avif', 'image/webp'],

    // Define exact sizes the images will render at — prevents oversized downloads
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    unoptimized: true,
    // Aggressive quality — hero images don't need 75% quality at 4K
    minimumCacheTTL: 31536000, // 1 year cache
  },

  // Enable gzip + brotli compression
  compress: true,
  output: 'export',
  experimental: {
    // Enables optimized CSS chunking
    optimizeCss: true,
  },
};

export default nextConfig;
