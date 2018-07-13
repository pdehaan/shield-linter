const {Rule} = require("../../lib");

/**
 * Checks that the manifest.json's `applications.gecko.id` ends with "@shield.mozilla.org" or "@pioneer.mozilla.org".
 */
module.exports = class Version extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(cfg, cfgPath, flags) {
    super(cfgPath, flags, "rules/manifest/version");
    this.manifest = cfg;
  }

  validate() {
    this.logger.verbose(this.name);

    const {version} = this.manifest;
    if (version.split(".").length < 2) {
      this.logger.log(`Unexpected version number format. Expected "major.minor[.patch]", got ${version}`);
    }
  }
};
