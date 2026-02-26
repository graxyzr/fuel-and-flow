/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // Importante para Vercel
  images: {
    unoptimized: true, // Se estiver usando imagens locais
  },
};

module.exports = nextConfig;