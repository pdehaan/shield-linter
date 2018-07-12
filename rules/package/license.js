const {Rule} = require("../../lib");

/**
 * Checks that the package.json file has an MPL-2.0 license.
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
    this.MPL2_LICENSE = "MPL-2.0";
  }

  validate() {
    if (!this.package.license) {
      this.logger.error(`Does not include a "license" property`);
      return;
    }

    if (this.package.license !== this.MPL2_LICENSE) {
      this.logger.warn(`Does not use ${this.MPL2_LICENSE} license. Found ${this.package.license}`);
    }
  }
};
