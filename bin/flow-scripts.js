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
  .option('--fix', `Adds "${constants.FLOW_MARKER}" to the unmonitored files`)
  .action((pattern, options) => {
    cli.execute('unmonitored', { pattern }, { fix: options.fix });
  });

commander.parse(process.argv);
