const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: false,
});

const nextConfig = {
  output: "export",
  images: {
    domains: ["media.istockphoto.com"],
  },
};

module.exports = withPWA(nextConfig);
