import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'http',
        hostname: '10.125.121.182', // 에러 메시지에 나온 IP 주소
        port: '8080',               // 포트 번호
        pathname: '/**',    // 이미지 저장 경로 패턴
      },
    ],
  },
};

export default nextConfig;
