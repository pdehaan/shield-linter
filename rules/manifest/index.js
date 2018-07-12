module.exports = (...args) => [
  require("./applications-gecko-id"),
  require("./experiment-apis"),
  require("./version"),
].map(rule => new rule(...args));
