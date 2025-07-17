/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      exclude: /\/(card_1\.svg)$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      // disable plugins
                      removeViewBox: false,
                      cleanupIds: false,
                    },
                  },
                },
                {
                  name: "prefixIds",
                  params: {
                    prefix: () => {
                      const prefix =
                        Math.random().toString(36).substring(2, 9) +
                        Math.random().toString(36).substring(2, 9);
                      return prefix;
                    },
                    delim: "-",
                  },
                },
              ],
            },
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
