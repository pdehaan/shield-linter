/**
 * Checks that the manifest.json's `version` has a major, minor, and patch version.
 * @param  {object} manifest Contents of the manifest.json file.
 * @return {void}
 */
function rule(manifest) {
  const version = manifest.version;
  if (version.split(".").length !== 3) {
    console.log(`Unexpected version number format. Expected major.minor.patch, got ${version}`);
  }
}

module.exports = rule;
