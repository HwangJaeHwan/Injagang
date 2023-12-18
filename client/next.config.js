/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_SERVER_API: process.env.BACKEND_SERVER_API,
  },
  images: {
    formats: ['image/avif','image/webp']
  }
};

module.exports = nextConfig;
