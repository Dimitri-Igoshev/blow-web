/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
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
