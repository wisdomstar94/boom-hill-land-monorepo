import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.0.94"],
  trailingSlash: true,
};

export default nextConfig;
