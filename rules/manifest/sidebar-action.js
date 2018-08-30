import {Rule, fileExists} from "../../lib";

/**
 * Checks that the manifest.json's `sidebar_action` files exist.
 */
export default class SidebarAction extends Rule {
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

    const sidebarAction = this.manifest.sidebar_action;
    if (sidebarAction) {
      for (const key of ["default_icon", "default_panel"]) {
        const file = sidebarAction[key];
        file && this._checkFile(file, key, log);
      }
      return;
    }
  }

  _checkFile(file, label, log) {
    if (!file) {
      log(`Missing "${label}" file in manifest.json sidebar_action`);
      return;
    }
    if (!fileExists(this.manifestDir, file)) {
      log(`Missing "${label}" file: ${file}`);
    }
  }
}
