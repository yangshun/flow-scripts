#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const fs = require('fs');

var command;
program
  .option('-s, --silent', 'silent')
  .arguments('<cmd>')
  .action(function (cmd) {
    command = cmd;
  })
  .parse(process.argv);

function log() {
  if (!program.silent) {
    console.log.apply(null, arguments);
  }
}

if (typeof command === 'undefined') {
  process.stderr.write('ERROR: No command provided!');
  process.exit(1);
}

log('Running flow-scripts in', process.cwd());

const DEFAULT_FLOW_TYPED_DIR = 'flow-typed';
const DEFAULT_PACKAGE_DEP_LIBDEFS_FILENAME = 'package-dep-libdefs.js';

switch (command) {
  case 'stub':
    {
      const fullPackagePath = path.join(process.cwd(), 'package.json');
      const pkg = require(fullPackagePath);
      const dir = DEFAULT_FLOW_TYPED_DIR;
      const filename = DEFAULT_PACKAGE_DEP_LIBDEFS_FILENAME;
      if (!fs.existsSync(dir)) {
        log(`The directory \`${dir}\` does not exist, creating it...`);
        fs.mkdirSync(dir);
      }
      let fileContents = Object.keys(pkg.dependencies).map(function (dep) {
        return `declare module '${dep}' { declare var exports: any; }`;
      }).join('\n') + '\n';
      fs.writeFileSync(`${dir}/${filename}`, fileContents);
      log(`Written to file \`${dir}/${filename}\``);
    }
    break;
  default:
    {
      process.stderr.write(`ERROR: Invalid command provided: ${command}`);
      process.exit(1);
    }
    break;
}
