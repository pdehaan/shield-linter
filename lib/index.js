const {accessSync, constants: {R_OK}} = require("fs");
const {basename, dirname, join, resolve, relative} = require("path");
const requireAll = require("require-all");

class Rule {
  constructor(cfg, configFile, flags, fname) {
    this.configPath = configFile;
    this.configDir = dirname(configFile);
    this.flags = flags;
    this.name = relative(resolve(__dirname, ".."), fname).replace(/\.js$/, "");
    this.label = basename(configFile);
    const key = basename(configFile, ".json");
    // where `key` is "manifest" or "package".
    this[key] = cfg;
    this[`${key}Dir`] = this.configDir;
  }

  get logger() {
    const debug = (level, msg) => console[level](`[${this.label}:${this.name}]`, msg.join(" "));
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

function fileExists(...paths) {
  try {
    accessSync(join(...paths), R_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function requireDir(dirname, filterFunc=["index.js"]) {
  if (Array.isArray(filterFunc)) {
    const fileArr = filterFunc;
    filterFunc = (filename) => !fileArr.includes(filename) ? filename : null;
  }
  const rules = requireAll({
    dirname,
    filter: filterFunc
  });
  return Object.values(rules);
}

module.exports = {
  Rule,
  fileExists,
  requireDir
};
