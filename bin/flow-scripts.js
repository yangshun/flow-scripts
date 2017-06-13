#!/usr/bin/env node

const commander = require('commander');
const pkg = require('../package.json');
const cli = require('../lib/cli');
const constants = require('../lib/constants');

commander
  .version(pkg.version)
  .option('-s, --silent', 'silent')

console.log('flow-scripts %s\n', pkg.version);

commander
  .command('stub')
  .description('Generates naive flow-typed stubs for packages in dependencies')
  .action(() => {
    cli.execute('stub');
  });

commander
  .command('*')
  .action(cmd => {
    console.error('Command "%s" not found.', cmd);
  });

commander.parse(process.argv);
