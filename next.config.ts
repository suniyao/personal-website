import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'hc-cdn.hel1.your-objectstorage.com',
      },
    ],
  },
};

export default nextConfig;
