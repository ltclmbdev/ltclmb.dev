/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googletagmanager.com https://*.google-analytics.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com;
              connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com;
              font-src 'self';
              object-src 'none';
              media-src 'self';
              frame-src 'self';
            `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
        ],
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
      },
    ],
  },
}

export default nextConfig
