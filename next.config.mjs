/** @type {import('next').NextConfig} */

const nextConfig = async () => {
  return {};
};

export default nextConfig();

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
