module.exports = (...args) => [
  require("./addon-utils"),
  require("./license"),
].map(rule => new rule(...args));
