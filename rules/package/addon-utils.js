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
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(cfg, cfgPath, flags) {
    super(cfgPath, flags, "rules/package/addon-utils");
    this.package = cfg;
  }

  validate() {
    this.logger.verbose(this.name);

    const addonUtilsPackage = "shield-studies-addon-utils";
    const addonUtilsMinVersion = "5.0.0";
    const allDependencies = Object.assign({}, this.package.dependencies, this.package.devDependencies);
    const hasAddonUtils = Object.keys(allDependencies).includes(addonUtilsPackage);

    if (!hasAddonUtils) {
      this.logger.info(`${this.package.name} shield study is not using ${addonUtilsPackage}`);
      return;
    }

    const addonUtilsPackageVersion = allDependencies[addonUtilsPackage];
    if (!semver.validRange(addonUtilsPackageVersion)) {
      this.logger.warn(`Invalid ${addonUtilsPackage} version. Found ${addonUtilsPackageVersion}`);
      return;
    }

    if (!semver.ltr(addonUtilsMinVersion, addonUtilsPackageVersion)) {
      this.logger.warn(`Expected ${addonUtilsPackage}@${addonUtilsMinVersion} or newer. Found ${addonUtilsPackageVersion}`);
      return;
    }
  }
};
