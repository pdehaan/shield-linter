const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the add-on uses Travis-CI or Circle-CI (by looking for specific files/folders).
 */
module.exports = class License extends Rule {
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

    const CI_FILES = [".travis.yml", "circle.yml", ".circleci"];

    const hasCI = CI_FILES.some(ciConfig => fileExists(this.configDir, ciConfig));
    if (!hasCI) {
      this.logger.warn(`Missing Travis or Circle CI configs`);
    }
  }
};
