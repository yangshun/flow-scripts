const fs = require('fs');
const glob = require('glob');

const constants = require('../constants');

module.exports = function (args, options) {
  const pattern = args.pattern || './**/*.{js,jsx}';
  const fix = !!options.fix;
  glob(pattern, null, (err, files) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }

    console.log(`Found ${files.length} file(s) matching the pattern "${pattern}"...`);
    if (!files.length) {
      return;
    }
    const unmonitoredFiles = [];
    const ignoredFiles = [];
    files.forEach(file => {
      const content = fs.readFileSync(file);
      if (content.indexOf(constants.NOFLOW_MARKER) > -1) {
        ignoredFiles.push(file);
      } else if (content.indexOf(constants.FLOW_MARKER) === -1) {
        unmonitoredFiles.push(file);
      }
    });
    if (!unmonitoredFiles.length) {
      console.log(`There are no unmonitored files that do not contain "${constants.FLOW_MARKER}"!`);
      return;
    }
    if (ignoredFiles.length) {
      console.log(`Found ${ignoredFiles.length} file(s) that contain ` +
        `"${constants.NOFLOW_MARKER}". They will be excluded.`);
    }
    console.log(`Found ${unmonitoredFiles.length} file(s) that do ` +
      `not contain "${constants.FLOW_MARKER}":\n`);
    unmonitoredFiles.forEach(file => {
      console.log(`  ${file.replace(/^\.\//, '')}`);
      if (fix) {
        fs.writeFileSync(file, `// ${constants.FLOW_MARKER}\n` + fs.readFileSync(file));
      }
    });

    console.log();
    if (!fix) {
      console.log('Run the command again with --fix to automatically append ' +
        `"${constants.FLOW_MARKER}" to those files.`);
    } else {
      console.log(`${unmonitoredFiles.length} fixed by automatically ` +
        `appending "${constants.FLOW_MARKER}"`);
    }

    console.log();
  });
}
