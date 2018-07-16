const {Rule} = require("../../lib");

/**
 * Checks that the package.json file has an "react" dependency or devDependency, and if so, make sure it's using the ESLint recommended plugins.
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

    const prereqDependencies = ["react", "eslint"];
    const requiredDependencies = ["eslint-plugin-react", "eslint-plugin-jsx-a11y"];

    // If you're using *both* the "react" and "eslint" modules, make sure you are using the appropriate ESLint plugins as well.
    if (prereqDependencies.every(name => this.packageJson.hasDependency(name))) {
      requiredDependencies
        .filter(name => !this.packageJson.hasDependency(name))
        .forEach(name => this.logger.error(`${this.package.name} shield study is not using "${name}" package`));
    }
  }
};
