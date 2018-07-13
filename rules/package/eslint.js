const semver = require("semver");
const {Rule} = require("../../lib");

/**
 * Checks that the package.json file has an "eslint" dependency or devDependency.
 */
module.exports = class ESLint extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the package.json file.
   * @param  {string} cfgPath Path to the package.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(cfg, cfgPath, flags) {
    super(cfgPath, flags, "rules/package/eslint");
    this.package = cfg;
  }

  _hasDependency(dependencies, name) {
    return Object.keys(dependencies).includes(name);
  }

  validate() {
    this.logger.verbose(this.name);

    const allDependencies = Object.assign({}, this.package.dependencies, this.package.devDependencies);
    const requiredDependencies = ["eslint", "eslint-plugin-mozilla"];

    for (const name of requiredDependencies) {
      if (!this._hasDependency(allDependencies, name)) {
        this.logger.error(`${this.package.name} shield study is not using "${name}" package`);
      }
    }
  }
};
