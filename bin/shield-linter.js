#!/usr/bin/env node

const path = require("path");

const meow = require("meow");
const rc = require("rc");

const {fileExists} = require("../lib");
const rules = require("../rules");


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
    },
    verbose: {
      type: Boolean,
      alias: "v",
      default: process.env.VERBOSE || false
    }
  }
});

function main(rules, {flags, pkg}) {
  const config = rc(pkg.name, flags);

  if (!flags.manifestPath && !flags.packagePath) {
    cli.showHelp();
    return;
  }
  // TODO: attempt to load some sort of config file here, and then pass it down into the functions below.
  // This could allow us to run a subset of rules and pass user severities/options.
  lintManifest(rules.manifest, flags, config.rules);
  lintPackage(rules.package, flags, config.rules);
}

/**
 * Lint the Shield study's manifest.json file. If no manifest.json file is found, no manifest.json specific rules will be run.
 * @param  {string} manifestPath Relative/absolute path to a Shield study's manifest.json file.
 * @return {void}
 */
function lintManifest(manifest, flags, rules) {
  _loadConfig(flags.manifestPath, manifest, flags, rules);
}

/**
 * Lint the Shield study's package.json file. If no package.json file is found, no package.json specific rules will be run.
 * @param  {string} packagePath Relative/absolute path to a Shield study's package.json file.
 * @return {void}
 */
function lintPackage(package, flags, rules) {
  _loadConfig(flags.packagePath, package, flags, rules);
}

/**
 * @private
 * Load a manifest.json or package.json file and run the appropriate rules/tests.
 * @param  {string} cfgPath      Relative/absolute path to the manifest.json or package.json config file.
 * @param  {string} cfgRulesPath Relative path to the config specific rules to run.
 * @return {void}
 */
function _loadConfig(cfgPath, cfgRules, flags, ruleOverride) {
  if (!cfgPath) return;
  if (!fileExists(path.resolve(cfgPath))) {
    console.error(`ERROR: ${cfgPath} does not exist`);
    return;
  }
  if (flags.verbose) {
    console.log(`LINTING: ${cfgPath}...`);
  }

  try {
    const cfg = require(path.resolve(cfgPath));
    const rules = cfgRules(cfg, cfgPath, flags);

    for (const rule of rules) {
      // If the user has a custom .shieldlinterrc file with rules defined...
      if (ruleOverride && Object.keys(ruleOverride).includes(rule.name)) {
        let override = ruleOverride[rule.name];
        if (!Array.isArray(override)) {
          override = [override];
        }
        const [severity, ...options] = override;
        if (severity !== "off") {
          rule.validate(severity, ...options);
        }
        continue;
      }
      rule.validate();
    }
  } catch (err) {
    console.error(`${path.basename(cfgPath)}:`, err);
    process.exitCode = 3;
  }
}

main(rules, cli);
