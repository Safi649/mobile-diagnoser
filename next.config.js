/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,      // Helps catch React issues during development
  swcMinify: true,            // Enables faster minification
  // If you want to disable static optimization and force server-side rendering (optional)
  // ssr: true,

  // If you want to enable images from local or remote sources
  // images: {
  //   domains: ['example.com'],
  // },

  // Experimental features (optional)
  // experimental: {
  //   appDir: true,
  // },
};

module.exports = nextConfig;
