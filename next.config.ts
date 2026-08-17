import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      { source: '/treatment/trt', destination: '/', permanent: true },
      { source: '/treatment/peptides', destination: '/', permanent: true },
      { source: '/treatment/peptide', destination: '/', permanent: true },
      { source: '/treatment/ed', destination: '/', permanent: true },
      { source: '/treatment/hair', destination: '/', permanent: true },
      { source: '/treatment/weight', destination: '/', permanent: true },
      { source: '/treatment/nad', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
