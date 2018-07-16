const {Rule} = require("../../lib");

/**
 * Checks that the manifest.json's `applications.gecko.id` ends with "@shield.mozilla.org" or "@pioneer.mozilla.org".
 */
module.exports = class ApplicationsGeckoId extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(...args) {
    super(...args, __filename);
  }

  validate() {
    this.logger.verbose(this.name);

    try {
      const applicationId = this.manifest.applications.gecko.id;
      // returns ["@shield.mozilla.org", ...]
      const allowedGeckoIds = ["shield", "pioneer"].map(value => `@${value}.mozilla.org`);
      const allowedGeckoStrings = allowedGeckoIds.join(" or ");

      if (!allowedGeckoIds.some(suffix => applicationId.endsWith(suffix))) {
        this.logger.warn(`"applications.gecko.id" does not end with ${allowedGeckoStrings}. Found ${applicationId}`);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
};
