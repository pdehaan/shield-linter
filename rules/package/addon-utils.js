const semver = require("semver");
const {Rule} = require("../../lib");

/**
 * Checks that the package.json file has a "shield-studies-addon-utils" dependency or devDependency, and it's at least a v5 version.
 */
module.exports = class AddonUtils extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the package.json file.
   * @param  {string} cfgPath Path to the package.json file.
   */
  constructor(cfg, cfgPath) {
    super(cfgPath);
    this.package = cfg;
    this.addonUtilsPackage = "shield-studies-addon-utils";
    this.addonUtilsMinVersion = "5.0.0";
  }

  validate() {
    const allDependencies = Object.assign({}, this.package.dependencies, this.package.devDependencies);
    const hasAddonUtils = Object.keys(allDependencies).includes(this.addonUtilsPackage);

    if (!hasAddonUtils) {
      this.logger.info(`${this.package.name} shield study is not using ${this.addonUtilsPackage}`);
      return;
    }

    const addonUtilsPackageVersion = allDependencies[this.addonUtilsPackage];
    if (!semver.validRange(addonUtilsPackageVersion)) {
      this.logger.warn(`Invalid ${this.addonUtilsPackage} version. Found ${addonUtilsPackageVersion}`);
      return;
    }

    if (!semver.ltr(this.addonUtilsMinVersion, addonUtilsPackageVersion)) {
      this.logger.warn(`Expected ${this.addonUtilsPackage}@${this.addonUtilsMinVersion} or newer. Found ${addonUtilsPackageVersion}`);
      return;
    }
  }
};
