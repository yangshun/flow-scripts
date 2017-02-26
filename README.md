# Flow Scripts

Utility tools for Flow. Currently only has `flow-scripts stub`.

## Installation

```
$ npm install flow-scripts --save-dev
```

### Stub

```
$ flow-scripts stub
```

#### Motivation

By default, running Flow on start up will read all the files under `node_modules`. This takes very very long and it is a huge pain to waiting that long every time your web app starts. Ignoring the `node_modules` directory isn't a good idea because Flow looks in there to a) ensure you've actually installed your dependencies and b) find Flow libdefs for packages which might have included them, and Flow will throw a `Required module not found` error. Refer to this [issue](https://github.com/facebook/flow/issues/869) for an in-depth discussion on the topic.

#### Workaround

The workaround is to ignore the `node_modules` directory and manually include the libdefs inside the `flow-typed/` directory or provide a stub for it. 

The `flow-typed install` command does this pretty well, but has a few problems:

1. Some users might not want to fetch community libdefs. 
2. The libdefs of some libraries are not automatically generated, such as `immutable.js`.

The `flow-scripts stub` command automatically generates the stubs required for the `dependencies` in `package.json`. If there are existing libdef files in the `flow-typed/npm` directory, the stubs will not be generated. This gets around the issue of missing libdefs fetched/generated from the `flow-typed install` command.

In the project directory, run:

```
$ flow-typed install # Optional if you do not want to fetch community libdefs
$ flow-scripts stub
```

This will do the following:

1. Look up the `flow-typed` repo for compatible libdefs and download them into `flow-typed/npm/`. Detailed explanation can be found on the [Flow website](https://flowtype.org/docs/third-party.html#using-flow-typed)
2. Generates the stubs required for the `dependencies` in `package.json` that are not present in `flow-typed/npm/` and write them into `flow-typed/package-dep-libdefs.js`.

**Optional:** By adding the script to an npm script `postinstall` hook, when new packages are installed, it will be automatically added into `flow-typed/`.

In `package.json`, add to the `postinstall` hook:

```
  ...
  "scripts": {
    "postinstall": "flow-scripts stub"
  },
  ...
```

## Development

Testing this library is tricky because it relies on a real project that has multiple dependencies in `package.json`. Hence we create a mock project in the `test-project` folder that has some common JS dependencies defined and symlink the `flow-scripts` library within that project to our development file in the root folder. Run the commands within that mock project to test that the library is actually working as intended.

```
$ cd test-project
$ npm install # or yarn install
$ npm link ../
$ flow-scripts stub # flow-typed/package-dep-libdefs.js file should be generated
```
