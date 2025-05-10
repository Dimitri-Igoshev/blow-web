/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'blow.igoshev.de',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
