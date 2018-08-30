const checkLinks = require("check-links");
const {Rule} = require("../../lib");

/**
 * Checks that the manifest.json's `homepage_url` resolves with a 200 status code.
 */
module.exports = class HomepageUrl extends Rule {
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

    const homepageUrl = this.manifest.homepage_url;
    if (homepageUrl) {
      const results = await checkLinks([homepageUrl]);
      const res = results[homepageUrl];
      if (res.statusCode !== 200) {
        log(`Problem checking "homepage_url", ${homepageUrl}. Status=${res.status}, Code=${res.statusCode}`);
      }
    }
  }
};
