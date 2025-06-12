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
      protocol: 'http',
      hostname: 'api.midmanners.store',
      pathname: '/storage/**',
    },
  ],
},
   async redirects() {
    return [
      {
        source: '/',
        destination: '/landingPage',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
