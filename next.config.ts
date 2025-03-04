import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frontend-take-home.fetch.com", // Match this for image URLs
        port: "",
        pathname: "/**", // Match all paths
      },
    ],
  },
};

export default nextConfig;
