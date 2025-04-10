import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  //Can be remove if it doesnt involve stockphotos anymore
  images: {
    domains: ['media.istockphoto.com'],
  },
};

export default nextConfig;
