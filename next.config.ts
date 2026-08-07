import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "buildyourbody.com",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["@capacitor/core"],
  },
};

export default nextConfig;
