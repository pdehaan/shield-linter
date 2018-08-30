const checkLinks = require("check-links");
const {Rule} = require("../../lib");

/**
 * Checks that the package.json's `bugs.url` resolves with a 200 status code.
 */
module.exports = class BugsUrl extends Rule {
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

    const bugs = this.package.bugs;
    if (bugs && bugs.url) {
      const results = await checkLinks([bugs.url]);
      const {status, statusCode} = results[bugs.url];
      if (statusCode !== 200) {
        log(`Problem checking "bugs.url", ${bugs.url}. Status=${status}, Code=${statusCode}`);
      }
      return;
    }
  }
};
