/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/industries/artificial-intelligence",
        destination: "/industries/ai",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (dev) {
      // Persistent / memory cache can leave stale chunk refs after HMR
      // (Cannot find module './948.js', vendor-chunks/gsap.js, etc.)
      config.cache = false;

      config.watchOptions = {
        ...config.watchOptions,
        aggregateTimeout: 300,
      };

      if (!isServer) {
        config.optimization = {
          ...config.optimization,
          moduleIds: "named",
          chunkIds: "named",
        };
      }
    }

    config.module.rules.push({
      test: /\.glsl$/,
      type: "asset/source",
    });

    return config;
  },
};

export default nextConfig;
