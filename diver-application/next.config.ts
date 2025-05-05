const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    domains: ['media.istockphoto.com'],
    unoptimized: true,

  },
};

module.exports = withPWA(nextConfig);