/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/auth/:path*",
        destination: "http://localhost:3001/api/v1/auth/:path*"
      }
      /*{
        source: '/api/v1/:path*',
        destination: 'http://192.168.3.115:8080/api/v1/:path*' // Proxy to Backend
      }*/
    ]
  }
}

module.exports = nextConfig
