import {Rule, fileExists} from "../../lib";

/**
 * Checks that the manifest.json's `experiment_apis` key exists and has valid files specified for `schema` and `parent.script` keys.
 */
export default class ExperimentApis extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(...args) {
    super(...args);
  }

  validate(severity=this.severity.WARN, ...options) {
    this.logger.verbose(this.name);

    const log = this.logger.severity(severity);
    const experimentApisKey = "experiment_apis";

    if (!this.manifest.hasOwnProperty(experimentApisKey)) {
      log(`Missing "${experimentApisKey}" key`);
      return;
    }

    const experimentApis = this.manifest.experiment_apis;
    Object.keys(experimentApis).forEach(key => {
      const {schema, parent} = experimentApis[key];
      this._checkFile(schema, `${experimentApisKey}.${key}.schema`, log);
      this._checkFile(parent && parent.script, `${experimentApisKey}.${key}.parent.script`, log)
    });
  }

  _checkFile(file, label, log) {
    if (!file) {
      log(`Missing "${label}" key in manifest.json`);
      return;
    }
    if (!fileExists(this.manifestDir, file)) {
      log(`Missing "${label}" file: ${file}`);
    }
  }
}
