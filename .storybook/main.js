const tsConfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

/** @type { import('@storybook/nextjs').StorybookConfig } */
const config = {
  stories: ["../components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  webpackFinal: async (config, { configType }) => {
    [].push.apply(config.resolve.plugins, [
      new tsConfigPathsPlugin({ extensions: config.resolve.extensions }),
    ]);
    return config;
  },
};

export default config;
