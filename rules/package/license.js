const {Rule} = require("../../lib");

/**
 * Checks that the package.json file has an MPL-2.0 license.
 */
module.exports = class License extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the package.json file.
   * @param  {string} cfgPath Path to the package.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(...args) {
    super(...args);
  }

  validate(severity=this.severity.WARN, ...options) {
    this.logger.verbose(this.name);

    const log = this.logger.severity(severity);
    const MPL2_LICENSE = "MPL-2.0";

    if (!this.package.license) {
      log(`Does not include a "license" property`);
      return;
    }

    if (this.package.license !== MPL2_LICENSE) {
      log(`Does not use ${MPL2_LICENSE} license. Found ${this.package.license}`);
    }
  }
};
