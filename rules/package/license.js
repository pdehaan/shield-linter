const {Rule} = require("../../lib");

/**
 * Checks that the package.json file has an MPL-2.0 license.
 */
module.exports = class License extends Rule {
  /**
   * @constructor
   * @param  {object} pkg         Contents of the package.json file.
   * @param  {object} packagePath Path of the package.json file.
   */
  constructor(pkg, packagePath) {
    super(packagePath);
    this.package = pkg;
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
