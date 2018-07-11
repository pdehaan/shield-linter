function rule(manifest) {
  const version = manifest.version;
  if (version.split(".").length !== 3) {
    console.log(`Unexpected version number format. Expected major.minor.patch, got ${version}`);
  }
}

module.exports = rule;
