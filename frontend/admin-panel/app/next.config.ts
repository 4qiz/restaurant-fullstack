import type {NextConfig} from 'next';

const protocol = process.env.MINIO_SSL === 'false' ? 'http' : 'https';
const hostname = process.env.MINIO_ENDPOINT || '';

const nextConfig: NextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: process.env.NODE_ENV !== 'production',
  images: {
    remotePatterns: [
      {
        protocol: protocol,
        hostname: hostname,
      },
    ],
  },
  experimental: {
    authInterrupts: true,
  },
};

export default nextConfig;
