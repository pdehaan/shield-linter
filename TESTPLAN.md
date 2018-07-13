# Ye Olde TestPlan

This :wastebasket::fire: isn't published to npm [yet] so currently you have to clone this repo, or use npm@5's <kbd>npx</kbd> feature to use it.

## Usage:

```sh
$ npx pdehaan/shield-linter --manifest-path=./src/manifest.json --package-path=./package.json
```

Or, if you are cloning this via Git, you can pass absolute style paths for the manifest.json and package.json files:

```sh
$ ./bin/shield-linter.js -m ~/dev/github/mozilla/some-repo/webextension/manifest.json -p ~/dev/github/mozilla/some-repo/package.json
```

I've been casually testing on a random assortment of current and past Shield study projects:

- https://github.com/mozilla/webcompat-blipz-experiment/
- https://github.com/mozilla/blurts-addon/
- https://github.com/mikedeboer/shield-search-nudges
- https://github.com/mozilla/shield-studies-addon-utils/tree/master/examples/small-study
- https://github.com/mozilla/shield-studies-addon-template
- https://github.com/motin/taar-experiment-v3-shield-study

Note that some of these projects require you to install npm dependencies so they can call the [**shield-studies-addon-utils** <kbd>copyStudyUtils</kbd> command](https://github.com/mozilla/shield-studies-addon-utils/blob/master/bin/copyStudyUtils.js).
