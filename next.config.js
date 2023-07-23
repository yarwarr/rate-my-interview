/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["uploadthing.com", "lh3.googleusercontent.com", "avatars.githubusercontent.com", "media.glassdoor.com"],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.glassdoor.com',
        port: '',
        pathname: '/sql/**',
      },
    ],
  },
  basePath: '',
  experimental: {
    appDir: true,
    serverActions: true
  },
  publicRuntimeConfig: {
    companiesDataFile: '/output.json',
  },
  
};

module.exports = nextConfig;
