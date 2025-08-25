/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        turbo: {
            rules: {
                "*.mdx": ["mdx-loader"],
            },
        },
    },
    images: {
        domains: ["logos-world.net", "placehold.co"], // ✅ allow this domain
    },
    webpack(config, { dev }) {
        // ✅ SVG loader
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });

        // ✅ Use memory cache in production to avoid .next/cache/webpack bloat
        if (!dev) {
            config.cache = {
                type: "memory",
                maxGenerations: 1, // keep only one generation in RAM
            };
        }

        return config;
    },
};

export default nextConfig;
