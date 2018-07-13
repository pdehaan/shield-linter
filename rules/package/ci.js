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
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(cfg, cfgPath, flags) {
    super(cfgPath, flags);
    this.package = cfg;
    this.projectPath = dirname(cfgPath);
    this.name = "rules/package/ci";
  }

  validate() {
    this.logger.verbose(this.name);

    const hasCI = [".travis.yml", "circle.yml", ".circleci"].some(ciConfig => {
      try {
        fileExists(join(this.configDir, ciConfig));
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
