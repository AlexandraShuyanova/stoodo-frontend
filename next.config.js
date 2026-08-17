/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/v1/auth/:path*",
        destination: "http://localhost:3000/api/v1/auth/:path*"
      },
      {
        source: "/api/v1/image/:path*",
        destination: "http://localhost:3000/api/v1/image/:path*",
      },
      {
        source: "/api/v1/post/:path*",
        destination: "http://localhost:3000/api/v1/post/:path*",
      },
    ]
  }
}

module.exports = nextConfig
