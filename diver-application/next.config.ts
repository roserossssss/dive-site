const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    
    unoptimized: true,
    //domains: ['media.istockphoto.com'],
  },
};

module.exports = withPWA(nextConfig);