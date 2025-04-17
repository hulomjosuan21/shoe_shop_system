import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'http',
      hostname: 'localhost',
      port: '5000',
      pathname: '/assets/images/**',
    }],
  },
};

export default nextConfig;
