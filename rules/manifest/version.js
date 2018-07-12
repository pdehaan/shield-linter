const {Rule} = require("../../lib");

/**
 * Checks that the manifest.json's `applications.gecko.id` ends with "@shield.mozilla.org" or "@pioneer.mozilla.org".
 */
module.exports = class Version extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   */
  constructor(cfg, cfgPath) {
    super(cfgPath);
    this.manifest = cfg;
  }

  validate() {
    const {version} = this.manifest;
    if (version.split(".").length < 2) {
      this.logger.log(`Unexpected version number format. Expected "major.minor[.patch]", got ${version}`);
    }
  }
};
