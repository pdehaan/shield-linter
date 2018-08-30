module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    "eslint:recommended"
  ],
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module"
  },
  root: true,
  rules: {
    "eqeqeq": "error",
    "indent": ["error", 2],
    "no-console": "off",
    "no-unused-vars": ["error", {vars: "all", args: "after-used", ignoreRestSiblings: true, argsIgnorePattern: "options"}],
    "no-var": "error",
    "one-var": ["error", "never"],
    "prefer-const": "error",
    "quotes": ["error", "double", {avoidEscape: true, allowTemplateLiterals: true}]
  }
};
