/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['books.google.com'], // 追加
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'books.google.com',
          pathname: '/books/content/**', // パスのパターンを具体的に設定
        },
      ],
    },
  };
  
  export default nextConfig;
  