import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['c4c3-140-213-216-4.ngrok-free.app'], // <- tambahkan ini
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
