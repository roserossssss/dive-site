// next.config.js or next.config.ts
const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: false,
});

const nextConfig = {
  images: {
    domains: ['media.istockphoto.com'],
  },
};

module.exports = withPWA(nextConfig);
