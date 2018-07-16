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
  constructor(...args) {
    super(...args, __filename);
  }

  validate() {
    this.logger.verbose(this.name);

    const requiredDependencies = ["eslint", "eslint-plugin-mozilla"];

    for (const name of requiredDependencies) {
      if (!this.packageJson.hasDependency(name)) {
        this.logger.error(`${this.package.name} shield study is not using "${name}" package`);
      }
    }
  }
};
