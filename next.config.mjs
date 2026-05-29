import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@splinetool/react-spline'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.alias['@splinetool/react-spline'] = path.resolve(process.cwd(), 'node_modules/@splinetool/react-spline/dist/react-spline.js');
        return config;
    }
};

export default nextConfig;
