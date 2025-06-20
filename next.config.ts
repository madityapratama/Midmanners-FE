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
      hostname: 'api.midmanners.store',
      pathname: '/storage/**',
    },
  ],
}
};

export default nextConfig;
