import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript:{
    ignoreBuildErrors:true
  },
  eslint:{
    ignoreDuringBuilds:true
  },
  reactStrictMode: true,
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      // protocol: 'http',
      hostname: 'api.midmanners.store',
      // hostname: 'localhost',
      // port: '8000',
      pathname: '/storage/**',
    },
  ],
}
};

export default nextConfig;
