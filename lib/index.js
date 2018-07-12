const {accessSync, constants: {R_OK}} = require("fs");
const {basename} = require("path");

class Rule {
  constructor(file) {
    this.label = basename(file);
  }

  get logger() {
    const debug = (level, msg) => console[level](`${this.label}:`, msg.join(" "));

    return {
      log(...msg) {
        debug("log", msg);
      },
      info(...msg) {
        debug("info", msg);
      },
      warn(...msg) {
        debug("warn", msg);
      },
      error(...msg) {
        debug("error", msg);
        process.exitCode = 1;
      },
      fatal(...msg) {
        this.error(msg);
        process.exit(2);
      }
    };
  }
}

function fileExists(abspath) {
  return accessSync(abspath, R_OK);
}

module.exports = {
  Rule,
  fileExists
};
