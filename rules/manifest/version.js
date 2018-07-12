const {Rule} = require("../../lib");

/**
 * Checks that the manifest.json's `applications.gecko.id` ends with "@shield.mozilla.org" or "@pioneer.mozilla.org".
 */
module.exports = class Version extends Rule {
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
    const {version} = this.manifest;
    if (version.split(".").length < 2) {
      this.logger.log(`Unexpected version number format. Expected major.minor[.patch], got ${version}`);
    }
  }
};
