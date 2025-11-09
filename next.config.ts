import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  images: {
    domains: ['images.unsplash.com', 'example.com'],
  },
};

export default nextConfig;
