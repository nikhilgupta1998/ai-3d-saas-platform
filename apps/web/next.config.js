/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizePackageImports: ['@react-three/fiber', '@react-three/drei', 'three'],
  },
  transpilePackages: ['@ai-3d-saas/types', '@ai-3d-saas/config', '@ai-3d-saas/utils'],
  images: {
    domains: ['localhost'],
  },
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    return config;
  },
};

module.exports = nextConfig;
