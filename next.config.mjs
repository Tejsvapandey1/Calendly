/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    serverExternalPackages: ["@prisma/client"],
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
