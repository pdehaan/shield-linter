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

## Configuration:

You can also override the default rule severity and set your CLI `--manifest-path` and `--package-path` in a .shieldlinterrc config file, similar to this gem in your project directory:

```js
{
  "manifestPath": "src/manifest.json",
  "packagePath": "package.json",
  "rules": {
    "manifest/applications-gecko-id": "warn",
    "manifest/experiment-apis": "warn",
    "package/addon-utils": "error"
  }
}
```

Now, to run the linter, you can simply type <kbd>$ npx pdehaan/shield-linter</kbd>.

Note that even though the above sample config file only specifies three rules, the FULL suite of rules will be run and use their respective default severities and options.
If you want to ignore a rule completely, you can set it's severity to "off".
