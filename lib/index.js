const {accessSync, constants: {R_OK}} = require("fs");
const {basename, dirname} = require("path");

class Rule {
  constructor(configFile, flags, name) {
    this.configPath = configFile;
    this.configDir = dirname(configFile);
    this.flags = flags;
    this.name = name;
    this.label = basename(configFile);
  }

  get logger() {
    const debug = (level, msg) => console[level](`${this.label}: [${this.name}]`, msg.join(" "));
    const isVerbose = this.flags.verbose;

    return {
      verbose(...msg) {
        isVerbose && console.log("VERBOSE:", ...msg);
      },
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
