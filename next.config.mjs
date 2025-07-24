/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            loaders: {}, // leave it empty or configure only if needed
        },
    },
    images: {
        domains: ['logos-world.net', "placehold.co"], // ✅ allow this domain
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        return config;
    },
};

export default nextConfig;
