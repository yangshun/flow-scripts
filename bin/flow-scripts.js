#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');
const cli = require('../lib/cli');
const constants = require('../lib/constants');

commander
  .version(pkg.version)
  .usage('[command] [flags]');

console.log('flow-scripts %s\n', pkg.version);

commander
  .command('stub')
  .description('Generates naive flow-typed stubs for packages in dependencies')
  .action(() => {
    cli.execute('stub');
  });

commander
  .command('unmonitored [pattern]')
  .description(`Lists the files matching the specified glob pattern that do not contain "${constants.FLOW_MARKER}"`)
  .action((pattern) => {
    cli.execute('unmonitored', { pattern });
  });

commander.parse(process.argv);
