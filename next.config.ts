import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `next build` emits a self-contained `out/` folder
  // (HTML/CSS/JS only) instead of a Node server. No API routes with
  // request-dependent logic, middleware, or ISR are allowed — the resume
  // PDF route below is pre-rendered per `cvType` at build time instead.
  output: "export",

  // Keep the optional `canvas` dependency of @react-pdf/renderer out of the
  // build-time bundle — it's a native module we don't need for text/SVG PDFs.
  // (The PDF route still runs during `next build` to produce static files.)
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
