import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jzvmygfbgeiwvbnlnlao.supabase.co",
        pathname: "/storage/v1/object/public/site-images/**",
      },
    ],
  },
};

export default nextConfig;
