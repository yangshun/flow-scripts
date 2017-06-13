const fs = require('fs');
const glob = require('glob');

const constants = require('../constants');

module.exports = function (args) {
  const pattern = args.pattern || './**/*.{js,jsx}';
  glob(pattern, null, (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Found ${files.length} file(s) matching the pattern "${pattern}"...`);
    if (!files.length) {
      return;
    }

    const unmonitoredFiles = files.filter(file => fs.readFileSync(file).indexOf(constants.FLOW_MARKER) === -1);
    if (!unmonitoredFiles.length) {
      console.log(`All files contain "${constants.FLOW_MARKER}"!`);
      return;
    }
    console.log(`Found ${unmonitoredFiles.length} file(s) that do not contain "${constants.FLOW_MARKER}":\n`);
    unmonitoredFiles.forEach(file => {
      console.log(`  ${file.replace(/^\.\//, '')}`);
    });
    console.log();
  });
}
