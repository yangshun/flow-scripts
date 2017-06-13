#!/usr/bin/env node
const fs = require('fs');

const commands = require('./commands');

const cli = {
  execute: function(cmd, args, options) {
    if (!commands.hasOwnProperty(cmd)) {
      console.error('No execution code found for %s', cmd);
      return;
    }
    commands[cmd](args, options);
  },
};

module.exports = cli;
