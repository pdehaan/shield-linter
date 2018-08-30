const checkLinks = require("check-links");
const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the manifest.json's `applications.gecko.update_url` resolves with a 200 status code.
 */
module.exports = class UpdateUrl extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the manifest.json file.
   * @param  {string} cfgPath Path to the manifest.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(...args) {
    super(...args);
  }

  async validate(severity=this.severity.WARN, ...options) {
    this.logger.verbose(this.name);

    const log = this.logger.severity(severity);

    try {
      const updateUrl = this.manifest.applications.gecko.update_url;
      if (updateUrl) {
        const results = await checkLinks([updateUrl]);
        const res = results[updateUrl];
        if (res.statusCode !== 200) {
          log(`Problem checking "applications.gecko.update_url", ${updateUrl}. Status=${res.status}, Code=${res.statusCode}`);
        }
      }
    } catch (err) {
      this.logger.error(err);
    }
  }
};
