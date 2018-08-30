import {Rule, fileExists} from "../../lib";

/**
 * Checks that the manifest.json's `icons` files exist.
 */
export default class Icons extends Rule {
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

    const icons = this.manifest.icons;
    if (icons) {
      for (const size in icons) {
        this._checkFile(icons[size], size, log);
      }
      return;
    }
  }

  _checkFile(file, label, log) {
    if (!file) {
      log(`Missing "${label}" icon in manifest.json icons`);
      return;
    }
    if (!fileExists(this.manifestDir, file)) {
      log(`Missing "${label}" file: ${file}`);
    }
  }
}
