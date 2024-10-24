import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    domains: ['waterreading.jacqueswainwright.com'],
  },
  /* config options here */
};

export default nextConfig;
