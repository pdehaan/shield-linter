import {join} from "path";
import requireAll from "require-all";

/**
  {
    manifest: (...args) => [
      Rule1,
      Rule2
    ],
    package: (...args) => [
      Rule3
    ]
  }
*/
export default {
  manifest: getRules("manifest"),
  package: getRules("package")
};

/**
 * Load the rules from a specific directory ("./manifest/" or "./package/").
 * @param  {string} category    A subdirectory to preload the rules from.
 * @param  {Array}  ignoreFiles An array of files to ignore from the specified rule category/subdirectory.
 * @return {function}           A function which will apply all it's arguments to each loaded rule.
 */
function getRules(category, ignoreFiles=["index.js"]) {
  const dirname = join(__dirname, category);
  const filter = (filename) => !ignoreFiles.includes(filename) ? filename : null;
  const rules = requireAll({
    dirname,
    filter
  });

  return (...args) => Object.entries(rules)
    .map(([name, Rule]) => new Rule.default(...args, rulename(category, name)));
}

/**
 * Generates a pretty rule name like "manifest/background-scripts".
 * @param  {string} category The category/folder name (for example, "manifest" or "package").
 * @param  {string} name     The rule file name (for example, "applications-gecko-id.js" or "background-scripts.js").
 * @return {string}          The concatenated
 */
function rulename(category, name) {
  return `${category}/${name.replace(/\.js$/i, "")}`;
}
