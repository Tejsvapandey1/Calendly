/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "standalone",
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
