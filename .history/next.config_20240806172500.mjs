/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'books.google.com',
          pathname: '/books/content/**', // 適切なパスパターンを指定
        },
      ],
    },
  };
  
  export default nextConfig;
  