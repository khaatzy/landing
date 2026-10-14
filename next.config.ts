import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "framer-motion": path.resolve(process.cwd(), "node_modules/framer-motion"),
      "motion": path.resolve(process.cwd(), "node_modules/motion"),
    };
    return config;
  },
};

export default nextConfig;
