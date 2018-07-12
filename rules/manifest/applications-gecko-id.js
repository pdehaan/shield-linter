const {Rule} = require("../../lib");

/**
 * Checks that the manifest.json's `applications.gecko.id` ends with "@shield.mozilla.org" or "@pioneer.mozilla.org".
 */
module.exports = class ApplicationsGeckoId extends Rule {
  /**
   * @constructor
   * @param  {object} manifest Contents of the manifest.json file.
   * @return {void}
   */
  constructor(manifest, manifestPath) {
    super(manifestPath);
    this.manifest = manifest;
  }

  validate() {
    try {
      const applicationId = this.manifest.applications.gecko.id;
      const allowedGeckoIds = ["shield", "pioneer"].map(value => `@${value}.mozilla.org`);

      if (!allowedGeckoIds.some(suffix => applicationId.endsWith(suffix))) {
        this.logger.warn(`"applications.gecko.id" does not end with ${allowedGeckoIds.join(" or ")}. Found ${applicationId}`);
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
};
