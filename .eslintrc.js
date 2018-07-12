module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended"
  ],
  root: true,
  rules: {
    "eqeqeq": "error",
    "indent": ["error", 2],
    "no-console": "off",
    "no-var": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error",
    "quotes": ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}]
  }
};
