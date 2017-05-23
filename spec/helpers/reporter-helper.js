var jsonfile = require('jsonfile');

global.file = 'test_reports/Accessibility_violations.json'
global.writeOutput = writeOutput;
global.writeOutViolations = writeOutViolations;
global.writeOutReviews = writeOutReviews;
global.buildOutput = buildOutput;

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
  writeOutput(JSON.stringify(violations));
}

function writeOutReviews(incomplete) {
  writeOutput("Needs review: " + incomplete.length);
  if (incomplete.length > 0) {
    writeOutput(JSON.stringify(incomplete));
    writeOutput('----');
  }
  else{
    writeOutput('----');
  }
}

function writeOutput(content, spaces) {
  spaces = spaces || 0;
  jsonfile.writeFile(file, content, {flag: 'a', spaces: spaces}, function (err) {
    if (err) {
      console.error(err)
    } else {
      console.log(content);
    }
  });
}

function buildOutput(pageHeader, results) {
  var outputContent = {}
  outputContent.page = pageHeader;
  outputContent.violationCount = results.violations.length;
  outputContent.violations = [];
  for (var i = 0; i < results.violations.length; i++) {
    var violationOutput = {};
    violationOutput.violation = results.violations[i].id;
    violationOutput.description = results.violations[i].description;
    violationOutput.impact = results.violations[i].impact;
    violationOutput.affectedNodes = [];
    for (var j = 0; j < results.violations[i].nodes.length; j++) {
      violationOutput.affectedNodes.push('- ' + results.violations[i].nodes[j].html.toString());
    }
    outputContent.violations.push(violationOutput);
  }
  outputContent.fullDetails = JSON.stringify(results.violations);
  outputContent.reviewCount = results.incomplete.length;
  outputContent.reviewDetails = JSON.stringify(results.incomplete);
  writeOutput(outputContent);
}