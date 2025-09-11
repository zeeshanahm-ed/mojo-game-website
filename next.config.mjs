/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    trailingSlash: false,
    eslint: {
        // Ignore ESLint errors during builds so type tweaks don't block CI
        ignoreDuringBuilds: true,
    },
    experimental: {
        turbo: {
            rules: {
                "*.mdx": ["mdx-loader"],
            },
        },
    },
    images: {
        unoptimized: true, // ✅ required for static export
        domains: ["logos-world.net", "placehold.co"], // ✅ external domains
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
