/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["i.imgur.com"],
    remotePatterns: ["https://i\\.imgur\\.com/"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rizzulenation.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
