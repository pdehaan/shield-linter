module.exports = (...args) => [
  require("./addon-utils"),
  require("./ci"),
  require("./eslint"),
  require("./license"),
].map(rule => new rule(...args));
