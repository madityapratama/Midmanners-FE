import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ['localhost'], // <- tambahkan ini
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

export default withFlowbiteReact(nextConfig);