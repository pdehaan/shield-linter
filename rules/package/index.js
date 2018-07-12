module.exports = (...args) => [
  require("./addon-utils"),
  require("./ci"),
  require("./license"),
].map(rule => new rule(...args));
