import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// Add this line
const withTM = require('next-transpile-modules')(['@shadcn/ui']);

// Wrap the existing config with withTM
module.exports = withTM(nextConfig);

export default nextConfig;
