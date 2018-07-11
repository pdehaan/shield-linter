function rule(package) {
  const addonUtilsPackage = "shield-studies-addon-utils";
  const addonUtilsMinVersion = 5;

  const allDependencies = Object.assign({}, package.dependencies, package.devDependencies);
  const hasAddonUtils = Object.keys(allDependencies).includes(addonUtilsPackage);
  if (!hasAddonUtils) {
    console.info(`${package.name} shield study is not using ${addonUtilsPackage}`);
    return;
  }
  const addonUtilsPackageVersion = allDependencies[addonUtilsPackage]
  const [major, minor, patch] = addonUtilsPackageVersion.split(".").map(value => parseInt(value, 10));
  if (major < addonUtilsMinVersion) {
    console.log(`Expected ${addonUtilsPackage}@${addonUtilsMinVersion} or newer, found ${addonUtilsPackageVersion}`);
  }
}

module.exports = rule;
