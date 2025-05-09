/** @type {import('next').NextConfig} */
const path = require("path");

/** @type {import('next').NextConfig} */
module.exports = {
  images: { domains: [] },
  webpack(config) {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname),
    };
    return config;
  },
};
