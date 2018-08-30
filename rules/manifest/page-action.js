const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the manifest.json's `page_action` files exist.
 */
module.exports = class PageAction extends Rule {
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

    const pageAction = this.manifest.page_action;
    if (pageAction) {
      for (const key of ["default_icon"]) {
        const file = pageAction[key];
        file && this._checkFile(file, key, log);
      }
      return;
    }
  }

  _checkFile(file, label, log) {
    if (!file) {
      log(`Missing "${label}" file in manifest.json page_action`);
      return;
    }
    if (!fileExists(this.manifestDir, file)) {
      log(`Missing "${label}" file: ${file}`);
    }
  }
};
