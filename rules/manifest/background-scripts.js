const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the manifest.json's `background.scripts` key exists and has valid files specified.
 */
module.exports = class ExperimentApis extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(...args) {
    super(...args);
  }

  validate(severity="warn", ...options) {
    this.logger.verbose(this.name);

    const log = this.logger[severity];
    if (this.manifest.background && this.manifest.background.scripts) {
      this.manifest.background.scripts.forEach(file => {
        if (!fileExists(this.manifestDir, file)) {
          log(`Missing "${file}" background script`);
        }
      });
      return;
    }

    log(`Missing "background.scripts" key`);
  }
};
