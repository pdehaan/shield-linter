const {dirname, join} = require("path");
const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the manifest.json's `experiment_apis` key exists and has valid files specified for `schema` and `parent.script` keys.
 */
module.exports = class ExperimentApis extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   */
  constructor(cfg, cfgPath) {
    super(cfgPath);
    this.manifest = cfg;
    this.manifestDir = dirname(cfgPath);
    this.experimentApisKey = "experiment_apis";
  }

  validate() {
    if (!this.manifest.hasOwnProperty(this.experimentApisKey)) {
      this.logger.warn(`Missing "${this.experimentApisKey}" key`);
      return;
    }

    for (const {schema, parent} of Object.values(this.manifest.experiment_apis)) {
      if (schema) {
        try {
          fileExists(join(this.manifestDir, schema));
        } catch (err) {
          this.logger.error(`Missing "${this.experimentApisKey}...schema" file: ${schema}`)
        }
      } else {
        this.logger.error(`Missing "${this.experimentApisKey}...schema" key in manifest.json`);
      }

      if (parent && parent.script) {
        try {
          fileExists(join(this.manifestDir, parent.script));
        } catch (err) {
          this.logger.error(`Missing "${this.experimentApisKey}...parent.script" file: ${parent.script}`);
        }
      } else {
        this.logger.error(`Missing "${this.experimentApisKey}...parent.script" key in manifest.json`);
      }
    }
  }
};
