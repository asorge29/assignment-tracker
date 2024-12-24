/** @type {import('next').NextConfig} */
import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev";

const isDev = process.env.NODE_ENV === "development";

const nextConfig = async () => {
  if (isDev) {
    await setupDevPlatform();
  }

  return {};
};

export default nextConfig();
