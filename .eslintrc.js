require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  rules: {
    // let next/link package handle anchor attributes
    "jsx-a11y/anchor-is-valid": 0,
    // next/link handles the href, so anchors without href are still interactive
    "jsx-a11y/no-noninteractive-tabindex": ["error", { tags: ["a"] }],
    // throwing false negatives on components using Atomics.Image
    "jsx-a11y/alt-text": 0,
    // storybook stories are exported this way
    "import/no-anonymous-default-export": 0,
    // would be good to use next/image but we aren't yet
    "@next/next/no-img-element": 0,
  },
  extends: ["@castiron", "next"],
};
