module.exports = {
  plugins: [
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
          grid: false,
        },
        stage: 2,
      },
    ],
    [
      "postcss-normalize",
      {
        forceImport: true,
      },
    ],
  ],
};
