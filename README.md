# shield-linter

Let's try and validate some shield study settings and configs.

Per <https://github.com/mozilla/shield-studies-addon-utils/issues/236>, wherein @gregglind suggests:

> - can eslint
> - can check the addon name
> - opens the study for all states
>
> Reason: people are NOT using the template. We can at least clean up messes.
>
> Ideas and thoughts welcome.

## Usage:

The following command will run the **shield-linter** via <kbd>npx</kbd> and lint the local ./webextension/manifest.json and ./package.json files:

```sh
$ npx pdehaan/shield-linter -m webextension/manifest.json -p package.json
```
