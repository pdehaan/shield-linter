const semver = require("semver");

/**
 * Checks that the package.json file has a "shield-studies-addon-utils" dependency or devDependency, and it's at least a v5 version.
 * @param  {object} package Contents of the package.json file.
 * @return {void}
 */
function rule(package) {
  const addonUtilsPackage = "shield-studies-addon-utils";
  const addonUtilsMinVersion = "5.0.0";

  const allDependencies = Object.assign({}, package.dependencies, package.devDependencies);
  const hasAddonUtils = Object.keys(allDependencies).includes(addonUtilsPackage);
  if (!hasAddonUtils) {
    console.info(`${package.name} shield study is not using ${addonUtilsPackage}`);
    return;
  }
  const addonUtilsPackageVersion = allDependencies[addonUtilsPackage];
  if (!semver.ltr(addonUtilsMinVersion, addonUtilsPackageVersion)) {
    console.log(`Expected ${addonUtilsPackage}@${addonUtilsMinVersion} or newer, found ${addonUtilsPackageVersion}`);
  }
}

module.exports = rule;
