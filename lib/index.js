const {accessSync, constants: {R_OK}} = require("fs");
const {dirname, join} = require("path");

class Rule {
  /**
   * Creates a new linter Rule.
   * @constructor
   * @param  {object} cfg        The contents of the specified "manifest.json" or "package.json" file.
   * @param  {string} configFile The fully qualified path of the specified config file (from `cfg` argument).
   * @param  {object} flags      The CLI flags passed to the script (such as the "--manifest-path" or "--package-path").
   * @param  {string} name       The name of the rule (such as "manifest/applications-gecko-id", or "package/addon-utils").
   */
  constructor(cfg, configFile, flags, name) {
    this.configPath = configFile;
    this.configDir = dirname(configFile);
    this.flags = flags;
    this.name = name;

    const [key] = name.split("/");
    // where `key` is "manifest" or "package".
    this[key] = cfg;
    this[`${key}Path`] = configFile;
    this[`${key}Dir`] = this.configDir;

    this.severity = Object.freeze({OFF: 'off', WARN: 'warn', ERROR: 'error'});
  }

  /**
   * Creates a logger() object which lets us call `logger.log()`, `logger.warn()`, `logger.error()`, etc.
   * If the `logger.error()` method is called, the script will set the `exitCode` to 1.
   * If the `logger.fatal()` method is called, the script will exit immediately with an exit code of 2.
   * @return {object} A logger object with `.verbose()`, `.log()`, `.info()`, `.warn()`, `.error()`, and `.fatal()` methods.
   */
  get logger() {
    const debug = (level, msg) => console[level](`[${this.name}]`, ...msg);
    const isVerbose = this.flags.verbose;

    return {
      verbose(...msg) {
        isVerbose && console.log("DEBUG:", ...msg);
      },
      off() {
        return;
      },
      severity(level) {
        return this[level];
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

  get packageJson() {
    const {logger, label, configPath} = this;
    const pkg = this.package;

    return {
      allDependencies() {
        this.checkPackageJson();
        const {dependencies, devDependencies} = pkg;
        return Object.assign({}, dependencies, devDependencies);
      },

      checkPackageJson() {
        if ((label !== "package.json") && !pkg) {
          logger.verbose(`${configPath} does not have a "package" property`);
          return false;
        }
        return true;
      },

      dependencyVersion(name) {
        if (this.hasDependency(name)) {
          const deps = this.allDependencies();
          return deps[name];
        }
        logger.error(`"${name}" not found in dependencies or devDependencies`);
      },

      hasDependency(name) {
        return Object.keys(this.allDependencies()).includes(name);
      }
    };
  }
}

/**
 * A function which checks if a specified file exists.
 * @param  {string} ...paths Path to a file.
 * @return {boolean}         `true` if the specified file exists, or `false` otherwise.
 */
function fileExists(...paths) {
  try {
    accessSync(join(...paths), R_OK);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  Rule,
  fileExists,
};
