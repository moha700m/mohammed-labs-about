import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Serve local brand assets directly from /public in the Sites/Vinext build.
  // This keeps the published image URL stable and avoids an unavailable image optimizer route.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

