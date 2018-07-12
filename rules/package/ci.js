const {dirname, join} = require("path");
const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the add-on uses Travis-CI or Circle-CI (by looking for specific files/folders).
 */
module.exports = class License extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the package.json file.
   * @param  {string} cfgPath Path to the package.json file.
   */
  constructor(cfg, cfgPath) {
    super(cfgPath);
    this.package = cfg;
    this.projectPath = dirname(cfgPath);
  }

  validate() {
    const hasCI = [".travis.yml", "circle.yml", ".circleci"].some(ciConfig => {
      try {
        fileExists(join(this.projectPath, ciConfig));
        return true;
      } catch (err) {
        return false;
      }
    });
    if (!hasCI) {
      this.logger.error(`Missing Travis or Circle CI configs`);
    }
  }
};
