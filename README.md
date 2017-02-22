# Flow Scripts

Utility tools for Flow.

### Installation

```
$ npm install flow-scripts --save-dev
```

### Stub

```
$ flow-scripts stub
```

By default, running Flow on startup will read all the files under `node_modules`. Ignoring the `node_modules` directory isn't a good idea because Flow looks in there to a) ensure you've actually installed your dependencies and b) find Flow libdefs for packages which might have included them, and Flow will throw a module not found error. Refer to this [issue](https://github.com/facebook/flow/issues/869) for an in-depth discussion on the topic.

The workaround is to just ignore the `node_modules` directory but manually include the libdefs inside the `flow-typed` directory or provide a stub for it. This script automatically generates the stubs required for the `dependencies` in `package.json`.

By adding the script to an npm script `postinstall` hook, when new packages are installed, it will be automatically added into `flow-typed/`.

In `.flowconfig`, under `[libs]`, add:

```
[libs]
flow-typed/
```

In `package.json`, add to the `postinstall` hook:

```
  ...
  "scripts": {
    "postinstall": "flow-scripts stub"
  },
  ...
```
