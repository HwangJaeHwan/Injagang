/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    BACKEND_SERVER_API: process.env.BACKEND_SERVER_API,
  },
};

module.exports = nextConfig;
