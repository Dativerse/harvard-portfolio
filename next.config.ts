import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the optional `canvas` dependency of @react-pdf/renderer out of the
  // server bundle — it's a native module we don't need for text/SVG PDFs.
  serverExternalPackages: ["@react-pdf/renderer"],

  turbopack: {
    resolveAlias: {
      canvas: "./lib/canvas-stub.js",
    },
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
