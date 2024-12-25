/** @type {import('next').NextConfig} */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const nextConfig = async () => {
  if (process.env.NODE_ENV === "development") {
    await setupDevPlatform();
  }

  return {};
};

export default nextConfig();
