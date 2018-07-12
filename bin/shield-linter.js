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

function main({flags}) {
  const {manifestPath, packagePath} = flags;

  manifestPath && lintManifest(manifestPath);
  packagePath && lintPackage(packagePath);
}

/**
 * Lint the Shield study's manifest.json file. If no manifest.json file is found, no manifest.json specific rules will be run.
 * @param  {string} manifestPath Relative/absolute path to a Shield study's manifest.json file.
 * @return {void}
 */
function lintManifest(manifestPath) {
  _loadConfig(manifestPath, "../rules/manifest");
}

/**
 * Lint the Shield study's package.json file. If no package.json file is found, no package.json specific rules will be run.
 * @param  {string} packagePath Relative/absolute path to a Shield study's package.json file.
 * @return {void}
 */
function lintPackage(packagePath) {
  _loadConfig(packagePath, "../rules/package");
}

/**
 * @private
 * Load a manifest.json or package.json file and run the appropriate rules/tests.
 * @param  {string} cfgPath      Relative/absolute path to the manifest.json or package.json config file.
 * @param  {string} cfgRulesPath Relative path to the config specific rules to run.
 * @return {void}
 */
function _loadConfig(cfgPath, cfgRulesPath) {
  try {
    const cfg = require(path.resolve(cfgPath));
    const rules = require(cfgRulesPath)(cfg, cfgPath);

    for (const rule of rules) {
      rule.validate();
    }

  } catch (err) {
    console.error(`${path.basename(cfgPath)}:`, err);
    return;
  }
}

main(cli);
