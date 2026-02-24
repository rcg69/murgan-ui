/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_NAME: 'Murgan Store',
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  // Redirect and rewrite rules
  async redirects() {
    return [
      {
        source: '/old-products',
        destination: '/products',
        permanent: true,
      },
    ];
  },

  // Headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
