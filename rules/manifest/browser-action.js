const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the manifest.json's `browser_action` files exist.
 */
module.exports = class BrowserAction extends Rule {
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

    const browserAction = this.manifest.browser_action;
    if (browserAction) {
      for (const key of ["default_icon", "default_popup"]) {
        const file = browserAction[key];
        file && this._checkFile(file, key, log);
      }
      return;
    }
  }

  _checkFile(file, label, log) {
    if (!file) {
      log(`Missing "${label}" file in manifest.json browser_action`);
      return;
    }
    if (!fileExists(this.manifestDir, file)) {
      log(`Missing "${label}" file: ${file}`);
    }
  }
};
