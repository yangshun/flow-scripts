# Flow Scripts

Utility tools for Flow.

### Installation

```
$ npm install flow-scripts --save-dev
```

#### Stub

```
$ flow-scripts stub
```

By default, running Flow on startup will read all the files under `node_modules`. Ignoring the `node_modules` directory isn't a good idea because Flow looks in there to a) ensure you've actually installed your dependencies and b) find Flow libdefs for packages which might have included them, and Flow will throw a module not found error. Refer to this [issue](https://github.com/facebook/flow/issues/869) for an in-depth discussion on the topic.

The workaround is to ignore the `node_modules` directory but manually include the libdefs inside the `flow-typed` directory or provide a stub for it. This script automatically generates the stubs required for the `dependencies` in `package.json` that are missing in the libdefs fetched from the `flow-typed install` command.

By adding the script to an npm script `postinstall` hook, when new packages are installed, it will be automatically added into `flow-typed/`.

In `package.json`, add to the `postinstall` hook:

```
  ...
  "scripts": {
    "postinstall": "flow-scripts stub"
  },
  ...
```

In the project directory, run:

```
$ flow-typed install
$ flow-scripts stub
```

This will do the following:

1. Look up the `flow-typed` repo for compatible libdefs and downloade them. Detailed explanation can be found on the [Flow website](https://flowtype.org/docs/third-party.html#using-flow-typed).
2. Generates the stubs required for the `dependencies` in `package.json` that are missing in the libdefs fetched from the `flow-typed install` command and write them into `flow-typed/package-dep-libdefs.js`.

### Development

Testing this library is tricky because it relies on a real project that has multiple dependencies in `package.json`. Hence we create a mock project in the `test-project` folder that has some common JS dependencies defined and symlink the `flow-scripts` library within that project to our development file in the root folder. Run the commands within that mock project to test that the library is actually working as intended.

```
$ cd test-project
$ npm install # or yarn install
$ npm link ../
$ flow-scripts stub # flow-typed/package-dep-libdefs.js file should be generated
```
