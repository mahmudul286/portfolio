import type { NextConfig } from "next";

/**
 * GitHub Pages configuration.
 *
 * - `output: "export"` produces a fully static site in `out/`.
 * - `basePath` is required when deploying to a project page
 *   (https://<username>.github.io/<repo>). Set it via the NEXT_PUBLIC_BASE_PATH
 *   env var so it can be empty for a user/org page (https://<username>.github.io).
 * - `images: { unoptimized: true }` because GitHub Pages has no image optimizer.
 * - `trailingSlash: true` ensures clean URLs on static hosting.
 *
 * Usage:
 *   Project page (https://mahmudul286.github.io/portfolio):
 *     NEXT_PUBLIC_BASE_PATH=/portfolio
 *   User page    (https://mahmudul286.github.io):
 *     NEXT_PUBLIC_BASE_PATH=   (empty)
 */

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  allowedDevOrigins: [
    "*.space-z.ai",
    "*.chatglm.cn",
    "localhost",
    "127.0.0.1",
  ],
};

export default nextConfig;
