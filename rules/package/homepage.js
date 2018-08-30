const checkLinks = require("check-links");
const {Rule} = require("../../lib");

/**
 * Checks that the package.json's `homepage` resolves with a 200 status code.
 */
module.exports = class Homepage extends Rule {
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

    const homepageUrl = this.package.homepage;
    if (homepageUrl) {
      const results = await checkLinks([homepageUrl]);
      const {status, statusCode} = results[homepageUrl];
      if (statusCode !== 200) {
        log(`Problem checking "homepage", ${homepageUrl}. Status=${status}, Code=${statusCode}`);
      }
    }
  }
};
