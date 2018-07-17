const {join} = require("path");
const {Rule, fileExists} = require("../../lib");

/**
 * Checks that the package.json file has an "react" dependency or devDependency, and if so, make sure it's using the ESLint recommended plugins.
 */
module.exports = class ESLint extends Rule {
  /**
   * @constructor
   * @param  {object} cfg     Contents of the package.json file.
   * @param  {string} cfgPath Path to the package.json file.
   * @param  {object} flags   Flags via the CLI parser.
   */
  constructor(...args) {
    super(...args);
  }

  validate(severity=this.severity.WARN, ...options) {
    this.logger.verbose(this.name);

    const log = this.logger.severity(severity);
    const prereqDependencies = ["react", "eslint"];
    const requiredPlugins = ["react", "jsx-a11y"];

    // If you're using *both* the "react" and "eslint" modules, make sure you are using the appropriate ESLint plugins as well.
    if (prereqDependencies.every(name => this.packageJson.hasDependency(name))) {
      requiredPlugins
        .map(name => `eslint-plugin-${name}`)
        .filter(name => !this.packageJson.hasDependency(name))
        .forEach(name => log(`${this.package.name} shield study is not using "${name}" package`));

      [".eslintrc", ".eslintrc.js", ".eslintrc.json"]
        .filter(eslintrc => fileExists(this.packageDir, eslintrc))
        .forEach(file => {
          const config = require(join(this.packageDir, file));
          requiredPlugins.forEach(name => {
            const pluginName = `plugin:${name}/recommended`;
            if (!config.extends.includes(pluginName)) {
              log(`${file} does not extend "${pluginName}"`);
            }
          });
        });

      // TODO: Check for [".eslintrc.yml", ".eslintrc.yaml"] config files.
      // ESLint uses the https://github.com/nodeca/js-yaml module.
    }
  }
};
