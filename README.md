# Flow Scripts

Utility tools for Flow. Currently only contains `flow-scripts stub`.

## Installation

```
$ npm install flow-scripts --save-dev
```

### Stub

```
$ flow-scripts stub
```

#### What is it?

Generates naive stubs for the packages that your project requires. To be used with flowignore-ing of `node_modules` for faster start up times.

#### When should you use this?

If you are thoroughly annoyed by your web app project taking so long to start up because of Flow and want to flowignore the `node_modules` folder but not might want to check in community libdefs into your repository and you are okay with not having Flow libdefs for external libraries.

It also possible to combine usage of `flow-typed install` with `flow-scripts stub` as stubs for existing libdefs found in `flow-typed/npm/` will not be generated.

#### Motivation

By default, running Flow on start up will read all the files under `node_modules`. This takes very very long and it is a huge pain to waiting that long every time your web app starts. Ignoring the `node_modules` directory isn't a good idea because Flow looks in there to a) ensure you've actually installed your dependencies and b) find Flow libdefs for packages which might have included them, and Flow will throw a `Required module not found` error. Refer to this [issue](https://github.com/facebook/flow/issues/869) for an in-depth discussion on the topic.

#### Workaround

The workaround is to flowignore the `node_modules` directory and manually include the libdefs inside the `flow-typed/` directory or provide a stub for it. 

The `flow-typed install` command does fetch community libdefs and generates stubs pretty well, but has a few problems:

1. Some users might not want to fetch community libdefs because it adds many files to the source.
2. The libdefs of some libraries are not pulled into `flow-typed/npm/`, such as `immutable` because it is already present in `node_modules/immutable`. This is not picked up because we flowignore the `node_modules`.

The `flow-scripts stub` command automatically generates the stubs required for the `dependencies` in `package.json`. If there are existing libdef files in the `flow-typed/npm` directory, the stubs for these libraries will not be generated.

In `.flowconfig`, add:

```
[ignore]
.*node_modules/.*

```

In the project directory, run:

```
$ flow-scripts stub
```

This will do the following:

1. Tell Flow to ignore checking of `node_modules`.
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

#### Known Issues

- A very barebones stub of the library is being generated based on the package name. If you want to import specific code within a library like `lodash/omit`, it will not work. In that case, you might want to pull in a community libdef from [flow-typed](https://github.com/flowtype/flow-typed) instead.

## Development

Testing this library is tricky because it relies on a real project that has multiple dependencies in `package.json`. Hence we create a mock project in the `test-project` folder that has some common JS dependencies defined and symlink the `flow-scripts` library within that project to our development file in the root folder. Run the commands within that mock project to test that the library is actually working as intended.

```
$ cd test-project
$ npm install # or yarn install
$ npm link ../
$ flow-scripts stub # flow-typed/package-dep-libdefs.js file should be generated
```
