const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config, { isServer }) {
    // Do not run type checking twice:
    if (!isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
  // async rewrites() {
  //   return [
  //     process.env.NEXT_PUBLIC_API_MOCKING !== "enabled" && {
  //       source: "/api/:path*",
  //       destination: "http://localhost:8000/:path*", // Proxy to Backend
  //     },
  //   ].filter((e) => !!e);
  // },
};

module.exports = nextConfig;
