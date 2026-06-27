import type { NextConfig } from "next";
import { BASE_PATH } from "./src/consts/urls/base-path";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["192.168.0.94"],
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_IS_LOCAL === "true" ? undefined : BASE_PATH,
  reactCompiler: true,
};

export default nextConfig;
