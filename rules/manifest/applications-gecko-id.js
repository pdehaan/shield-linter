function rule(manifest) {
  try {
    const applicationId = manifest.applications.gecko.id;
    const allowedGeckoIds = ["@shield.mozilla.org", "@pioneer.mozilla.org"];
    const hasAllowedGeckoId  = allowedGeckoIds.filter(suffix => applicationId.endsWith(suffix));

    if (hasAllowedGeckoId.length === 0) {
      console.warn(`manifest.json\'s applications.gecko.id does not end with ${allowedGeckoIds.join("|")}. Found ${applicationId}`);
    }
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = rule;
