var jsonfile = require('jsonfile');

global.file = 'test_reports/Accessibility_violations.json'
global.writeOutput = writeOutput;
global.writeOutViolations = writeOutViolations;
global.writeOutReviews = writeOutReviews;

function writeOutViolations(violations) {
  writeOutput("Accessibility Violations: " + violations.length);
  if (violations.length > 0) {
    for (var i = 0; i < violations.length; i++) {
      writeOutput('Violation: ' + violations[i].id);
      writeOutput('Description: ' + violations[i].description);
      writeOutput('Impact: ' + violations[i].impact);
      writeOutput('Affected nodes:');
      for (var j = 0; j < violations[i].nodes.length; j++) {
        writeOutput('- ' + violations[i].nodes[j].html);
      }
    }
  }
  writeOutput('Full details: ');
  writeOutput(violations);
}

function writeOutReviews(incomplete) {
  writeOutput("Needs review: " + incomplete.length);
  if (incomplete.length > 0) {
    writeOutput(incomplete);
    writeOutput('----');
  }
  else{
    writeOutput('----');
  }
}

function writeOutput(content, spaces) {
  spaces = spaces || 0;
  jsonfile.writeFile(file, content, {flag: 'a', spaces: spaces}, function (err) {
    console.error(err)
  });
}