const {requireDir} = require("../../lib");

module.exports = (...args) => requireDir(__dirname).map(Rule => new Rule(...args));
