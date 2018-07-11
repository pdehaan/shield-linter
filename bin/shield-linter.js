#!/usr/bin/env node

const path = require("path");
const meow = require("meow");

const cli = meow(`

  Usage docs:

    shield-linter --manifest-path ./src/manifest.json --package-path ./package.json

  Options:
    --manifest-path,-m Path to the manifest.json file. Optional.
    --package-path,-p  Path to the package.json file. Optional.

  Note: If neither the '--manifest-path' or '--package-path' are specified, no tests will be run.

  `, {
  flags: {
    manifestPath: {
      type: String,
      alias: "m"
    },
    packagePath: {
      type: String,
      alias: "p"
    }
  }
});

if (cli.flags.manifestPath) {
  let manifest;
  try {
    manifest = require(path.resolve(cli.flags.manifestPath));
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
    return;
  }

  const applicationId = manifest.applications.gecko.id;
  const allowedGeckoIds = ["@shield.mozilla.org", "@pioneer.mozilla.org"];
  const hasAllowedGeckoId  = allowedGeckoIds.filter(suffix => applicationId.endsWith(suffix));

  if (hasAllowedGeckoId.length === 0) {
    console.warn(`manifest.json\'s applications.gecko.id does not end with ${allowedGeckoIds.join("|")}. Found ${applicationId}`);
  }

  const version = manifest.version;
  if (version.split(".").length !== 3) {
    console.log(`Unexpected version number format. Expected major.minor.patch, got ${version}`);
  }
}

if (cli.flags.packagePath) {
  const addonUtilsPackage = "shield-studies-addon-utils";
  const addonUtilsMinVersion = 5;

  let package;
  try {
    package = require(path.resolve(cli.flags.packagePath));
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
    return;
  }

  const allDependencies = Object.assign({}, package.dependencies, package.devDependencies);
  const hasAddonUtils = Object.keys(allDependencies).includes(addonUtilsPackage);
  if (hasAddonUtils) {
    const [major, minor, patch] = allDependencies[addonUtilsPackage].split(".");
    if (major < addonUtilsMinVersion) {
      console.log(`Expected ${addonUtilsPackage}@${addonUtilsMinVersion} or newer, found ${major}`);
    }
  } else {
    console.info("Shield study is not using `shield-studies-addon-utils`.");
  }

}
