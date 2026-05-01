import type { NextConfig } from "next";
//Next recibe llamadas en /api/users y las reenvia a la API real. 
//esto permite que el frontend y el backend se comuniquen sin problemas, incluso si están en dominios diferentes, evitando problemas de CORS. 


const nextConfig: NextConfig = {
  async rewrites() {
    const userApitarget =
      process.env.USERS_API_TARGET ?? 'http://localhost:3000'
    return [
      {
        source: '/api/users',
        destination: `${userApitarget}/api/users`,
      },
      {
        source: '/api/users/:path*',
        destination: `${userApitarget}/api/users/:path*`,
      }
    ];
  }

};

export default nextConfig;
