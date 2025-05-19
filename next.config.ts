import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['6ca4-140-213-10-19.ngrok-free.app'], // <- tambahkan ini
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
