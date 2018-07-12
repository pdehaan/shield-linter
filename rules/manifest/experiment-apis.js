const fs = require("fs");
const path = require("path");

/**
 * Checks that the manifest.json's `experiment_apis` key exists and has valid files specified for `schema` and `parent.script` keys.
 * @param  {object} manifest Contents of the manifest.json file.
 * @param  {string} manifestPath Path to the specified manifest.json file.
 * @return {void}
 */
function rule(manifest, manifestPath) {
  if (!manifest.hasOwnProperty("experiment_apis")) {
    console.warn("manifest.json is missing 'experiment_apis' key");
    return;
  }
  const manifestDir = path.dirname(manifestPath);
  for (const {schema, parent} of Object.values(manifest.experiment_apis)) {
    if (schema) {
      checkFile(manifestDir, schema, "schema");
    }
    if (parent && parent.script) {
      checkFile(manifestDir, parent.script, "parent.script");
    }
  }
}

module.exports = rule;

function checkFile(manifestDir, file, label) {
  try {
    fs.accessSync(path.join(manifestDir, file), fs.constants.R_OK);
  } catch (err) {
    console.error(`Missing 'experiment_apis' ${label} path: ${file}`);
  }
}
