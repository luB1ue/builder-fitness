import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
