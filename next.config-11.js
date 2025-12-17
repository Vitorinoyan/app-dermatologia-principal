/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configurações para sandbox/produção
  output: 'standalone',
  
  // Configurações de servidor
  experimental: {
    // Desabilitar hot reload em produção
    turbo: process.env.NODE_ENV === 'development',
  },
  
  // Configurações de build
  generateBuildId: async () => {
    // Use um ID de build estático para evitar problemas de cache
    return 'derm-ia-build'
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/api/health',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig