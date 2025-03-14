module.exports = {
  ignoreFiles: ["theme/styles/base/_resets.scss"],
  defaultSeverity: "error",
  rules: {
    "function-calc-no-unspaced-operator": true,
    "shorthand-property-no-redundant-values": true,
    "declaration-block-no-redundant-longhand-properties": true,
    // SCSS compiler shouldn't allow this
    // 'block-no-empty': true,
    "comment-no-empty": true,
    "max-nesting-depth": 3,
    // SCSS compiler shouldn't allow this
    // 'no-extra-semicolons': true,
    "number-max-precision": 3,
    "property-no-vendor-prefix": true,
    // OK, sometimes you need to use important, but
    // it should be explicitly called out/disabled if/when used.
    "declaration-no-important": true,
    "declaration-block-single-line-max-declarations": 1,
    "selector-class-pattern": "[a-z][a-z0-9-]*",
    "selector-id-pattern": "[A-z_][A-z0-9-_]*",
    "custom-property-pattern": "[A-z][A-z0-9-]*",
    // No id's allowed!! Unless accounted for
    "selector-max-id": 0,
    "selector-no-vendor-prefix": true,
    "function-name-case": "lower",
    // sometimes we need a unit for Sass
    "length-zero-no-unit": null,
    // Doesn't play nicely with Sass `rgb()` function
    "color-function-notation": null,
    "value-keyword-case": [
      "lower",
      {
        ignoreKeywords: [],
      },
    ],
    "selector-attribute-quotes": "always",
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global"],
      },
    ],
    "selector-pseudo-element-colon-notation": "double",
    "selector-type-case": "lower",

    "rule-empty-line-before": [
      "always",
      {
        except: ["first-nested"],
        ignore: ["after-comment"],
      },
    ],
  },
  overrides: [
    {
      files: "**/styles.{js,ts}",
      extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
      customSyntax: "postcss-styled-syntax",
      rules: {
        "media-query-no-invalid": null,
        "no-descending-specificity": null,
      },
    },
    {
      files: "**/*.module.{scss}",
      extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-css-modules",
        "stylelint-config-recess-order",
      ],
    },
    {
      files: "**/*.module.{css}",
      extends: [
        "stylelint-config-standard",
        "stylelint-config-css-modules",
        "stylelint-config-recess-order",
      ],
    },
    {
      files: "**/*.scss",
      extends: [
        "stylelint-config-standard-scss",
        "stylelint-config-recess-order",
      ],
      rules: {
        "media-feature-name-no-unknown": [
          true,
          { ignoreMediaFeatureNames: ["functions"] },
        ],
        // SCSS rules
        "scss/at-else-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-function-pattern": "([a-z]+[0-9]*)([a-z0-9-]+)?",
        "scss/at-if-closing-brace-newline-after": "always-last-in-chain",
        "scss/at-mixin-argumentless-call-parentheses": "never",
        "scss/at-mixin-pattern": "([a-z]+[0-9]*)([a-z0-9-]+)?",
        "scss/dollar-variable-pattern": "([a-z]+[0-9]*)([a-z0-9-]+)?",
        "scss/dollar-variable-colon-space-after": "always",
        "scss/dollar-variable-colon-space-before": "never",
        "scss/percent-placeholder-pattern": "[a-z][a-z0-9-]*",
        // Arbitrary media values can be used, but explicitly
        "scss/media-feature-value-dollar-variable": "always",
      },
    },
  ],
};
