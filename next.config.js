/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
  webpack: (config) => {
    config.module.rules.push({
      test: /three-mesh-bvh/,
      sideEffects: false,
    });
    return config;
  },
};

module.exports = nextConfig;
