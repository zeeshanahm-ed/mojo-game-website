/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                "*.mdx": ["mdx-loader"]
            }
        }
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
