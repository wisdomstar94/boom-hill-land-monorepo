import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.0.94"],
};

export default nextConfig;
