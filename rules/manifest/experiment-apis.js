const {join} = require("path");
const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the manifest.json's `experiment_apis` key exists and has valid files specified for `schema` and `parent.script` keys.
 */
module.exports = class ExperimentApis extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(...args) {
    super(...args, __filename);
  }

  _checkFile(file, label) {
    if (!file) {
      this.logger.error(`Missing "${label}" key in manifest.json`);
      return;
    }
    if (!fileExists(join(this.manifestDir, file))) {
      this.logger.error(`Missing "${label}" file: ${file}`);
    }
  }

  validate() {
    this.logger.verbose(this.name);

    const experimentApisKey = "experiment_apis";

    if (!this.manifest.hasOwnProperty(experimentApisKey)) {
      this.logger.warn(`Missing "${experimentApisKey}" key`);
      return;
    }

    const experimentApis = this.manifest.experiment_apis;
    Object.keys(experimentApis).forEach(key => {
      const {schema, parent} = experimentApis[key];
      this._checkFile(schema, `${experimentApisKey}.${key}.schema`);
      this._checkFile(parent && parent.script, `${experimentApisKey}.${key}.parent.script`)
    });
  }
};
