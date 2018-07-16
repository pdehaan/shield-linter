const {execSync} = require("child_process");
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
  constructor(...args) {
    super(...args, __filename);
  }

  checkLatest(currentVersion, name) {
    const latestVersion = execSync(`npm info ${name} version`, {encoding: "utf-8"}).trim();
    return {latestVersion, isLatestVersion: semver.satisfies(latestVersion, currentVersion)};
  }

  validate() {
    this.logger.verbose(this.name);

    const addonUtilsPackage = "shield-studies-addon-utils";
    const addonUtilsMinVersion = semver.coerce("5").version;

    if (!this.packageJson.hasDependency(addonUtilsPackage)) {
      this.logger.info(`${this.package.name} shield study is not using ${addonUtilsPackage}`);
      return;
    }

    const addonUtilsPackageVersion = this.packageJson.dependencyVersion(addonUtilsPackage);
    if (!semver.validRange(addonUtilsPackageVersion)) {
      this.logger.warn(`Invalid ${addonUtilsPackage} version. Found ${addonUtilsPackageVersion}`);
      return;
    }

    if (!semver.ltr(addonUtilsMinVersion, addonUtilsPackageVersion)) {
      this.logger.warn(`Expected ${addonUtilsPackage}@${addonUtilsMinVersion} or newer. Found ${addonUtilsPackageVersion}`);
      return;
    }

    const {latestVersion, isLatestVersion} = this.checkLatest(addonUtilsPackageVersion, addonUtilsPackage);
    if (!isLatestVersion) {
      this.logger.warn(`Please install the latest version of "${addonUtilsPackage}". Current: ${addonUtilsPackageVersion}. Latest: ${latestVersion}`);
    }
  }
};
