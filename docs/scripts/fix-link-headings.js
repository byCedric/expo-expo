const glob = require('glob');
const remark = require('remark');
const links = require('remark-validate-links');
const replace = require('replace-in-file');
const vfile = require('to-vfile');
const report = require('vfile-reporter');

const files = glob.sync('../pages/**/*.md');
const parser = remark().use(links);

async function run() {
  for (const filePath of files) {
    const file = vfile.readSync(filePath);
    const result = await parser.process(file);
    const format = report(result, { color: false });

    if (format.includes('no issues found')) {
      continue;
    }

    const rules = getRules(format);
    const fixes = rules
      .map(rule => ({
        position: getPositionHeading(rule),
        heading: getUnknownHeading(rule),
        suggestion: getSuggestedHeading(rule),
      }))
      .filter(fix => fix.heading)
      .map(fix => ({ ...fix, result: applyFix(file, fix)[0] }));

    console.log(output(file, fixes) + '\n');
  }
}

run();

function getRules(format) {
  return format
    .split('\n')
    .slice(1) // cut off the file name
    .slice(0, -2); // cut off the separator and summary
}

function getPositionHeading(line) {
  return line.trim().split(' ')[0];
}

function getUnknownHeading(line) {
  return (line.match(/Link to unknown heading: `([^`]+)`/i) || [])[1];
}

function getSuggestedHeading(line) {
  return (line.match(/Did you mean `([^`]+)`/i) || [])[1] || '';
}

function applyFix(file, fix) {
  if (fix.heading && fix.suggestion) {
    return replace.sync({
      files: file.path,
      from: `#${fix.heading}`,
      to: `#${fix.suggestion}`,
    });
  }
  return [];
}

function output(file, fixes) {
  return (
    `${file.path}:` +
    fixes
      .map(
        fix =>
          `\n    ${fix.position}  ${fix.heading}${fix.suggestion ? ` -> ${fix.suggestion}` : ''}`
      )
      .join('')
  );
}
